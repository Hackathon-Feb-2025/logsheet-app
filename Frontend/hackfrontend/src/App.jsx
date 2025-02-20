import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import SignIn from './MYComponents/SignIn';
import Home from './MYComponents/Home';
import Header from './MYComponents/Header';
import GetUser from './MYComponents/getuser';
import AddUser from './MYComponents/adduser';
import Addlog from './Screens/Addlog';
import 'bootstrap/dist/css/bootstrap.min.css';
import DateTime from './MYComponents/DateTime';
import Sunbeam from './MYComponents/Sunbeam';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Register from './Screens/Register';
import LogIn from './Screens/LogIn';
import Loglist from './Screens/Loglist';
import EditProfile from './Screens/EditProfile';
import ViewProfile from './Screens/ViewProfile';
import EditLog from './Screens/EditLog';
import UploadCurriculum from './Screens/UploadCurriculum';
import CocoHome from './Screens/CocoHome';





function App() {
  return (
    <div className="App">
      {/* <Header/> */}
      <Routes>
        <Route path='/' element={<Register/>}/> 
        <Route path='/login' element={<LogIn/>}/> 
        <Route path='/addlog' element={<Addlog/>}/>
        <Route path='/loglist' element={<Loglist/>}/>
        <Route path='/edit-profile' element={<EditProfile/>}/>
        <Route path='/view-profile' element={<ViewProfile/>}/>
        <Route path="/editlog/:id" element={<EditLog />} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/getu' element={<GetUser/>}/>
        <Route path='/upcurr' element={<UploadCurriculum/>}/>
        <Route path='/cocohome' element={<CocoHome/>}/>


        {/* <Route path='/signup' element={<AddUser/>}/>
        <Route path='/signin' element={<SignIn/>}/> */}
        {/* <Route path='/nav' element={<Navb/>}/> */}
        <Route path='/Sunbeam' element={<Sunbeam/>}/>
     </Routes>
    <ToastContainer />
    </div>
  );
}

export default App;
