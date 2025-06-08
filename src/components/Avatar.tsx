// components/Avatar.tsx
import { useState } from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}
const getAvatarColor = (name: string) => {
  const colors = [
    'bg-gradient-to-br from-purple-400 to-purple-600',
    'bg-gradient-to-br from-blue-400 to-blue-600',
    'bg-gradient-to-br from-green-400 to-green-600',
    'bg-gradient-to-br from-yellow-400 to-yellow-600',
    'bg-gradient-to-br from-red-400 to-red-600',
    'bg-gradient-to-br from-indigo-400 to-indigo-600',
    'bg-gradient-to-br from-pink-400 to-pink-600',
    'bg-gradient-to-br from-teal-400 to-teal-600',
  ];
  
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
};

// Get initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export default function Avatar({ src, alt, size = 'medium', className = '' }: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const shouldShowFallback = !src || imageError;
  const avatarColor = getAvatarColor(alt);
  const initials = getInitials(alt);

  // Size configurations
  const sizeConfig = {
    small: { width: '32px', height: '32px', fontSize: '0.8rem' },
    medium: { width: '56px', height: '56px', fontSize: '1.2rem' },
    large: { width: '120px', height: '120px', fontSize: '2rem' }
  };

  const currentSize = sizeConfig[size];

  if (shouldShowFallback) {
    return (
      <div 
        className={`user-avatar ${className}`}
        style={{
          width: currentSize.width,
          height: currentSize.height,
          fontSize: currentSize.fontSize,
          background: avatarColor.replace('bg-gradient-to-br', 'linear-gradient(135deg'),
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black',
          fontWeight: 'bold',
          border: '4px solid #fff',
          boxShadow: size === 'large' ? '0 8px 25px rgba(0, 0, 0, 0.15)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
          flexShrink: 0
        }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={handleImageError}
      onLoad={handleImageLoad}
      className={`user-avatar ${className}`}
      style={{ 
        width: currentSize.width,
        height: currentSize.height,
        opacity: imageLoaded ? 1 : 0.7,
        transition: 'opacity 0.3s ease'
      }}
    />
  );
}