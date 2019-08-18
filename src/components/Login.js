import React, {useContext} from 'react';
import Store from '../context';

const Login = props => {
    const store = useContext(Store);
    return (
        <div className="loginContainer">
            <div className="contentContainer">
                <h1>Expensify</h1>
                <p>It's time to monitor your expenses!</p>
                <button onClick={() => store.login()}>Login with Google</button>
            </div>
        </div>
    )
}

export default Login;