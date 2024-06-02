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
  // Find the selected framework object based on the string value
  const selectedFramework = frameworks.find(framework => framework.value === value) || null;

  return (
    <Select
      placeholder="Anywhere"
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
        control: () => 'p-1',
        input: () => 'text-lg',
        option: () => 'text-lg',
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: 'black',
          primary25: '#ffe4e6',
        },
      })}
    />
  );
};

export default IndustrySelect;
