import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import { VscClose } from "react-icons/vsc";
import Image from "next/image";
import { X } from "lucide-react";
import { CurrentUser } from "@/hooks/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PiTrashSimpleFill, PiTrashThin } from "react-icons/pi"; 
import { BiSolidEditAlt } from "react-icons/bi";

interface AvatarUploadProps {
  value: string;
  onChange: (value?: string) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState<string>(value);
  const [showDropzone, setShowDropzone] = useState<boolean>(true);
const currentUser = CurrentUser();

  const handleUpload = (e:any) => {
    e.preventDefault();  
    setOpen(true);
  };


  const handleRemove = (e:any) => {
    e.preventDefault();  
    onChange(""); 
  };
   

  useEffect(()=>{
    const fileType = value?.split(".").pop();
  if(value && fileType !== "pdf"){
    setOpen(false);
  }
  },[value])

  return (
    <div className="relative">
 <div className=" flex items-center gap-5">
 <Avatar  className=" cursor-pointer  h-[80px] w-[80px]   p-1 shadow-md border-gray-400">
    <AvatarImage
        src={value || currentUser?.image } // Fallback image
        alt="Avatar"  
      />
    <AvatarFallback>
                        <div className=" shadow    bg-blue-300  text-2xl font-semibold  h-full w-full rounded-full flex justify-center items-center">
                          {currentUser?.name[0]}
                        </div> 
                      </AvatarFallback>
    </Avatar>

    <div className=" flex items-center gap-2">
    <Button variant={"outline"} onClick={handleUpload} className=" flex items-center gap-2    "><BiSolidEditAlt />Edit Profile</Button>
    <Button variant={"outline"} onClick={handleRemove} className=" flex items-center gap-2     "><PiTrashSimpleFill  />Remove Profile</Button>
    </div>
 </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className=" w-full">
          <DialogHeader>
            <DialogTitle>Upload Profile Picture</DialogTitle> 
          </DialogHeader>
          <div className="flex flex-col items-center w-full"> 
          <FileUpload endpoint="StudentProfile"   value={value}  onChange={onChange} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AvatarUpload;
