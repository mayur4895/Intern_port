'use client'
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface JobHeaderProps {
  onSearch: (query: string) => void;
}

const JobHeader: React.FC<JobHeaderProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className='bg-white shadow-sm border p-2'>
      <div className='flex items-center gap-2'>
        <Input
          type='text'
          placeholder='Search by title, company or keyword'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </div>
  );
};

export default JobHeader;
