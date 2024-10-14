'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import _ from 'lodash';

export interface SelectCitiesSetProps {
  value: string[]; // Array of city names
  onChange: (value: string[]) => void;
}

const indianCities = [
  'Mumbai',
  'Delhi',
  'Bengaluru',
  'Hyderabad',
  'Ahmedabad',
  'Chennai',
  'Kolkata',
  'Surat',
  'Pune',
  'Jaipur',
  'Lucknow',
  'Kanpur',
  'Nagpur',
  'Indore',
  'Thane',
  'Bhopal',
  'Visakhapatnam',
  'Vadodara',
  'Coimbatore',
  'Mysore',
  'Chandigarh',
  'Guwahati',
  'Dehradun',
  'Amritsar',
  'Udaipur',
  'Raipur',
  'Ranchi',
  'Jamshedpur',
  'Kakinada',
  'Aurangabad',
  'Gwalior',
  'Rourkela',

];


const SelectCitiesSet: React.FC<SelectCitiesSetProps> = ({ value, onChange }) => {
  const [selectedCities, setSelectedCities] = useState<{ value: string, label: string } | null>(null);
  const [requiredCities, setRequiredCities] = useState<string[]>(value || []);
  const [CitiesOptions, setCitiesOptions] = useState<{ value: string, label: string }[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    onChange(requiredCities);
  }, [requiredCities, onChange]);

  const fetchCities = async () => {
    
    setCitiesOptions(indianCities.map(city => ({ value: city, label: city })));
  };

  useEffect(() => {
    fetchCities(); 
  }, []);

  const fetchFilteredCities = useCallback(
    _.debounce(async (input) => {
      if (input.trim()) {
        try { 
          const filteredCities = indianCities
            .filter(city => city.toLowerCase().includes(input.toLowerCase()))
            .map(city => ({ value: city, label: city }));

          setCitiesOptions(filteredCities);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      } else {
        fetchCities(); // Reset to all mock cities when input is cleared
      }
    }, 300),
    []
  );

  // Handle input changes for search
  useEffect(() => {
    fetchFilteredCities(inputValue);
  }, [inputValue, fetchFilteredCities]);

  const addCity = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectedCities && !requiredCities.includes(selectedCities.value)) {
      setRequiredCities([...requiredCities, selectedCities.value]);
      setSelectedCities(null);
    }
  };

  const removeCity = (cityToRemove: string) => {
    setRequiredCities(requiredCities.filter(city => city !== cityToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2 text-black">
        {requiredCities.map(city => (
          <Badge key={city} className="pl-5 bg-gray-200 hover:bg-gray-200 text-zinc-900 border py-0 flex justify-between items-center">
            {city}
            <Button
              className='bg-transparent hover:bg-transparent shadow-none text-zinc-900'
              size="icon"
              type="button"
              onClick={() => removeCity(city)}
              aria-label="Remove"
            >
              ✕
            </Button>
          </Badge>
        ))}
      </div>
      <Select
        className="border-1 text-sm ring-0"
        placeholder="Select a city"
        isClearable
        options={CitiesOptions}
        onInputChange={(newValue) => setInputValue(newValue)}
        value={selectedCities}
        onChange={(selectedOption) => setSelectedCities(selectedOption ? selectedOption as { value: string, label: string } : null)}
        formatOptionLabel={(option) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.label}</div>
          </div>
        )}
        classNames={{
          control: () => 'p-0.5',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: '#31363F',
            primary25: '#DDDDDD',
          },
        })}
        onFocus={() => {
          if (!inputValue.trim()) {
            fetchCities(); // Fetch all cities when the input is focused with no search
          }
        }}
      />
      <Button type="button" onClick={addCity} className='mt-2' disabled={!selectedCities}>Add</Button>
    </div>
  );
};

export default SelectCitiesSet;
