'use client'
import React, { useState } from 'react'
import { SearchIcon } from '../components/icons/Icons'
import image from "../components/image/mockup.png";
import Image from 'next/image';
import { useRouter } from 'next/navigation';  // นำเข้า useRouter

function page() {
  const router = useRouter();  // เรียกใช้ useRouter เพื่อเข้าถึงฟังก์ชั่นในการเปลี่ยนหน้า
  const [isFocused, setIsFocused] = useState(false);


  const handleClick = () => {
    router.push('/waterGraph');  // เปลี่ยนไปยังหน้า 'next-page' หรือหน้าอื่นๆ ตามที่คุณต้องการ
  };

  return (
    <div className='h-full px-12 pt-8 bg-cream overflow-scroll hide-scrollbar pb-40 flex flex-col items-center'>
      <h1 className='pb-6 text-center font-bold opacity-70 text-2xl'>เลือก PVC ของคุณ</h1>
      <div
        className={`border-[1px] w-full gap-2 flex items-center justify-between pr-4 pl-2 rounded-[10px] shadow-md mb-4 ${isFocused ? 'border-darkGreen' : 'border-black opacity-50'
          }`}
      >
        <input
          type="text"
          placeholder='ค้นหาใน Google map'
          className='font-bold bg-transparent flex-1 p-[2px] rounded-full focus:outline-none focus:ring-2 focus:ring-transparent text-gray-700 placeholder:text-black placeholder:opacity-40'
          onFocus={() => setIsFocused(true)} // Change border color on focus
          onBlur={() => setIsFocused(false)} // Revert border color on blur
        />
        <div className='cursor-pointer opacity-100'>
          <SearchIcon />
        </div>
      </div>

      <div className="mb-4 w-full h-[350px] relative rounded-[10px] overflow-hidden">
        <Image
          src={image}
          alt="mockup image"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div
        onClick={handleClick}  // เรียกใช้ handleClick เมื่อคลิก
        className='shadow-md cursor-pointer py-[4px] px-[21px] text-center text-cream text-[20px] font-bold bg-darkGreen flex items-center justify-center rounded-[10px] w-[126px]'>
        <p>ตกลง</p>
      </div>
    </div>
  )
}

export default page
