import { useState, useEffect } from "react";
import { Heading, Button, Flex } from "@radix-ui/themes";
import { motion } from "framer-motion";
import "./Playlists.css";
import { playlists } from './playlists'

const Playlists = () => {
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
        // setTimeout(() => {
        //   setDisplayedText("");
        //   setIsTyping(true);
        // }, 3000); // 3 seconds delay before restarting
      }
    }
  }, [displayedText, isTyping]);

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
        <Heading align="center" className="head">
          Current Playlist
        </Heading>
        {playlists.map((playlist, index) => {
          if (index === 0){
            return(
                <div key={index}>
                  <iframe
                    className="spotify-embed" 
                    src= {playlist.src}
                    width="600rem"
                    height="400"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                  <Flex gap="4" justify="center">
                    <Button className="bt1">Open in Spotify</Button>
                    <Button className="bt1">Delete Playlist from Library</Button>
                  </Flex>
                </div>
            )
          }
        })}

        <Heading align="center" className="heading-medium">
          Previous Playlists
        </Heading>
        {playlists.map((playlist, index) => {
          if (index !== 0){
            return(
              <div key={index}>
                <iframe
                  className="spotify-embed"
                  src = {playlist.src}
                  width="600rem"
                  height="400"
                  frameBorder="0"
                  allowFullScreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
                <Flex gap="4" justify="center">
                  {/* Flex container for the first row of buttons */}
                  <Button className="bt1">Open in Spotify</Button>
                  <Button className="bt1">Delete Playlist from Library</Button>
                </Flex>
              </div>
            )
          }
        })}
      </Flex>
    </motion.div>
  );
};

export default Playlists;
