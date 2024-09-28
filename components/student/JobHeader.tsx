'use client'
import React, { useState, useCallback } from 'react';
import { Input } from '../ui/input';
import { Button } from "@/components/ui/button";
import { CiFilter } from 'react-icons/ci';
import FilterBox from './FilterBox';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose, // Import SheetClose to manually control closing
} from "@/components/ui/sheet";
import { Filters } from '@/app/(mian)/student/dashboard/(routes)/jobs/page';
import { debounce } from 'lodash';
import { IoCloseCircleOutline } from 'react-icons/io5';

interface JobHeaderProps {
  onSearch: (query: string) => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const JobHeader: React.FC<JobHeaderProps> = ({ onSearch, filters, setFilters }) => {
  const [query, setQuery] = useState<string>('');
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to control the sheet's open state

  // Debounced version of onSearch to limit the number of calls
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 300), // Adjust debounce delay as needed
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery); // Call the debounced search function
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    if (newFilters.availability.length === 0 && newFilters.internship_type.length === 0 && !newFilters.location) {
      setIsSheetOpen(false); // Close the sheet when filters are cleared
    }
  };

  const handleClearFilters = () => {
    setFilters({
      availability: [],
      location: '',
      internship_type: [],
    });
    setIsSheetOpen(false); // Close the sheet when filters are cleared
  };

  return (
    <div className='bg-white shadow-sm p-1'>
      <div className='flex items-center w-full md:px-5 lg:gap-5  py-2 gap-2'>
    
        <div>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant={"outline"} className='font-normal text-sm flex items-center gap-2'>
                <CiFilter size={22} /> Filter
              </Button>
            </SheetTrigger>
            <SheetContent className='text-start'>
              <div className='pt-5'>
                <FilterBox filters={filters} onFilterChange={handleFilterChange} closeSheet={()=>{
                  setIsSheetOpen(false);
                }}/> 
               
              </div>
            </SheetContent>
          </Sheet>
        </div>
          <div>
                  <Button variant="outline" className='flex items-center gap-1 font-normal' onClick={handleClearFilters}>
                  <IoCloseCircleOutline size={20} />  Clear  
                  </Button>
                </div>
        <div className='flex items-center gap-2 w-full lg:w-[50%] ml-auto'>
          <Input
            type='text'
            placeholder='Search by profile..'
            value={query}
            onChange={handleSearchChange} // Trigger search on input change
          />
        </div>
      </div>
    </div>
  );
};

export default JobHeader;
