 
import { currentUser } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
const handleAuth = async()=>{
    const user = await currentUser();
    console.log(user); 
    
    if(!user) throw new Error("Unauthorized");
    return user;
 }
 
export const ourFileRouter = {  
  imageUploader: f({ image: { maxFileSize: "1MB" } }) 
  .middleware(()=> handleAuth())
  .onUploadComplete(()=>{})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;