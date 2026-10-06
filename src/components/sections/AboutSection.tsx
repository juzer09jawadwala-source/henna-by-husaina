import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <div 
      className="relative w-full h-[100svh] min-h-[600px] z-10 overflow-hidden"
    >
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/husaina.jpeg")' }}
      />
    </div>
  );
};

export default AboutSection;
