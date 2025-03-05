import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Import profile icon from react-icons


function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session storage and redirect to login page
    sessionStorage.clear();
    navigate('/login');
  };
  const userName = sessionStorage.getItem('name');


  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/Sunbeam">Sunbeam</Navbar.Brand>
        <Navbar.Brand href="/home">Dashboard</Navbar.Brand>
        <Navbar.Brand href="/loglist">Logs</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="TimeSheet"
              menuVariant="dark"
            >
              <NavDropdown.Item href="/addlog">AddLogs</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Verify Logs
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Approve Logs</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            </Nav>
            <Nav className="ms-auto">
             {/* {userName && ( */}
             <Nav.Item>
              <Nav.Link href="/view-profile" style={{ marginLeft: 'auto' }}>
                {userName}
              </Nav.Link>
            </Nav.Item>
              <NavDropdown  style={{ marginRight: '30px' }}
                id="nav-dropdown-user"
                title={<FaUserCircle size={30} style={{ color: 'white',  marginRight: '10px' }} />}
                menuVariant="dark"
              >
                <NavDropdown.Item href="/edit-profile">Edit Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            {/* )} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;