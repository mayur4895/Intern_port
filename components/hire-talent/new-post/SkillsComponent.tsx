// 'use client'
// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import React, { useState } from 'react'


// interface SkillsComponentProps{
//     form: any;
// }

// const SkillsComponent = ({form}:SkillsComponentProps) => {
    
//   const [newSkill, setNewSkill] = useState('');
//   const requiredSkills = form.watch('requiredSkills');
//     const addSkill = () => {
//         if (newSkill && !requiredSkills.includes(newSkill)) {
//           form.setValue('requiredSkills', [...requiredSkills, newSkill]);
//           setNewSkill('');
//         }
//       };
    
//       const removeSkill = (skillToRemove: string) => {
//         form.setValue('requiredSkills',   requiredSkills.filter((skill:any)=>{
//            return skill !== skillToRemove
//         }));
//       };
//   return (
//     <div>
       
//     <div className=' gap-4 flex flex-col  w-full'>  
//            <FormField
//               control={form.control}
              
//               name="requiredSkills"
//               render={() => (
//                 <FormItem  className='w-full  ' > 
//                   <FormLabel>Required Skills</FormLabel>
                   
//             <div>
//               {requiredSkills.length > 0 && (
//                 <ul className="flex flex-wrap gap-2">
//                   {requiredSkills.map((skill:string, index:any) => (
//                     <Badge key={index} className="pl-5 py-0 flex justify-between items-center">
//                       {skill}
//                       <Button
//                         className='bg-transparent hover:bg-transparent'
//                         size="icon"
//                         type="button"
//                         onClick={() => removeSkill(skill)}
//                         aria-label="Remove"
//                       >
//                         ✕
//                       </Button>
//                     </Badge>
//                   ))}
//                 </ul>
//               )}
//             </div>

            
//                   <FormControl>
//                     <Select
                      
//                       onValueChange={value => setNewSkill(value)}
//                       value={newSkill}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a skill" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="JavaScript">JavaScript</SelectItem>
//                         <SelectItem value="TypeScript">TypeScript</SelectItem>
//                         <SelectItem value="React">React</SelectItem>
//                         <SelectItem value="Node.js">Node.js</SelectItem>
//                         <SelectItem value="Mongodb">Mongodb</SelectItem> 
//                         <SelectItem value="Tailwind">Tailwind</SelectItem>
//                         <SelectItem value="Redux">Redux</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
                
//               <FormMessage />
    
//                 </FormItem>
//               )}
//             />
//                <div className="  ">
//                <Button type="button" onClick={addSkill}>Add</Button>
//                </div> 
              
//           </div>
//     </div>
//   )
// }

// export default SkillsComponent
