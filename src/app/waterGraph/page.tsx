'use client';
import React, { useState } from 'react';
import BarAndLineChart from '../components/BarAndLineChart';
import Popup from '../components/Popup';
import WaterPopup from '../components/WaterPopup'; // Import WaterPopup component

function Page() {
  const [pumpStatus, setPumpStatus] = useState<boolean>(false);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false); // Control Popup visibility
  const [isWaterPopUpVisible, setIsWaterPopUpVisible] = useState<boolean>(false); // Control WaterPopup visibility

  const togglePumpStatus = () => {
    setPumpStatus(prevStatus => !prevStatus); // Toggle pump status on click
  };

  const togglePopup = () => {
    setIsPopupVisible(prevState => !prevState); // Toggle popup visibility
  };

  const toggleWaterPopup = () => {
    setIsWaterPopUpVisible(prevState => !prevState); // Toggle WaterPopup visibility
  };

  return (
    <div className='h-full bg-cream overflow-scroll hide-scrollbar flex flex-col items-center'>
      <div className='relative h-full w-full flex flex-col justify-between items-center'>
        <div>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='mt-8 text-center font-bold opacity-70 text-2xl'>ระดับน้ำในนา</h1>
            <p className='opacity-60'>วันที่ 21 พฤศจิกายน</p>
          </div>
          <div className='pb-8'>
            <BarAndLineChart data={[1.2, 1.2, 5.0, 2.6, 2.0, 0.0, 1.0]} />
          </div>
        </div>

        {/* Display Popups */}
        {isPopupVisible && <Popup togglePopup={togglePopup} />} {/* Pass togglePopup to Popup */}
        {isWaterPopUpVisible && <WaterPopup togglePopup={toggleWaterPopup} />} {/* Display WaterPopup */}

        {pumpStatus ? (
          <div className='pb-[100px]'>
            <div
              onClick={togglePumpStatus} // Toggle pump status on click
              className='shadow-md cursor-pointer text-center text-cream text-[20px] font-bold bg-redSunday flex items-center justify-center rounded-[10px] w-[150px] h-[40px]'
            >
              <p>เปิดน้ำ</p>
            </div>
          </div>
        ) : (
          <div className='flex gap-4 pb-[100px]'>
            <div
              onClick={togglePopup} // Toggle Popup on click
              className='shadow-md cursor-pointer text-center text-cream text-[20px] font-bold bg-darkGreen flex items-center justify-center rounded-[10px] w-[150px] h-[40px]'
            >
              <p>บันทึก</p>
            </div>
            <div
              onClick={toggleWaterPopup} // Toggle WaterPopup on click
              className='shadow-md cursor-pointer text-center text-cream text-[20px] font-bold bg-water flex items-center justify-center rounded-[10px] w-[150px] h-[40px]'
            >
              <p>ดูประวัติระดับน้ำ</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
