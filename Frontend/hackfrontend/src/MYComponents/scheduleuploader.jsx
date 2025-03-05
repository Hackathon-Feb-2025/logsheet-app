import React, { useState } from "react";
import { Button, Container, Typography, Box, TextField, Snackbar } from "@mui/material";
import axios from "axios";

const ScheduleManager = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleGenerateFile = async () => {
    if (!startDate || !endDate) {
      setSnackbarMessage("Please select start and end dates.");
      setSnackbarOpen(true);
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/schedule/generate-files", 
        null, // No request body needed
        { params: { startDate, endDate } } // Send parameters as query params
      );
      setSnackbarMessage(response.data);
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(error.response?.data || "Failed to generate file");
      setSnackbarOpen(true);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setSnackbarMessage("File uploaded successfully!");
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="md">
      <Box textAlign="center" mt={4}>
        <Typography variant="h4" gutterBottom>
          Schedule Manager
        </Typography>
        <TextField
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={{ m: 1 }}
        />
        <TextField
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          sx={{ m: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleGenerateFile} sx={{ m: 2 }}>
          Generate Schedule File
        </Button>
        <br />
        <input
          type="file"
          accept=".csv"
          style={{ display: "none" }}
          id="upload-button"
          onChange={handleFileUpload}
        />
        <label htmlFor="upload-button">
          <Button variant="contained" component="span" color="secondary" sx={{ m: 2 }}>
            Upload Schedule File
          </Button>
        </label>
        {uploadedFile && (
          <Typography variant="body1" mt={2}>
            Uploaded File: {uploadedFile.name}
          </Typography>
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default ScheduleManager;
