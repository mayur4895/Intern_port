'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { LiaTimesCircleSolid } from "react-icons/lia";
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
const FilterBox = () => {


    const availablities = [
        {
          id: "part-time",
          label: "Part-Time",
        },
        {
          id: "full-time",
          label: "Full-Time",
        },

    ]


    const FormSchema = z.object({
        availability: z.array(z.string()).refine((value) => value.some((item) => item), {
            message: "You have to select at least one item.",
          }),
          location:z.string(),
          job_like: z.enum(["Best Matches", "Most recents"], {
            required_error: "You need to select a notification type.",
          }),

      })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            availability: ['recents'],
            location:'',
            job_like:'Best Matches'
        },
      })


      function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        })
      }
  return (
  <div>
       <div className=' bg-white h-full text-sm p-4 shadow-sm border hidden md:block'>
          
            
         
           <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className=' w-full flex items-center justify-between '>
                <h2>Filter</h2>
                <div><Button variant={"outline"} className=' flex items-center gap-2 text-xs text-gray-500 font-normal'>  Clear filter <LiaTimesCircleSolid size={20}/> </Button></div>
             </div>
             <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter City" {...field} />
              </FormControl> 
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
          control={form.control}
          name="availability"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-sm">Availability</FormLabel>
                <FormDescription>
                  Select the avilability you want to find job.
                </FormDescription>
              </div>
              {availablities.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="availability"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
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
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
   <FormField
          control={form.control}
          name="job_like"
          render={({ field }) => (
<FormItem className="space-y-3">
              <FormLabel>Job You Might Like</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Best Matches" />
                    </FormControl>
                    <FormLabel className="font-normal">
                    Best Matches
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Most recents" />
                    </FormControl>
                    <FormLabel className="font-normal">
                       Most recents
                    </FormLabel>
                  </FormItem> 
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         
      </form>
    </Form>

    </div>

   
  </div>


  )
}

export default FilterBox
