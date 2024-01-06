import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section className="container mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-800">Generate an Image</h1>
        <p className="mt-2 text-gray-600">
          Create a visually captivating image using DALL-E AI and share it with the community to spark imagination.
        </p>
      </div>

      <form className="mt-8 max-w-2xl mx-auto" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            labelName="Name"
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="Turn your imagination into a picture (e.g. Horse with straw)"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
        </div>

        <div className="mt-6">
          <div className="relative bg-gray-100 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-4 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover opacity-40 rounded-lg"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-10 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={generateImage}
            className="font-inter font-medium bg-[#ff7e5f] hover:bg-[#ff4d21] text-white rounded-md text-sm px-6 py-2 transition duration-300 ease-in-out hover:bg-green-600"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
          After generating the desired image, feel free to share it with fellow community members. </p>
          <button
            type="submit"
            className="mt-4 text-white bg-[#6469ff] font-medium rounded-md text-sm px-6 py-2 transition duration-300 ease-in-out hover:bg-[#4f56cc]"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
