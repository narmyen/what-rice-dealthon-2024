'use client';
import Image from "next/image";
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation'; // นำเข้า useRouter

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/profile');
  };

  return (
    <div className="border-2 border-red-900 h-full px-6 pt-8 bg-cream overflow-scroll flex flex-col items-center hide-scrollbar pb-[100px] justify-center pb-32">
      <div className='absolute left-0 top-0 right-0 bottom-0 bg-cream  z-50 flex flex-col px-4 justify-center items-center'>
        <h1 className="pb-2 text-center font-bold opacity-70 text-2xl mt-2">เข้าสู่ระบบ</h1>
        <div className="w-full text-left px-[5px] mt-3">
          <h2 className="pb-2 text-left font-semibold opacity-70 text-[18px] mt-2">ชื่อบัญชีผู้ใช้</h2>
          <div className="border-[1.5px] w-full gap-2 flex items-center justify-between pr-4 pl-2 rounded-full shadow-md border-[#97948d]">
            <input
              type="text"
              placeholder="ชื่อบัญชีผู้ใช้"
              className="font-bold bg-transparent flex-1 p-[2px] rounded-full focus:outline-none focus:ring-2 focus:ring-transparent text-gray-700 placeholder:text-black placeholder:opacity-40"
            />
          </div>
        </div>
        <div className="w-full text-left px-[5px] mt-4">
          <h2 className="pb-2 text-left font-semibold opacity-70 text-[18px] mt-2">รหัสผ่าน</h2>
          <div className="border-[1.5px] w-full gap-2 flex items-center justify-between pr-4 pl-2 rounded-full shadow-md mb-2 border-[#97948d]">
            <input
              type="password"
              placeholder="รหัส"
              className="font-bold bg-transparent flex-1 p-[2px] rounded-full focus:outline-none focus:ring-2 focus:ring-transparent text-gray-700 placeholder:text-black placeholder:opacity-40"
            />
          </div>
        </div>
        <div
          onClick={handleLogin}
          className="shadow-md cursor-pointer mt-7 py-[6px] px-[21px] text-center text-cream text-[20px] font-semibold bg-darkBlue flex items-center justify-center rounded-[10px] w-[164px]"
        >
          <p>เข้าสู่ระบบ</p>
        </div>
      </div>
    </div>
  );
}