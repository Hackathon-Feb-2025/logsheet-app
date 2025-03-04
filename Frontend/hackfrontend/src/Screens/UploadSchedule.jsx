import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../MYComponents/Header';
import Footer from '../MYComponents/Footer';
import { Button, Container } from 'react-bootstrap';
import { MenuItem, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';

export default function UploadSchedule() {
    const [courses, setCourses] = useState([]);
    const [success, setSuccess] = useState("");
    const [schData, setSchData] = useState({
        id:"",
        scheduleFilePath: null,
    });
    const token = sessionStorage.getItem('token');
    if(!token){
        console.error("Jwt token is missing from sessionStorage")
    }
    const [username, setUsername] = useState('');
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/courses',{
                    headers: { Authorization: `Bearer ${token}`},
                });
                setCourses(response.data);
            }catch(err){
                console.error('Failed to fetch courses..');
            }
            const storedUsername = sessionStorage.getItem('name');
            if(storedUsername){
                setUsername(storedUsername);
            }
        };
        fetchCourses();
    },[token]);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
    
        if (type === "file") {
            setSchData((prevState) => ({
            ...prevState,
            scheduleFilePath: e.target.files[0],
        }));
        } else {
            setSchData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        }
    }

    const handleUpload = async () =>{
        setSuccess('');

        if(!schData.id || !schData.scheduleFilePath){
            setSuccess("Please fill all fields");
            return;
        }
        const formData = new FormData();
        formData.append("courseId",schData.id);
        formData.append("file", schData.scheduleFilePath);
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
                toast.success('Schedule Uploaded Successfully')
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
        {/* <h5 style={{marginTop:"20px"}}>Upload Schedule</h5> */}
        <Typography variant="h5" sx={{ mb: 2 }} style={{marginTop:"20px"}}>Upload Schedule</Typography>
        {/* <Typography>Upload Schedule</Typography> */}
        <TextField
        select 
        label="Select Course"  
        sx={{ mt:2, mb: 2, width:"50%" }}
        name="id"
        value={schData.id ||""} 
        onChange={handleInputChange}//{(e) => setCourses(e.target.value)}
        >
        {courses.map((course) => (
            <MenuItem key={course.id} value={course.id}>{course.courseName}</MenuItem>
        ))}
        </TextField>
        <br />
        <input type="file"
        name="curriculumFilePath"
        style={{marginBottom:"20px"}}
        onChange={(e) => setSchData({ ...schData, scheduleFilePath: e.target.files[0] })} 
        />
        <br />
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

