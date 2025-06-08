import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Post, User } from '@/types';
import Avatar from '@/components/Avatar';

interface PostWithAuthor extends Post {
  author: User;
}

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<PostWithAuthor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPost(id as string);
    }
  }, [id]);

  const fetchPost = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}`);
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container">
        <div className="post-detail">
          <h2>Post not found</h2>
          <Link href="/" className="back-link">← Back to Feed</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Link href="/" className="back-link">← Back to Feed</Link>
      
      <article className="post-detail">
        <div className="post-header">
          <Avatar 
            src={post.author.avatar} 
            alt={post.author.displayName}
            size="medium"
          />
          <div className="user-info">
            <h2>{post.author.displayName}</h2>
            <span className="username">@{post.author.username}</span>
            <p>{new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
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
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
        </div>
        
        <div className="post-stats">
          <p>❤️ {post.likes.length} likes</p>
        </div>
        
        <div className="comments-section">
          <h3>💬 Comments ({post.comments.length})</h3>
          {post.comments.length === 0 ? (
            <p style={{ color: '#718096', fontStyle: 'italic', margin: '20px 0' }}>
              No comments yet. Be the first to comment!
            </p>
          ) : (
            post.comments.map(comment => (
              <div key={comment.id} className="comment">
                <p>{comment.content}</p>
                <small>{new Date(comment.createdAt).toLocaleDateString()}</small>
              </div>
            ))
          )}
        </div>
      </article>
    </div>
  );
}