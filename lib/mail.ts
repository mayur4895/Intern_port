
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY); 


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


