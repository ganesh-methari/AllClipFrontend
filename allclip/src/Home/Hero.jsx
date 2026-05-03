// import React, { useState } from 'react'
// import { Link } from 'react-router-dom';
// import { FiDownloadCloud } from "react-icons/fi";
// import { MdDarkMode } from "react-icons/md";
// import { CiLight } from "react-icons/ci";
// import { useTheme } from '../ThemeContext';
// import axios from 'axios';

// const Hero = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const toggleMenu = () => { setIsMenuOpen(!isMenuOpen) };
//   const { isDark, toggleTheme, colors, currentColors } = useTheme();


//   const [url, setUrl] = useState("");
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(false);



// return (
//   <>
//     <style>
//       {`
//                 @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
//                 *{
//                     font-family: "Poppins", sans-serif;
//                 }
//             `}
//     </style>
//     <section className=' px-4 pt-5 md:pb-32 relative' style={{ backgroundColor: currentColors.bg, transition: 'background-color 0.3s ease' }}>



//       <div className="flex items-center gap-2 border border-white/15 rounded-full pl-2 pr-3 py-1 text-sm w-fit mt-32 mx-auto" style={{ backgroundColor: isDark ? colors.dark.card : colors.light.card, borderColor: currentColors.border }}>

//         <span className="text-indigo-500 text-base">•</span>
//         <h1 style={{ color: currentColors.text }}>Free and open-source universal downloader</h1>
//       </div>

//       <h1 className="text-4xl md:text-[58px]/19 text-center max-w-4xl mx-auto mt-4 text-white bg-clip-text leading-tight font-medium" style={{ color: currentColors.text }}>Download from 15+ Platforms.</h1>
//       <p className="text-base mx-auto text-center mt-4" style={{ color: currentColors.secondary }}>
//         YouTube, Instagram, TikTok, X, Facebook & 44+ platforms. Video or Audio. Any quality. Always free.
//       </p>

//       <div className="flex items-center gap-4 mt-6 justify-center" onClick={toggleMenu}>
//         <Link to="/download" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-md transition-colors duration-300">
//           <FiDownloadCloud size={20} />
//           Download Now
//         </Link>

//       </div>
//     </section>
//   </>
// )
// };
//

// code export default Hero

import { useState } from "react";
import axios from "axios";

function AudioDownloader() {
  const [url, setUrl] = useState("");
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API = "http://localhost:5000/media";

  /* ================= GET INFO ================= */
  const getInfo = async () => {
    if (!url) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setAudio(null);

      const res = await axios.post(`${API}/info`, { url });
      setAudio(res.data);
    } catch (err) {
      setError(
        err.response?.data?.details ||
        err.response?.data?.error ||
        "Failed to fetch info"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= DOWNLOAD MP3 ================= */
  const download = () => {
    if (!url) {
      setError("Enter a valid URL");
      return;
    }

    const link = document.createElement("a");
    link.href = `${API}/download?url=${encodeURIComponent(url)}`;
    link.click();
  };

  /* ================= FORMAT TIME ================= */
  const formatTime = (sec) => {
    if (!sec) return "0:00";
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-xl text-center">

        <h2 className="text-2xl font-bold mb-4">
          🎧 Audio Downloader (MP3)
        </h2>

        {/* INPUT */}
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube / SoundCloud URL..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* BUTTONS */}
        <div className="flex gap-3 justify-center mt-4">
          <button
            onClick={getInfo}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Get Info
          </button>

          {audio && (
            <button
              onClick={download}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Download MP3
            </button>
          )}
        </div>

        {/* LOADING */}
        {loading && (
          <p className="mt-4 text-gray-600 animate-pulse">
            Fetching audio info...
          </p>
        )}

        {/* ERROR */}
        {error && (
          <p className="mt-4 text-red-500 font-medium">
            {error}
          </p>
        )}

        {/* AUDIO INFO */}
        {audio && (
          <div className="mt-6 border rounded-lg p-4">

            <h3 className="font-semibold text-lg mb-2">
              {audio.title}
            </h3>

            {audio.thumbnail && (
              <img
                src={audio.thumbnail}
                alt="thumbnail"
                className="mx-auto rounded-lg mb-3"
              />
            )}

            <p className="text-sm text-gray-600">
              🎤 {audio.uploader}
            </p>

            <p className="text-sm text-gray-500">
              ⏱ Duration: {formatTime(audio.duration)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AudioDownloader;