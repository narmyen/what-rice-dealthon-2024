import React from 'react';

interface CardProps {
  title: string;
  value?: number | string;
  className?: string;
}

function CardTemp({ title, value, className = '' }: CardProps) {
  return (
    <div className={`bg-cream rounded-[16px] w-[155px] h-[100px] flex flex-col items-center justify-center ${className}`}>
      <h3>{title}</h3>
      <h1 className="text-[34px]">{value}</h1>
    </div>
  );
}

export default CardTemp;
