import React, { Children } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
interface ActiontooltipProps{
    side:  'left'| 'top' | 'right'| 'bottom';
    label:string,
    children:React.ReactNode
}

const ActionTooltip = ({side,label,children}:ActiontooltipProps) => {
  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent side={side}>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
    
  )
}

export default ActionTooltip