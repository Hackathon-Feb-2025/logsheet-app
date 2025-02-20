import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import logo from '../Images/SunbeamLogo.png';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const defaultTheme = createTheme();
const logoStyle = {
    position: 'absolute',
    top: 3,
    left: 3,
  };
export default function Register() {
    const [email,setEmail] = useState('')
    const [userName,setUserName] = useState('')
    const [mobileNo,setMobileNo] = useState('')
    const [password,setPassword] = useState('')
    const [roleId,setRoleId] = useState('')

    const navigate = useNavigate()

    const onRegister = async () => {
      if (userName.length === 0) {
        toast.error('please enter name')
      } else if (email.length === 0) {
        toast.error('please enter email')
      } else if (password.length === 0) {
        toast.error('please enter password')
      } else if (mobileNo.length === 0) {
        toast.error('please enter mobile num')
      }else if (roleId.length === 0) {
        toast.error('please select role')
      } else {
        const body = { userName, email, password, mobileNo,roleId }
      try{
        // call post /admin/register api
       const result= await axios.post('http://localhost:5063/api/User',body) 
        if (result.data.status === 'success') {
          console.log('Regsuccess1')
          toast.success('Successfully registered')
          console.log('Regsuccess2')
          navigate('/login')
        } else {
          toast.error(result['error'])
        }
      }catch (error) {
        toast.error('Error during registration');
      }
      }
    }

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
                  onChange={(e)=> setUserName(e.target.value)}
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
                  onChange={(e)=> setEmail(e.target.value)}
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
                  onChange={(e)=> setMobileNo(e.target.value)}
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
                  onChange={(e)=> setPassword(e.target.value)}
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
                  value={roleId}
                //  name="getRole"
                  onChange={(e)=> setRoleId(e.target.value)}
                >
                 <MenuItem value=""><em>Select Role</em></MenuItem>
                 <MenuItem value={1}>COCO</MenuItem>
                 <MenuItem value={2}>TECHSTAFF</MenuItem>
                 {/* <MenuItem value={3}>Faculty</MenuItem> */}
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
              onClick={onRegister}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        {/* </Box> */}
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}
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

