const Task = ({task}) => {
    const formatDate = date => {
        date = new Date(date);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

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
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-8">
                        <h5 className="card-title">{task.description}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{formatDate(task.start)} - {formatDate(task.end)}</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Task;