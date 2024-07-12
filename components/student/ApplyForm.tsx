 
import { applyToInternship } from '@/actions/hire-talent/applyToInternship';
import React from 'react';
import { Button } from '../ui/button';
import { User } from '@prisma/client';
 

interface ApplyFormProps {
  postId: string;
  studentId: string;
 
}

const ApplyForm: React.FC<ApplyFormProps> = ({ postId, studentId }) => {
  console.log(studentId);
  
  const handleApply = async () => {
    const response = await applyToInternship(postId, studentId);
    if (response.error) {
      alert(response.error);
    } else {
      alert('Application submitted successfully');  
    }
  };

  return (
    <div>
      <Button onClick={handleApply}>Apply Now</Button>
    </div>
  );
};

export default ApplyForm;
