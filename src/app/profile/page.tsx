'use client';
import React, { useRef, useState } from 'react';
import { ProfileIconClick } from '../components/icons/Icons';
import { useRouter } from 'next/navigation'; // นำเข้า useRouter
import Image from 'next/image';

function Page() {
  const router = useRouter();

  const handleClick = () => { };
  const handleLogout = () => { };

  // แยก state สำหรับแต่ละภาพ
  const [idCardImage, setIdCardImage] = useState<string | null>(null);
  const [houseRegistrationImage, setHouseRegistrationImage] = useState<string | null>(null);
  const [landDeedImage, setLandDeedImage] = useState<string | null>(null);
  const [farmerRegistrationImage, setFarmerRegistrationImage] = useState<string | null>(null);

  // แยก ref สำหรับแต่ละ input
  const idCardInputRef = useRef<HTMLInputElement | null>(null);
  const houseRegistrationInputRef = useRef<HTMLInputElement | null>(null);
  const landDeedInputRef = useRef<HTMLInputElement | null>(null);
  const farmerRegistrationInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderImageSection = (
    title: string,
    imageUrl: string | null,
    inputRef: React.RefObject<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => (
    <>
      <div className="w-full text-left px-[15px] pt-3">
        <h1 className="pb-2 text-left font-bold opacity-70 text-[16px] mt-2">{title}</h1>
      </div>
      <div className="cursor-pointer flex justify-center items-center w-full">
        <div className="mb-2">
          {imageUrl ? (
            <Image
              alt={`${title} Image`}
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
            <div className="border-[#000000] border-[2px] opacity-40 rounded-[10px] w-[300px] h-[200px] flex flex-col justify-center items-center">
              <div className="font-semibold opacity-80">{title}</div>
            </div>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(event) => handleFileChange(event, setImage)}
          className="hidden"
        />
      </div>
      <div
        onClick={() => inputRef.current?.click()}
        className="hover:text-cream cursor-pointer flex items-center justify-center w-[80px] px-[3px] py-[5px] rounded-full text-[10px] bg-darkBlue text-cream font-semibold shadow-lg"
      >
        <p>เพิ่มรูปภาพ</p>
      </div>
    </>
  );

  return (
    <div className="h-full px-6 pt-8 bg-cream overflow-scroll flex flex-col items-center hide-scrollbar pb-[100px]">
      <div className="flex flex-col items-center justify-start w-full">
        <div className="bg-white rounded-full w-[135px] h-[135px] flex justify-center items-center my-2">
          <ProfileIconClick />
        </div>
        <h1 className="pb-2 text-center font-bold opacity-70 text-2xl mt-2">ชื่อบัญชีผู้ใช้</h1>
      </div>

      {renderImageSection('บัตรประจำตัวประชาชน', idCardImage, idCardInputRef, setIdCardImage)}
      {renderImageSection('ทะเบียนบ้าน', houseRegistrationImage, houseRegistrationInputRef, setHouseRegistrationImage)}
      {renderImageSection('โฉนดที่ดิน', landDeedImage, landDeedInputRef, setLandDeedImage)}
      {renderImageSection('ทะเบียนเกษตรกร', farmerRegistrationImage, farmerRegistrationInputRef, setFarmerRegistrationImage)}

      <div
        onClick={handleClick}
        className="shadow-md cursor-pointer mt-8 py-[6px] px-[21px] text-center text-cream text-[20px] font-semibold bg-darkBlue flex items-center justify-center rounded-[10px] w-[203px]"
      >
        <p>ดาวน์โหลดเอกสาร</p>
      </div>
      <div
        onClick={handleLogout}
        className="shadow-md cursor-pointer mt-5 py-[6px] px-[21px] text-center text-cream text-[20px] font-semibold bg-redSunday flex items-center justify-center rounded-[10px] w-[164px]"
      >
        <p>ออกจากระบบ</p>
      </div>
    </div>
  );
}

export default Page;