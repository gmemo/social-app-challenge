import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from '@/types';
import Avatar from '@/components/Avatar';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container">
        <div className="profile">
          <h2>Profile not found</h2>
          <Link href="/" className="back-link">← Back to Feed</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Link href="/" className="back-link">← Back to Feed</Link>
      
      <div className="profile">
        <div className="profile-header">
          <Avatar 
            src={user.avatar} 
            alt={user.displayName}
            size="large"
            className="profile-avatar"
          />
          <div className="profile-info">
            <h1>{user.displayName}</h1>
            <p>@{user.username}</p>
            <p>{user.bio}</p>
            <p>👥 {user.friendIds.length} friends</p>
            <p>📅 Member since {new Date(user.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}