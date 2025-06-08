import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from '@/types';

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

  if (loading) return <div>Loading profile...</div>;
  if (!user) return <div>Profile not found</div>;

  return (
    <div className="container">
      <Link href="/">← Back to Feed</Link>
      
      <div className="profile">
        <div className="profile-header">
          <img src={user.avatar} alt={user.displayName} className="profile-avatar" />
          <div className="profile-info">
            <h1>{user.displayName}</h1>
            <p>@{user.username}</p>
            <p>{user.bio}</p>
            <p>{user.friendIds.length} friends</p>
            <p>Member since {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}