import React, {useEffect,useState} from 'react';
import axios from 'axios';
import Header from '../MYComponents/Header';
import Footer from '../MYComponents/Footer';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Loglist() {
    
    const [logs, setLogs] = useState([]);
    const [courses, setCourses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [username, setUsername] = useState('');
    const navigate = useNavigate()
    const userId = sessionStorage.getItem('id'); 
    const [role, setRole] = useState('');


    useEffect(() => {
      const fetchData = async () => {
          try {
              const [logsResponse, coursesResponse, subjectsResponse] = await Promise.all([
                  axios.get(`http://localhost:5063/api/LogSheet/user/${userId}`),
                  axios.get('http://localhost:5063/course'), // Fetch all courses
                  axios.get('http://localhost:5063/api/Subject') // Fetch all subjects
              ]);

              setLogs(logsResponse.data);
              setCourses(coursesResponse.data);
              setSubjects(subjectsResponse.data);

              const storedUsername = sessionStorage.getItem('name');
              const storedRole = sessionStorage.getItem('role'); 

              if (storedUsername) {
                  setUsername(storedUsername);
              }
              if (storedRole) {
                setRole(storedRole); 
            }
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
  }, [userId]);

    // useEffect(() => {
    //     // Fetch data from backend API when component mounts
    //     axios.get(`http://localhost:5063/api/LogSheet/user/${userId}`)
    //       .then(response => {
    //         setlogs(response.data);
    //       })
    //       .catch(error => {
    //         console.error('Error fetching users:', error);
    //       });
    //   // }, []);

    //   const storedUsername = sessionStorage.getItem('name');
    //   if (storedUsername) {
    //       setUsername(storedUsername);
    //   }
    // }, []);
    const getCourseName = (courseId) => {
      const course = courses.find((course) => course.courseId === courseId);
      return course ? course.courseName : 'N/A';
    };

    const getSubjectName = (subjectId) => {
      const subject = subjects.find((subject) => subject.subjectId === subjectId);
      return subject ? subject.subjectName : 'N/A';
    };

    const calculateTotalHours = (startTime, endTime) => {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const diffInMs = end - start;
      const totalHours = diffInMs / (1000 * 60 * 60); // Convert milliseconds to hours
      return totalHours.toFixed(2); // Return total hours rounded to 2 decimal places
    };

      const fetchLogs = async () => {
        try {
          const response = await axios.get('http://localhost:5063/log/loglist');
          setLogs(response.data);
        } catch (error) {
          console.error('Error fetching logs:', error);
        }
      };

      const handleDelete = async (id) => {
        console.log(id)
        try {               
          await axios.delete(`http://localhost:5063/api/LogSheet/deletelog/${id}`);
          setLogs(logs.filter(log => log.id !== id)); // Remove the deleted log from the state
          fetchLogs(); // Refresh logs after deletion
        } catch (error) {
          console.error('Error deleting log:', error);
        }
      };
      
      const onAddLog = ()=>{
        navigate('/addlog')
      }
      const onEditLog = (id)=>{
        navigate(`/editlog/${id}`)
      }
  return (
    
<div>
  <Header username={username} />
  <div className="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
       <div className="btn-group ms-5" role="group" aria-label="First group">
          <b style={{fontSize:40}}>Log Lists</b>
      </div>
      <div className="input-group" style={{paddingBottom: '5px'}}>
         <button className="btn btn-secondary me-md-5 mt-2" type="button" onClick={onAddLog} style={{ padding: '5px 10px', fontSize: '0.875rem', borderRadius: '8px' }} >ADD LOG</button>
      </div>
  </div >
      <table className="table" style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#efeae4 ' }}>
        <thead>
          <tr>
            <th>StartTime</th>
            <th>EndTime</th>
            <th>Total Hrs</th>
            <th>Course</th>
            <th>Module</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.logSheetId}>
              <td>{log.startTime}</td>
              <td>{log.endTime}</td>
              <td>{calculateTotalHours(log.startTime, log.endTime)}</td>
              <td>{getCourseName(log.courseId)}</td>
              <td>{getSubjectName(log.subjectId)}</td>
              <td>{log.logType}</td>
              <td>{log.status}</td>
              <td>
              <IconButton onClick={() => onEditLog(log.logSheetId)} sx={{ color: 'orange' }} aria-label="edit"><EditIcon /></IconButton>
              <IconButton onClick={() => handleDelete(log.logSheetId)} sx={{ color: 'red' }} aria-label="delete"><DeleteIcon /></IconButton>
                {/* <button className="btn btn-warning mr-2"  onClick={() => onEditLog(log.id)}>Edit</button> 
                <button className="btn btn-danger" onClick={() => handleDelete(log.id)}>X</button>*/}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer sx={{ mt: 10, mb: 4 }}/>
    </div>
  )
}
