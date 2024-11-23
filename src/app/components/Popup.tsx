'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Close, SearchIcon } from './icons/Icons'; // Assuming Close and SearchIcon are icon components

interface PopupProps {
  togglePopup: () => void; // Accept togglePopup function as prop
}

function Popup({ togglePopup }: PopupProps) {

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='absolute left-0 top-0 right-0 bottom-0 bg-black bg-opacity-40 z-50 flex justify-center items-center'>
      <div className="relative bg-white p-6 rounded-lg shadow-lg z-60 h-[650px] w-[360px]">
        {/* Close Button */}
        <div className='flex items-center justify-end'>
          <div className='cursor-pointer' onClick={togglePopup}> {/* Call togglePopup when clicked */}
            <Close />
          </div>
        </div>

        <div className='flex flex-col justify-center'>
          <h1 className='font-bold text-center mb-4 text-[20px] opacity-80'>บันทึกข้อมูลระดับน้ำ</h1>

          {/* Topic Input */}
          <div>
            <p>หัวเรื่อง</p>
            <div>
              <div
                className="border-[1px] w-full gap-2 flex items-center justify-between pr-4 pl-2 rounded-[10px] shadow-md mb-4 border-darkGreen"
              >
                <input
                  type="text"
                  placeholder="หัวเรื่อง"
                  className="font-bold bg-transparent flex-1 p-[2px] rounded-full focus:outline-none focus:ring-2 focus:ring-transparent text-gray-700 placeholder:text-black placeholder:opacity-40"
                />
              </div>
            </div>
          </div>


          {/* Description Input */}
          <div>
            <p>คำอธิบาย</p>
            <div>
              <div
                className="border-[1px] w-full gap-2 flex items-center justify-between pr-4 pl-2 rounded-[10px] shadow-md mb-4 border-darkGreen"
              >
                <input
                  type="text"
                  placeholder="คำอธิบาย"
                  className="font-bold bg-transparent flex-1 p-[2px] rounded-full focus:outline-none focus:ring-2 focus:ring-transparent text-gray-700 placeholder:text-black placeholder:opacity-40"
                />
              </div>
            </div>
          </div>

          <div>
            <p>รูปภาพ</p>
            <div className='flex flex-col items-center'>
              <div className="flex justify-center items-center w-full">
                <div className='mb-2'>
                  {imageUrl ? (
                    <Image
                      alt="ProfilePicture"
                      src={imageUrl}
                      height={200}
                      width={500}
                      style={{
                        width: '500px',
                        height: '200px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        boxShadow: '1px 1px 4px 0px rgba(0, 0, 0, 0.25)',
                      }}
                      unoptimized
                    />
                  ) : (
                    <div className="border-[1px] border-black/40 rounded-[8px] w-[320px] flex flex-col">
                      <div className="text-black/30 text-center font-bold px-2 py-[5px] ">รูปภาพ</div>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="profileImageInput"
                />
              </div>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="hover:text-[#FFFFFF]/70 cursor-pointer flex items-center justify-center text-center w-[104px] p-[3px] rounded-full text-[12px] bg-water text-[#FFFFFF] font-semibold shadow-lg"
              >
                <p>แก้ไขรูปภาพ</p>
              </div>
            </div>

          </div>

          <div
            className='absolute bottom-6 left-[125px] shadow-md cursor-pointer text-center text-cream text-[20px] font-bold bg-darkGreen flex items-center justify-center rounded-[10px] w-[100px] h-[40px]'
            onClick={togglePopup}
          >
            <p>บันทึก</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Popup;
