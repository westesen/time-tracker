import { useState } from "react";
import StartTask from "./StartTask";
import Task from "./Task";
import axios from 'axios';
import Search from "./Search";
import TaskForm from "./TaskForm";
import Pagination from "./Pagination";

const Tracker = ({user}) => {
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
        <>
            <br/>
            <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item">
                    <a className={`nav-link ${section === 'tracker' ? 'active' : ''}`} onClick={() => setSection('tracker')}>Tracker</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${section === 'recentTasks' ? 'active' : ''}`} onClick={fetchTasks}>Vergangene Aufgaben</a>
                </li>
            </ul>
            {
                section === 'tracker' ?
                    <div className="row">
                    <br/>
                    <div className="col-12">
                        <StartTask addTask={saveCurrentTask}/>
                    </div>
                    </div>
                    : ''
            }
            {
                section === 'recentTasks' ?
                    <div className="row mt-3">
                        <div className="col-12">
                            <TaskForm addTask={saveCurrentTask}/>
                            <Search search={search}/>
                            {
                                tasks.length ?
                            <Pagination
                                data={tasks}
                                title="Verbuchte Aufgaben"
                                pageLimit={Math.floor(tasks.length / 10) + 1}
                                dataLimit={10}
                            /> : '' 
                            }
                        </div>
                    </div>
                    : ''
            }
        </>
    );
};

export default Tracker;