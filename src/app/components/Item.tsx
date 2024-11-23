import React, { useState } from 'react';
import { DropIcon } from './icons/Icons'; // Assuming DropIcon is an icon component
import BarAndLineChart from './BarAndLineChart'; // Assuming BarAndLineChart is a chart component

function Item() {
  const [isDropClick, setIsDropClick] = useState<boolean>(false); // State to track dropdown visibility

  const handleDropClick = () => {
    setIsDropClick(prevState => !prevState); // Toggle dropdown visibility
  };

  return (
    <div className='text-center'>
      <div className='justify-between bg-mango border-2 border-darkGreen rounded-lg'>
        {/* Header with dropdown icon */}
        <div className={`flex items-center justify-between border-b-2 ${isDropClick ? 'border-darkGreen/60' : 'border-transparent'}`}>
          <p className='font-bold text-black/70 p-4'>หัวเรื่อง</p>
          <div
            className={`cursor-pointer transition-transform p-4 ${isDropClick ? 'rotate-180' : ''}`}
            onClick={handleDropClick}
          >
            <DropIcon />
          </div>
        </div>

        {/* Dropdown content */}
        {isDropClick && (
          <div className='mt-4'>
            {/* Chart */}
            <div className=''>
              <BarAndLineChart data={[1.2, 1.2, 5.0, 2.6, 2.0, 0.0, 1.0]} />
            </div>

            {/* Additional description */}
            <div className='p-4'>
              <p>คำอธิบายเพิ่มเติม . . .</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Item;
