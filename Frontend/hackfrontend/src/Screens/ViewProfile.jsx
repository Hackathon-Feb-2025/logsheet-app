// import React, { useState, useEffect } from 'react';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Container from '@mui/material/Container';
// import CssBaseline from '@mui/material/CssBaseline';
// import Avatar from '@mui/material/Avatar';
// import EditIcon from '@mui/icons-material/Edit';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import TextField from '@mui/material/TextField';
// import axios from 'axios';
// import Header from '../MYComponents/Header';


// const defaultTheme = createTheme();

// export default function ViewProfile() {
//     const [email, setEmail] = useState('');
//     const [userName, setUserName] = useState('');
//     const [mobileNo, setMobileNo] = useState('');
//     const [roleId, setRoleId] = useState('');
//     const [username, setUsername] = useState('');

    
//     const userId = sessionStorage.getItem('id');
//     const token = sessionStorage.getItem('token'); 


//     useEffect(() => {
//         if (userId && token) {
//             axios.get(`http://localhost:5063/api/User/${userId}`,{ 
//             headers:{'Authorization': `Bearer ${token}` }})
//             .then(response => {
//                 setEmail(response.data.email);
//                 setUserName(response.data.userName);
//                 setMobileNo(response.data.mobileNo);
//                 setRoleId(response.data.roleId);
//              // setUserData(response.data);
//             })
//             .catch(error => {
//               console.error('Error fetching user data:', error);
//             });
//         } else {
//           console.error('User ID is missing');
//         }
//      // }, [userId,token]);

//       const storedUsername = sessionStorage.getItem('name');
//       if (storedUsername) {
//         setUsername(storedUsername);
//     }
//   }, [userId,token]);

//     return (
//         <div>
//         <Header username={username} />
//         <ThemeProvider theme={defaultTheme}>
//             <Container component="main" maxWidth="xs">
//                 <CssBaseline />
//                 <Box
//                     sx={{
//                         marginTop: 8,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                         <EditIcon />
//                     </Avatar>
//                     <Typography component="h1" variant="h5">
//                         Your Profile
//                     </Typography>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 label="Name"
//                                 value={userName}
//                                 InputProps={{ readOnly: true }}
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 label="Email Address"
//                                 name="email"
//                                 value={email}
//                                 InputProps={{ readOnly: true }}                            />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 label="Mobile No"
//                                 value={mobileNo}
//                                 InputProps={{ readOnly: true }}                            />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 label="Role"
//                                 value={roleId === 1 ? 'Coco' : roleId === 2 ? 'Module Router' : 'Faculty'}
//                                 InputProps={{ readOnly: true }}
//                             />
//                         </Grid>
//                     </Grid>
//                     {/* <Button
//                         onClick={onUpdateProfile}
//                         fullWidth
//                         variant="contained"
//                         sx={{ mt: 3, mb: 2 }}
//                     >
//                         Update Profile
//                     </Button> */}
//                     {/* <Grid container justifyContent="flex-end">
//                         <Grid item>
//                             <Link href="/profile" variant="body2">
//                                 Back to Profile
//                             </Link>
//                         </Grid>
//                     </Grid> */}
//                 </Box>
//             </Container>
//         </ThemeProvider>
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../MYComponents/Header';
import Footer from '../MYComponents/Footer';
import { useNavigate } from "react-router-dom";
import { Container, Paper, Typography, TextField, Grid} from '@mui/material';

const ViewProfile = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [roleId, setRoleId] = useState('');
    const [username, setUsername] = useState('');

    const userId = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('token'); 

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId && token) {
                try {
                    const response = await axios.get(`http://localhost:5063/api/User/${userId}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    setEmail(response.data.email);
                    setUserName(response.data.userName);
                    setMobileNo(response.data.mobileNo);
                    setRoleId(response.data.roleId);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            } else {
                console.error('User ID is missing');
            }
        };

        fetchUserData();
        
        const storedUsername = sessionStorage.getItem('name');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, [userId, token]);

    return (
        <div>
            <Header username={username} />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                {/* <Typography variant="h4" component="h1" gutterBottom align="center">
                    Your Profile
                </Typography> */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6">Name</Typography>
                            <TextField
                                fullWidth
                                value={userName}
                                InputProps={{ readOnly: true, sx: { fontSize: '1.25rem', width: 'auto' } }}
                                variant="filled"
                                margin="normal"
                            />
        
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6">Email Address</Typography>
                            <TextField
                                fullWidth
                                value={email}
                                InputProps={{ readOnly: true,sx: { fontSize: '1.25rem' }  }}
                                variant="filled"
                                margin="normal"
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6">Mobile No</Typography>
                            <TextField
                                fullWidth
                                value={mobileNo}
                                InputProps={{ readOnly: true,sx: { fontSize: '1.25rem' }  }}
                                variant="filled"
                                margin="normal"
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6">Role</Typography>
                            <TextField
                                fullWidth
                                value={roleId === 1 ? 'Coco' : roleId === 2 ? 'Module Router' : 'Faculty'}
                                InputProps={{ readOnly: true,sx: { fontSize: '1.25rem' }  }}
                                variant="filled"
                                margin="normal"
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer sx={{ mt: 10, mb: 4 }} />
        </div>
    );
};

export default ViewProfile;
