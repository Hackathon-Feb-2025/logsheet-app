import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


function Footer(props) {
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

export default Footer;

 // <footer className="text-white d-flex " style={{ 'background-color': '#e3f2fd' }}>
    //     <div className="container py-3 py-lg-4">
    //         <div className="d-flex justify-content-between align-items-center justify-content-md-center pt-3" style={{ 'color': 'black' }}>
    //             <p className="mb-0">Copyright © 2023 Sunbeam Institute of Technology</p>
    //         </div>
    //     </div>
    // </footer >