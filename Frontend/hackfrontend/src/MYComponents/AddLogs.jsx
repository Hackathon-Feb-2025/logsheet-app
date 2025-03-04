import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, TextField, MenuItem, Button, Paper, Grid, Autocomplete,Chip } from "@mui/material";

const Logsheet= () => {
  const [date, setDate] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [topicsTaught, setTopicsTaught] = useState([]);
  const [assignmentGiven, setAssignmentGiven] = useState("");
  const [studentProgress, setStudentProgress] = useState("");
  const [suggestedTopics, setSuggestedTopics] = useState([]);
  const [topics, setTopics] = useState({});
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubtopic, setSelectedSubtopic] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedSubtopics, setSelectedSubtopics] = useState({});
  const facultyId = sessionStorage.getItem("id");

  useEffect(() => {
    if (date && facultyId) {
      axios.get(`http://localhost:8080/schedule/${facultyId}/${date}`).then((response) => {
        setSchedules(response.data);
      });
    }
  }, [date]);
  console.log(schedules);
  

  useEffect(() => {
    if (selectedSchedule) {
      const moduleName = selectedSchedule.modules.moduleName;
      axios.get(`http://localhost:8080/api/logsheets/curriculum/${moduleName}`)
        .then((response) => {
          setTopics(response.data); // Expecting a topics object
        })
        .catch((error) => console.error("Error fetching topics:", error));
    }
  }, [selectedSchedule]);

  const handleTopicChange = (event, newValue) => {
    setSelectedTopics(newValue);
    setSelectedSubtopics((prev) => {
      const updatedSubtopics = { ...prev };
      newValue.forEach((topic) => {
        if (!updatedSubtopics[topic]) updatedSubtopics[topic] = [];
      });
      return updatedSubtopics;
    });
  };

  const handleSubtopicChange = (topic, newValue) => {
    setSelectedSubtopics((prev) => ({ ...prev, [topic]: newValue }));
  };

  

  const handleSubmit = () => {
    if (!selectedSchedule) return;
    const topicsTaught = selectedTopics.flatMap(topic =>
      selectedSubtopics[topic]?.map(subtopic => `${topic} - ${subtopic}`) || []
    );

    const logsheetData = {
      scheduleId: selectedSchedule.id,
      date:date,
      topicsTaught: topicsTaught,
      assignmentGiven: selectedSchedule.type === "Lab" ? assignmentGiven : "",
      studentProgress: selectedSchedule.type === "Lab" ? studentProgress : "",
      start_time: selectedSchedule.start_time,
      end_time: selectedSchedule.end_time,
      facultyId: Number(facultyId),
    };
    console.log(logsheetData);

    axios.post("http://localhost:8080/api/logsheets", logsheetData).then(() => {
      alert("Logsheet submitted successfully");
    });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>Logsheet Entry</Typography>
        
        <TextField
          label="Select Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ mb: 2 }}
        />
        
        <TextField
          select
          label="Select Schedule"
          fullWidth
          value={selectedSchedule?.id || ""}
          onChange={(e) => setSelectedSchedule(schedules.find(s => s.id == e.target.value))}
          sx={{ mb: 2 }}
        >
          {schedules.map((schedule) => (
            <MenuItem key={schedule.id} value={schedule.id}>
              {schedule.modules.moduleName} - {schedule.type} ({schedule.start_time} - {schedule.end_time})
            </MenuItem>
          ))}
        </TextField>

        {selectedSchedule && (
          <Paper variant="outlined" sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant="subtitle1">Course: {selectedSchedule.course.courseName}</Typography>
            <Typography variant="subtitle1">Module: {selectedSchedule.modules.moduleName}</Typography>
            <Typography variant="subtitle1">Type: {selectedSchedule.type}</Typography>
            
            <TextField
              label="Start Time"
              type="time"
              fullWidth
              value={selectedSchedule.start_time}
              onChange={(e) => setSelectedSchedule({ ...selectedSchedule, start_time: e.target.value })}
              sx={{ mt: 2 }}
            />

            <TextField
              label="End Time"
              type="time"
              fullWidth
              value={selectedSchedule.end_time}
              onChange={(e) => setSelectedSchedule({ ...selectedSchedule, end_time: e.target.value })}
              sx={{ mt: 2 }}
            />

            <TextField
              label="Group"
              fullWidth
              value={selectedSchedule.scduledgroup}
              onChange={(e) => setSelectedSchedule({ ...selectedSchedule, scduledgroup: e.target.value })}
              sx={{ mt: 2 }}
            />
            
            <TextField
              label="Venue"
              fullWidth
              value={selectedSchedule.scheduledvenue}
              onChange={(e) => setSelectedSchedule({ ...selectedSchedule, scheduledvenue: e.target.value })}
              sx={{ mt: 2 }}
            />
            
            <Typography variant="subtitle1">Faculty: {selectedSchedule.faculty.firstName} {selectedSchedule.faculty.lastName}</Typography>
            
            {selectedSchedule.type === "Lecture" ? (
              <>
                <Autocomplete
                  multiple
                  options={Object.keys(topics)}
                  value={selectedTopics}
                  onChange={handleTopicChange}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip key={option} label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => <TextField {...params} label="Select Topics" fullWidth sx={{ mt: 2 }} />}
                />
                {selectedTopics.map((topic) => (
                  <Autocomplete
                    key={topic}
                    multiple
                    options={topics[topic] || []}
                    value={selectedSubtopics[topic] || []}
                    onChange={(event, newValue) => handleSubtopicChange(topic, newValue)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip key={option} label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label={`Select Subtopics for ${topic}`} fullWidth sx={{ mt: 2 }} />}
                  />
                ))}
              </>
            )  : (
              <>
                <TextField
                  label="Assignment Given"
                  multiline
                  fullWidth
                  rows={2}
                  value={assignmentGiven}
                  onChange={(e) => setAssignmentGiven(e.target.value)}
                  sx={{ mt: 2 }}
                />
                <TextField
                  label="Student Progress"
                  multiline
                  fullWidth
                  rows={2}
                  value={studentProgress}
                  onChange={(e) => setStudentProgress(e.target.value)}
                  sx={{ mt: 2 }}
                />
              </>
            )}
          </Paper>
        )}
        
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleSubmit}>
          Submit
        </Button>
      </Paper>
    </Container>
  );
};

export default Logsheet;
