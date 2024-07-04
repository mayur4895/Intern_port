// components/ApplyForm.tsx
import { applyToInternship } from '@/actions/hire-talent/applyToInternship';
import React from 'react';
 

interface ApplyFormProps {
  postId: string;
  studentId: string;
}

const ApplyForm: React.FC<ApplyFormProps> = ({ postId, studentId }) => {
  const handleApply = async () => {
    const response = await applyToInternship(postId, studentId);
    if (response.error) {
      alert(response.error);
    } else {
      alert('Application submitted successfully');
      // Optionally, you can redirect or update state to reflect the application status
    }
  };

  return (
    <div>
      <button onClick={handleApply}>Apply Now</button>
    </div>
  );
};

export default ApplyForm;
