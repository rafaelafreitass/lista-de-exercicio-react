import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  // Dados iniciais
  const initialSongs = [
    { id: 1, title: "Bohemian Rhapsody", artist: "Queen", duration: "5:55", favorite: true },
    { id: 2, title: "Blinding Lights", artist: "The Weeknd", duration: "3:22", favorite: false },
    { id: 3, title: "Shape of You", artist: "Ed Sheeran", duration: "3:54", favorite: true },
    { id: 4, title: "Billie Jean", artist: "Michael Jackson", duration: "4:54", favorite: false },
    { id: 5, title: "Bad Guy", artist: "Billie Eilish", duration: "3:14", favorite: false },
    { id: 6, title: "Stayin' Alive", artist: "Bee Gees", duration: "4:45", favorite: true },
    { id: 7, title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", duration: "4:30", favorite: false },
    { id: 8, title: "Smells Like Teen Spirit", artist: "Nirvana", duration: "5:01", favorite: true },
  ];

  // Estados SIMPLIFICADOS
  const [songs] = useState(initialSongs);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [playlists, setPlaylists] = useState([
    { id: 1, name: "as melhores!", songs: [1, 3, 6, 8] },
    { id: 2, name: "favoritas", songs: [2, 3, 5, 7] },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);
  const [favorites, setFavorites] = useState([1, 3, 6, 8]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null); // playlist id ou null

  const progressIntervalRef = useRef(null);
  const currentSong = songs[currentSongIndex];

  // Filtra músicas SIMPLES
  const filteredSongs = searchTerm 
    ? songs.filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : songs;

  // Funções DIRETAS
  const handlePlaySong = (index) => {
    if (currentSongIndex === index) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSongIndex(index);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setProgress(0);
  };

  const handlePrevSong = () => {
    const prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    setProgress(0);
  };

  const handleToggleFavorite = (songId) => {
    setFavorites(prev => 
      prev.includes(songId) 
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    );
  };

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) return;
    
    const newPlaylist = {
      id: Date.now(),
      name: newPlaylistName,
      songs: []
    };
    
    setPlaylists(prev => [...prev, newPlaylist]);
    setNewPlaylistName("");
    setShowPlaylistForm(false);
  };

  const handleAddToPlaylist = (songId, playlistId) => {
    if (!playlistId) return;
    
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId && !playlist.songs.includes(songId)) {
        return { ...playlist, songs: [...playlist.songs, songId] };
      }
      return playlist;
    }));
  };

  const handleRemoveFromPlaylist = (songId, playlistId) => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        return { ...playlist, songs: playlist.songs.filter(id => id !== songId) };
      }
      return playlist;
    }));
  };

  const handleDeletePlaylist = (playlistId) => {
    setPlaylists(prev => prev.filter(playlist => playlist.id !== playlistId));
    setShowDeleteConfirm(null);
    
    // Se a playlist sendo visualizada for excluída, fecha a visualização
    if (selectedPlaylistId === playlistId) {
      setSelectedPlaylistId(null);
    }
  };

  const handleViewPlaylist = (playlistId) => {
    setSelectedPlaylistId(playlistId);
    setShowDeleteConfirm(null);
  };

  const handleClosePlaylistView = () => {
    setSelectedPlaylistId(null);
    setShowDeleteConfirm(null);
  };

  // Progresso SIMPLIFICADO
  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNextSong();
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
    }
    
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className="spotify-clone">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-text">SomLivre</span>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar músicas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="user-menu">
          <button 
            className="new-playlist-btn" 
            onClick={() => setShowPlaylistForm(!showPlaylistForm)}
          >
            + Nova Playlist
          </button>
        </div>
      </header>
      
      {/* Formulário de Playlist */}
      {showPlaylistForm && (
        <div className="playlist-form">
          <input
            type="text"
            placeholder="Nome da nova playlist"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className="playlist-input"
          />
          <button onClick={handleCreatePlaylist} className="create-playlist-btn">
            Criar
          </button>
          <button onClick={() => setShowPlaylistForm(false)} className="cancel-btn">
            Cancelar
          </button>
        </div>
      )}
      
      {/* Confirmação de exclusão */}
      {showDeleteConfirm && (() => {
        const playlistToDelete = playlists.find(p => p.id === showDeleteConfirm);
        if (!playlistToDelete) return null;
        
        return (
          <div className="delete-confirm">
            <div className="delete-confirm-content">
              <p>Tem certeza que deseja excluir a playlist "{playlistToDelete.name}"?</p>
              <div className="delete-confirm-buttons">
                <button 
                  className="delete-confirm-btn delete-btn"
                  onClick={() => handleDeletePlaylist(playlistToDelete.id)}
                >
                  Excluir
                </button>
                <button 
                  className="delete-confirm-btn cancel-delete-btn"
                  onClick={() => setShowDeleteConfirm(null)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        );
      })()}
      
      {/* Conteúdo Principal */}
      <div className="main-content">
        {/* Painel Esquerdo - Playlists */}
        <div className="left-panel">
          <h2>Suas Playlists</h2>
          <div className="playlists-grid">
            {playlists.filter(p => 
              p.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(playlist => (
              <div key={playlist.id} className="playlist-card">
                <div className="playlist-info">
                  <h3>{playlist.name}</h3>
                  <p>{playlist.songs.length} músicas</p>
                </div>
                <div className="playlist-actions">
                  <button 
                    className="view-playlist-btn"
                    onClick={() => handleViewPlaylist(playlist.id)}
                  >
                    Ver
                  </button>
                  <button 
                    className="delete-playlist-btn"
                    onClick={() => setShowDeleteConfirm(playlist.id)}
                  >
                    🗑
                  </button>
                  {selectedPlaylistId === playlist.id && (
                    <button 
                      className="close-playlist-btn"
                      onClick={handleClosePlaylistView}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Visualização de Playlist Específica */}
          {selectedPlaylistId && (() => {
            const playlist = playlists.find(p => p.id === selectedPlaylistId);
            if (!playlist) return null;
            
            const playlistSongs = songs.filter(song => playlist.songs.includes(song.id));
            
            return (
              <div className="playlist-view">
                <div className="playlist-view-header">
                  <h2>{playlist.name}</h2>
                  <p>{playlistSongs.length} músicas na playlist</p>
                  <button 
                    className="delete-current-playlist-btn"
                    onClick={() => setShowDeleteConfirm(playlist.id)}
                  >
                    Excluir Playlist
                  </button>
                </div>
                <div className="playlist-songs">
                  {playlistSongs.map(song => (
                    <div key={song.id} className="playlist-song-item">
                      <div className="song-details">
                        <h4>{song.title}</h4>
                        <p>{song.artist} • {song.duration}</p>
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveFromPlaylist(song.id, playlist.id)}
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                  {playlistSongs.length === 0 && (
                    <p className="empty-playlist">Nenhuma música nesta playlist</p>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
        
        {/* Painel Direito - Músicas */}
        <div className="right-panel">
          {!selectedPlaylistId && (
            <>
              <h2>{searchTerm ? "Resultados da Busca" : "Todas as Músicas"}</h2>
              <div className="songs-container">
                {filteredSongs.map((song, index) => (
                  <div 
                    key={song.id} 
                    className={`song-card ${currentSongIndex === index ? 'active' : ''}`}
                  >
                    <div className="song-info">
                      <h3>{song.title}</h3>
                      <p>{song.artist} • {song.duration}</p>
                    </div>
                    <div className="song-controls">
                      <button 
                        className={`favorite-btn ${favorites.includes(song.id) ? 'active' : ''}`}
                        onClick={() => handleToggleFavorite(song.id)}
                      >
                        {favorites.includes(song.id) ? '★' : '☆'}
                      </button>
                      <button 
                        className="play-btn"
                        onClick={() => handlePlaySong(index)}
                      >
                        {currentSongIndex === index && isPlaying ? '⏸' : '▶'}
                      </button>
                      <select 
                        defaultValue=""
                        onChange={(e) => {
                          const playlistId = parseInt(e.target.value);
                          if (playlistId) {
                            handleAddToPlaylist(song.id, playlistId);
                            e.target.value = "";
                          }
                        }}
                        className="add-to-playlist"
                      >
                        <option value="" disabled>Adicionar à playlist...</option>
                        {playlists.map(playlist => (
                          <option key={playlist.id} value={playlist.id}>
                            {playlist.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Player */}
      <div className="player">
        <div className="player-info">
          {currentSong ? (
            <>
              <h3>{currentSong.title}</h3>
              <p>{currentSong.artist}</p>
            </>
          ) : (
            <>
              <h3>Selecione uma música</h3>
              <p>Clique em ▶ para começar</p>
            </>
          )}
        </div>
        
        <div className="player-controls">
          <button className="control-btn" onClick={handlePrevSong}>⏮</button>
          <button className="play-pause-btn" onClick={handleTogglePlay}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button className="control-btn" onClick={handleNextSong}>⏭</button>
        </div>
        
        <div className="player-progress">
          <div 
            className="progress-bar" 
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPosition = e.clientX - rect.left;
              const progressBarWidth = rect.width;
              const newProgress = (clickPosition / progressBarWidth) * 100;
              setProgress(Math.min(100, Math.max(0, newProgress)));
            }}
          >
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-time">
            {Math.floor((progress / 100) * 300)}s / {currentSong?.duration || '0:00'}
          </span>
        </div>
        
        <div className="player-volume">
          <span>🔊</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="volume-slider"
          />
          <span>{volume}%</span>
        </div>
      </div>
    </div>
  );
}

export default App;