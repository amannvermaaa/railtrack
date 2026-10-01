import React from 'react';
import { TrainFront, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ onHome }) => {
  return (
    <nav className="glass-panel text-gray-800 p-4 sticky top-0 z-50 flex items-center justify-between">
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform" 
          onClick={onHome}
          role="button"
          tabIndex={0}
        >
          <div className="bg-gradient-to-br from-[var(--color-rail-navy)] to-[var(--color-rail-blue)] p-2 rounded-xl shadow-md">
            <TrainFront className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-[var(--color-rail-navy)] lowercase drop-shadow-sm">
            train<span className="font-semibold text-[var(--color-rail-accent)]">status</span>
          </h1>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-600">
          <Link to="/" className="hover:text-[var(--color-rail-accent)] transition-colors">Home</Link>
          <a href="#" className="hover:text-[var(--color-rail-accent)] transition-colors">Train Tickets</a>
          <a href="#" className="hover:text-[var(--color-rail-accent)] transition-colors relative">
            Bus Booking
            <span className="absolute -top-4 -right-6 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap font-black tracking-wider animate-pulse">
              NEW
            </span>
          </a>
          <a href="#" className="hover:text-[var(--color-rail-accent)] transition-colors flex items-center gap-1 group">
            Information <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
