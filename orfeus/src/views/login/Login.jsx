// import login_styles from "./Login.module.css";

// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import Form from "./Form";

// export default class Login extends Component {
//   render() {
//     return (
//       <div className={login_styles.div_login_form}>
//         <form className={login_styles.login_form}>
//           <h3 className={login_styles.login_login}>LOGIN</h3>
//           <div className={login_styles.mb_3_login}>
//             <Form />
//           </div>

//           <p className={login_styles.tail_login}>
//             {" "}
//             <Link to="/signUp" className={login_styles.need_account}>
//               {" "}
//               Need to Create an Account?
//             </Link>
//             {/* Need to Create an Account? */}
//             {/* <Link to="/signUp">
//               <button>Create an Account</button>
//             </Link> */}
//           </p>
//         </form>
//       </div>
//     );
//   }
// }

import { Link } from "react-router-dom";
import {
  Typography,
  Box,
  Paper,
  Grid,
  Link as MuiLink, 
  useTheme
} from "@mui/material";
import Form from "./Form";


const Login = () => {
  const theme = useTheme();
  return (
    <Box sx={{ marginTop: '100px' }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6} lg={4}>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              borderRadius: '10px',
              boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.3)',
              padding: '20px',
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" align="center">
              LOGIN
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Paper sx={{ p: 2, margin: '20px', 
                            backgroundColor: '#0077c2',
                            boxShadow: "1px 15px 20px rgba(0, 0, 0, 0.5)", }}>
                <Form />
              </Paper>
            </Box>
            <Typography align="center">
              Don't have an account?{" "}
              <MuiLink component={Link} to="/signUp" sx={{color:"white"}}>
                Sign Up
              </MuiLink>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>

  );
};
export default Login;

