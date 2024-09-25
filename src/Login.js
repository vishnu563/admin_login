import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [signUpUsername, setSignUpUsername] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [signinUsername, setSigninUsername] = useState("");
    const [signinPassword, setSigninPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    function handleSignUpSubmit(e) {
        e.preventDefault();
        if (signUpUsername&& signUpPassword && signUpEmail) {
            
        } else {
            alert("Please fill out all fields for Sign Up.");
        }
    }

    function handleSignInSubmit(e) {
        e.preventDefault();
        if (signinUsername && signinPassword) {
            navigate('/dashboard', { state: { username: signinUsername } });
        } else {
            alert("Please enter both email and password.");
        }
    }

    return (
        <div className={`container ${isSignUp ? "right-panel-active" : ""}`} id="main">
            <main>
                <section className="sign-up">
                    <form onSubmit={handleSignUpSubmit}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            id="signUpUsername"
                            name="signUpUsername"
                            placeholder='User Name'
                            value={signUpUsername}
                            onChange={(e) => setSignUpUsername(e.target.value)}
                            minLength={6}
                            required
                        />
        
                        <input
                            type="email"
                            id="signUpEmail"
                            name="signUpEmail"
                            placeholder='Email'
                            value={signUpEmail}
                            onChange={(e) => setSignUpEmail(e.target.value)}
                            required
                        />
                     
                        <input
                            type="password"
                            id="signUpPassword"
                            name="signUpPassword"
                            placeholder='Password'
                            value={signUpPassword}
                            onChange={(e) => setSignUpPassword(e.target.value)}
                            minLength={8}
                            required
                        />
                        <button id='signup-button' type="submit">Signup</button>
                    </form>
                </section>

                <section className="sign-in">
                    <form onSubmit={handleSignInSubmit}>
                        <h1>Sign In</h1>
                        <input
                            type="text"
                            id="signinUsername"
                            name="signinUsername"
                            placeholder='User Name'
                            value={signinUsername}
                            onChange={(e) => setSigninUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            id="signinpassword"
                            name="signinpassword"
                            placeholder='Password'
                            value={signinPassword}
                            onChange={(e) => setSigninPassword(e.target.value)}
                            minLength={8}
                            required
                        />
                        <button id='signin-button' type="submit">SignIn</button>
                    </form>
                </section>

                <section className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>Log in to access the admin dashboard and manage your employee data efficiently.</p>
                            <button onClick={() => setIsSignUp(false)} id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-right">
                            <h1>Hello!</h1>
                            <p>Join the admin community and start building efficient employee management systems today.</p>
                            <button onClick={() => setIsSignUp(true)} id="signUp">Sign Up</button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Login;
