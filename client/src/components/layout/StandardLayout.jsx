import React from 'react';
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";

function StandardLayout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1 }}>
        <Navbar />
        <div style={{ paddingTop: '60px', paddingBottom: '100px', flex: 1 }}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StandardLayout;
