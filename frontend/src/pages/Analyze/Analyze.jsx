import ManageVideoOnCanvas from "@detection/components/ManageVideoOnCanvas";
import { Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import "./Analyze.css";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { ShuffleIcon } from "@radix-ui/react-icons";
import sendPrediction, {
  prediction,
} from "@detection/Common/tensorflowPredictions.js";

const Analyze = () => {
  const handleButtonClick = () => {
    sendPrediction(prediction);
  };

  return (
    <div id="analyze-container" style={{ overflow: "none" }}>
      <ManageVideoOnCanvas/>

      <div id="analyze-buttons">
        <Button onClick={handleButtonClick} size="4" id="spotify-button">
          <MagicWandIcon />
          Generate Playlists
        </Button>

        <div id="div-to-playlists">
          <Link to="/playlists">
            <button id="button-to-playlists" size="4">
              <ShuffleIcon />
              Playlists
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
