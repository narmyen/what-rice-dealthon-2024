import React, { useState, useEffect } from 'react';

interface CalendarProps {
  selectedStatus: string;
  date: string;
}

// Function to generate mock data dynamically in "dd-mm-yyyy" format
const generateMockupData = () => {
  const mockData: { [key: string]: string } = {};
  const dateRanges = [
    { start: 1, end: 5, month: 10, year: 2024, status: 'แห้ง' },
    { start: 6, end: 22, month: 10, year: 2024, status: 'เปียก' },
  ];

  dateRanges.forEach((range) => {
    for (let day = range.start; day <= range.end; day++) {
      const dayString = day.toString().padStart(2, '0');
      const monthString = (range.month + 1).toString().padStart(2, '0'); // Month as 2-digit
      const dateKey = `${dayString}-${monthString}-${range.year}`;
      mockData[dateKey] = range.status;
    }
  });

  return mockData;
};

const mockupDateAndStatus = generateMockupData();

function Calendar({ selectedStatus, date }: CalendarProps) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const currentDate = today.getDate();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const [statusByDay, setStatusByDay] = useState<{ [key: number]: string }>({});

  // Generate calendar days including empty days at the start for alignment
  const calendarDays = [
    ...Array.from({ length: firstDayOfMonth }, () => null), // Empty slots for first day offset
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1), // Actual days of the month
  ];

  const monthNames = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
  ];

  const daysOfWeek = [
    { day: 'Sun', color: 'bg-redSunday' },
    { day: 'Mon', color: 'bg-mango' },
    { day: 'Tue', color: 'bg-pinki' },
    { day: 'Wed', color: 'bg-lightGreen' },
    { day: 'Thu', color: 'bg-orange' },
    { day: 'Fri', color: 'bg-blue' },
    { day: 'Sat', color: 'bg-purr' },
  ];

  // Effect to log selected date and status on load
  useEffect(() => {
    console.log(`Selected Date: ${date}, Status: ${selectedStatus}`);

    // Set the status for the current date when loaded
    if (currentDate) {
      setStatusByDay((prevStatus) => ({
        ...prevStatus,
        [currentDate]: selectedStatus,
      }));
    }
  }, [date, selectedStatus, currentDate]);

  return (
    <div className="pt-8 flex flex-col items-center bg-white overflow-scroll hide-scrollbar">
      <div>
        <h1 className="text-[29px] font-bold opacity-70">{`${monthNames[month]} ${year}`}</h1>
      </div>

      <div className="grid grid-cols-7 mt-4 w-full">
        {/* Render day of the week headers */}
        {daysOfWeek.map((dayInfo) => (
          <div key={dayInfo.day} className={`text-center py-2 font-medium opacity-80 ${dayInfo.color}`}>
            {dayInfo.day}
          </div>
        ))}

        {/* Render days of the month */}
        {calendarDays.map((day, index) => {
          const dayString = day ? `${day.toString().padStart(2, '0')}-${(month + 1).toString().padStart(2, '0')}-${year}` : '';
          const status = day && mockupDateAndStatus[dayString]; // Get status from mock data if available

          return (
            <div
              key={index}
              className={`relative flex flex-col items-start p-1 aspect-square border-[1px] cursor-pointer 
                ${day === currentDate ? 'bg-darkGreen text-white' : day ? 'bg-white' : ''}`}
            >
              {/* Render actual day and status */}
              {day && (
                <>
                  <p className="text-sm font-medium self-start">{day}</p>
                  {status && (
                    <p
                      className={`text-center mt-1 p-[2px] rounded-full w-[30px] font-semibold text-[8px] ${status === 'เปียก' ? 'text-darkBlue bg-cream ' : 'bg-cream text-orange '
                        }`}
                    >
                      {status}
                    </p>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
