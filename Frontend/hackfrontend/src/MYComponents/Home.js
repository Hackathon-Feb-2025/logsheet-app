import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, Typography } from '@mui/material';
import Header from '../MYComponents/Header';
import Footer from '../MYComponents/Footer';

const Dashboard = () => {
    const [logStats, setLogStats] = useState({
        totalLogs: 0,
        verifiedLogs: 0,
        pendingLogs: 0,
        approvedLogs: 0,
    });
    const [username, setUsername] = useState('');
    const userId = sessionStorage.getItem('id'); // Assuming userId is stored in sessionStorage

    useEffect(() => {
        const fetchLogStats = async () => {
            try {
                const response = await axios.get(`http://localhost:5063/api/LogSheet/user/stats/${userId}`);
                setLogStats(response.data);
            } catch (error) {
                console.error('Error fetching log stats:', error);
            }
        };

        fetchLogStats();

        const storedUsername = sessionStorage.getItem('name');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, [userId]);

    return (
        <div>
            <Header username={username} />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Dashboard
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                        <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#4d8596'  }}>
                            <Typography variant="h5" align="center">Total Logs Submitted</Typography>
                            <Typography variant="h6" align="center">{logStats.totalLogs}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Paper elevation={3} sx={{ padding: 2,backgroundColor: '#ffccbc' }}>
                            <Typography variant="h5" align="center">Total Verified Logs</Typography>
                            <Typography variant="h6" align="center">{logStats.verifiedLogs}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#ff5720'  }}>
                            <Typography variant="h5" align="center">Total Pending Logs</Typography>
                            <Typography variant="h6" align="center">{logStats.pendingLogs}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#fff79b'  }}>
                            <Typography variant="h5" align="center">Total Approved Logs</Typography>
                            <Typography variant="h6" align="center">{logStats.approvedLogs}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer sx={{ mt: 10, mb: 4 }} />
        </div>
    );
};

export default Dashboard;
