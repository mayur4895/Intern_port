 
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import {  currentUser } from "../../../lib/auth";
 
const f = createUploadthing();
 

const handleAuth = async () => {
  try {
    const User = await currentUser();
    console.log("Current user:", User);
    if (!User || !User.id) {
      throw new UploadThingError("Unauthorized");
    }

    const userId =  User.id
    if (!userId) {
      throw new UploadThingError("User ID not found");
    }

    return userId;
  } catch (error) {
    console.error("Authentication error:", error);
    throw new UploadThingError("Authentication failed");
  }
};

 
export const ourFileRouter = {
  imageUploader : f({image:{maxFileSize:"4MB",maxFileCount:1}})
  .middleware(()=> handleAuth( ))
  .onUploadComplete(()=>{}),
  messageFile:f(["image"])
  .middleware(( )=> handleAuth( ))
  .onUploadComplete(()=>{})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;