import React, { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { LiaTimesCircleSolid } from 'react-icons/lia';
import { Filters } from '@/app/(mian)/student/dashboard/(routes)/jobs/page';

interface FilterBoxProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  closeSheet: () => void; // Function to close the sheet
}

const FilterBox: React.FC<FilterBoxProps> = ({ filters, onFilterChange, closeSheet }) => {
  const availabilities = [
    { id: 'part-time', label: 'Part-Time' },
    { id: 'full-time', label: 'Full-Time' },
  ];

  const internship_type = [
    { id: 'in office', label: 'In office' },
    { id: 'Hybrid', label: 'Hybrid' },
  ];

  const defaultValues = {
    availability: availabilities.map((item) => item.id),
    location: '',
    internship_type: internship_type.map((item) => item.id),
  };

  const FormSchema = z.object({
    availability: z.array(z.string()),
    location: z.string().optional(),
    internship_type: z.array(z.string()),
  });

  const form = useForm<Filters>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const debouncedFilterChange = useCallback(
    debounce((filters: Filters) => {
      onFilterChange(filters);
    }, 300),
    [onFilterChange]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const location = event.target.value;
    form.setValue('location', location);

    debouncedFilterChange({
      ...form.getValues(),
      location,
    });
  };

  const onSubmit: SubmitHandler<Filters> = (data) => {
    onFilterChange(data);
   
    closeSheet();  
  };

  return (
    <div className="bg-white h-full text-sm p-4 shadow-sm border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="w-full flex items-center justify-between">
            <h2>Filter</h2>
            <Button
              variant={'outline'}
              className="flex items-center gap-2 text-xs text-gray-500 font-normal"
              onClick={() => {
                form.reset(defaultValues);
                onFilterChange(defaultValues);
                closeSheet(); // Close the sheet on clear
              }}
            >
              Clear filter <LiaTimesCircleSolid size={20} />
            </Button>
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter City"
                    {...field}
                    onChange={handleSearchChange} // Call handleSearchChange on each input change
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-sm">Availability</FormLabel>
                </div>
                {availabilities.map((item) => (
                  <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(
                                field.value?.filter((value) => value !== item.id)
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {item.label}
                    </FormLabel>
                  </FormItem>
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="internship_type"
            render={({ field }) => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-sm">Internship Type</FormLabel>
                </div>
                {internship_type.map((item) => (
                  <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(
                                field.value?.filter((value) => value !== item.id)
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {item.label}
                    </FormLabel>
                  </FormItem>
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Apply Filters</Button>
        </form>
      </Form>
    </div>
  );
};

export default FilterBox;
