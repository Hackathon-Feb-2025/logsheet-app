import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, TextField, MenuItem } from "@mui/material";
import axios from "axios";
import Header from '../MYComponents/Header';
import Footer from '../MYComponents/Footer';
import { toast } from 'react-toastify'



//const courses = ["Course 1", "Course 2", "Course 3"];

const UploadCurriculum = () => {
  const [courses, setCourses] = useState([]);
  const [success, setSuccess] = useState("");
  const [currData, setCurrData] = useState({
    id: "",
    modulename:"",
    curriculumFilePath:null,
  });

  const token = sessionStorage.getItem('token');
  if (!token) {
      console.error("JWT Token is missing from sessionStorage.");
  }
  const userId = sessionStorage.getItem('id');
  const [username, setUsername] = useState('');
  const navigate = useNavigate()
      

  useEffect(() => {
    //debugger
    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/courses', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data)
            setCourses(response.data);
        } catch (err) {
          console.log(err)
          console.error('Failed to fetch courses.');
        }
        const storedUsername = sessionStorage.getItem('name');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    };
    fetchCourses();
}, [token]);

const handleInputChange = (e) => {
  const { name, value, type } = e.target;

  if (type === "file") {
    setCurrData((prevState) => ({
      ...prevState,
      curriculumFilePath: e.target.files[0],
    }));
  } else {
    setCurrData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  console.log(`Updated ${name}: `, value); // Debugging
};


  const handleUpload = async () => {
    //debugger
    setSuccess('');

    if(!currData.id || !currData.modulename || !currData.curriculumFilePath){
      setSuccess("Please fill all fields..");
      return;
    }
  // const dataToSubmit ={...currData, userId: parseInt(userId, 10), modulename:currData.modulename,curriculumFilePath:currData.curriculumFilePath}

  const formData = new FormData();
  formData.append("courseId",currData.id);
    formData.append("moduleName", currData.modulename);
   // formData.append("userId", parseInt(userId, 10));
    formData.append("file", currData.curriculumFilePath);

    try{
      const response= await axios.post("http://localhost:8080/api/modules/upload", formData, {
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type":"multipart/form-data",
        },
      });
      console.log(formData)
      if(response.status ===200){
        setSuccess("Successfully uploaded..")
        toast.success('Curriculum Uploaded Successfully')
        navigate('/cocohome')

      }
    }catch(err){
      console.error("Upload failed", err);
      setSuccess("Upload failed.. Try again..")
    }
  };

  return (
    <div>
    <Header username={username} />
    <Container>
      <Typography variant="h5" sx={{ mb: 2 }} style={{marginTop:"20px"}}>Upload Curriculum</Typography>
      <TextField 
      select 
      label="Select Course"  
      sx={{ mb: 2, width:"50%" }}
      name="id"
      value={currData.id ||""} 
      onChange={handleInputChange}//{(e) => setCourses(e.target.value)}
      >
        {courses.map((course) => (
          <MenuItem key={course.id} value={course.id}>{course.courseName}</MenuItem>
        ))}
      </TextField>
      <br></br>
      <TextField
      name = "modulename"
      label="Module Name" 
      sx={{ mb: 2, width:"50%" }}
      value={currData.modulename} 
      onChange={handleInputChange} //{(e) => setModuleName(e.target.value)}
      />
      <br></br>
      {/* <Card className="text-center text-dark" style={{ backgroundColor: "#efeae4",marginLeft:"90px", width:"50%"}}> */}
      <input type="file"
      name="curriculumFilePath"
      onChange={(e) => setCurrData({ ...currData, curriculumFilePath: e.target.files[0] })} 
      />
      {/* </Card> */}
  <br></br>
      <Button style={{backgroundColor:"brown", width:"40%" , height:"50%"}} variant="contained" sx={{ mt: 2 }} onClick={handleUpload}>Upload</Button>
      {success && (
        <Typography variant="body1" sx={{ mt: 2, color: success.includes("failed") ? "red" : "green" }}>
          {success}
        </Typography>
      )}
    </Container>
    <Footer sx={{ mt: 10, mb: 4 }} />
    </div>
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
