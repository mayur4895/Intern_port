import React from 'react';
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
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface FilterBoxProps {
  onFilterChange: (filters: Filters) => void;
}

interface Filters {
  availability: string[];
  location: string;
  internship_type: string[];
}

const FilterBox: React.FC<FilterBoxProps> = ({ onFilterChange }) => {
  const availabilities = [
    {
      id: 'part-time',
      label: 'Part-Time',
    },
    {
      id: 'full-time',
      label: 'Full-Time',
    },
  ];

  const internship_type = [
    {
      id: 'in office',
      label: 'In office',
    },
    {
      id: 'Hybrid',
      label: 'Hybrid',
    },
  ];


  const FormSchema = z.object({
    availability: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
    }),
    location: z.string(),
    internship_type: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
    }),
     
  });

  const form = useForm<Filters>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      availability: [],
      location: '',
      internship_type: [], 
    },
  });

  const onSubmit: SubmitHandler<Filters> = (data) => {
    onFilterChange(data);
    toast({
      title: 'Filters applied:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <div className='bg-white h-full text-sm p-4 shadow-sm border hidden md:block'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='w-full flex items-center justify-between'>
            <h2>Filter</h2>
            <div>
              <Button variant={'outline'} className='flex items-center gap-2 text-xs text-gray-500 font-normal'>
                Clear filter <LiaTimesCircleSolid size={20} />
              </Button>
            </div>
          </div>
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder='Enter City' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='availability'
            render={() => (
              <FormItem>
                <div className='mb-4'>
                  <FormLabel className='text-sm'>Availability</FormLabel>
                </div>
                {availabilities.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name='availability'
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className='flex flex-row items-start space-x-3 space-y-0'
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name='internship_type'
            render={() => (
              <FormItem>
                <div className='mb-4'>
                  <FormLabel className='text-sm'>Internship Type</FormLabel>
                </div>
                {internship_type.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name='internship_type'
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className='flex flex-row items-start space-x-3 space-y-0'
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>Apply Filters</Button>
        </form>
      </Form>
    </div>
  );
};

export default FilterBox;
