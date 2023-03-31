import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  useTheme
} from "@mui/material";
import jwt_decode from "jwt-decode";


const styles = ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "white",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  activeLink: {
    textDecoration: "underline",
  },
  logo: {
    src: "assets/orfeus_logo.png"
  }
});

const Root = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken != null) {
      setLoggedIn(true);
      const decoded = jwt_decode(accessToken);
      setDecodedToken(decoded);
    } else {
      setLoggedIn(false);
      setDecodedToken(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setLoggedIn(false);
    setDecodedToken(null);
    setAnchorEl(null);
    navigate("/");
  };

  return (
    <div className={styles.root}>
      <AppBar position="fixed">
        <Toolbar>
          {/* <Link to="/">

            <img
              src={styles.logo.src}
              height="50"
              width="50"
              marginRight="0.75rem"
            />
          </Link> */}
          <Button
            component={RouterLink}
            to={"/library"}
            color="inherit"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            LIBRARY
          </Button>
          <Button
            component={RouterLink}
            to={"/about"}
            color="inherit"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            ABOUT
          </Button>
          {loggedIn ? (
            <>
              <Button
                component={RouterLink}
                to={"/generate"}
                color="inherit"
                className={styles.link}
                activeClassName={StyleSheetList.activeLink}
              >
                GENERATE MUSIC
              </Button>
              <Button
                component={RouterLink}
                to={"/account"}
                color="inherit"
                className={styles.link}
                activeClassName={styles.activeLink}
              >
                PROFILE
              </Button>
              <div style={{ display: "flex", flexGrow: 1 }}>
                <div style={{ marginLeft: "auto" }}>
                  <IconButton
                    color="inherit"
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                  >
                    {decodedToken && (
                      <>
                        <Typography variant="body1">{decodedToken.sub}</Typography>
                        <Avatar
                          alt={decodedToken.sub}
                          src="/assets/person.jpeg"
                          className={styles.avatar}
                          style={{ marginLeft: "0.5rem" }}
                        />
                      </>
                    )}
                    {!decodedToken && <Avatar className={styles.avatar} />}
                  </IconButton>
                </div>
              </div>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem
                  component={RouterLink}
                  to={"/account"}
                  onClick={() => setAnchorEl(null)}
                >
                  <ListItemIcon>
                    <Avatar
                      alt={decodedToken?.sub}
                      src="/assets/person.jpeg"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={decodedToken?.sub}
                    secondary="My account"
                  />
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                component={RouterLink}
                to={"/login"}
                color="inherit"
                className={styles.link}
                activeClassName={styles.activeLink}
                theme={theme}
              >
                LOGIN
              </Button>
              <Button
                component={RouterLink}
                to={"/signUp"}
                color="inherit"
                className={styles.link}
                activeClassName={styles.activeLink}
              >
                SIGN UP
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;