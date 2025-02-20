import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container, Typography, Button, TextField, MenuItem } from "@mui/material";
import axios from "axios";

const courses = ["Course 1", "Course 2", "Course 3"];

const UploadCurriculum = () => {
  const [course, setCourses] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [file, setFile] = useState(null);

   const [success, setSuccess] = useState('');
      const token = sessionStorage.getItem('jwt');
      const userId = sessionStorage.getItem('id'); // Assuming userId is stored in localStorage
      const [username, setUsername] = useState('');
      console.log(userId);

  useEffect(() => {
    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/course', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCourses(response.data);
        } catch (err) {
            console.log('Failed to fetch courses.');
        }
        const storedUsername = sessionStorage.getItem('name');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    };
    fetchCourses();
}, [token]);


  const handleUpload = () => {
    console.log({ course, moduleName, file });
  };

  return (
    <Container>
      <Typography variant="h5">Upload Curriculum</Typography>
      <TextField select label="Select Course" fullWidth value={course} onChange={(e) => setCourses(e.target.value)}>
        {courses.map((course) => (
          <MenuItem key={course} value={course}>{course}</MenuItem>
        ))}
      </TextField>
      <TextField label="Module Name" fullWidth value={moduleName} onChange={(e) => setModuleName(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <Button variant="contained" onClick={handleUpload}>Upload</Button>
    </Container>
  );
};

// const UploadSchedule = () => {
//   const [course, setCourse] = useState("");
//   const [file, setFile] = useState(null);

//   const handleUpload = () => {
//     console.log({ course, file });
//   };

//   return (
//     <Container>
//       <Typography variant="h5">Upload Schedule</Typography>
//       <TextField select label="Select Course" fullWidth value={course} onChange={(e) => setCourse(e.target.value)}>
//         {courses.map((course) => (
//           <MenuItem key={course} value={course}>{course}</MenuItem>
//         ))}
//       </TextField>
//       <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//       <Button variant="contained" onClick={handleUpload}>Upload</Button>
//     </Container>
//   );
// };

// const LogsheetEntry = () => {
//   const [date, setDate] = useState("");
//   const [topics, setTopics] = useState("");

//   return (
//     <Container>
//       <Typography variant="h5">Logsheet Entry</Typography>
//       <TextField type="date" fullWidth value={date} onChange={(e) => setDate(e.target.value)} />
//       <TextField label="Topics Taught" fullWidth value={topics} onChange={(e) => setTopics(e.target.value)} />
//       <Button variant="contained">Submit</Button>
//     </Container>
//   );
// };

// const App = () => {
//   const [role, setRole] = useState(sessionStorage.getItem("role"));

//   return (
//     <Router>
//       <Routes>
//         {role === "coco" ? (
//           <>
//             <Route path="/upload-curriculum" element={<UploadCurriculum />} />
//             <Route path="/upload-schedule" element={<UploadSchedule />} />
//             <Route path="*" element={<Navigate to="/upload-curriculum" />} />
//           </>
//         ) : role === "techstaff" ? (
//           <>
//             <Route path="/logsheet-entry" element={<LogsheetEntry />} />
//             <Route path="*" element={<Navigate to="/logsheet-entry" />} />
//           </>
//         ) : (
//           <Route path="*" element={<Typography>Please log in</Typography>} />
//         )}
//       </Routes>
//     </Router>
//   );
// };

export default UploadCurriculum;
