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

// code export default Hero;




// import { useState } from "react";
// import axios from "axios";

// function App() {
//   const [url, setUrl] = useState("");
//   const [audio, setAudio] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const API = "http://localhost:5000/music";

//   const getInfo = async () => {
//     if (!url) return setError("Enter URL");

//     try {
//       setLoading(true);
//       setError("");
//       setAudio(null);

//       const res = await axios.post(`${API}/info`, { url });
//       setAudio(res.data);
//     } catch (err) {
//       setError(err.response?.data?.error || "Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const download = () => {
//     if (!url) return setError("Enter URL");

//     // better than window.open
//     window.location.href = `${API}/download?url=${encodeURIComponent(url)}`;
//   };

//   const formatTime = (sec) => {
//     if (!sec) return "0:00";
//     const m = Math.floor(sec / 60);
//     const s = sec % 60;
//     return `${m}:${s.toString().padStart(2, "0")}`;
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xl text-center">

//         <h2 className="text-2xl font-bold mb-4">
//           🎧 Audio Downloader
//         </h2>

//         <input
//           type="text"
//           placeholder="Paste YouTube URL..."
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           className="w-full p-3 border rounded-lg"
//         />

//         <div className="flex gap-3 justify-center mt-4">
//           <button
//             onClick={getInfo}
//             disabled={loading}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//           >
//             {loading ? "Loading..." : "Get Info"}
//           </button>

//           {audio && (
//             <button
//               onClick={download}
//               className="bg-green-500 text-white px-4 py-2 rounded-lg"
//             >
//               Download MP3
//             </button>
//           )}
//         </div>

//         {error && <p className="text-red-500 mt-3">{error}</p>}

//         {audio && (
//           <div className="mt-5 border p-4 rounded-lg">
//             <h3 className="font-bold">{audio.title}</h3>

//             {audio.thumbnail && (
//               <img
//                 src={audio.thumbnail}
//                 alt="thumb"
//                 className="mx-auto mt-2 rounded"
//               />
//             )}

//             <p className="text-sm mt-2">🎤 {audio.uploader}</p>
//             <p className="text-sm">⏱ {formatTime(audio.duration)}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
// import { useState } from "react";
// import axios from "axios";

// function App() {
//   const [url, setUrl] = useState("");
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(false);

//   /* 🔹 Get Info */
//   const getInfo = async () => {
//     if (!url) return alert("Paste link ❌");

//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/music/info",
//         { url }
//       );
//       setVideo(res.data);
//     } catch {
//       alert("Error ❌");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">

//       <h1 className="text-3xl font-bold mb-6">
//         Music Downloader 🎧
//       </h1>

//       <input
//         className="p-3 rounded w-80 bg-gray-800 border border-gray-700"
//         placeholder="Paste YouTube link"
//         onChange={(e) => setUrl(e.target.value)}
//       />

//       <button
//         className="bg-blue-500 px-6 py-2 mt-4 rounded"
//         onClick={getInfo}
//       >
//         {loading ? "Loading..." : "Get Info"}
//       </button>

//       {video && (
//         <div className="mt-6 text-center">
//           <h2 className="mb-2">{video.title}</h2>

//           <img
//             src={video.thumbnail}
//             alt="thumb"
//             className="w-80 rounded"
//           />

//           {/* 🎧 Format Buttons */}
//           <div className="mt-4">
// {video && (
//   <div className="mt-6 text-center">

//     <h2 className="mb-4 text-lg font-bold">
//       AUDIO DOWNLOAD LINKS
//     </h2>

//     <div className="text-left bg-gray-800 p-4 rounded w-96">

//  {video && (
//   <div className="text-white w-full max-w-md">

//     {/* Title */}
//     <h2 className="text-center text-lg font-bold mb-4">
//       AUDIO DOWNLOAD LINKS
//     </h2>

//     {/* List */}
//     <div className="space-y-3">
// {video && (
//   <div className="text-white w-full max-w-md font-sans">

//     <h2 className="text-center text-sm text-gray-300 mb-4">
//       AUDIO DOWNLOAD LINKS
//     </h2>

//     <div className="space-y-2">
// {video && (
//   <div className="text-white w-full max-w-md font-sans">



//     <div className="space-y-2">

//       {[
//         { label: "M4A 128 kbps", min: 120 },
//         { label: "M4A 128 kbps", min: 110 }, // second variant (like your example)
//         { label: "MP4 160 kbps", min: 140 },
//         { label: "MP3 160 kbps", min: 80 },
//       ].map((item, i) => {

//         // pick closest format
//         const f =
//           video.formats
//             .filter(x => x.bitrate >= item.min)
//             .sort((a, b) => a.bitrate - b.bitrate)[0];

//         if (!f) return null;

//         return (
//           <div
//             key={i}
//             onClick={() =>
//               window.open(
//                 `http://localhost:5000/music/download?url=${encodeURIComponent(url)}&format=${f.format_id}`
//               )
//             }
//             className="cursor-pointer text-sm text-gray-200 hover:text-green-400"
//           >
//             {item.label} {f.size}
//           </div>
//         );
//       })}

//     </div>
//   </div>
// )}

//     </div>
//   </div>
// )}

//     </div>
//   </div>
// )}

//     </div>
//   </div>
// )}
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// export default App;


// ===============================
// ✅ App.jsx
// ===============================

// ==========================================
// ✅ App.jsx
// ==========================================

import { useState } from "react";

import axios from "axios";

import toast, {
  Toaster,
} from "react-hot-toast";

import {
  FiDownload,
} from "react-icons/fi";

function App() {

  const [url, setUrl] =
    useState("");

  const [video, setVideo] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const API =
    "http://192.168.0.106:5000/music";

  // ==========================================
  // ✅ GET INFO
  // ==========================================
  const getInfo = async () => {

    if (!url) {

      return toast.error(
        "Paste a valid link 🔗"
      );
    }

    setLoading(true);

    try {

      const res =
        await axios.post(
          `${API}/info`,
          { url }
        );

      setVideo(res.data);

    } catch (err) {

      console.log(err);

      toast.error(
        err.response?.data?.error ||
        "Failed to fetch video ❌"
      );
    }

    setLoading(false);
  };

  // ==========================================
  // ✅ DOWNLOAD
  // ==========================================
const handleDownload = async (formatId) => {

  const toastId =
    toast.loading(
      "Downloading song 🎵"
    );

  try {

    const response =
      await axios.get(
        `${API}/download`,
        {
          params: {
            url,
            format: formatId,
          },

          responseType: "blob",
        }
      );

    // ✅ REAL NAME
    let filename =
      decodeURIComponent(
        response.headers[
          "x-file-name"
        ] || "music.mp3"
      );

    // ✅ BLOB
    const blob =
      new Blob(
        [response.data],
        {
          type: "audio/mpeg",
        }
      );

    const blobUrl =
      window.URL.createObjectURL(
        blob
      );

    // ✅ DOWNLOAD
    const a =
      document.createElement(
        "a"
      );

    a.href = blobUrl;

    a.download =
      filename;

    document.body.appendChild(a);

    a.click();

    a.remove();

    window.URL.revokeObjectURL(
      blobUrl
    );

    toast.success(
      "Download completed ✅",
      {
        id: toastId,
      }
    );

  } catch (err) {

    console.log(err);

    toast.error(
      "Download failed ❌",
      {
        id: toastId,
      }
    );
  }
};

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 flex items-center justify-center p-4">

      {/* ==========================================
          ✅ TOASTER
      ========================================== */}
      <Toaster

        position="top-center"

        toastOptions={{

          style: {

            background:
              "#111827",

            color: "#fff",

            border:
              "1px solid #374151",
          },
        }}
      />

      {/* ==========================================
          ✅ MAIN CARD
      ========================================== */}
      <div className="w-full max-w-xl bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl">

        {/* ==========================================
            ✅ HEADER
        ========================================== */}
        <div className="flex items-center justify-center gap-3 mb-8">

          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            🎧
          </div>

          <h1 className="text-3xl font-bold text-white">

            Audio

            <span className="text-emerald-400">
              Extract
            </span>
          </h1>
        </div>

        {/* ==========================================
            ✅ INPUT
        ========================================== */}
        <div className="flex flex-col gap-4">

          <input
            type="text"

            autoFocus

            placeholder="Paste YouTube link..."

            value={url}

            onChange={(e) => {

              setUrl(
                e.target.value
              );

              setVideo(null);
            }}

            onKeyDown={(e) => {

              if (
                e.key === "Enter"
              ) {

                getInfo();
              }
            }}

            className="w-full py-4 px-4 bg-gray-950/50 border border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder-gray-500"
          />

          {/* ==========================================
              ✅ BUTTON
          ========================================== */}
          <button

            onClick={getInfo}

            disabled={loading}

            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90 text-white font-semibold py-4 rounded-2xl transition-all duration-300 active:scale-[0.98] disabled:opacity-70"
          >

            {loading
              ? "Processing..."
              : "Get Download Links"}

          </button>
        </div>

        {/* ==========================================
            ✅ RESULTS
        ========================================== */}
        {video && (

          <div className="mt-8 pt-8 border-t border-gray-800">

            {/* ==========================================
                ✅ VIDEO INFO
            ========================================== */}
            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start mb-6">

              {/* THUMBNAIL */}
              <div className="w-full sm:w-40 rounded-xl overflow-hidden border border-gray-800 aspect-video">

                <img

                  src={video.thumbnail}

                  alt={video.title}

                  className="w-full h-full object-cover"
                />
              </div>

              {/* TITLE */}
              <div className="w-full text-center sm:text-left">

                <h2 className="text-lg font-bold text-white line-clamp-2">

                  {video.title}
                </h2>

                <p className="text-sm text-emerald-400 mt-2">

                  Ready to download ✅
                </p>
              </div>
            </div>

            {/* ==========================================
                ✅ FORMATS
            ========================================== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {video.formats.map(
                (f, i) => (

                <button

                  key={i}

                  onClick={() =>
                    handleDownload(
                      f.format_id
                    )
                  }

                  className="group flex items-center justify-between p-4 bg-gray-950/50 hover:bg-gray-800 border border-gray-800 hover:border-emerald-500/50 rounded-2xl transition-all duration-300 text-left"
                >

                  {/* LEFT */}
                  <div className="flex flex-col gap-1">

                    <div className="flex items-center gap-2">

                      <span className="text-base font-bold text-white uppercase">

                        {f.ext}
                      </span>

                      <span className="px-2 py-0.5 text-[10px] font-bold bg-gray-800 text-gray-300 rounded-full">

                        {f.bitrate}
                        kbps
                      </span>
                    </div>

                    <span className="text-xs text-gray-400">

                      Size:
                      {" "}
                      {f.size}
                    </span>
                  </div>

                  {/* RIGHT */}
                  <div className="text-emerald-400 text-xl">

                    <FiDownload />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            ✅ FOOTER
        ========================================== */}
        <div className="mt-8 text-center text-xs text-gray-500">

          Built with React + Node.js 💚
        </div>
      </div>
    </div>
  );
}

export default App;