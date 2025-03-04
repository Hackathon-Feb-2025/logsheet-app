import React, { useState } from "react";
//import logo from "./Images/LoginImage.png";
import { useNavigate } from "react-router-dom";
//import { useDispatch } from "react-redux";
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../Images/SunbeamLogo.png';
import Footer from "./Footer";


// function Copyright(props) {
//     return (
//       <Typography variant="body2" color="text.secondary" align="center" {...props}>
//         {'Copyright © '}
//         <Link color="inherit" href="https://mui.com/">
//           Sunbeam
//         </Link>{' '}
//         {new Date().getFullYear()}
//         {'.'}
//       </Typography>
//     );
//   }
  const defaultTheme = createTheme();

const Login = () => {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  debugger;
  const handleSubmit = () => {
    const loginInfo = { userName: userName, password: password };
    console.log(loginInfo);
    if (userName.length === 0) {
      toast.error('Please enter your email');
    } else if (password.length === 0) {
      toast.error('Please enter your password');
    } else {
      console.log(loginInfo);
      axios.post("http://localhost:5063/login", loginInfo)
        .then((result) => {
          if (result.status === 200) {
            toast.success('Logged in successfully');
            console.log("success");
            // const token = { token: result.data.jwt };
            //dispatch(addUser(token));
            navigate("/loglist");
          } else {
            toast.error('Mismatch error occurred');
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error('An error occurred while logging in');
        });
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
                Sign in
              </Typography>
              {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
                <TextField
                  margin="normal"
                  // required
                  fullWidth
                  //id="email"
                  label="Email Address"
                  name="userName"
                  autoComplete="email"
                  autoFocus
                  value={userName}
                  onChange={e => setuserName(e.target.value)}
                />
                <TextField
                  margin="normal"
                  // required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  //id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setpassword(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
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
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            {/* </Box> */}
            </form>
            {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            <Footer sx={{ mt: 8, mb: 4 }}/>
          </Container>
        </ThemeProvider>
    // <div className="container">
    //   <div className="row">
    //     {/* <div className="col-md-6">
    //       <img src={logo} alt="" className="img-fluid" />
    //     </div> */}
    //     <div className="col-md-6 lead">
    //       <div>
    //         <h1 style={{ color: "rgb(189, 4, 4)" }} className="display-5">LOGIN HERE</h1>
    //         <div className="form-group my-3">
    //           <label htmlFor="exampleInputEmail1">Email address</label>
    //           <input type="email" className="form-control border-none" id="exampleInputEmail1" value={userName} onChange={e => setuserName(e.target.value)} placeholder="Enter Email" style={{ background: "none" }} />
    //         </div>
    //         <div className="form-group my-3">
    //           <label htmlFor="exampleInputPassword1">Password</label>
    //           <input type="password" className="form-control border-none" id="exampleInputPassword1" value={password} onChange={e => setpassword(e.target.value)} placeholder="Enter Password" style={{ background: "none" }} />
    //         </div>
    //         <button className="my-4 btn btn-danger rounded-3" onClick={handleSubmit}>Submit</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
