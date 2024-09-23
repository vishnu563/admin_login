import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (name && password) {
            navigate('/dashboard', { state: { username: name } });
        } else {
            alert("Please enter both username and password.");
        }
    }

    return (
        <>
            <header className='loginHead'>
                Login Page
            </header>

            <main>
                <section className='section'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            minLength={6}
                            required
                        />
                        <br />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={8}
                            required
                        />
                        <br />
                        <button className='loginButton' type="submit">Login</button>
                    </form>
                </section>
            </main>
        </>
    );
}

export default Login;
