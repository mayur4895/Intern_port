import React from "react"; 
import { BackgroundGradientAnimation } from "../animations-component/BackgroundGradientAnimation";

export function BackgroundGradientAnimationDemo({children}:{children:React.ReactNode}) {
  return (
    <BackgroundGradientAnimation>
      
   <div className=" h-full items-center justify-center flex">
   {children}
  
   </div>
    </BackgroundGradientAnimation>
  );
}
