import React from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const MobileLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <BottomNav />
    </>
  );
};

export default MobileLayout;
