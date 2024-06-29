import { useState, useEffect } from "react";
import { Heading, Button, Flex } from "@radix-ui/themes";
import { motion } from "framer-motion";
import "./Playlists.css";
// import { playlists } from "./playlists";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "Playlists";

  useEffect(() => {
    if (isTyping) {
      if (displayedText.length < fullText.length) {
        const timeoutId = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, 75); // Adjust typing speed here
        return () => clearTimeout(timeoutId);
      } else {
        setIsTyping(false);
      }
    }
  }, [displayedText, isTyping]);

  //fetch playlists from mongoose
  const fetchPlaylists = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      "http://localhost:4001/mongoPlaylists",
      options
    );
    if (!response.ok) {
      throw new Error("error in fetching playlists");
    }
    const data = await response.json();
    setPlaylists(data);
    console.log("logged playlists from mongoose")
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const deletePlaylist = async(playlist) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({time: playlist.time}),
    }
    const response = await fetch(
      "http://localhost:4001/delete",
      options
    );
    if (!response.ok) {
      throw new Error("error in deleting playlist");
    }
  }

  return (
    <motion.div // Wrap the content with motion.div for scroll transitions
      className="settings playlists-container"
      initial={{ scaleY: 0 }} // Initial state
      animate={{ scaleY: 1 }} // Animation when component is present
      exit={{ scaleY: 0 }} // Animation when component is removed
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} // Transition configuration
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        color: "rgb(228, 238, 225)",
      }}
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="4"
        style={{ maxWidth: "800px", width: "100%" }}
      >
        <Heading align="center" className="heading-large">
          {displayedText}
        </Heading>
        <Heading align="center" className="heading-medium">
          Current Playlist
        </Heading>
        {playlists.length > 0 ? (
          playlists.map((playlist, index) => {
            if (index ===  (playlists.length-1)) {
              return (
                <div key={index}>
                  <div className="playlist-information">
                    <h1 className="playlist-date">{playlist.time}</h1>
                    <h1 className="playlist-mood">{playlist.mood}</h1>
                  </div>
                  <iframe
                    className="spotify-embed"
                    src={playlist.src}
                    width="600rem"
                    height="400"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                  <Flex gap="4" justify="center">
                    <Button className="bt1">Open in Spotify</Button>
                    <Button className="bt1" onClick={()=>{
                      deletePlaylist(playlist);
                      fetchPlaylists();
                      window.location.reload();
                      }}>
                      Delete Playlist from Library
                    </Button>
                  </Flex>
                </div>
              );
            }
          })
        ) : (
          <h1 className="no-playlist">No playlists yet!</h1>
        )}

        <Heading align="center" className="heading-medium">
          Previous Playlists
        </Heading>
        {playlists.length > 1 ? (
          [...playlists].reverse().map((playlist, index) => {
            if (index !== 0) {
              return (
                <div key={index}>
                  <div className="playlist-information">
                    <h1 className="playlist-date">{playlist.time}</h1>
                    <h1 className="playlist-mood">{playlist.mood}</h1>
                  </div>
                  <iframe
                    className="spotify-embed"
                    src={playlist.src}
                    width="600rem"
                    height="400"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                  <Flex gap="4" justify="center">
                    {/* Flex container for the first row of buttons */}
                    <Button className="bt1">Open in Spotify</Button>
                    <Button className="bt1" onClick={()=>{
                      deletePlaylist(playlist);
                      fetchPlaylists();
                      window.location.reload();
                      }}>
                      Delete Playlist from Library
                    </Button>
                  </Flex>
                </div>
              );
            }
          })
        ) : (
            <h1 className="no-playlist">*Add some more playlists!*</h1>
        )}
      </Flex>
    </motion.div>
  );
};

export default Playlists;
