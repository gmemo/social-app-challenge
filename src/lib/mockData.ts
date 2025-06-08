import { User, Post } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'john_doe',
    email: 'john@example.com',
    displayName: 'John Doe',
    avatar: 'https://via.placeholder.com/150',
    bio: 'Software developer passionate about React and Next.js',
    createdAt: new Date('2023-01-15'),
    friendIds: ['2', '3']
  },
  {
    id: '2', 
    username: 'jane_smith',
    email: 'jane@example.com',
    displayName: 'Jane Smith',
    avatar: 'https://via.placeholder.com/150',
    bio: 'UI/UX Designer & Frontend Developer',
    createdAt: new Date('2023-02-20'),
    friendIds: ['1', '3']
  },
  {
    id: '3',
    username: 'mike_wilson',
    email: 'mike@example.com', 
    displayName: 'Mike Wilson',
    avatar: 'https://via.placeholder.com/150',
    bio: 'Full-stack developer, coffee enthusiast',
    createdAt: new Date('2023-03-10'),
    friendIds: ['1', '2']
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    authorId: '2',
    content: 'Just finished an amazing React project! The new hooks are incredible.',
    createdAt: new Date('2024-06-07T10:30:00'),
    updatedAt: new Date('2024-06-07T10:30:00'),
    likes: ['1', '3'],
    comments: [
      {
        id: '1',
        postId: '1', 
        authorId: '1',
        content: 'Looks awesome! Can you share some details?',
        createdAt: new Date('2024-06-07T11:00:00')
      }
    ]
  },
  {
    id: '2',
    authorId: '3',
    content: 'Beautiful sunset today! Sometimes you need to step away from the code.',
    imageUrl: 'https://via.placeholder.com/400x300',
    createdAt: new Date('2024-06-06T18:45:00'),
    updatedAt: new Date('2024-06-06T18:45:00'),
    likes: ['1', '2'],
    comments: []
  },
];

// Current user (you)
export const currentUser: User = mockUsers[0];