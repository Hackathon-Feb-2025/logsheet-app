import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
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
import { createTheme, emphasize, ThemeProvider } from '@mui/material/styles';
import logo from '../Images/SunbeamLogo.png';
// import Footer from "./Footer";

const defaultTheme = createTheme();

export default function LogIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [isEmailEmpty, setEmailEmpty] = useState(false)
    // const [isPasswordEmpty, setPasswordEmpty] = useState(false)

    const navigate = useNavigate()

    const onLogin = async () => {
      // debugger
      // if (!email) {
      //   toast.error('Please enter email');
      //   return;
      // }
      // if (!password) {
      //   toast.error('Please enter password');
      //   return;
      // }
  
      // try {
      //   const body = { userName: email, password };
      //   console.log(body);
      //   const result = await axios.post('http://localhost:5063/login', body);
  
      //   if (result.data.status === 'success') {
      //     toast.success('Login Successful!');
      //     sessionStorage.setItem('name', result.data.name);
      //     sessionStorage.setItem('token', result.data.token);
      //     navigate('/loglist');  // Redirect user after successful login
      //   } else {
      //     toast.error(result.data.message || 'Login failed. Try again.');
      //   }
      // } catch (error) {
      //   toast.error('An error occurred during login.');
      // }

        if (email.length === 0) {
          toast.error('Please enter email')
        } else if (password.length === 0) {
          toast.error('Please enter password')
        } else {
          const body = { email, password}
          console.log(body)
        try {
          // call login API and check its success
          const result =await axios.post('http://localhost:8080/auth/login',body)
          console.log(result.data)
          if (result.data.jwt){
            
            console.log("hhhhhhh")
            toast.success('Login Successfully..')
            console.log('Loginsuccess')
            const data = result.data
            // persist the token and user name in session storage

            sessionStorage['name'] = data.emp.firstName
            sessionStorage['token'] = data.jwt
            sessionStorage.setItem('role', data.emp.role);
            sessionStorage.setItem('id', data.emp.id); 
            // go to properties screen
            // navigate('/loglist')
            if (data.emp.role === 'TECHSTAFF') {
              navigate('/addlog');
            } else if (data.emp.role === 'COCO') {
              navigate('/cocohome');
            } else {
              toast.error('Unauthorized role');
            }
          } else {
            toast.error("Invalid Username or Password");
            // toast.error(result['error'])
          }
        } catch (error) {
            toast.error('Error during login');
        }
        }
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
      <div style={{backgroundColor: '#efeae4', width: '100%', padding: '20px', display: 'flex', justifyContent: 'center'}}>
      <img src={logo}  alt="Sunbeam logo" style={logoStyle} title="Sunbeam"></img>
      </div>
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
          Sign in
        </Typography>
        {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
          <TextField
            margin="normal"
            // required
            fullWidth
            //id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            //  required
            fullWidth
            name="password"
            label="Password"
            type="password"
            //id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            onClick={onLogin}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      {/* </Box> */}
      <Copyright sx={{ mt: 8, mb: 4 }} />
      {/* <Footer sx={{ mt: 8, mb: 4 }}/> */}
    </Container>
  </ThemeProvider>
  )
}
function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Sunbeam
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

