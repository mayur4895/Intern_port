
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY); 




export const SendTwoFactorTokenEmail = async(
  email:string,
  token:string
)=>{ 
  try {
          const { data, error } = await resend.emails.send({
            from: 'HireIntern <onboarding@resend.dev>',
            to:email,
            subject: '2FA Code',
            html:`<p> Your 2Fa Code is  ${token} </p>`
          });
      
          if (error) {
            return Response.json({ error }, { status: 500 });
          }
      
          return Response.json(data);
        } catch (error) {
          return Response.json({ error }, { status: 500 });
        }
      }

















export const SendPasswordResetEmail = async(
  email:string,
  token:string
)=>{
  const  reset_password = `https://intern-port.vercel.app/auth/new-password?token=${token}`   
  try {
          const { data, error } = await resend.emails.send({
            from: 'HireIntern <onboarding@resend.dev>',
            to:email,
            subject: 'Reset Password',
            html:`<p> Click  <a href="${reset_password}" > Here</a> To  Reset Password</p>`
          });
      
          if (error) {
            return Response.json({ error }, { status: 500 });
          }
      
          return Response.json(data);
        } catch (error) {
          return Response.json({ error }, { status: 500 });
        }
      }























export const SendVerificationEmail = async(
    email:string,
    token:string
)=>{
    const  ConfirmLink = `${process.env.BASEURL}/auth/new-verification?token=${token}`   
    try {
            const { data, error } = await resend.emails.send({
              from: 'HireIntern <onboarding@resend.dev>',
              to:email,
              subject: 'Confirm Your Email',
              html:`<p> Click  <a href="${ConfirmLink}" > Here</a> To confirm Email</p>`
            });
        
            if (error) {
              return Response.json({ error }, { status: 500 });
            }
        
            return Response.json(data);
          } catch (error) {
            return Response.json({ error }, { status: 500 });
          }
        }


