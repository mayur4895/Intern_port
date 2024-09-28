import { useState, useEffect } from 'react';

interface DaysAgoProps {
  dateString: string; // e.g., "Aug 24 2024"
}

const DaysAgo: React.FC<DaysAgoProps> = ({ dateString }) => {
  const [daysAgo, setDaysAgo] = useState<number | string>(0);

  function daysago(dateString: string): number {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
    
    // Set the hours, minutes, seconds, and milliseconds to 0 to only compare the date
    givenDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    
    // Calculate the difference in time
    const timeDifference = currentDate.getTime() - givenDate.getTime();
    
    // Convert time difference from milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
    return daysDifference;
  }
  
  useEffect(() => {
    const calculateDaysAgo = () => {
      const daysDifference = daysago(dateString);
      setDaysAgo(daysDifference === 0 ? 'Today' : daysDifference);
    };

    calculateDaysAgo();
  }, [dateString]);

  return (
    <div>
      {daysAgo === 'Today' ? daysAgo : `${daysAgo} days ago`}
    </div>
  );
};

export default DaysAgo;
