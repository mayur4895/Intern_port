// import { NextApiRequest, NextApiResponse } from 'next';
// import { NextResponse } from 'next/server';
// import twilio from 'twilio';

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const serviceSid = process.env.TWILIO_SERVICE_SID;

// if (!accountSid || !authToken || !serviceSid) {
//   throw new Error("Twilio credentials are not set in the environment variables.");
// }

// const client = twilio(accountSid, authToken);

// export const POST = async (req: Request, res: NextApiResponse) => {
  
//   try {
//   const body = await req.json();
//   const { phoneNumber } = body; 
//   console.log(phoneNumber); 
  
//     if (!phoneNumber || typeof phoneNumber !== 'string' ) {
//       return  NextResponse.json("Invaild PhoneNumber provided",{status:400})
    
//     }
  
     
 
//     const verification = await client.messages
//     .create({
//       body: 'Your OTP is 123456',
//                 from: '+15415161706',
//         to:  phoneNumber
//     })
//     .then(message => console.log(message.sid))
//     console.log(verification);
    
//     return NextResponse.json({ verification,status:200 });
//   } catch (error: any) {
//     console.error(error);
//     return res.status(500).json({ message: error.message });
//   }
// };