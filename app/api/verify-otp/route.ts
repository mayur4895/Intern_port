import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;

const client = twilio(accountSid, authToken);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { phoneNumber, code } = req.body;

    if (typeof code !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid code provided' });
    }

    try {

        if(typeof(serviceSid) !== 'string') return;
      const verificationCheck = await client.verify.services(serviceSid).verificationChecks.create({
        to: phoneNumber,
        code,
      });

      res.status(200).json({ success: verificationCheck.status === 'approved', verificationCheck });
    } catch (error:any) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
