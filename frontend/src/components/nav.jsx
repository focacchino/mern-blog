import { useContext, useEffect, useState } from 'react';
import icon from '../icon.jpg'; // Adjust the path as necessary
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext';

function NavBar() {
    const {setUserInfo, UserInfo} = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: "include",
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        })
    },[]);

    function logout() {
        fetch('http://localhost:4000/logout', {
            credentials: "include",
            method: 'POST',
        })
        setUserInfo(null);
    }

    const username = UserInfo?.username;

    return (
        <>
        <div className="nav-header">
            <div className="nav-title">
                <Link to='/'><img src={icon} alt="icon" id="icon"/></Link>
                <h1 id="heading">
                    :D
                </h1>
                {username && (
                    <>
                    <button className="nav-link">
                    <Link to='/create' className='idk'>create new post</Link>
                    </button>
                    <button className="nav-link">
                    <a onClick={logout}
                    className='idk'>logout</a>
                    </button>
                    </>
                )}
                {!username && (
                    <>
                        <button className="nav-link">
                        <Link to="/login" rel="noreferrer noopener" className='idk'>login</Link>
                        </button>
                        <button className="nav-link">
                        <Link to="/register" rel="noreferrer noopener" className='idk'>register</Link>
                        </button>
                    </>
                )}
            </div>
        </div>
        </>
    )
}

export default NavBar;