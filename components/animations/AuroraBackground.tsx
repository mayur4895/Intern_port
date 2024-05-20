"use client";

import { motion } from "framer-motion";
import React from "react"; 
import { AuroraBackground } from "../animations-component/aurora-background";

export function AuroraBackgrounMain({children}:{children:React.ReactNode}) {
  return (
 <AuroraBackground>   
      <motion.div
        initial={{ opacity: 0.0, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 w-full py-24"
      >
 
         {children}  
      </motion.div>
      </AuroraBackground>
  
  );
}
