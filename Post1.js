import React from 'react';

const Post = ({ post }) => {
    return (
        <div>
            <h2>{post.user.username}</h2>
            {post.content && <p>{post.content}</p>}
            {post.imageUrl && <img src={post.imageUrl} alt="post" style={{ width: '200px' }} />}
            <button>Like</button>
            <button>Comment</button>
        </div>
    );
};

export default Post;
