'use client'
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
 
 

const SkeletonLoader = () => {
  return (
    <div className='text-center flex flex-col items-center justify-center'>
      <Card className='shadow-sm p-4 w-3/4 rounded-none flex flex-col gap-5'>
        <div className='p-6 text-start flex flex-col gap-2'>
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
        </div>
        <CardContent className='text-start'>
          <div className='flex items-end gap-2'>
          <Skeleton className="h-20 w-[250px]" />
          </div>
          <div className='mt-5 flex gap-16'>
            <div className='flex flex-col gap-2'>
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
            </div>
            <div className='flex flex-col gap-2'>
              <Skeleton className=" " />
              <Skeleton className=" " />
            </div>
            <div className='flex flex-col gap-2'>
              <Skeleton className=" " />
              <Skeleton className=" " />
            </div>
            <div className='flex flex-col gap-2'>
              <Skeleton className=" " />
              <Skeleton className=" " />
            </div>
          </div>
          <div className='mt-5 flex flex-col gap-6'>
            <Skeleton className=" width={200}" />
            <Skeleton className=" width={150}" />
          </div>
          <div className='flex flex-col gap-5 mt-5'>
            <Skeleton className=" width={300}" />
            <div className='mt-5'>
              <Skeleton className=" " />
              
            </div>
            <div>
              <Skeleton className=" width={300}" />
              <div className='flex flex-col gap-2 mt-5'>
                <Skeleton className=" width={150}" />
                <Skeleton className=" width={50} "/>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className=" " />
        </CardFooter>
      </Card>
    </div>
  );
};

export default SkeletonLoader;
