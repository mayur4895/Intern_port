'use client'
 
import { UploadButton } from "@/lib/uploadthing";
 
import "@uploadthing/react/styles.css"
import { File, X } from "lucide-react";
import Image from "next/image";
import { FcFile } from "react-icons/fc";
interface FileUplodProps{
    onChange:(url?:string) =>void;
endpoint: "imageUploader" 
value:string
}



const FileUplod = ({
    onChange,
    value,
    endpoint

}:FileUplodProps) =>{

 
    const fileType = value?.split(".").pop();
    if(value && fileType === "image"){
        return(
            
  <div className=" h-25 w-25 relative">
 
 <Image 
  width={150}
  height={150}
 className="   rounded-full h-[100px] w-[100px]  object-cover  drop-shadow-md "
 src={value}
 alt=""
 />
 <button type="button" onClick={()=>{onChange("")}} className=" absolute top-0 right-0 bg-rose-500 text-white p-1 rounded-full"> <X size={14}/></button>
            </div>
        )
    }
 
    return(<> 
    <UploadButton
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </>)
}

export default FileUplod;