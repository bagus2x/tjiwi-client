import { useEffect, useState } from 'react';

function use100vh() {
  const [height, setHeight] = useState<number | '100vh'>('100vh');

  const getheight = () => {
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    if (height === '100vh') {
      setHeight(window.innerHeight);
      return;
    }

    window.addEventListener('resize', getheight);
    
    return () => window.removeEventListener('resize', getheight);
  }, [height, setHeight]);

  return height;
}

export default use100vh;
