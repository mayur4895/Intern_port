 
import { applyToInternship } from '@/actions/hire-talent/applyToInternship';
import React from 'react';
import { Button } from '../ui/button';
import { User } from '@prisma/client';
import { ModalData, useModal } from '@/hooks/use-modal-store';
 

interface ApplyFormProps {
  postId: string;
  studentId: string;
 
}

const ApplyForm: React.FC<ApplyFormProps> = ({ postId, studentId }) => {
 const {onOpen,isOpen,type,data} = useModal();
 

 
  const handleApply =   () => {
    
 
     onOpen('applyPost',{postId, studentId})
 
};

  return (
    <div>
      <Button onClick={handleApply}>Apply Now</Button>
    </div>
  );
};

export default ApplyForm;
