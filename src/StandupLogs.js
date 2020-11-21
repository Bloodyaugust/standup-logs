import { useState } from 'react';
import './StandupLogs.css';

function StandupLogs() {
  const [users, setUsers] = useState([
    {
      name: 'Greyson',
      key: 0,
      done: ['stuff'],
      doing: ['more stuff']
    },
    {
      name: 'Juanca',
      key: 1,
      done: ['stuff'],
      doing: ['more stuff']
    },
    {
      name: 'Anne',
      key: 2,
      done: ['stuff'],
      doing: ['more stuff']
    },
    {
      name: 'Andre',
      key: 3,
      done: ['stuff'],
      doing: ['more stuff']
    },
    {
      name: 'Azur',
      key: 4,
      done: ['stuff'],
      doing: ['more stuff']
    },
    {
      name: 'Ben',
      key: 5,
      done: ['stuff'],
      doing: ['more stuff']
    },
  ]);

  function inputKeyDownHandler(event, user, targetState) {
    if (event.key === 'Enter') {
      if (!event.target.value) {
        return;
      }

      const newUsers = users.map((mappingUser) => {
        if (user.key === mappingUser.key) {
          return {
            ...mappingUser,
            done: targetState === 'done' ? [...mappingUser.done, event.target.value] : mappingUser.done,
            doing: targetState === 'doing' ? [...mappingUser.doing, event.target.value] : mappingUser.doing
          };
        }

        return mappingUser;
      });

      event.target.value = '';

      setUsers(newUsers);
    }
  }

  function newDayClickHandler() {
    const newUsers = users.map((user) => {
      return {
        ...user,
        done: user.doing,
        doing: []
      }
    });

    setUsers(newUsers);
  }

  return (
    <div className="standup-logs">
      <header>
        <h1>Welcome to StandupLogs!</h1>
        <h1>Today is: {new Date().toDateString()}</h1>
      </header>
      <section>
        <div className="action-button-container">
          <button onClick={newDayClickHandler}>New Day</button>
        </div>
        <div className="users">
          {users.map((user) => {
            return (
              <div key={user.key} className="user-container">
                <h2>{user.name}</h2>
                <hr />
                <h3>Done</h3>
                <ul>
                  {user.done.map((item, index) => {
                    return (
                      <li key={index}>{item}</li>
                    )
                  })}
                </ul>
                <input id={`${user.name}-done-input`} type="text" placeholder="What else did you do?" onKeyDown={(event) => { inputKeyDownHandler(event, user, 'done') }} />
                <hr />
                <h3>Doing</h3>
                <ul>
                  {user.doing.map((item, index) => {
                    return (
                      <li key={index}>{item}</li>
                    )
                  })}
                </ul>
                <input id={`${user.name}-doing-input`} type="text" placeholder="What else are you doing?" onKeyDown={(event) => { inputKeyDownHandler(event, user, 'doing') }} />
              </div>
            )
          })}
        </div>
      </section>
    </div>
  );
}

export default StandupLogs;
