import React, { useState } from 'react';
import Auth from './components/Auth';
import PostList from './components/PostList';

function App() {
    const [token, setToken] = useState(null);

    return (
        <div>
            {!token ? (
                <Auth setToken={setToken} />
            ) : (
                <PostList token={token} />
            )}
        </div>
    );
}

export default App;
