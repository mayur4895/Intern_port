// 'use client'
 
// import { UploadDropzone } from "@/lib/uploadthing";
// import "@uploadthing/react/styles.css"
// import { File, X } from "lucide-react";
// import Image from "next/image";
// import { FcFile } from "react-icons/fc";
// interface FileUploadProps{
//     onChange:(url?:string) =>void;
// endpoint:  'imageUploader'
// value:string
// }



// const FileUpload = ({
//     onChange,
//     value,
//     endpoint

// }:FileUploadProps) =>{

// console.log(value);

//     const fileType = value?.split(".").pop();
//     if(value && fileType !== "pdf"){
//         return(
            
//   <div className=" h-25 w-25 relative">
 
//  <Image 
//   width={150}
//   height={150}
//  className="   rounded-full h-[100px] w-[100px]  object-cover  drop-shadow-md "
//  src={value}
//  alt=""
//  />
//  <button type="button" onClick={()=>{onChange("")}} className=" absolute top-0 right-0 bg-rose-500 text-white p-1 rounded-full"> <X size={14}/></button>
//             </div>
//         )
//     }

 
//     return(<> 
//     <div >  
//  <UploadDropzone
  
//  endpoint={"imageUploader"}
//  onClientUploadComplete={(res) => {
//     onChange(res?.[0].url)
//   }}
//   onUploadError={(error: Error) => {
//     console.log(`ERROR! ${error.message}`);
//   }}
//  />
//  </div>
//     </>)
// }

// export default FileUpload;