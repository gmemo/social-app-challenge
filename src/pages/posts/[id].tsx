import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Post, User } from '@/types';

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

  if (loading) return <div>Loading post...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="container">
      <Link href="/">← Back to Feed</Link>
      
      <div className="post-detail">
        <div className="post-header">
          <img src={post.author.avatar} alt={post.author.displayName} />
          <div>
            <h2>{post.author.displayName}</h2>
            <span>@{post.author.username}</span>
            <p>{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="post-content">
          <p>{post.content}</p>
          {post.imageUrl && <img src={post.imageUrl} alt="Post image" />}
        </div>
        
        <div className="post-stats">
          <p>{post.likes.length} likes</p>
        </div>
        
        <div className="comments-section">
          <h3>Comments ({post.comments.length})</h3>
          {post.comments.map(comment => (
            <div key={comment.id} className="comment">
              <p>{comment.content}</p>
              <small>{new Date(comment.createdAt).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}