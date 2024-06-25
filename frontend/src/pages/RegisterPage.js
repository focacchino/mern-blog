import { useState } from "react";

export default function RegisterPage () {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
        
      async function register(ev) {
          ev.preventDefault();
          const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
          });
          if (response.status === 200) {
            alert('registration successful');
          } else {
            alert('registration failed');
          }
        }

    return (

        <div className="login">
            <form onSubmit={register}>
                <h1 className="log-title">Register</h1>
                <input className="input-box" type="text" placeholder="username" value={username} onChange={ev => setUsername(ev.target.value)} />
                <input type="password" className="input-box" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />
                <button className="nav-log">register</button>
            </form>
        </div>
    )
}