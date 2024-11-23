'use client'

import React, { useState } from 'react'
import {
  PredictIcon,
  PredictIconClick,
  ProfileIcon,
  SavedIconClick,
  SaveIcon,
  WaterIcon,
  WaterIconClick,
  ProfileIconClick
} from './icons/Icons'
import { usePathname, useRouter } from 'next/navigation'

function Navigation() {
  const pathname = usePathname(); // Get the current pathname from the router
  const router = useRouter();

  // State to track the active button (which one is toggled)
  const [activeButton, setActiveButton] = useState<string>(''); // Tracks the active button path

  // Define the buttons and their corresponding icons in an array
  const buttons = [
    { path: '/save', defaultIcon: <SaveIcon />, clickedIcon: <SavedIconClick />, title: "บันทึก" },
    { path: '/predict', defaultIcon: <PredictIcon />, clickedIcon: <PredictIconClick />, title: "พยากรณ์" },
    { path: '/water', defaultIcon: <WaterIcon />, clickedIcon: <WaterIconClick />, title: "จัดการน้ำ" },
    { path: '/profile', defaultIcon: <ProfileIcon />, clickedIcon: <ProfileIconClick />, title: "โปรไฟล์" }
  ];

  const handleRedirect = (path: string) => {
    // Only change the active button if a different button is clicked
    if (activeButton !== path) {
      setActiveButton(path);
      router.push(path);
    }
  };

  return (
    <div className="bg-green w-full h-[80px] absolute bottom-0 left-0 transition translate-all duration-300">
      <div className="flex justify-between items-center h-full px-8">
        {buttons.map(({ path, defaultIcon, clickedIcon, title }) => (
          <button
            key={path}
            onClick={() => handleRedirect(path)}
            className={`${pathname === path || activeButton === path ? 'bg-cream' : ''} relative pb-2 transition-all duration-200 w-[66px] h-[66px] rounded-[1rem] flex flex-col text-[10px] items-center justify-center`}
          >
            {activeButton === path ? clickedIcon : defaultIcon}
            <p className={`absolute bottom-[6px] font-bold ${activeButton === path ? "text-darkGreen" : "text-cream"}`}>{title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Navigation;
