// App.js
 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../Images/SunbeamLogo.png';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from "react-router-dom";




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

function AddUser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
          email: '',
          userName: '',
          mobileNo: '',
          password: '',
          roleId: '',
          getRole: {
            roleId: '', // Assuming roleId is initialized to 0 by default
            roleName: '' // Assuming roleName is initialized to an empty string by default
          }
  });

  useEffect(() => {
    // Fetch data from backend API when component mounts
    axios.get('http://localhost:5063/api/User')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  console.log(formData);
    axios.post('http://localhost:5063/api/User', formData)
      .then(response => {
        console.log('User signed up successfully:', response.data);
        // Optionally, update the user list after sign-up
        setUsers([...users, response.data]);
        // Clear form fields after successful sign-up
        setFormData({
         
          email: '',
          userName: '',
          mobileNo: '',
          password: '',
          roleId: '',
          getRole: {
            roleId: '', // Assuming roleId is initialized to 0 by default
            roleName: '' // Assuming roleName is initialized to an empty string by default
          }

        });
        navigate("/signin")
      })
      .catch(error => {
        console.error('Error signing up:', error);
      });
  };
  const logoStyle = {
    position: 'absolute',
    top: 3,
    left: 3,
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div >
        <img src={logo}  alt="Sunbeam logo" style={logoStyle} title="Sunbeam"></img>
       </div>
       <form onSubmit={handleSubmit}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {/* <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}> */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  //autoComplete="given-name"
                  name="userName"
                  // required
                  fullWidth
                 // id="userName"
                  label="Name"
                  autoFocus
                  value={formData.userName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  //id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  // required
                  fullWidth
                  //id="mobileNo"
                  label="Mobile No"
                  name="mobileNo"
                  autoComplete="family-name"
                  value={formData.mobileNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  //id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={1}>
              <FormControl>
              <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                <Select sx={{width:400}}
                 required
                 fullWidth
                 labelId="demo-simple-select-helper-label"
                 //id="getRole"
                 label= "Role"
                 name="getRole"
                 value={formData.roleId}
                 onChange={handleChange}
                >
                 <MenuItem value=""><em>Select Role</em></MenuItem>
                 <MenuItem value={1}>coco</MenuItem>
                 <MenuItem value={2}>Module Router</MenuItem>
                 <MenuItem value={3}>Faculty</MenuItem>
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12}>
                {/* <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                /> */}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        {/* </Box> */}
        </form>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
      /* <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.userName}</li>
        ))}
      </ul> 
            
      /* <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Mobile No:
          <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <label>
          Role ID:
          <select name="getRole" value={formData.roleId} onChange={handleChange}>
            <option value="">Select Role</option>
            <option value={1}>Coco</option>
            <option value="2">Module Router</option>
            <option value="3">Faculty</option>
          </select>
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>*/
  );
}

export default AddUser;
