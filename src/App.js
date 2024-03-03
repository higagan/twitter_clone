import React, { useState } from 'react';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState('');

  const handlePost = () => {
    setPosts([...posts, { id: Date.now(), content: post, likes: 0, dislikes: 0 }]);
    setPost('');
  };

  const handleLike = (id) => {
    setPosts(posts.map((post) => {
      if (post.id === id) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  const handleDislike = (id) => {
    setPosts(posts.map((post) => {
      if (post.id === id) {
        return { ...post, dislikes: post.dislikes + 1 };
      }
      return post;
    }))};

    const extractHostname = (url) => {
      let hostname;
      if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
      } else {
        hostname = url.split('/')[0];
      }
      hostname = hostname.split(':')[0];
      hostname = hostname.split('?')[0];
      return hostname;
    };

    return (
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Twitter Clone</h1>
        <div className="mt-4">
          <textarea
            value={post}
            onChange={(event) => setPost(event.target.value)}
            className="border border-gray-400 rounded p-2 w-full"
            placeholder="What's happening?"
          />
          <button onClick={handlePost} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 block mx-auto">
            Post
          </button>
        </div>
        <div className="mt-4">
          {posts.map((post) => (
            <div key={post.id} className="border border-gray-400 rounded p-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg">{post.content}</p>
                  {post.content.includes("http") && (
                    <img src={`https://api.urlmeta.org/?url=${post.content}`} alt={extractHostname(post.content)} className="mt-2 w-full h-auto" />
                  )}
                  <p className="text-gray-600">{post.likes} likes - {post.dislikes} dislikes</p>
                </div>
                <div className="flex space-x-4">
                  <button onClick={() => handleLike(post.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Like
                  </button>
                  <button onClick={() => handleDislike(post.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Dislike
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default App;