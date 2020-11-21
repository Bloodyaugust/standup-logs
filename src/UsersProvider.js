import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UsersContext from './UsersContext';
import firebase from 'firebase/app';

export default function UsersProvider(props) {
  const [state, setState] = useState(props.initialState);

  const setUser = (user) => {
    const database = firebase.database();
    const userRef = database.ref(`users/${user.name}`);
    
    userRef.set(user);
  }

  useEffect(() => {
    const database = firebase.database();
    const usersRef = database.ref('users');

    const listener = usersRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const users = Object.keys(data).map((userKey) => {
        return {
          ...data[userKey],
          doing: data[userKey].doing || [],
          done: data[userKey].done || [],
          name: userKey
        }
      });
    
      console.log(users);
      setState(users);
    });

    return () => listener();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        usersState: state,
        setUserState: setUser
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
