import { useState } from "react";

const Login = ({login}) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const checkLogin = () => {
        if (!name) {
            setError('Bitte geben Sie einen Namen ein.');
            return;
        }

        setError('');
        login(name);
    };

    return (
        <div className="card d-flex align-items-center">
            <div className="card-body">
                <h5 className="card-title">Bitte einloggen</h5>
                <p className="card-text">
                    <input  type="text"
                            placeholder="Ihr Name"
                            className="form-control"
                            onChange={e => setName(e.target.value)}
                            onKeyPress={e => {
                                if (e.charCode === 13) {
                                    checkLogin();
                                }
                            }}
                        />
                </p>
                {error ? <p className="alert alert-danger">{error}</p> : ''}
                <button className="btn btn-primary"
                        onClick={checkLogin}
                        >Einloggen
                </button>
            </div>
        </div>
    );
};

export default Login;