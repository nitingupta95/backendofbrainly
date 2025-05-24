import React, { ReactElement } from 'react';

function Sidebaritem({ text, icon, onClick }: { text: string; icon: ReactElement }) {
  return (
    <div className="flex  items-center mx-3 text-gray-700  pr-14 py-1 cursor-pointer hover:bg-gray-200 hover:rounded-sm transition-all" >
      <div className='px-2'>{icon}</div>
      <div className=' px-2' onClick={onClick} >{text}</div>
      
    </div>
  );
}

export default Sidebaritem;
