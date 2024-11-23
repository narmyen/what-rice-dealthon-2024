'use client';
import React, { useState } from 'react';
import { Close, DropIcon } from './icons/Icons'; // Assuming Close and DropIcon are icon components
import BarAndLineChart from './BarAndLineChart';
import Item from './Item';

interface PopupProps {
  togglePopup: () => void; // Accept togglePopup function as prop
}

function WaterPopup({ togglePopup }: PopupProps) {
  const [isDropClick, setIsDropClick] = useState<boolean>(false); // State to track dropdown visibility

  const handleDropClick = () => {
    setIsDropClick(prevState => !prevState); // Toggle dropdown visibility
  };

  return (
    <div className='absolute left-0 top-0 right-0 bottom-0 bg-black bg-opacity-40 z-50 flex justify-center items-center '>
      <div className="relative bg-white p-4 rounded-lg shadow-lg z-60 h-[650px] w-[360px]">
        {/* Close Button */}
        <div className='flex justify-end'>
          <div className='cursor-pointer' onClick={togglePopup}> {/* Close the popup when clicked */}
            <Close />
          </div>
        </div>

        <h1 className='text-center font-bold text-lg mb-4'>ดูประวัติระดับน้ำ</h1>

        <div className='flex flex-col gap-2 overflow-scroll hide-scrollbar'>
          <Item />
          <Item />
        </div>
      </div>
    </div>
  );
}

export default WaterPopup;
