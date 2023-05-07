import React, { useState } from 'react';
import YouTubeVideo from '../components/youtubeVideo';
import VideoModal from "../components/videoModal";

function SearchForm() {
  const [searchInput, setSearchInput] = useState('');
  const [searchedData, setSearchedData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${searchInput}&type=video&part=snippet`
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const { items } = await response.json();
      const searchedData = items.map((search) => ({
        id: search.id.videoId,
        title: search.snippet.title,
        description: search.snippet.description,
        image: search.snippet.thumbnails.default.url,
      }));

      setSearchedData(searchedData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleThumbnailClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div>
      <h1 className="title">SEARCH</h1>
      <form className="searchForm" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            className="entryField"
            value={searchInput}
            onChange={handleSearchChange}
            required
          />
        </div>
        <button type="submit">Search</button>
      </form>
      {selectedVideo && (
         <div className="">
          <div  className="">
            <YouTubeVideo videoId={selectedVideo} />

            <button className="closeButton" onClick={handleCloseModal}>
              Close
            </button>
       </div>
        // </div>
      )}
      {searchedData.map((search) => (
        <div className="searchData" key={search.id}>
          <h2>{search.title}</h2>
          <p>{search.description}</p>
          <img
            src={search.image}
            alt="Thumbnail"
            onClick={() => handleThumbnailClick(search.id)}
          />
        </div>
      ))}

      
    </div>
  );
}

export default SearchForm;
