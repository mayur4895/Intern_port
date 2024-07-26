import Image from 'next/image';
import React from 'react';
import { Separator } from './separator';
import Link from 'next/link';
import { BsInstagram, BsTwitterX } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
    <footer className=" h-auto   bg-gradient-to-tr to-blue-800 from-blue-500  flex-col flex items-center  bt  mt-5 w-full   lg:px-10 px-5 py-4  gap-2 justify-between">
      <div className='   lg:flex w-full justify-between '>
         
             <div className=' text-white text-sm flex flex-col gap-2'>
              <div>
                <h2 className='text-xl font-semibold'>Apply & Get Internship</h2>
              </div>
             <div>
             <h2>Progressive Education Socityes</h2>
             <h3>Modern College Of Arts ,Commerce And Science & Commerce (Autonomous)  </h3>
             </div>
              <span>Ganeshkhind pune-16</span>
             <div>
           
              <span>Phone: +91 111 222 333</span><br />
              <span>Email: moderncollege16@gmail.com</span>
             </div>
             </div>
             <div className=' text-white text-sm mt-4 lg:mt-0'>
             <Separator  className=' bg-white/10 lg:hidden' />
                <ul className=' flex lg:flex-col lg:gap-2 gap-5 py-3'>
                  <li className=' text-nowrap'>Contact US</li>
                  <li className=' text-nowrap'>About US</li>
                  <li className=' text-nowrap'>FAQ</li>
                  <li className=' text-nowrap'>Contact US</li>
                </ul>
           
             
             </div>

             <div className='text-white flex flex-col gap-2'> 
         <h2>Follow Us</h2>
            <div className=' flex  gap-5'>
              <Link href={""}><BsTwitterX size={15}/>  </Link>
              <Link href={""}><FaFacebook  size={16}/>  </Link>
              <Link href={""}><BsInstagram  size={16}/>  </Link>
         
      </div>
        </div>
        </div>  
        <Separator  className='  bg-white/10'/>
  <span className=' text-xs  text-white pt-1'>  &copy;2025 Modern college. All rights reserved</span>
    </footer>
     
    
            </>
  );
};

export default Footer;
