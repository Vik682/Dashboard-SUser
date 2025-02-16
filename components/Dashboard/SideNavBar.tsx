"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Define types for the Button component props
interface ButtonProps {
  label: string;
  path: string;
}

const SideNavBar: React.FC = () => {
  const router = useRouter();

  // Updated Button component with proper types
  const Button: React.FC<ButtonProps> = ({ label, path }) => (
    <button
      onClick={() => router.push(path)}
      className="w-full text-black py-2 px-4 rounded-md shadow-md hover:bg-blue-500 text-left overflow-hidden text-ellipsis whitespace-nowrap"
    >
      {label}
    </button>
  );  

  // Buttons array with inferred types for label and path
  const buttons: { label: string; path: string }[] = [
    { label: 'Admin Manage', path: '/Dashboard/AdminManage' }
  ];

  return (
    <div className="fixed top-0 left-0 w-48 bg-white text-black h-screen flex flex-col shadow-md z-40">
      <div className="flex items-center justify-center p-3 py-4 bg-white-200 border-b border-gray-300">
      <Image
            src="/images/profile.webp" // Replace with your profile picture URL
            alt="Profile"
            width={40}  // Specify the width of the image (in pixels)
            height={40} // Specify the height of the image (in pixels)
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
      </div>
      <div className="text-black w-full text-sm p-3 bg-gray-200 border-b border-gray-300">Modules</div>
      <div className="flex-1 overflow-y-auto p-3">
        {buttons.map(({ label, path }) => (
          <Button key={path} label={label} path={path} />
        ))}
      </div>
    </div>
  );
};

export default SideNavBar;