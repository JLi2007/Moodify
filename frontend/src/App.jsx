import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Analyze from "./pages/Analyze/Analyze.jsx";
import Playlists from "./pages/Playlists/Playlists.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import Login from "./pages/Login/Login.jsx";
import { TabNav } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import "./style/index.css"; 
import Logo from "/moodify.png";

function App() {

  return (
    <div>
      <div className="navbar">
        <TabNav.Root className="nav-left">
          <TabNav.Link active>
            <a href="/">
              <img src={Logo} alt="Moodify Logo" />
            </a>
          </TabNav.Link>
        </TabNav.Root>
        
        <TabNav.Root className="nav-right">
          <TabNav.Link>
            <Link to="/analyze">Analyze</Link>
          </TabNav.Link>
          <TabNav.Link>
            <Link to="/playlists">Playlists</Link>
          </TabNav.Link>
          <TabNav.Link>
            <Link to="/settings">Settings</Link>
          </TabNav.Link>
          <TabNav.Link>
            <Link to="/login">Login</Link>
          </TabNav.Link>
        </TabNav.Root>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
