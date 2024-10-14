'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import _ from 'lodash';

export interface SelectSkillSetProps {
  value: string[]; // Array of skill names
  onChange: (value: string[]) => void;
}


const mockSkills = [
  'React',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'Python',
  'Django',
  'Flask',
  'Ruby on Rails',
  'Java',
  'Spring Boot',
  'C#',
  '.NET',
  'ASP.NET',
  'HTML',
  'CSS',
  'C++',
  'Dart',
  'Flutter',
  'PHP',
  'Laravel',
  'Symfony',
  'MongoDB',
  'MySQL',
  'PostgreSQL',
  'Redis',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'Google Cloud',
  'Git',
  'GitHub',
  'GitLab',
  'Jenkins',
  'Travis CI',
  'CircleCI',
  'Terraform',
  'Ansible',
  'Prometheus',
  'Grafana',
  'ElasticSearch',
  'Solr',
  'Hadoop',
  'Spark',
  'TensorFlow',
  'PyTorch',
  'Machine Learning',
  'Deep Learning',
  'NLP',
  'Blockchain',
  'Ethereum',
  'Smart Contracts',
  'CI/CD',
  'REST',
  'GraphQL',
  'OAuth',
  'JWT',
  'SAML',
  'Testing',
  'Jest',
  'Mocha',
  'Selenium',
  'JUnit',
  'PyTest',
  'AR/VR',
  'Unity',
  'Unreal Engine',
];


const SelectSkillSet: React.FC<SelectSkillSetProps> = ({ value, onChange }) => {
  const [selectedSkill, setSelectedSkill] = useState<{ value: string, label: string } | null>(null);
  const [requiredSkills, setRequiredSkills] = useState<string[]>(value || []);
  const [skillsOptions, setSkillsOptions] = useState<{ value: string, label: string }[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    onChange(requiredSkills);
  }, [requiredSkills, onChange]);

  const fetchSkills = async () => {
    // Here we load the mock skills or fetch from the API
    setSkillsOptions(mockSkills.map(skill => ({ value: skill, label: skill })));
  };

  useEffect(() => {
    fetchSkills(); // Load all mock skills initially
  }, []);

  const fetchFilteredSkills = useCallback(
    _.debounce(async (input) => {
      if (input.trim()) {
        try {
          // Filter mock skills based on input (can be replaced with API request)
          const filteredSkills = mockSkills
            .filter(skill => skill.toLowerCase().includes(input.toLowerCase()))
            .map(skill => ({ value: skill, label: skill }));

          setSkillsOptions(filteredSkills);
        } catch (error) {
          console.error('Error fetching skills:', error);
        }
      } else {
        fetchSkills(); // Reset to all mock skills when input is cleared
      }
    }, 300),
    []
  );

  // Handle input changes for search
  useEffect(() => {
    fetchFilteredSkills(inputValue);
  }, [inputValue, fetchFilteredSkills]);

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
        onInputChange={(newValue) => setInputValue(newValue)}
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
        onFocus={() => {
          if (!inputValue.trim()) {
            fetchSkills(); // Fetch all skills when the input is focused with no search
          }
        }}
      />
      <Button type="button" onClick={addSkill} className='mt-2' disabled={!selectedSkill}>Add</Button>
    </div>
  );
};

export default SelectSkillSet;
