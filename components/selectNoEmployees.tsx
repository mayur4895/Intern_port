'use client';

import Select from 'react-select';

const No_Employees = [
  {
    value: "0-51",
    label: "0-51",
  },
  {
    value: "51-200",
    label: "51-200",
  },
  {
    value: "201-500",
    label: "201-500",
  },
  {
    value: "1000+",
    label: "1000+",
  },
   
];

interface NoEmployeesSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const NoEmployeesSelect: React.FC<NoEmployeesSelectProps> = ({
  value,
  onChange,
}) => {
 
  const selectedEmployeesRange = No_Employees.find(Employee_range => Employee_range.value === value) || null;

  return (
    <Select
    className=' border-1 text-sm ring-0'
      placeholder="e.g 4"
      isClearable
      options={No_Employees}
      value={selectedEmployeesRange}
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

export default NoEmployeesSelect;
