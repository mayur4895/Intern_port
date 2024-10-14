'use client'
import JobHeader from '@/components/student/JobHeader';
import JobSection from '@/components/student/JobsSection';
import React, { useState } from 'react';
 
export interface Filters {
  availability: string[];
  location: string;
  internship_type: string[];  
}

const JobsPage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    availability: [],
    location: '',
    internship_type: [],
  });

  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <JobHeader onSearch={handleSearch} filters={filters} setFilters={setFilters} />
      <JobSection filters={filters} searchQuery={searchQuery} />
    </div>
  );
};

export default JobsPage;




 