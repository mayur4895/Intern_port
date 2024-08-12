'use client';

import React, { useState } from 'react';
import FilterBox from '@/components/student/FilterBox';
import JobHeader from '@/components/student/JobHeader';
import JobSection from '@/components/student/JobsSection';

interface Filters {
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

  return (
    <div className='md:grid grid-cols-3 h-[800px] p-5 gap-5 w-full'>
      <FilterBox onFilterChange={setFilters} />
      <div className='col-span-2 h-full flex flex-col gap-5'>
        <JobHeader onSearch={setSearchQuery} />
        <JobSection filters={filters} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default JobsPage;
