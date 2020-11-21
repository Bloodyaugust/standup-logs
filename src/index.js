import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StandupLogs from './StandupLogs';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';
import 'firebase/database';
import UsersProvider from './UsersProvider';

firebase.initializeApp({
  apiKey: "AIzaSyAc30Rkfo_sOxbc0p4_w0PJlLLHyhbiIH4",
  authDomain: "standup-logs.firebaseapp.com",
  databaseURL: "https://standup-logs.firebaseio.com",
  projectId: "standup-logs",
  storageBucket: "standup-logs.appspot.com",
  messagingSenderId: "473039258283",
  appId: "1:473039258283:web:0650ed4afaf0c541adedee",
  measurementId: "G-KQ4K3LE307"
});

ReactDOM.render(
  <React.StrictMode>
    <UsersProvider>
      <StandupLogs />
    </UsersProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
