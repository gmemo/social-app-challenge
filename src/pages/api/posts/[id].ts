import { NextApiRequest, NextApiResponse } from 'next';
import { mockPosts, mockUsers } from '@/lib/mockData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    const post = mockPosts.find(p => p.id === id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const author = mockUsers.find(user => user.id === post.authorId);
    
    setTimeout(() => {
      res.status(200).json({ ...post, author });
    }, 300);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}