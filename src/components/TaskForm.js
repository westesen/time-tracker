import { useState } from "react";

const TaskForm = ({addTask}) => {
    const [description, setDescription] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        setDescription('');
        setStart('');
        setEnd('');
        addTask(description, start, end);
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Aufgabe hinzufügen</h1>
            <div className="form-group">
                <textarea className="form-control" placeholder="Beschreibung"
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                ></textarea>
            </div>
            <div className="form-group">
                <input type="datetime-local"
                    className="form-control"
                    onChange={e => setStart(e.target.value)}
                    value={start}
                    />
            </div>
            <div className="form-group">
                <input type="datetime-local"
                        className="form-control"
                        onChange={e => setEnd(e.target.value)}
                        value={end}
                        />
            </div>
            <button className="btn btn-primary">Eintragen</button>
        </form>
    );
};

export default TaskForm;