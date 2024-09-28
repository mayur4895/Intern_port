'use client';

import Select from 'react-select';

const industries = [
  { value: "web_developer", label: "Web Developer" },
  { value: "python_developer", label: "Python Developer" },
  { value: "data_science", label: "Data Science" },
  { value: "database_administrator", label: "Database Administrator" },
  { value: "software_engineering", label: "Software Engineering" },
  { value: "mobile_development", label: "Mobile Development" },
  { value: "cyber_security", label: "Cyber Security" },
  { value: "cloud_computing", label: "Cloud Computing" },
  { value: "ui_ux_design", label: "UI/UX Design" },
  { value: "network_engineering", label: "Network Engineering" },
  { value: "devops", label: "DevOps" },
  { value: "artificial_intelligence", label: "Artificial Intelligence" },
  { value: "machine_learning", label: "Machine Learning" },
  { value: "business_intelligence", label: "Business Intelligence" },
  { value: "data_analysis", label: "Data Analysis" },
  { value: "blockchain", label: "Blockchain" },
  { value: "internet_of_things", label: "Internet of Things (IoT)" },
  { value: "e_commerce", label: "E-Commerce" },
  { value: "gaming", label: "Gaming" },
  { value: "financial_technology", label: "Financial Technology (FinTech)" },
  { value: "healthcare_technology", label: "Healthcare Technology" },
  { value: "education_technology", label: "Education Technology (EdTech)" },
  { value: "legal_technology", label: "Legal Technology" },
  { value: "automotive_technology", label: "Automotive Technology" },
  { value: "telecommunications", label: "Telecommunications" },
  { value: "media_and_entertainment", label: "Media and Entertainment" },
  { value: "renewable_energy", label: "Renewable Energy" },
  { value: "supply_chain_management", label: "Supply Chain Management" },
  { value: "logistics", label: "Logistics" },
  { value: "agriculture_technology", label: "Agriculture Technology" },
  { value: "travel_and_tourism", label: "Travel and Tourism" },
  // Add more industries as needed
];

interface IndustrySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const IndustrySelect: React.FC<IndustrySelectProps> = ({ value, onChange }) => {
  const selectedIndustry = industries.find(industry => industry.value === value) || null;

  return (
    <Select
      className='border-1 text-sm ring-0'
      placeholder="Select Industry"
      isClearable
      options={industries}
      value={selectedIndustry}
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
