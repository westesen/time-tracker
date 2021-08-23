import { useState } from "react";

const Search = ({search}) => {
    const [term, setTerm] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        search(term);
    };

    const onClick = () => {
        search(term);
    };

    return (
        <>
        <h1>Suchen</h1>
        <form className="row row-cols-lg-auto align-items-center" onSubmit={onSubmit}>
            <div className="col-12">
                <div className="input-group">
                    <input type="text"
                            placeholder="Nach Beschreibung filtern.."
                            className="form-control"
                            onChange={e => setTerm(e.target.value)}
                        />
                </div>
            </div>
            <div className="col-12">
                <button className="btn btn-primary" onClick={onClick}>
                    Filtern
                </button>
            </div>
        </form>
        </>
    );
};

export default Search;