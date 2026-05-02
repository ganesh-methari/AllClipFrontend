import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiDownloadCloud } from "react-icons/fi";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useTheme } from './ThemeContext';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const { isDark, toggleTheme, colors, currentColors } = useTheme();
    const navItems = ['How It Works', 'Supported Sites', 'Batch Download', 'Blog'];

    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                    *{
                        font-family: "Geist", sans-serif;
                    }
                `}
            </style>
            <nav className="px-6 md:px-12 lg:px-24 xl:px-40 py-4 flex items-center justify-between relative"
            style={{ backgroundColor: currentColors.bg, transition: 'background-color 0.3s ease' }}>
                <Link >
                    <div className="flex items-center gap-2">
                        <FiDownloadCloud className="text-2xl" style={{ color: currentColors.text }} />
                        <span className="text-xl font-bold" style={{ color: currentColors.text }}>AllClip</span>
                    </div>
                </Link>

                <div className="hidden md:flex items-center rounded-full px-1 py-1 gap-2 bg-gray-500"
                 style={{ backgroundColor: isDark ? colors.dark.bg : colors.light.bg, borderColor: currentColors.border }}
                 >
                    {navItems.map((item) => (
                        <Link key={item} href="#" className="px-4 py-1.5 rounded-full text-sm transition-colors hover:bg-white/10" style={{ color: currentColors.secondary }}>
                            {item}
                        </Link>
                    ))}
                </div>

                <button
                onClick={toggleTheme}
                className="top-5 right-5 z-50 p-3 rounded-full border transition cursor-pointer"
                style={{ backgroundColor: isDark ? colors.dark.card : colors.light.card, borderColor: currentColors.border }}
            >
                {isDark ? <CiLight size={20} color={currentColors.text} /> : <MdDarkMode size={20} color={currentColors.text} />}
            </button>

                <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-0 p-1">
                    <span className={`block w-6 h-0.5 transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: colors.text }}></span>
                    <span className={`block w-6 h-0.5 transition-opacity ${menuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: colors.text }}></span>
                    <span className={`block w-6 h-0.5 transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: colors.text }}></span>
                </button>

                {menuOpen && (
                    <div className="
                    absolute top-full left-0 w-full border-t flex flex-col p-5 gap-1 md:hidden z-50" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
                        {navItems.map((item) => (
                            <Link key={item} href="#" className="px-4 py-2.5 rounded-lg text-sm transition-colors hover:bg-white/10" style={{ color: colors.secondary }}>
                                {item}
                            </Link>
                        ))}
                                  <button
                onClick={toggleTheme}
                className="top-5 right-5 z-50 p-3 rounded-full border transition cursor-pointer"
                style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', borderColor: colors.border }}
            >
                {isDark ? <CiLight size={20} color={colors.text} /> : <MdDarkMode size={20} color={colors.text} />}
            </button>
                    </div>
                )}
            </nav>
        </>
    )
}

export default Navbar;