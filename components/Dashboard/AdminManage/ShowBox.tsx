import React, { useState } from 'react';

interface ShowBoxProps {
  title: string; // Title for the ShowBox
  children: React.ReactNode; // Content inside the box
  onClose: () => void; // Close handler
  actionButtons?: React.ReactNode; // Action buttons if any
}

const ShowBox: React.FC<ShowBoxProps> = ({ title, children, onClose, actionButtons }) => {
  const [isMinimized, setIsMinimized] = useState(false); // Track whether the box is minimized
  
  // Toggle minimize and maximize
  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full ${isMinimized ? 'bg-transparent' : 'bg-gray-600 bg-opacity-50'} flex items-center justify-center z-50`}
    >
      <div
        className={`w-[80vw] ${isMinimized ? 'h-[50px] fixed top-[90vh]' : 'h-[80vh]'} mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col`}
      >
        {/* Blue Strip with Minimize and Close Icons */}
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between relative">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold truncate max-w-full">
              {title}
            </h2>
          </div>

          {/* Minimize and Close Button */}
          <div className="flex items-center space-x-2">
            <span
              className="cursor-pointer text-white font-bold hover:text-gray-200 text-xl"
              onClick={toggleMinimize}
            >
              &#x2014; {/* Minimize symbol */}
            </span>
            <span
              className="cursor-pointer text-white font-bold hover:text-gray-200 text-2xl"
              onClick={onClose} // Close button handler
            >
              &times; {/* Close button */}
            </span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className={`p-4 space-y-4 overflow-y-auto flex-1 ${isMinimized ? 'hidden' : ''}`}>
          {children}

          {/* Action Buttons */}
          {actionButtons && (
            <div className="mt-6 flex justify-between space-x-4">
              {actionButtons}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowBox;