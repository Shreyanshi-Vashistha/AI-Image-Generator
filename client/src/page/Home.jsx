import React, { useEffect, useState } from 'react';
import { Card, FormField, Loader } from '../components';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return <h2 className="mt-5 font-bold text-[#6469ff] text-lg uppercase">{title}</h2>;
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    const inputText = e.target.value;
    setSearchText(inputText);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(inputText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(inputText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="container mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="font-extrabold text-[#2d3a4b] text-4xl mb-4">Discover Imaginary Realities</h1>
        <p className="text-[#718096] text-lg max-w-[600px] mx-auto">
          Uncover the wonders of AI-generated worlds with DALL-E. Explore and share the creativity of the community.
        </p>
      </div>

      <div className="mt-8">
        <FormField
          labelName="Search Posts"
          type="text"
          name="text"
          placeholder="Enter keywords..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#718096] text-xl mb-3">
                Showing Results for <span className="text-[#2d3a4b]">"{searchText}"</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
              {searchText ? (
                <RenderCards data={searchedResults} title="No Search Results Found" />
              ) : (
                <RenderCards data={allPosts} title="No Posts Yet" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
