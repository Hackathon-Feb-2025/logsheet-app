import { Container, Row, Col, Card,Dropdown, DropdownButton  } from "react-bootstrap";
import Header from '../MYComponents/Header';
import Footer from '../MYComponents/Footer';
import React, { useState, useEffect } from 'react';
import UploadCurriculum from '../Screens/UploadCurriculum';
import { Link } from "react-router-dom";




export default function CocoHome() {
        const [username, setUsername] = useState('');
        const token = sessionStorage.getItem('token');


        useEffect(() => {
           
                const storedUsername = sessionStorage.getItem('name');
                if (storedUsername) {
                    setUsername(storedUsername);
                }
            
        }, [token]);
    
  return (
    <div>
      <Header username={username} />
      <Container className="mt-4  d-flex flex-column align-items-center">
        {/* <h4 className="text-center mb-4">Dashboard</h4> */}
        <Row clas
        sName="g-4 w-100 justify-content-center">
        <Col xs={12} sm={6} md={8} className="mb-5">
            <Card className="text-center text-white" style={{ backgroundColor: "#4d8596" }}>
            <Card.Body>
            <Card.Title>
                <Link to="/upcurr" className="text-decoration-none text-white">Upload Curriculum</Link>
            </Card.Title>
            {/* <Card.Text>totalLogs</Card.Text> */}
            </Card.Body>
            </Card>
        </Col>
        <Col xs={12} sm={6} md={8} className="mb-5">
            <Card className="text-center text-dark" style={{ backgroundColor: "#12ca99" }}>
            <Card.Body>
            <Card.Title>
                <Link to="/upsch" className="text-decoration-none text-white">Upload Schedule</Link>
            </Card.Title>
            {/* <Card.Text>totalLogs</Card.Text> */}
            </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={8}>
                        <Dropdown>
                            <Dropdown.Toggle
                                style={{
                                    backgroundColor: "#ff5720",
                                    border: "none",
                                    color: "white",
                                    width: "100%", // Full width
                                    padding: "10px",
                                    fontWeight: "bold",
                                    textAlign: "center"
                                }}
                            >
                                View Report
                            </Dropdown.Toggle>

                            <Dropdown.Menu
                                style={{
                                    backgroundColor: "#ff5720",
                                    border: "none",
                                    width: "100%", // Full width
                                    textAlign: "center"
                                }}
                            >
                                <Dropdown.Item
                                    as={Link}
                                    to="/module-progress"
                                    style={{ color: "white", textAlign: "center" }}
                                >
                                    Module Progress Report (Lectures)
                                </Dropdown.Item>
                                <Dropdown.Item
                                    as={Link}
                                    to="/comparative-report"
                                    style={{ color: "white", textAlign: "center" }}
                                >
                                    Comparative Report (Scheduled vs Actual Hours)
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
          
        </Row>
      </Container>
      <Footer className="mt-5 mb-4" />
    </div>
  );
}

//   return (
//     <div>
//     <Header username={username} />
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//         <Typography variant="h4" gutterBottom align="center">
//             Dashboard
//         </Typography>
//         <Grid container spacing={2}>
//             <Grid item xs={12} sm={6} md={6}>
//                 <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#4d8596'  }}>
//                     <Typography variant="h5" align="center">Total Logs Submitted</Typography>
//                     <Typography variant="h6" align="center">{logStats.totalLogs}</Typography>
//                 </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6} md={6}>
//                 <Paper elevation={3} sx={{ padding: 2,backgroundColor: '#ffccbc' }}>
//                     <Typography variant="h5" align="center">Total Verified Logs</Typography>
//                     <Typography variant="h6" align="center">{logStats.verifiedLogs}</Typography>
//                 </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6} md={6}>
//                 <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#ff5720'  }}>
//                     <Typography variant="h5" align="center">Total Pending Logs</Typography>
//                     <Typography variant="h6" align="center">{logStats.pendingLogs}</Typography>
//                 </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6} md={6}>
//                 <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#fff79b'  }}>
//                     <Typography variant="h5" align="center">Total Approved Logs</Typography>
//                     <Typography variant="h6" align="center">{logStats.approvedLogs}</Typography>
//                 </Paper>
//             </Grid>
//         </Grid>
//     </Container>
//     <Footer sx={{ mt: 10, mb: 4 }} />
// </div>
//   )

