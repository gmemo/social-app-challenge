import { NextApiRequest, NextApiResponse } from 'next';
import { currentUser } from '@/lib/mockData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    setTimeout(() => {
      res.status(200).json(currentUser);
    }, 300);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}