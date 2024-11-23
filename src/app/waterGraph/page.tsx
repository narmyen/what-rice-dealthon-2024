'use client'
import React, { useState, useEffect, useRef } from 'react';
import BarAndLineChart from '../components/BarAndLineChart';
import Popup from '../components/Popup';


function page() {
  const [pumpStatus, setPumpStatus] = useState<boolean>(false);

  return (
    <div className='h-full px-6 pt-8 bg-cream overflow-scroll hide-scrollbar flex flex-col items-center'>
      <div className='h-full flex flex-col justify-between items-center'>
        <div>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center font-bold opacity-70 text-2xl'>ระดับน้ำในนา</h1>
            <p className='opacity-60'>วันที่ 21 พฤศจิกายน</p>
          </div>
          <div className='pb-8'>
            <BarAndLineChart data={[1.2, 1.2, 5.0, 2.6, 2.0, 0.0, 1.0]} />
          </div>
        </div>

        {pumpStatus ? (
          <div className='pb-[100px]'>
            <div
              className='shadow-md cursor-pointer text-center text-cream text-[20px] font-bold bg-redSunday flex items-center justify-center rounded-[10px] w-[150px] h-[40px]'>
              <p>เปิดน้ำ</p>
            </div>
          </div>

        ) : (
          <div className='flex gap-4 pb-[100px]'>
            <div
              className='shadow-md cursor-pointer text-center text-cream text-[20px] font-bold bg-darkGreen flex items-center justify-center rounded-[10px] w-[150px] h-[40px]'>
              <p>บันทึก</p>
            </div>
            <div
              className='shadow-md cursor-pointer text-center text-cream text-[20px] font-bold bg-water flex items-center justify-center rounded-[10px] w-[150px] h-[40px]'>
              <p>ดูประวัติระดับน้ำ</p>
            </div>
          </div>
        )}
      </div>

      <div>
        <Popup />
      </div>
    </div>
  )
}

export default page
