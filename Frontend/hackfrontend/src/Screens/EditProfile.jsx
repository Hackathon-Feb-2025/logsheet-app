import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../MYComponents/Header';


const defaultTheme = createTheme();

export default function EditProfile() {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState('');
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    const userId = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('token'); 


    useEffect(() => {
        if (userId && token) {
          axios.get(`http://localhost:5063/api/User/${userId}`,{ 
            headers:{'Authorization': `Bearer ${token}` }})
            .then(response => {
                setEmail(response.data.email);
                setUserName(response.data.userName);
                setMobileNo(response.data.mobileNo);
                setPassword(response.data.password);
                setRoleId(response.data.roleId);
             // setUserData(response.data);
            })
            .catch(error => {
              console.error('Error fetching user data:', error);
            });
        } else {
          console.error('User ID is missing');
        }
        const storedUsername = sessionStorage.getItem('name');
        if (storedUsername) {
          setUsername(storedUsername);
      }
      }, [userId,token]);

    const onUpdateProfile = async () => {
        if (userName.length === 0) {
            toast.error('Please enter name');
        } else if (email.length === 0) {
            toast.error('Please enter email');
        } else if (password.length === 0) {
            toast.error('Please enter password');
        } else if (mobileNo.length === 0) {
            toast.error('Please enter mobile number');
        } else if (roleId.length === 0) {
            toast.error('Please select role');
        } else {
            const body = { userName, email, password, mobileNo, roleId };
            try {
                // Call put /api/UserProfile API for updating user details
                const result = await axios.put(`http://localhost:5063/api/User/${userId}`, body);
                if (result.data.status === 'success') {
                    toast.success('Profile updated successfully');
                    navigate('/view-profile'); // Redirect to profile page after successful update
                } else {
                    toast.error(result.data.error);
                }
            } catch (error) {
                toast.error('Error updating profile');
            }
        }
    };

    return (
        <div>
        <Header username={username} />
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <EditIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Edit Profile
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="userName"
                                fullWidth
                                label="Name"
                                autoFocus
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Mobile No"
                                name="mobileNo"
                                autoComplete="family-name"
                                value={mobileNo}
                                onChange={(e) => setMobileNo(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="role-select-label">Role</InputLabel>
                                <Select
                                    labelId="role-select-label"
                                    label="Role"
                                    value={roleId}
                                    onChange={(e) => setRoleId(e.target.value)}
                                >
                                    <MenuItem value=""><em>Select Role</em></MenuItem>
                                    <MenuItem value={1}>coco</MenuItem>
                                    <MenuItem value={2}>Module Router</MenuItem>
                                    <MenuItem value={3}>Faculty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        onClick={onUpdateProfile}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Update Profile
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/view-profile" variant="body2">
                                Back to Profile
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
        </div>
    );
}
