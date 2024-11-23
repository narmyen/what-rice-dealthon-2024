'use client'
import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import SelectInput from '../components/SelectInput';
import { BackIcon } from '../components/icons/Icons';

function Page() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [fertilizer, setFertilizer] = useState('');
  const [pesticide, setPesticide] = useState('');
  const [isHarvested, setIsHarvested] = useState(false); // State for hiding elements

  const monthNames = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const formattedDate = `วันที่ ${day} ${monthNames[month]}`;

  const handleStatusClick = (status: string) => {
    setSelectedStatus(prevStatus => (prevStatus === status ? '' : status));
  };

  const handleHarvestClick = () => {
    setIsHarvested(true); // Hide SelectInput and button when "เก็บเกี่ยว" is clicked
  };

  return (
    <div className='h-full overflow-scroll hide-scrollbar pb-40'>
      <Calendar selectedStatus={selectedStatus} date={`${day}-${month + 1}-${year}`} />

      <div className='mb-4 flex justify-between items-center px-2 py-2 h-[64px] bg-darkGreen text-cream font-semibold'>
        <div className='flex items-center gap-2 pl-4'>
          {isHarvested && (
            <div className='cursor-pointer' onClick={() => { setIsHarvested(!isHarvested) }}><BackIcon /></div>
          )}
          <h2 className='text-[20px]'>{isHarvested ? 'เก็บเกี่ยว' : formattedDate}</h2>
        </div>
        {!isHarvested && (
          <div className='flex items-center gap-2'>
            <div
              className={`cursor-pointer rounded-[16px] px-4 py-2 flex items-center justify-center ${selectedStatus === 'เปียก' ? ' bg-cream text-darkBlue' : 'border-[1px] bg-transparent text-cream'} ${selectedStatus === '' ? 'border-[1px] border-cream' : ''}`}
              onClick={() => handleStatusClick('เปียก')}
            >
              เปียก
            </div>
            <div
              className={`cursor-pointer rounded-[16px] px-4 py-2 flex items-center justify-center ${selectedStatus === 'แห้ง' ? ' bg-cream text-orange' : 'border-[1px] bg-transparent text-cream'} ${selectedStatus === '' ? 'border-[1px] border-cream' : ''}`}
              onClick={() => handleStatusClick('แห้ง')}
            >
              แห้ง
            </div>
          </div>
        )}
      </div>


      {!isHarvested && (
        <h2 className='font-bold px-6 text-[20px] mb-[12px]'>ปลูกมาแล้ว 59 วัน</h2>
      )}


      {/* Conditionally render SelectInput */}
      {!isHarvested && (
        <div className='px-6'>
          <SelectInput />
        </div>
      )}

      {/* Conditionally render the "เก็บเกี่ยว" button */}
      {!isHarvested && (
        <div className='flex items-center justify-center mt-12'>
          <p
            className='cursor-pointer shadow-md bg-redSunday border-2 w-[126px] text-center py-2 px-6 text-cream rounded-[15px] font-bold'
            onClick={handleHarvestClick}
          >
            เก็บเกี่ยว
          </p>
        </div>
      )}

      {isHarvested && (
        <h2 className='text-center font-bold px-6 text-[20px] mb-[12px]'>เก็บเกี่ยวได้</h2>
      )}

      {isHarvested && (
        <div className='flex items-center gap-4 justify-center'>
          <div
            className="border-[1px] gap-2 flex items-center justify-between pr-4 pl-2 rounded-[10px] shadow-md mb-2 border-darkGreen"
          >
            <input
              type="text"
              placeholder="ระบุจำนวน"
              className="font-bold bg-transparent flex-1 p-[2px] rounded-full focus:outline-none focus:ring-2 focus:ring-transparent text-gray-700 placeholder:text-black placeholder:opacity-40"
            />
          </div>
          <div className='font-semibold'>กก.</div>
        </div>
      )}


    </div>
  );
}

export default Page;
