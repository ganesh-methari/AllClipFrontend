// ==========================================
// ✅ App.jsx — FULL FIXED
// ==========================================

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  FiDownload,
  FiMusic,
  FiVideo,
  FiLoader,
  FiSearch,
  FiAlertCircle,
} from "react-icons/fi";

// ==========================================
// ✅ API
// ==========================================
// const API = "http://localhost:5000";
const API = "https://stiffly-sprung-fringe.ngrok-free.dev";

// ==========================================
// ✅ NGROK HEADERS
// ==========================================
const HEADERS = { "ngrok-skip-browser-warning": "true" };

// ==========================================
// ✅ FORMAT DURATION
// ==========================================
function formatDuration(sec) {
  if (!sec) return "";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// ==========================================
// ✅ APP
// ==========================================
export default function App() {

  const [tab, setTab]                 = useState("music");
  const [url, setUrl]                 = useState("");
  const [musicData, setMusicData]     = useState(null);
  const [videoData, setVideoData]     = useState(null);
  const [loading, setLoading]         = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [thumbSrc, setThumbSrc]       = useState("");  // ✅ thumbnail blob

  const media        = tab === "music" ? musicData : videoData;
  const isSoundcloud = url.includes("soundcloud.com") || url.includes("on.soundcloud.com");

  // ==========================================
  // ✅ THUMBNAIL FETCH — fetch() with headers
  // <img> tag headers support nahi karta
  // ==========================================
  useEffect(() => {
    if (!media?.thumbnail) {
      setThumbSrc("");
      return;
    }

    setThumbSrc(""); // reset on new media

    fetch(`${API}/proxy/thumbnail?url=${encodeURIComponent(media.thumbnail)}`, {
      headers: HEADERS,
    })
      .then((r) => {
        if (!r.ok) throw new Error("thumb failed");
        return r.blob();
      })
      .then((blob) => setThumbSrc(URL.createObjectURL(blob)))
      .catch(() =>
        setThumbSrc("https://placehold.co/72x72/18181b/34d399?text=?")
      );
  }, [media?.thumbnail]);

  // ==========================================
  // ✅ SWITCH TAB
  // ==========================================
  function switchTab(t) {
    setTab(t);
 
  }

  // ==========================================
  // ✅ GET INFO
  // ==========================================
  async function getInfo() {
    if (!url.trim()) return toast.error("Paste a link first 🔗");

    try {
      setLoading(true);
      setMusicData(null);
      setVideoData(null);
      setThumbSrc("");

      const [musicRes, videoRes] = await Promise.allSettled([
        axios.post(`${API}/music/info`, { url }, {
          timeout: 30000,
          headers: HEADERS,
        }),
        axios.post(`${API}/video/info`, { url }, {
          timeout: 30000,
          headers: HEADERS,
        }),
      ]);

      if (musicRes.status === "fulfilled") setMusicData(musicRes.value.data);
      if (videoRes.status === "fulfilled") setVideoData(videoRes.value.data);

      if (musicRes.status === "rejected" && videoRes.status === "rejected") {
        toast.error(
          musicRes.reason?.response?.data?.error || "Failed to fetch ❌"
        );
      }
    } catch (err) {
      toast.error(err.message || "Failed ❌");
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // ✅ DOWNLOAD MUSIC
  // ==========================================
  async function downloadMusic(formatId) {
    const toastId = toast.loading("Preparing download 🎵");
    try {
      setDownloading(true);
      const res = await axios.get(`${API}/music/download`, {
        params: { url, format: formatId },
        responseType: "blob",
        timeout: 120000,
        headers: HEADERS,
      });
      const filename = decodeURIComponent(
        res.headers["x-file-name"] || "music.mp3"
      );
      triggerDownload(res.data, filename, "audio/mpeg");
      toast.success("Download complete ✅", { id: toastId });
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Download failed ❌",
        { id: toastId }
      );
    } finally {
      setDownloading(false);
    }
  }

  // ==========================================
  // ✅ DOWNLOAD VIDEO
  // ==========================================
  async function downloadVideo(height) {
    const toastId = toast.loading("Preparing download 🎬");
    try {
      setDownloading(true);
      const res = await axios.get(`${API}/video/download`, {
        params: { url, height },
        responseType: "blob",
        timeout: 300000,
        headers: HEADERS,
      });
      const filename = decodeURIComponent(
        res.headers["x-file-name"] || "video.mp4"
      );
      triggerDownload(res.data, filename, "video/mp4");
      toast.success("Download complete ✅", { id: toastId });
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Download failed ❌",
        { id: toastId }
      );
    } finally {
      setDownloading(false);
    }
  }

  // ==========================================
  // ✅ TRIGGER DOWNLOAD
  // ==========================================
  function triggerDownload(data, filename, type) {
    const blob    = new Blob([data], { type });
    const blobUrl = URL.createObjectURL(blob);
    const a       = document.createElement("a");
    a.href        = blobUrl;
    a.download    = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(blobUrl);
  }

  // ==========================================
  // ✅ RENDER
  // ==========================================
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif; }
        .bg-app {
          background: radial-gradient(ellipse 80% 50% at 50% -10%, #052e16, transparent),
                      #09090b;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .spin { animation: spin 1s linear infinite; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.35s ease forwards; }

        /* ✅ thumbnail shimmer while loading */
        .thumb-placeholder {
          background: linear-gradient(90deg, #27272a 25%, #3f3f46 50%, #27272a 75%);
          background-size: 200% 100%;
          animation: shimmer 1.2s infinite;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* TOASTER */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#18181b",
            color:      "#fafafa",
            border:     "1px solid #27272a",
            fontFamily: "'DM Sans', sans-serif",
            fontSize:   "14px",
          },
        }}
      />

      {/* WRAPPER */}
      <div className="bg-app min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">

          {/* LOGO */}
          <div className="text-center mb-8">
            <h1 className="font-display text-5xl font-extrabold text-white tracking-tight">
              All<span className="text-emerald-400">Clip</span>
            </h1>
            <p className="text-zinc-500 text-xs mt-2 tracking-wide">
              YouTube • Instagram • Facebook • X • Vimeo • Twitch • SoundCloud
            </p>
          </div>

          {/* CARD */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-2xl">

            {/* TABS */}
            <div className="flex bg-zinc-800 rounded-2xl p-1 mb-5 gap-1">
              <button
                onClick={() => switchTab("music")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  tab === "music"
                    ? "bg-emerald-500 text-black shadow-md shadow-emerald-900/40"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <FiMusic size={14} />
                Music
              </button>

              <button
                onClick={() => { if (isSoundcloud) return; switchTab("video"); }}
                disabled={isSoundcloud}
                title={isSoundcloud ? "SoundCloud is audio only" : ""}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  tab === "video"
                    ? "bg-emerald-500 text-black shadow-md shadow-emerald-900/40"
                    : "text-zinc-400 hover:text-white"
                } ${isSoundcloud ? "opacity-30 cursor-not-allowed" : ""}`}
              >
                <FiVideo size={14} />
                Video
              </button>
            </div>

            {/* INPUT ROW */}
            <div className="flex gap-2 mb-5">
              <input
                type="text"
                autoFocus
                value={url}
                placeholder={
                  tab === "music" ? "Paste music link..." : "Paste video link..."
                }
                onChange={(e) => {
                  const val = e.target.value;
                  setUrl(val);
                  setMusicData(null);
                  setVideoData(null);
                  setThumbSrc("");
                  if (val.includes("soundcloud.com") || val.includes("on.soundcloud.com")) {
                    setTab("music");
                  }
                }}
                onKeyDown={(e) => { if (e.key === "Enter") getInfo(); }}
                className="flex-1 bg-zinc-800 border border-zinc-700 focus:border-emerald-500 rounded-2xl px-4 py-3 text-white text-sm outline-none transition-all duration-200 placeholder:text-zinc-600"
              />

              <button
                onClick={getInfo}
                disabled={loading}
                className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold rounded-2xl px-4 flex items-center justify-center transition-all duration-200"
              >
                {loading
                  ? <FiLoader size={18} className="spin" />
                  : <FiSearch size={18} />
                }
              </button>
            </div>

            {/* RESULT */}
            {media && (
              <div className="fade-up border-t border-zinc-800 pt-5">

                {/* MEDIA INFO */}
                <div className="flex gap-3 mb-5">

                  {/* ✅ THUMBNAIL — blob src ya shimmer */}
                  {thumbSrc ? (
                    <img
                      src={thumbSrc}
                      alt={media.title}
                      className="w-16 h-16 rounded-xl object-cover border border-zinc-700 shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl border border-zinc-700 shrink-0 thumb-placeholder" />
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold leading-snug line-clamp-2 mb-1.5">
                      {media.title}
                    </p>

                    {media.uploader && (
                      <p className="text-zinc-500 text-xs truncate mb-1.5">
                        🎤 {media.uploader}
                      </p>
                    )}

                    {media.duration && (
                      <span className="inline-flex items-center bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-0.5 text-emerald-400 text-xs">
                        ⏱ {formatDuration(media.duration)}
                      </span>
                    )}
                  </div>
                </div>

                {/* NO FORMATS */}
                {media.formats.length === 0 ? (
                  <div className="flex items-center justify-center gap-2 py-5 text-zinc-500 text-sm bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
                    <FiAlertCircle size={16} />
                    No downloadable formats found
                  </div>
                ) : (
                  <>
                    <p className="text-zinc-600 text-xs font-semibold uppercase tracking-widest mb-3">
                      Choose Format
                    </p>

                    {/* FORMAT GRID */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {media.formats.map((f, i) => (
                        <button
                          key={i}
                          disabled={downloading}
                          onClick={() =>
                            tab === "music"
                              ? downloadMusic(f.format_id)
                              : downloadVideo(f.height)
                          }
                          className="group bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed border border-zinc-700 hover:border-emerald-500/60 rounded-2xl p-3.5 flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] text-left"
                        >
                          <div className="min-w-0">
                            <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-1">
                              {f.ext}
                            </p>

                            {tab === "music" && (
                              <>
                                <p className="text-white text-sm font-semibold leading-none">
                                  {f.bitrate} kbps
                                </p>
                                <p className="text-zinc-500 text-xs mt-1">{f.size}</p>
                              </>
                            )}

                            {tab === "video" && (
                              <>
                                <p className="text-white text-sm font-semibold leading-none">
                                  {f.quality}
                                </p>
                                <p className="text-zinc-400 text-xs mt-0.5">{f.label}</p>
                                <p className="text-zinc-500 text-xs mt-0.5">{f.size}</p>
                              </>
                            )}
                          </div>

                          <div className="text-zinc-500 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-200 ml-2 flex-shrink-0">
                            {downloading
                              ? <FiLoader size={15} className="spin" />
                              : <FiDownload size={15} />
                            }
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* FOOTER */}
          <p className="text-center text-zinc-700 text-xs mt-5">
            Built with React + Node.js 💚
          </p>

        </div>
      </div>
    </>
  );
}