import React, { useState, useRef } from 'react';
  
import { Button } from '@/components/ui/button';
import { SparklesCore } from './sparkles';
 
 

interface SparkleButtonProps {
  onClick: () => void;
  loading?: boolean;
  children: React.ReactNode;
}

export function SparkleButton({ onClick, loading, children }: SparkleButtonProps) {
  return (
  
      
   


<Button     onClick={onClick} className="  relative  bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
<div className="absolute  top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[4px]  w-4/5 blur-sm" />
        <div className="absolute  top-0 bg-gradient-to-r from-transparent via-indigo-800 to-transparent h-[2px] w-full" />
        <div className="absolute   top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-full blur-sm" />
        <div className="absolute   top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-5px w-full" />
<div className="w-full absolute   h-full"> 
  <SparklesCore
    id="tsparticlesfullpage"
    background="transparent"
    minSize={0.6}
    maxSize={1.4}
    particleDensity={500}
    className="w-full h-full"
    particleColor="#FFFFFF"
  />
</div> 
 {children}
 
 </Button>
  );
}
