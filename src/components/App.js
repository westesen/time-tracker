import { useState, useEffect } from "react";
import axios from 'axios';
import Login from "./Login"
import Tracker from "./Tracker";

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!user._id) {
      const localUser = JSON.parse(localStorage.getItem('user'));
      if (localUser && localUser._id) {
        setUser(localUser);
      }
    }
  }, [user]);

  const login = name => {
    axios.post('http://localhost:4000/api/users/', {name})
      .then(response => {
        const userData = response.data;
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      });
  };

  const [section, setSection] = useState('tracker');
    const [tasks, setTasks] = useState([]);

    const saveCurrentTask = (description, start, end) => {
        const userId = user._id;
        const task = {
            userId,
            description,
            start,
            end
        };
        axios.post(
            'http://localhost:4000/api/tasks/create/',
            task
        ).then(response => {
            fetchTasks();
        });
    };

    const fetchTasks = () => {
        setSection('recentTasks');

        axios.get('http://localhost:4000/api/tasks/' + user._id)
            .then(response => {
                setTasks(response.data);
            });
    };

    const search = term => {
        if (!term) {
            fetchTasks();
            return;
        }

        axios.get('http://localhost:4000/api/tasks/?term=' + term)
            .then(response => {
                setTasks(response.data);
            });
    };

  return (
    <div className="container-fluid">
      {
        user._id ?
        <Tracker user={user}/> :
        <Login login={login}/>
      }
    </div>
  );
}

export default App;
