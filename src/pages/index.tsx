import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post, User } from '@/types';
import Avatar from '@/components/Avatar';

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
    return (
      <div className="container">
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="main-header">
        <h1>Social Feed</h1>
        <Link href="/profile" className="nav-link">
          👤 My Profile
        </Link>
      </header>
      
      <div className="posts-feed">
        {posts.map(post => (
          <article key={post.id} className="post-card">
            <div className="post-header">
              <Avatar 
                src={post.author.avatar} 
                alt={post.author.displayName}
                size="medium"
              />
              <div className="user-info">
                <h3>{post.author.displayName}</h3>
                <span className="username">@{post.author.username}</span>
              </div>
            </div>
            
            <div className="post-content">
              <p>{post.content}</p>
              {post.imageUrl && (
                <img 
                  src={post.imageUrl} 
                  alt="Post content" 
                  className="post-image"
                  onError={(e) => {
                    // Hide broken post images
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
            </div>
            
            <div className="post-actions">
              <div className="post-stats">
                <span className="stat-item">{post.likes.length} likes</span>
                <span className="stat-item">{post.comments.length} comments</span>
              </div>
              <Link href={`/posts/${post.id}`} className="view-details-link">
                View Details →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}