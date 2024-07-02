'use client';

import Select from 'react-select';

const frameworks = [
  {
    value: "web developer",
    label: "Web Developer",
  },
  {
    value: "python developer",
    label: "Python Developer",
  },
  {
    value: "data science",
    label: "Data Science",
  },
  {
    value: "database administrator",
    label: "Database Administrator",
  },
   
];

interface IndustrySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const IndustrySelect: React.FC<IndustrySelectProps> = ({
  value,
  onChange,
}) => {
 
  const selectedFramework = frameworks.find(framework => framework.value === value) || null;

  return (
    <Select
    className=' border-1 text-sm ring-0'
      placeholder="Select Industry"
      isClearable
      options={frameworks}
      value={selectedFramework}
      onChange={(selectedOption) => onChange(selectedOption ? selectedOption.value : '')}
      formatOptionLabel={(option) => (
        <div className="flex flex-row items-center gap-3">
          <div>
            {option.label}
          </div>
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
  );
};

export default IndustrySelect;
