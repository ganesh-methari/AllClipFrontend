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
  FiMusic,
  FiLoader,
} from "react-icons/fi";

function App() {

  const [url, setUrl] =
    useState("");

  const [video, setVideo] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  // ✅ DEPLOYED BACKEND
  const API =
    "https://allclipbackend.onrender.com/music";

  // ==========================================
  // ✅ GET INFO
  // ==========================================
  const getInfo = async () => {

    if (!url) {

      return toast.error(
        "Paste a YouTube link 🔗"
      );
    }

    setLoading(true);

    setVideo(null);

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
  const handleDownload =
    async (formatId) => {

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

              responseType:
                "blob",
            }
          );

        // ✅ REAL NAME
        let filename =
          decodeURIComponent(
            response.headers[
            "x-file-name"
            ] ||
            "music.mp3"
          );

        // ✅ FILE
        const file =
          new File(
            [response.data],
            filename,
            {
              type: "audio/mpeg",
            }
          );

        // ✅ URL
        const downloadUrl =
          URL.createObjectURL(
            file
          );

        // ✅ DOWNLOAD
        const a =
          document.createElement(
            "a"
          );

        a.href =
          downloadUrl;

        a.download =
          filename;

        document.body.appendChild(
          a
        );

        a.click();

        a.remove();

        URL.revokeObjectURL(
          downloadUrl
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">

      {/* ==========================================
          ✅ TOASTER
      ========================================== */}
      <Toaster
        position="top-center"
      />

      {/* ==========================================
          ✅ CARD
      ========================================== */}
      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl">

        {/* ==========================================
            ✅ HEADER
        ========================================== */}
        <div className="flex items-center justify-center gap-3 mb-8">

          <div className="bg-emerald-500/20 p-3 rounded-2xl">

            <FiMusic className="text-emerald-400 text-2xl" />
          </div>

          <h1 className="text-3xl font-bold">

            AllClip

            <span className="text-emerald-400">
              {" "}
              Music
            </span>
          </h1>
        </div>

        {/* ==========================================
            ✅ INPUT
        ========================================== */}
        <div className="flex flex-col gap-4">

          <input
            type="text"

            value={url}

            placeholder="Paste YouTube link..."

            onChange={(e) =>
              setUrl(
                e.target.value
              )
            }

            onKeyDown={(e) => {

              if (
                e.key === "Enter"
              ) {

                getInfo();
              }
            }}

            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-4 outline-none focus:border-emerald-500"
          />

          {/* ==========================================
              ✅ BUTTON
          ========================================== */}
          <button

            onClick={getInfo}

            disabled={loading}

            className="bg-emerald-500 hover:bg-emerald-600 transition-all rounded-2xl py-4 font-semibold flex items-center justify-center gap-2"
          >

            {loading ? (
              <>
                <FiLoader className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Get Download Links
              </>
            )}
          </button>
        </div>

        {/* ==========================================
            ✅ VIDEO
        ========================================== */}
        {video && (

          <div className="mt-8 border-t border-zinc-800 pt-8">

            {/* ==========================================
                ✅ THUMBNAIL
            ========================================== */}
            <div className="flex flex-col sm:flex-row gap-5 mb-6">

              <img

                src={
                  video.thumbnail
                }

                alt={
                  video.title
                }

                className="w-full sm:w-44 rounded-2xl border border-zinc-800"
              />

              <div>

                <h2 className="font-bold text-lg line-clamp-2">

                  {video.title}
                </h2>

                <p className="text-emerald-400 mt-2 text-sm">

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

                    className="bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500 rounded-2xl p-4 flex items-center justify-between transition-all"
                  >

                    {/* LEFT */}
                    <div className="text-left">

                      <h3 className="font-bold uppercase">

                        {f.ext}
                      </h3>

                      <p className="text-xs text-zinc-400">

                        {f.bitrate}
                        kbps
                      </p>

                      <p className="text-xs text-zinc-500">

                        {f.size}
                      </p>
                    </div>

                    {/* RIGHT */}
                    <div className="text-emerald-400 text-xl">

                      <FiDownload />
                    </div>
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* ==========================================
            ✅ FOOTER
        ========================================== */}
        <div className="mt-8 text-center text-xs text-zinc-500">

          Built with React + Node.js 💚
        </div>
      </div>
    </div>
  );
}

export default App;