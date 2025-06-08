export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
  friendIds: string[];
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  likes: string[]; // user IDs who liked
  comments: Comment[];
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: Date;
}

export interface Friendship {
  id: string;
  userId1: string;
  userId2: string;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: Date;
}