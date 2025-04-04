import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';

const PostList = ({ token }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await axios.get('http://localhost:5000/api/posts', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts(data);
        };

        fetchPosts();
    }, [token]);

    return (
        <div>
            {posts.map(game => (
                <Post key={post._id} post={post} />
            ))}
        </div>
    );
};

export default PostList;
