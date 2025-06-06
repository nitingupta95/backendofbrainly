import * as React from 'react';

interface YoutubeIconProps {
  className?: string;
}


function LinkIcon({ className }: YoutubeIconProps) {
  return (
    <div>
      <img width="15" height="14" src="https://img.icons8.com/forma-light-filled/24/link.png" alt="link" className='text-black size-5'/>
     </div>
  )
}

export default LinkIcon