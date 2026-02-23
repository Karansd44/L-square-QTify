import React, { useEffect, useState } from "react";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Section from "./components/Section/Section";
import { fetchTopAlbums, fetchNewAlbums, fetchSongs, fetchFilters } from "./api/api";

function App() {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [songsData, setSongsData] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [filters, setFilters] = useState([{ key: "all", label: "All" }]);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);

  const generateData = async () => {
    try {
      const topAlbumsData = await fetchTopAlbums();
      setTopAlbums(topAlbumsData);
    } catch (e) {
      console.error("Error fetching top albums:", e);
    }

    try {
      const newAlbumsData = await fetchNewAlbums();
      setNewAlbums(newAlbumsData);
    } catch (e) {
      console.error("Error fetching new albums:", e);
    }

    try {
      const songs = await fetchSongs();
      setSongsData(songs);
      setFilteredSongs(songs);
    } catch (e) {
      console.error("Error fetching songs:", e);
    }

    try {
      const genres = await fetchFilters();
      if (genres && genres.data) {
        setFilters([{ key: "all", label: "All" }, ...genres.data]);
      }
    } catch (e) {
      console.error("Error fetching filters:", e);
    }
  };

  useEffect(() => {
    generateData();
  }, []);

  useEffect(() => {
    if (selectedFilterIndex === 0) {
      setFilteredSongs(songsData);
    } else {
      const selectedGenre = filters[selectedFilterIndex].key;
      const filtered = songsData.filter((song) => song.genre.key === selectedGenre);
      setFilteredSongs(filtered);
    }
  }, [selectedFilterIndex, songsData, filters]);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <div className="sectionContainer">
        <Section title="Top Albums" data={topAlbums} type="album" />
        <Section title="New Albums" data={newAlbums} type="album" />
        <Section
          title="Songs"
          data={filteredSongs}
          type="song"
          filters={filters}
          selectedFilterIndex={selectedFilterIndex}
          setSelectedFilterIndex={setSelectedFilterIndex}
        />
      </div>
    </div>
  );
}

export default App;
