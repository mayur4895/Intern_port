import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;

if (!accountSid || !authToken || !serviceSid) {
  throw new Error("Twilio credentials are not set in the environment variables.");
}

const client = twilio(accountSid, authToken);

export const POST = async (req: Request, res: NextApiResponse) => {
  
  try {
  const body = await req.json();
  const { phoneNumber } = body; 
  console.log(phoneNumber);
  
    if (!phoneNumber || typeof phoneNumber !== 'string' || !/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
      return  NextResponse.json("Invaild Phone provided",{status:400})
    
    }
    if (typeof serviceSid !== 'string') return;
    const verification = await client.verify.v2.services(serviceSid).verifications.create({
      to: phoneNumber,
      channel: 'sms',
    });
     
  return   NextResponse.json(verification,{status:200})
 
  } catch (error: any) {
     console.log(error)
    return  NextResponse.json(error,{status:500})
  }
};
