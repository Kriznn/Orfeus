import Home from './views/home/Home';
import SignUp from './views/signUp/SignUp';
import Login from './views/login/Login';
import Library from './views/publicLibrary/PublicLibrary';
import Generate from './views/generateMusic/GenerateMusic';
import MusicFile from './views/musicFile/MusicFile';
import Account from './views/accountProfile/Account';
import Security from './views/security/security';
import UserAccount from './views/Account/userAccount';
import MusicList from './views/musicList/musicList';
import PrivacyAccount from './views/Privacy/userPrivacy';
import UserList from './views/userList/userList';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './views/about/About';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './app.css';
import Root from './views/root/Root';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
      // main: '#FF0000',
    },
    secondary: {
      main: '#6c757d',
    },
  },
  // palette: {
  //   primary: {
  //     light: '#757ce8',
  //     main: '#3f50b5',
  //     dark: '#002884',
  //     contrastText: '#fff',
  //   },
  //   secondary: {
  //     light: '#ff7961',
  //     main: '#f44336',
  //     dark: '#ba000d',
  //     contrastText: '#000',
  //   },
  // },
});

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ThemeProvider theme={theme}>
          <Root />
        </ThemeProvider>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'signup',
          element: <SignUp />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'library',
          element: <Library />,
        },
        {
          path: 'generate',
          element: <Generate />,
        },
        {
          path: 'review',
          element: <MusicFile />,
        },
        {
          path: 'account',
          element: <Account />,
          children: [
            {
              index: true,
              element: <UserAccount />,
            },
            {
              path: 'musicList',
              element: <MusicList />,
            },
            {
              path: 'security',
              element: <Security />,
            },
            {
              path: 'userPrivacy',
              element: <PrivacyAccount />,
            },
            {
              path: 'userList',
              element: <UserList />,
            },
          ],
        },
        {
          path: 'about',
          element: <About />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
function ThemedApp() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}

export default ThemedApp;
