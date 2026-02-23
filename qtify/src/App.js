import React, { useEffect, useState } from "react";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Section from "./components/Section/Section";
import { fetchTopAlbums, fetchNewAlbums, fetchSongs, fetchFilters } from "./api/api";

const mockAlbumImage = "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/05/9a/5c/059a5c6b-9e4a-5b1a-8c1a-8ced94819dfb/6805132.jpg/600x600bf.jpg";

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
      if (topAlbumsData && topAlbumsData.length > 0) {
        const processedData = topAlbumsData.map((album) => ({
          ...album,
          image: album.image || mockAlbumImage,
        }));
        setTopAlbums(processedData);
      } else {
        // Fallback to internal mocks ONLY if API fails and we have nothing
        setTopAlbums(Array.from({ length: 15 }, (_, i) => ({
          id: `top-${i}`,
          title: `Top Album ${i + 1}`,
          image: mockAlbumImage,
          follows: 100,
          songs: Array(10).fill({}),
        })));
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
      } else {
        setNewAlbums(Array.from({ length: 15 }, (_, i) => ({
          id: `new-${i}`,
          title: `New Album ${i + 1}`,
          image: mockAlbumImage,
          follows: 100,
          songs: Array(10).fill({}),
        })));
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
      } else {
        const mockSongs = Array.from({ length: 15 }, (_, i) => ({
          id: `song-${i}`,
          title: `Song ${i + 1}`,
          image: mockAlbumImage,
          likes: 100,
          genre: { key: 'all' }
        }));
        setSongsData(mockSongs);
        setFilteredSongs(mockSongs);
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
