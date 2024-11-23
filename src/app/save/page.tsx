'use client'
import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import SelectInput from '../components/SelectInput';

function Page() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [fertilizer, setFertilizer] = useState('');
  const [pesticide, setPesticide] = useState('');

  const monthNames = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const formattedDate = `วันที่ ${day} ${monthNames[month]}`;

  const handleStatusClick = (status: string) => {
    setSelectedStatus(prevStatus => (prevStatus === status ? '' : status));
  };

  const handleFertilizerChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFertilizer(e.target.value);
  };

  const handlePesticideChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setPesticide(e.target.value);
  };

  return (
    <div className='h-full overflow-scroll hide-scrollbar pb-40'>
      <Calendar selectedStatus={selectedStatus} date={`${day}-${month + 1}-${year}`} />

      <div className='mb-[100px] flex justify-between items-center px-2 py-2 h-[64px] bg-darkGreen text-cream font-semibold'>
        <h2>{formattedDate}</h2>
        {/* <div className='flex items-center gap-2'>
          <div
            className={`cursor-pointer rounded-[16px] px-4 py-2 flex items-center justify-center ${selectedStatus === 'เปียก' ? ' bg-cream text-darkBlue' : 'border-[1px]  bg-transparent text-cream'} ${selectedStatus === '' ? 'border-[1px] border-cream' : ''}`}
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
        </div> */}
      </div>

      <div className='flex items-center justify-center mt-12'>
        <p className='cursor-pointer shadow-md bg-redSunday border-2 w-[126px] text-center py-2 px-6 text-cream rounded-md font-bold'>เริ่ม</p>
      </div>

      {/* <h2 className='font-bold px-6 mt-4 text-[20px]'>ปลูกมาแล้ว 1 วัน</h2>
      <div className='pt-4 px-6'>
        <SelectInput />
      </div>

      <div className='flex items-center justify-center mt-12'>
        <p className='cursor-pointer shadow-md bg-darkBlue border-2 w-[126px] text-center py-2 px-6 text-cream rounded-md font-bold'>บันทึก</p>
      </div> */}
    </div>
  );
}

export default Page;
