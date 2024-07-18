"use client";

import React, { useEffect, useState } from "react"; 
 
import { TbBrandWikipedia } from "react-icons/tb";
import { SiBlueprint, SiSlint } from "react-icons/si";
import { BiPaintRoll } from "react-icons/bi";
import { InfiniteMovingCards } from "./infinite-moving-cards";

export function MovingCards() {
  return (
    <div className=" rounded-md flex flex-col antialiased    text-white dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="fast"
      />
    </div>
  );
}

const testimonials = [
  {
    logo:<TbBrandWikipedia  size={42} className="  rounded-lg "/>
  },
  {
     logo:<BiPaintRoll   size={42} className="  rounded-lg "/>
  },
  {
     logo:<SiBlueprint   size={42} className=" rounded-lg "/>
  },
  {
   logo:<SiSlint   size={42} className=" rounded-lg opacity-60 "/>
  },
 
];
