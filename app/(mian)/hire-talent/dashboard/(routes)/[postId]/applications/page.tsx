'use client'
import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useGetApplicationofPost } from '@/features/application/api/getapplicationsofPost';
import { Loader2 } from 'lucide-react';
import { TbDatabaseOff } from "react-icons/tb";
import { useParams } from 'next/navigation';

const ApplicationsPage = () => {
  const params = useParams<{ postId: string }>();

  const { data: applications, error, isLoading } = useGetApplicationofPost(params?.postId || '');

  if (isLoading) {
    return (
      <div className='h-full left-0 top-0 lg:pl-14 flex items-center justify-center w-full'>
        <div className="flex items-center justify-center bottom-0 right-0 fixed h-full lg:w-[85%] w-full">
          <Loader2 className='animate-spin' />
        </div>
      </div>
    );
  }

  if (!applications) {
    return (
      <div className='h-full w-full'>
        <div className="flex items-center justify-center">
          <TbDatabaseOff size={22} />
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 py-10">
      <DataTable columns={columns} data={applications} />
    </div>
  );
}

export default ApplicationsPage;
