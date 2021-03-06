import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UsersContext from './UsersContext';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import dayjs from 'dayjs';
import { save } from 'save-file';

const firebaseAuthUIConfig = {
  callbacks: {
    signInSuccessWithAuthResult: () => false
  },
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
}

export default function UsersProvider(props) {
  const [history, setHistory] = useState([]);
  const [localUser, setLocalUser] = useState(null);
  const [logCurrent, setLogCurrent] = useState(true);
  const [state, setState] = useState(props.initialState);

  const createHistory = () => {
    const database = firebase.database();
    const historyRef = database.ref(`history/${dayjs().startOf('day').valueOf()}`);

    historyRef.set(state);
  };

  const setUser = (user) => {
    const database = firebase.database();
    const userRef = database.ref(`users/${user.name}`);
    
    userRef.set(user);
  };

  useEffect(() => {
    const database = firebase.database();
    const historyRef = database.ref('history');
    const usersRef = database.ref('users');

    const authListener = firebase.auth().onAuthStateChanged((user) => {
      setLocalUser(user);
    });

    const historyListener = historyRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const newLogCurrent = data ? !dayjs(data[Object.keys(data)[0]]).isBefore(dayjs().startOf('day')) : false;

      if (data) {
        setHistory(data);
      }
    
      setLogCurrent(newLogCurrent);
    });

    const usersListener = usersRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const users = Object.keys(data).map((userKey) => {
        return {
          ...data[userKey],
          doing: data[userKey].doing || [],
          done: data[userKey].done || [],
          name: data[userKey].name || userKey
        }
      });
    
      setState(users);
    });

    return () => {
      authListener();
      historyListener();
      usersListener();
    };
  }, []);

  if (!localUser) {
    return (
      <section>
        <StyledFirebaseAuth uiConfig={firebaseAuthUIConfig} firebaseAuth={firebase.auth()}/>
      </section>
    )
  }

  return (
    <UsersContext.Provider
      value={{
        createHistory,
        exportHistory: async () => {
          await save(JSON.stringify(history), 'standup-logs.json');
        },
        localUser,
        logCurrent,
        setUserState: setUser,
        usersState: state
      }}
    >
      { props.children }
    </UsersContext.Provider>
  );
}

UsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialState: PropTypes.array,
};

UsersProvider.defaultProps = {
  initialState: [],
};
