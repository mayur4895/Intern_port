"use client";

import React, { useEffect, useState } from "react"; 
 
import { TbBrandAirbnb, TbBrandMeta, TbBrandSpotifyFilled, TbBrandWikipedia } from "react-icons/tb";
import { SiBlueprint, SiSlint } from "react-icons/si";
import { BiPaintRoll } from "react-icons/bi";
import { InfiniteMovingCards } from "./infinite-moving-cards";
import { FaGoogle } from "react-icons/fa";
import { RiNetflixFill } from "react-icons/ri";

export function MovingCards() {
  return (
    <div className=" rounded-md flex flex-col antialiased  text-zinc-600    dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
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
    logo:<TbBrandAirbnb   size={42} className="  rounded-lg "/>,
    name:"Airbnb"
  },
  {
     logo:<TbBrandMeta  size={42} className="  rounded-lg "/>,
     name:"Meta"
  },
  {
     logo:<TbBrandSpotifyFilled    size={42} className=" rounded-lg "/>,
     name:"Spotify"
  },
  {
   logo:<FaGoogle  size={42} className=" rounded-lg opacity-60 "/>,
   name:"Google"
  },
  {
    logo:<RiNetflixFill size={42} className=" rounded-lg opacity-60 "/>,
    name:"Netflix"
  }
 
];
