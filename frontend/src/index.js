import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import './index.scss';
import AppRouter from './router/Router.jsx';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';

// define MUI theme
const defaultMaterialTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#0078ff',
    },
    background: {
      default: '#21252b',
      paper: '#282c34',
    },
    text: {
      primary: '#b5b6c4',
    },
  },
  typography: {
    fontSize: 12,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Open Sans',
      'Noto Sans KR',
    ],
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultMaterialTheme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
