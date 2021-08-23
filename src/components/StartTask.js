import { useState, useEffect, useRef } from "react";
import { FaStopwatch, FaPause, FaStop } from 'react-icons/fa';

const StartTask = ({addTask}) => {
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [time, setTime] = useState(0);
    const [started, setStarted] = useState(false);
    const [active, setActive] = useState(false);

    const secondsToHms = totalSeconds => {
        totalSeconds = Number(totalSeconds);
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor(totalSeconds % 3600 / 60);
        let seconds = Math.floor(totalSeconds % 3600 % 60);
        
        if (hours < 10) {
            hours = `0${hours}`;
        }

        if (minutes < 10) {
            minutes = `0${minutes}`;
        }

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${hours}:${minutes}:${seconds}`; 
    }

    const intervalRef = useRef();

    useEffect(() => {
        if (active) {
            intervalRef.current = setInterval(() => {
                setTime(time => time + 1);
            }, 1000);
        }

        return () => {
            clearInterval(intervalRef.current)
        }
    }, [active]);

    const start = () => {
        setStartTime(new Date());
        setStarted(true);
        setActive(true);
    };

    const pause = () => {
        setActive(false);
    };

    const save = () => {
        if (!description) {
            alert('bitte beschreibung hinzufügen');
            return;
        }

        setStarted(false);
        setActive(false);
        setDescription('');
        setStartTime('');
        const endTime = new Date();
        addTask(description, startTime, endTime);
    };

    return (
        <div className="row">
            <br/>
            <div className="col-12">
            <div className="form-group">
                <textarea className="form-control"
                            placeholder="Beschreibung"
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                    ></textarea>
            </div>
            <br/>
            {
                !started ?
                    <button className="btn btn-success" onClick={start}>
                        <FaStopwatch/>
                        &nbsp;
                        Starten
                    </button>
                : ''
            }
            {
                started && !active ?
                    <button className="btn btn-success" onClick={start}>
                        <FaStopwatch/>
                        &nbsp;
                        {secondsToHms(time)}
                    </button>
                : ''
            }
            {
                started && active ?
                <>
                        <button className="btn btn-success" onClick={pause}>
                            <FaPause/>
                            &nbsp;
                            {secondsToHms(time)}
                        </button>
                </>
                : ''
            }
            &nbsp;
            {
                started ?
                <button className="btn btn-primary" onClick={save}>
                        <FaStop/>
                        &nbsp;
                        Stoppen und buchen
                    </button>
                : ''
            }
            </div>
        </div>
    );
};

export default StartTask;