'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

export interface SelectCitiesProps {
  value: string[]; // Array of skill names
  onChange: (value: string[]) => void;
}

const SelectCities: React.FC<SelectCitiesProps> = ({ value, onChange }) => {
  const [selectedCity, setSelectedCity] = useState<{ value: string, label: string } | null>(null);
  const [requiredCities, setRequiredCities] = useState<string[]>(value || []);
  const [citiesOptions, setcitiesOptions] = useState<{ value: string, label: string }[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Sync state with form state
    onChange(requiredCities);
  }, [requiredCities, onChange]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('/api/fetch-skills', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input: '' }), // Fetch all skills
        });

        const data = await response.json();
        const skills = data.skills.map((skill: string) => ({ value: skill, label: skill }));
        setcitiesOptions(skills);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchFilteredCities = async () => {
      if (inputValue.trim()) {
        try {
          const response = await fetch('/api/fetch-cities', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: inputValue }),
          });

          const data = await response.json();
          const cities = data.cities.map((skill: string) => ({ value: skill, label: skill }));
          setcitiesOptions(cities);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      }
    };

    fetchFilteredCities();
  }, [inputValue]);

  const addCity = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectedCity && !requiredCities.includes(selectedCity.value)) {
      setRequiredCities([...requiredCities, selectedCity.value]);
      setSelectedCity(null);
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
        options={citiesOptions}
        onInputChange={(newValue) => setInputValue(newValue)} // Capture user input
        value={selectedCity}
        onChange={(selectedOption) => setSelectedCity(selectedOption ? selectedOption as { value: string, label: string } : null)}
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
        onMenuOpen={() => { 
          if (inputValue.trim() === '') {
            setcitiesOptions(citiesOptions);
          }
        }}
      />
      <Button type="button" onClick={addCity} className='mt-2' disabled={!selectedCity}>Add</Button>
    </div>
  );
};

export default SelectCities;
