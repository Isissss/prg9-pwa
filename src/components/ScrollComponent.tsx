import React, { useEffect, useRef, useState } from 'react';

function ScrollScaleComponent() {
  const [scaleX, setScaleX] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrollYProgress = scrollY / height; 
      setScaleX(scrollYProgress * 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={ref} style={{ width: `${scaleX}%` }} className='fixed inset-0 z-30 bg-[#d3104c] w-full h-3'>
     
    </div>
  );
}

export default ScrollScaleComponent;
