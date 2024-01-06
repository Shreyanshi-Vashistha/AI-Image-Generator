import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';
import { Home, CreatePost } from './page';

const App = () => (
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-gradient-to-r from-[#b1c5de] to-[#6469ff] sm:px-8 px-4 py-4 border-b border-[#1a202c]">
      <Link to="/">
        <img src={logo} alt="logo" className="w-28 object-contain" />
      </Link>

      <Link to="/create-post" className="font-inter font-medium bg-[#ff7e5f] hover:bg-[#ff4d21] text-white px-4 py-2 rounded-md transition duration-300 ease-in-out">
        Create
      </Link>
    </header>

    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>

    <footer className="w-full bg-white sm:px-8 px-4 py-4 border-t border-[#1a202c] text-[#6469ff] text-center">
      <p>&copy; 2024 - Shreyanshi Vashistha. All rights reserved.</p>
    </footer>
  </BrowserRouter>
);

export default App;
