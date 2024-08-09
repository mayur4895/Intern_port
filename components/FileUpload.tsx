'use client'

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import Image from "next/image"; 
import { useState } from "react";

interface FileUploadProps { 
    onChange: (url?: string) => void;
    endpoint: "CompanyLogo" | "ResumePdf" | "StudentProfile";
    value: string | undefined;
    disabled?: boolean;
}

const FileUpload = ({
    disabled = false,
    onChange, 
    value,
    endpoint
}: FileUploadProps) => {
 
    const [Name, setName] = useState<string>('');
    const [Size, setSize] = useState<number | undefined>(undefined);
    const fileType = value?.split(".").pop();

    if (value) {
        if (fileType === "pdf") { 
            return (
                <div className={`h-25 w-25 relative flex items-center gap-3 p-2 mt-2 rounded-md border ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <Image src={"/pdf.png"} alt="PDF Icon" height={40} width={40} />
                    <div>
                        <a 
                            className="truncate"
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ pointerEvents: disabled ? 'none' : 'auto' }}
                        >
                            <p className="truncate w-40">{Name || "Untitled PDF"}</p>
                        </a>
                        <span className="text-xs text-gray-500">
                            {Size !== undefined ? `${Math.round(Size / 1024)}Kb` : "Size unknown"}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={() => { if (!disabled) onChange(""); }}
                        className={`absolute top-5 right-4 text-gray-600 p-1 rounded-full ${disabled ? 'cursor-not-allowed' : ''}`}
                        disabled={disabled}
                    >
                        <X size={20} />
                    </button>
                </div>
            );
        } else if (fileType !== "pdf") {
            return (
                <div className="h-25 w-25 relative bg-white">
                    <Image
                        width={150}
                        height={150}
                        className="rounded-full h-[100px] w-[100px] object-cover drop-shadow-md"
                        src={value}
                        alt="Uploaded File"
                    />
                    <button 
                        type="button" 
                        onClick={() => { if (!disabled) onChange(""); }} 
                        className="absolute top-0 right-0 bg-rose-500 text-white p-1 rounded-full"
                        disabled={disabled}
                    >
                        <X size={14} />
                    </button>
                </div>
            );
        }
    }

    return (
        <div className={`relative ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {disabled ? (
                <div className="flex items-center justify-center p-4 border rounded-md bg-gray-100 text-gray-500">
                    Upload disabled
                </div>
            ) : (
                <UploadDropzone
                    endpoint={endpoint}
                    onClientUploadComplete={(res) => {
                        if (res?.[0]) {
                            setName(res[0].name);
                            setSize(res[0].size);
                            onChange(res[0].url);
                        }
                    }}
                    onUploadError={(error: Error) => {
                        console.log(`ERROR! ${error.message}`);
                    }}
                />
            )}
        </div>
    );
}

export default FileUpload;
