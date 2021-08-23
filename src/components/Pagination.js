import { useState } from "react";
import Task from "./Task";

const Pagination = ({data, title, pageLimit, dataLimit}) => {
    const pages = Math.round(data.length / dataLimit);
    const [currentPage, setCurrentPage] = useState(1);

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    return (
        <div>
    
        {
            data.length ?
            <h1>{title}</h1> : ''
        }

        <div className="dataContainer">
        {getPaginatedData().map(task => (
            <Task key={task._id} task={task} />
        ))}
        </div>

        <nav>
        <ul 
            className={[
                'pagination',
                getPaginationGroup().length < 2 && 'd-none'
            ].filter(Boolean).join(' ')}
        >
        <li
            onClick={goToPreviousPage}
            className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
        >
            <a className="page-link">
                Zurück
            </a>
        </li>

        {getPaginationGroup().map((item, index) => (
            <li
            key={index}
            onClick={changePage}
            className={`page-item ${currentPage === item ? 'active' : null}`}
            >
                <a className="page-link">{item}</a>
            </li>
        ))}

            <li
                onClick={goToNextPage}
                className="page-item"
                disabled={currentPage === pages + 1}
            >
            <a className="page-link">
                Weiter
            </a>
        </li>
        </ul>
        </nav>
    </div>
    );
};

export default Pagination;