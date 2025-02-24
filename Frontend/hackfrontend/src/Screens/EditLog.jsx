import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditLog() {
    const { id } = useParams(); // Get the log ID from the URL
    const navigate = useNavigate();
    const [log, setLog] = useState({
        startTime: '',
        endTime: '',
        logType: '',
        courseId: '',
        subjectId: '',
        topic: '',
        status: ''
    });
    const [courses, setCourses] = useState([]);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        // Fetch the log details
        axios.get(`http://localhost:5063/api/LogSheet/${id}`)
            .then(response => {
                setLog(response.data);
            })
            .catch(error => {
                console.error('Error fetching log:', error);
            });

        // Fetch all courses and subjects for dropdowns
        axios.get('http://localhost:5063/course').then(response => setCourses(response.data));
        axios.get('http://localhost:5063/api/Subject').then(response => setSubjects(response.data));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLog({ ...log, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send the updated log data to the server
            await axios.put(`http://localhost:5063/api/LogSheet/${id}`, log);
            navigate('/loglist'); // Navigate back to the log list after successful update
        } catch (error) {
            console.error('Error updating log:', error);
        }
    };

    return (
        <div>
            <h2>Edit Log</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Start Time:</label>
                    <input
                        type="datetime-local"
                        name="startTime"
                        value={log.startTime}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>End Time:</label>
                    <input
                        type="datetime-local"
                        name="endTime"
                        value={log.endTime}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Log Type:</label>
                    <input
                        type="text"
                        name="logType"
                        value={log.logType}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Course:</label>
                    <select
                        name="courseId"
                        value={log.courseId}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        {courses.map((course) => (
                            <option key={course.courseId} value={course.courseId}>
                                {course.courseName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Subject:</label>
                    <select
                        name="subjectId"
                        value={log.subjectId}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        {subjects.map((subject) => (
                            <option key={subject.subjectId} value={subject.subjectId}>
                                {subject.subjectName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Topic:</label>
                    <input
                        type="text"
                        name="topic"
                        value={log.topic}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
{/* 
                <div className="form-group">
                    <label>Status:</label>
                    <input
                        type="text"
                        name="status"
                        value={log.status}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div> */}

                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
}
