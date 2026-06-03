"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";

interface MobileMenuProps {
  role?: string;
}

const MobileMenu = ({ role }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      {/* Mobile Top Header containing Hamburger */}
      <header className="flex h-16 items-center justify-between border-b border-gray-100 bg-white px-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 transition-all active:scale-95"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-bold text-gray-900 tracking-tight">Dashboard</span>
        </div>
      </header>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Sidebar */}
      <div
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute top-4 right-4 z-50">
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Reusing existing Sidebar layout inside the mobile drawer */}
        <div onClick={() => setIsOpen(false)} className="h-full">
          <DashboardSidebar role={role} />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;