import Select from 'react-select';
import { useGetDepartments } from '@/features/fetch-department';

interface DepartmentOption {
  value: string;
  label: string;
}

interface DepartmentSelectProps {
  value: DepartmentOption | null;
  onChange: (value: DepartmentOption | null) => void;
}

const DepartmentSelect: React.FC<DepartmentSelectProps> = ({ value, onChange }) => {
    const { data: departments } = useGetDepartments();
      console.log(departments);
    if (!departments) {
      return <div>No departments</div>;
    }
  
    const departmentOptions: DepartmentOption[] = departments.map(dept => ({
      value: dept.id,
      label: dept.name
    }));

  return (
    <Select
    className="border-1 text-sm ring-0"
    placeholder="Select department"
    isClearable
    options={departmentOptions}
    value={value}
    onChange={onChange}
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

export default DepartmentSelect;
