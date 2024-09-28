import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useEffect } from 'react'
import MarkupContent from '../MarkupContent'
import { addDays, format } from 'date-fns';



interface WhoCanApplyProps{
    form:any
}
const WhoCanApply = ({form}:WhoCanApplyProps) => {
    const InternType = form.getValues('internshipType');
    const partOrFullTime = form.getValues('partOrFullTime');
    const internshipStartDate = form.getValues('internshipStartDate');
    const internshipDuration = form.getValues('internshipDuration');
    const MonthOrWeeks = form.getValues('MonthOrWeeks');
   const fromStart  = form.getValues('fromStart');
   const toEnd = form.getValues('toEnd');
  
    const currentDate = new Date(); 
    const futureDate = addDays(currentDate,15) 
    const formattedFutureDate = format(futureDate, "do MMM yyyy"); 
    const formattedCurrentDate = format(currentDate, "do MMM yyyy");
  
    useEffect(()=>{  
       if( form.getValues('internshipStartDate') === "Immediately"){
        form.setValue('fromStart', undefined)
        form.setValue('toEnd', undefined)
       }  
  let formatedFrom ;
  let formatedTo;
       if(form.getValues('internshipStartDate') === "Later" && fromStart !==undefined  &&  toEnd !== undefined){
        formatedFrom   = format(fromStart,"do MMM yyyy") 
        formatedTo = format( toEnd,"do MMM yyyy")
       } 
       const formatedScript = `  
        <span  Only those candidates can apply who:</span>
        <ul>  
        <li> have relevant skills and interests </li>
        <li> are available for ${partOrFullTime === 'part-time' ? 'part time' : 'full time'} ${InternType === 'in office' || InternType === "Hybrid" ? '(in-office)' : 'work from home/'} internship </li>
        ${(internshipDuration ) &&  (`${ (internshipStartDate === "Immediately"  )  ? `<li> can start the internship between ${formattedFutureDate} and  ${formattedCurrentDate}`: `${ formatedFrom !== undefined && formatedTo !== undefined   ?`<li> can start the internship between ${formatedFrom} and ${formatedTo}` : ''}` } </li>`)}
        ${(internshipDuration && MonthOrWeeks) &&(`<li> are available for duration of ${internshipDuration} ${MonthOrWeeks} </li>`)}
         
        
         </ul>`;
  
   
      form.setValue('whoCanApply', formatedScript.trim());
  
    },[form,  
      InternType,
      partOrFullTime,
      internshipStartDate,
      internshipDuration,
      MonthOrWeeks,
      fromStart,
      toEnd, 
      formattedFutureDate,
      formattedCurrentDate,
    ])
  return (
    <div>
      <FormField
                control={form.control}
                name="whoCanApply"
       
                render={({ field }) => 
               
                  (
                  <FormItem  className="  " >
                    <FormLabel className="mt-5">Who can apply (prefilled as per earlier inputs):</FormLabel>
                    <FormControl  suppressHydrationWarning >
                    <MarkupContent  content={field.value}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
    </div>
  )
}

export default WhoCanApply
