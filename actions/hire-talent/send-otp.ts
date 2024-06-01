
'use server'
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import twilio from 'twilio';
import useSWR from 'swr'
import { generatePhoneVerificationOtp } from '@/lib/Tokens';
 
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;

if (!accountSid || !authToken || !serviceSid) {
  throw new Error("Twilio credentials are not set in the environment variables.");
}

const client = twilio(accountSid, authToken);

export const  SendOtp = async (phoneNumber:string) => {
  
  try {
 
  console.log(phoneNumber); 
  
    if (!phoneNumber || typeof phoneNumber !== 'string' ) {
      return  {error: 'Invalid phone number',status:400} 
    }
  
     const otp = await  generatePhoneVerificationOtp(phoneNumber);
 
 if(otp.phone && otp.otp){
  const verification = await client.messages
  .create({
    body: `Your OTP is ${otp.otp}`,
              from: '+15415161706',
      to:  otp.phone
  })

  console.log(verification);
 }
    
  return {success:"Otp Sent",status:200}
  } catch (error: any) {
    console.error(error);
    return  {error:"Something went wrong",status:500};
  }
};