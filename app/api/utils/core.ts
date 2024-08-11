import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'], // Include POST if you're using it
  origin: 'http://localhost:3000', // Replace with your frontend's URL
  optionsSuccessStatus: 200, // For legacy browser support
});

// Helper function to run the middleware
export const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: Function) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

export default cors;
