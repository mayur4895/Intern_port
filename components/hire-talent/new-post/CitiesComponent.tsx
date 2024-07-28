'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const Skills = [
  { value: 'Pune', label: 'Pune' },
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Nashik', label: 'Nashik' },
 
];

export interface SelectCitiesProps {
  value: string[]; // Array of skill names
  onChange: (value: string[]) => void;
}

const SelectCities: React.FC<SelectCitiesProps> = ({ value, onChange }) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [Cities, setCities] = useState<string[]>(value || []);

  useEffect(() => {
     
    onChange(Cities);
  }, [Cities, onChange]);

  const addSkill = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectedCity && !Cities.includes(selectedCity)) {
      setCities([...Cities, selectedCity]);
      setSelectedCity(null);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setCities(Cities.filter(skill => skill !== skillToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2 text-black">
        {Cities.map(skill => (
          <Badge key={skill} className="pl-5 bg-gray-200 hover:bg-gray-200 text-zinc-900 border py-0 flex justify-between items-center">
            {skill}
            <Button
              className='bg-transparent hover:bg-transparent shadow-none text-zinc-900'
              size="icon"
              type="button"
              onClick={() => removeSkill(skill)}
              aria-label="Remove"
            >
              ✕
            </Button>
          </Badge>
        ))}
      </div>
      <Select
        className="border-1 text-sm ring-0"
        placeholder="Select a skill"
        isClearable
        options={Skills}
        value={selectedCity ? { value: selectedCity, label: selectedCity } : null}
        onChange={(selectedOption) => setSelectedCity(selectedOption ? selectedOption.value : null)}
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
      />
      <Button type="button" onClick={addSkill} className='mt-2' disabled={!selectedCity}>Add</Button>
    </div>
  );
};

export default SelectCities;
