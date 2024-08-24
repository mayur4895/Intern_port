'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

export interface SelectSkillSetProps {
  value: string[]; // Array of skill names
  onChange: (value: string[]) => void;
}

const SelectSkillSet: React.FC<SelectSkillSetProps> = ({ value, onChange }) => {
  const [selectedSkill, setSelectedSkill] = useState<{ value: string, label: string } | null>(null);
  const [requiredSkills, setRequiredSkills] = useState<string[]>(value || []);
  const [skillsOptions, setSkillsOptions] = useState<{ value: string, label: string }[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Sync state with form state
    onChange(requiredSkills);
  }, [requiredSkills, onChange]);

  useEffect(() => {
    const fetchSkills = async () => {
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
        setSkillsOptions(skills);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    const fetchFilteredSkills = async () => {
      if (inputValue.trim()) {
        try {
          const response = await fetch('/api/fetch-skills', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: inputValue }),
          });

          const data = await response.json();
          const skills = data.skills.map((skill: string) => ({ value: skill, label: skill }));
          setSkillsOptions(skills);
        } catch (error) {
          console.error('Error fetching skills:', error);
        }
      }
    };

    fetchFilteredSkills();
  }, [inputValue]);

  const addSkill = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectedSkill && !requiredSkills.includes(selectedSkill.value)) {
      setRequiredSkills([...requiredSkills, selectedSkill.value]);
      setSelectedSkill(null);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setRequiredSkills(requiredSkills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2 text-black">
        {requiredSkills.map(skill => (
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
        options={skillsOptions}
        onInputChange={(newValue) => setInputValue(newValue)} // Capture user input
        value={selectedSkill}
        onChange={(selectedOption) => setSelectedSkill(selectedOption ? selectedOption as { value: string, label: string } : null)}
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
            setSkillsOptions(skillsOptions);
          }
        }}
      />
      <Button type="button" onClick={addSkill} className='mt-2' disabled={!selectedSkill}>Add</Button>
    </div>
  );
};

export default SelectSkillSet;
