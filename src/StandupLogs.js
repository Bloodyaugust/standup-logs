import { useContext } from 'react';
import './StandupLogs.css';
import UsersContext from './UsersContext';

function StandupLogs() {
  const { usersState, setUserState } = useContext(UsersContext);

  function inputKeyDownHandler(event, user, targetState) {
    if (event.key === 'Enter') {
      if (!event.target.value) {
        return;
      }

      const newUser = {
        ...user,
        done: targetState === 'done' ? [...user.done, event.target.value] : user.done,
        doing: targetState === 'doing' ? [...user.doing, event.target.value] : user.doing
      }

      event.target.value = '';

      setUserState(newUser);
    }
  }

  function newDayClickHandler() {
    usersState.forEach((user) => {
      const newUser = {
        ...user,
        done: user.doing,
        doing: []
      };

      setUserState(newUser);
    });
  }

  console.log(usersState);

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
          {usersState && usersState.map((user) => {
            return (
              <div key={user.name} className="user-container">
                <h2>{user.name}</h2>
                <h3>Done</h3>
                <ul>
                  {user.done.map((item, index) => {
                    return (
                      <li key={index}>{item}</li>
                    )
                  })}
                </ul>
                <input id={`${user.name}-done-input`} type="text" placeholder="What else did you do?" onKeyDown={(event) => { inputKeyDownHandler(event, user, 'done') }} />
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
