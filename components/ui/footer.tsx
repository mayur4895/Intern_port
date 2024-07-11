import React from 'react';

const Footer = () => {
  return (
    <footer className="h-40 border-t w-full p-2 px-10 flex items-center gap-4 justify-between">
      <ul className='flex flex-col gap-4'>
        <li>Modern college</li>
        <li>Student support</li>
        <li>Contact us</li>
        <li>About us</li>
      </ul>
      <ul className='flex flex-col gap-4'>
        <li>Internship-portal /ojt</li>
        <li>moderncollegegk@gmail.com</li>
        <li>+91-111-222-333</li>
        <li>www.moderncollegegk.com</li>
      </ul>
    </footer>
  );
};

export default Footer;
