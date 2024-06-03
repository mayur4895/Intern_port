'use client';

import Select from 'react-select';

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
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
    className=' border-1'
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
        input: () => 'text-sm',
        option: () => 'text-sm',
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
