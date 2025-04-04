import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `http://localhost:5000/api/auth/${isLogin ? 'login' : 'register'}`;
        const { data } = await axios.post(url, { username, password });
        setToken(data.token);
    };

    return (
        <div>
            <h1>{isLogin ? 'Login' : 'Register'}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Switch to Register' : 'Switch to Login'}</button>
        </div>
    );
};

export default Auth;
