import React from 'react';

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-900 bg-opacity-90 text-white z-50">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4 animate-spin"></div>
      <p className="text-lg font-semibold">{message}</p>
    </div>
  );
};
