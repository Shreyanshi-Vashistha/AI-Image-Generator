import React from 'react';

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700"
    >
      {labelName}
    </label>

    <div className="flex items-center mt-2">
      <input
        type={type}
        id={name}
        name={name}
        className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-[#6469ff] focus:border-[#6469ff] outline-none w-full py-2 px-4"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />

      {isSurpriseMe && (
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="ml-2 px-4 py-2 rounded-md text-white font-semibold bg-[#6469ff] hover:bg-[#4c51bf] focus:outline-none focus:ring focus:border-[#6469ff] transition duration-300"
        >
          Random
        </button>
      )}
    </div>
  </div>
);

export default FormField;
