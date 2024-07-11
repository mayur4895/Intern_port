import { useState, useEffect } from 'react';

interface DaysAgoProps {
  dateString: string;
}

const DaysAgo: React.FC<DaysAgoProps> = ({ dateString }) => {

    
  const [daysAgo, setDaysAgo] = useState<number>(0);
  function daysago(dateString: string): number {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
  
    // Calculate the difference in time
    const timeDifference = currentDate.getTime() - givenDate.getTime();
  
    // Convert time difference from milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysDifference;
  }
  
  useEffect(() => {
    const calculateDaysAgo = () => {
      const daysDifference = daysago(dateString);
      setDaysAgo(daysDifference);
    };

    calculateDaysAgo();
  }, [dateString]);

  return (
    <div>
      {daysAgo} days ago
    </div>
  );
};

export default DaysAgo;
