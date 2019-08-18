import React, {useContext} from 'react';
import Store from '../context';
const Header = () => {
    const store = useContext(Store)
    return(
        <header>
            <div className="headerContainer">
                <h1>Expensify</h1>
                <div className="headerRight">
                    <img alt="ProfilePicture" src={store.auth.profilePicture} />
                    <button onClick={() => store.logout()}>Logout</button>
                </div>
            </div>
        </header>
    )
}

export default Header;