
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY); 



export const SendPasswordResetEmail = async(
  email:string,
  token:string
)=>{
  const  reset_password = `http://localhost:3000/auth/new-password?token=${token}`   
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
    const  ConfirmLink = `http://localhost:3000/auth/new-verification?token=${token}`   
    try {
            const { data, error } = await resend.emails.send({
              from: 'JobHunt <onboarding@resend.dev>',
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


