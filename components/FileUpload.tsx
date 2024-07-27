'use client'

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import Image from "next/image"; 
import { useMemo, useState } from "react";
import { FcFile } from "react-icons/fc";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: "CompanyLogo" | "ResumePdf";
    value: string | undefined;
}

const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {

    const [Name ,setName] = useState('');
    const [Size,setSize] = useState<any>();
    const fileType = value?.split(".").pop();

    if (value && fileType !== "pdf") {
        return (
            <div className="h-25 w-25 relative bg-white">
                <Image
                    width={150}
                    height={150}
                    className="rounded-full h-[100px] w-[100px] object-cover drop-shadow-md"
                    src={value}
                    alt=""
                />
                <button type="button" onClick={() => { onChange("") }} className="absolute top-0 right-0 bg-rose-500 text-white p-1 rounded-full">
                    <X size={14} />
                </button>
            </div>
        );
    }

    if (value && fileType === "pdf") {
        console.log(value);

      
        return (
         
  <div className=" h-25 w-25 relative  flex items-center gap-3 p-2 mt-2 rounded-md border  ">
   <Image src={"/pdf.png"} alt="" height={40} width={40}/>
     
     <div>
     <a  className=" truncate"   href={value}
           target="_blank"
           rel="noopener noreferrer">
  <p className=" truncate   w-10">{Name}</p>
 </a>
 <span className="text-xs text-gray-500">{Math.round(Size/1024)}Kb</span>
     </div>
  
  <button type="button" onClick={()=>{onChange("")}} className=" absolute top-5 right-4  text-gray-600 p-1 rounded-full"> <X size={20}/></button>
             </div>
        );
    }


    const  FormatedSize = (size:any)=>{
        useMemo(()=>{
       return Math.round(size/1024);
        },[size])
   }
    return (
        <>
            <UploadDropzone
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                setName(res?.[0].name);
                setSize(res?.[0].size);
                    onChange(res?.[0].url);
                }}
                onUploadError={(error: Error) => {
                    console.log(`ERROR! ${error.message}`);
                }}
            />
        </>
    );
}

export default FileUpload;
