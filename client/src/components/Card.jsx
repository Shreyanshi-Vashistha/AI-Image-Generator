import React from 'react';

import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo }) => (
  <div className="relative group overflow-hidden rounded-xl shadow-card hover:shadow-cardhover">
    <img
        className="w-full h-auto object-cover rounded-xl"
      src={photo}
      alt={prompt}
    />
    <div className="absolute inset-0 hidden group-hover:flex flex-col justify-end bg-[#10131f] bg-opacity-80 p-4">
      <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>
      <div className="mt-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">{name[0]}</div>
          <p className="text-white text-sm">{name}</p>
        </div>
        <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none">
          <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
        </button>
      </div>
    </div>
  </div>
);

export default Card;
