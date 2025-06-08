import { NextApiRequest, NextApiResponse } from 'next';
import { mockPosts, mockUsers } from '@/lib/mockData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Simulate API delay
    setTimeout(() => {
      // Return posts with author info
      const postsWithAuthors = mockPosts.map(post => ({
        ...post,
        author: mockUsers.find(user => user.id === post.authorId)
      }));
      
      res.status(200).json(postsWithAuthors);
    }, 500);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}