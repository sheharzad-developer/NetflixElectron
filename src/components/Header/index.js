import React, { useState, useEffect, useRef } from 'react';
import './Header.css';

function Header({collapsed}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Handle click outside to close the dropdown menu
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <header className={`header ${collapsed ? 'collapsed' : ''}`}>
            <div className="header-left">
                <a href="/">
                    <h2>MovieApp</h2>
                </a>
            </div>
            <div className="header-right" ref={menuRef}>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12h18M3 6h18M3 18h18"></path>
                    </svg>
                </button>
                {isMenuOpen && (
                    <div className="dropdown-menu">
                        <a href="/">Home</a>
                        <a href="/about">About</a>
                        <a href="/privacy">Privacy Policy</a>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header;
