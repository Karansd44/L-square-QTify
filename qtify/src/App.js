import React, { useEffect, useState } from "react";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Section from "./components/Section/Section";
import { fetchTopAlbums, fetchNewAlbums, fetchSongs, fetchFilters } from "./api/api";

const mockAlbumImage = "https://m.media-amazon.com/images/I/91t6+Qy3OFL._SL1500_.jpg";

const generateMockData = (count, titlePrefix) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${titlePrefix}-${i}`,
    title: `${titlePrefix} ${i + 1}`,
    image: mockAlbumImage,
    follows: 100,
    likes: 100,
    songs: Array(10).fill({}),
  }));
};

function App() {
  const [topAlbums, setTopAlbums] = useState(generateMockData(15, "Top Album"));
  const [newAlbums, setNewAlbums] = useState(generateMockData(15, "New Album"));
  const [songsData, setSongsData] = useState(generateMockData(15, "Song"));
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [filters, setFilters] = useState([{ key: "all", label: "All" }]);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);

  const generateData = async () => {
    try {
      const topAlbumsData = await fetchTopAlbums();
      if (topAlbumsData && topAlbumsData.length > 0) {
        const processedData = topAlbumsData.map((album) => ({
          ...album,
          image: album.image || mockAlbumImage,
        }));
        setTopAlbums(processedData);
      }
    } catch (e) {
      console.error("Error fetching top albums:", e);
    }

    try {
      const newAlbumsData = await fetchNewAlbums();
      if (newAlbumsData && newAlbumsData.length > 0) {
        const processedData = newAlbumsData.map((album) => ({
          ...album,
          image: album.image || mockAlbumImage,
        }));
        setNewAlbums(processedData);
      }
    } catch (e) {
      console.error("Error fetching new albums:", e);
    }

    try {
      const songs = await fetchSongs();
      if (songs && songs.length > 0) {
        const processedData = songs.map((song) => ({
          ...song,
          image: song.image || mockAlbumImage,
        }));
        setSongsData(processedData);
        setFilteredSongs(processedData);
      }
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
      const selectedGenre = filters[selectedFilterIndex]?.key;
      if (selectedGenre) {
        const filtered = songsData.filter(
          (song) => song.genre?.key === selectedGenre
        );
        setFilteredSongs(filtered);
      }
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
