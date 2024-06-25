import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../userContext";


export default function LoginPage () {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);
    async function login(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type':'application/json'},
        credentials: "include",
        });
        if (response.ok) {
            response.json().then( UserInfo => {
                setUserInfo(UserInfo);
                setRedirect(true);
            })
        } else {
        alert('wrong credentials');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    
    return (
        <div className="login">
            <form onSubmit={login}>
                <h1 className="log-title">Login</h1>
                <input className="input-box" type="text" placeholder="username" value={username} onChange={ev => setUsername(ev.target.value)} />
                <input type="password" className="input-box" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />
                <button type="submit" className="nav-log">login</button>
            </form>
        </div>
    )
}