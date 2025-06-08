import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post, User } from '@/types';

interface PostWithAuthor extends Post {
  author: User;
}

export default function Home() {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div className="container">
      <h1>Social Feed</h1>
      <nav>
        <Link href="/profile">My Profile</Link>
      </nav>
      
      <div className="posts-feed">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <img src={post.author.avatar} alt={post.author.displayName} />
              <div>
                <h3>{post.author.displayName}</h3>
                <span>@{post.author.username}</span>
              </div>
            </div>
            
            <p>{post.content}</p>
            {post.imageUrl && <img src={post.imageUrl} alt="Post image" />}
            
            <div className="post-actions">
              <span>{post.likes.length} likes</span>
              <span>{post.comments.length} comments</span>
              <Link href={`/posts/${post.id}`}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}