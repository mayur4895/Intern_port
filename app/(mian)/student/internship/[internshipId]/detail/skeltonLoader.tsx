'use client'
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
 
 

const SkeletonLoader = () => {
  return (
    <div>
    <div className=' text-center flex flex-col items-center justify-center'>

        <Card className=' shadow-sm p-4 w-full md:w-3/4 rounded-none flex flex-col gap-5'>
           <div className='p-6 text-start flex flex-col gap-2'>
        

           <Skeleton className=' text-xl font-normal h-5 w-64'> </Skeleton>
           <Skeleton className=' text-xl font-normal h-5 w-44'> </Skeleton>
           </div>
           <CardContent className=' text-start'>
            <Skeleton className=' flex items-end gap-2 h-5 w-32'></Skeleton>
          <div className=' mt-5 flex  flex-wrap gap-16'>
               <div className=' flex flex-col gap-2'>
                <Skeleton className=' flex items-center gap-2 text-gray-500 text-sm h-6 w-6 '>  </Skeleton>
                <Skeleton className=' flex items-end gap-2 h-5 w-32'></Skeleton>
               </div>
               <div className=' flex flex-col gap-2'>
                <Skeleton className=' flex items-center gap-2 text-gray-500 text-sm h-6 w-6 '>  </Skeleton>
                <Skeleton className=' flex items-end gap-2 h-5 w-32'></Skeleton>
               </div>
               <div className=' flex flex-col gap-2'>
                <Skeleton className=' flex items-center gap-2 text-gray-500 text-sm h-6 w-6 '>  </Skeleton>
                <Skeleton className=' flex items-end gap-2 h-5 w-32'></Skeleton>
               </div>
               <div className=' flex flex-col gap-2'>
                <Skeleton className=' flex items-center gap-2 text-gray-500 text-sm h-6 w-6 '>  </Skeleton>
                <Skeleton className=' flex items-end gap-2 h-5 w-32'></Skeleton>
               </div>
          </div>
         <div className=' mt-5 flex flex-col gap-6 '> 
           <span className='  text-sm text-gray-500 flex items-center gap-2'>       <Skeleton className=' flex items-center gap-2 text-gray-500 text-sm h-6 w-20 '>  </Skeleton>
            </span>
            <Skeleton className=' flex items-center gap-2 text-gray-500 text-sm h-6 w-20 '>  </Skeleton>
         </div>

         <div className=' flex  flex-col gap-5 mt-5'>
         <Skeleton className=' text-xl font-normal h-5 w-44'> </Skeleton>
            <Skeleton className=' h-96  w-[80%]'></Skeleton>
          <div className=' mt-5'>
          <Skeleton className=' flex items-center gap-2 text-gray-500 text-sm h-6 w-20 '>  </Skeleton>
          <div className=' flex flex-auto  flex-wrap mt-4 gap-5'>
          <Skeleton className='h-5 w-16 rounded-2xl'></Skeleton>   
                <Skeleton className='h-5 w-16 rounded-2xl'></Skeleton>
                <Skeleton className='h-5 w-16 rounded-2xl'></Skeleton>
          </div>
          </div>

          <div>
          <Skeleton className=' h-40  w-[80%]'></Skeleton>
           <div className=' flex flex-col gap-2 mt-5'>
           <Skeleton className=' flex items-center gap-2 text-gray-500 text-sm h-6 w-20 '>  </Skeleton>
           <Skeleton className=' h-4 w-20'></Skeleton>
           </div>
          </div>
         </div>
           </CardContent>
           <CardFooter>
            <Skeleton className='h-10 w-32'></Skeleton>
           </CardFooter>
        </Card>
    </div>
</div>

  );
};

export default SkeletonLoader;
