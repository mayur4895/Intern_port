import { cn } from '@/lib/utils';
import React from 'react';


interface MarkupProps{
    content:string
    className?:any
}

const  MarkupContent = ({ content ,className }:MarkupProps) => {
  // Function to create markup from HTML string
  const createMarkup = (htmlString:any) => {
    return { __html: htmlString };
  };
  const combinedClassNames = cn(className, 'text-sm');
  return (
    <div  className={combinedClassNames}>
 
      <div dangerouslySetInnerHTML={createMarkup(content)} />
    </div>
  );
};

export default MarkupContent;
