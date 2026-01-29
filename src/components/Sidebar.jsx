// src/components/Sidebar.jsx
import React from "react";
import {
  Download,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  MapPin,
} from "lucide-react";
import { useBuilding } from "../context/BuildingContext";

export default function Sidebar({
  unit,
  onNext,
  onPrev,
  currentIndex,
  total,
  onOpenGallery,
}) {
  const { data } = useBuilding();

  const availableClass = "bg-emerald-50 text-emerald-700 border-emerald-100";
  const leasedClass = "bg-rose-50 text-rose-700 border-rose-100";

  return (
    <div className="flex-1 w-full flex flex-col bg-white shadow-xl z-20 md:w-[420px] md:flex-none md:h-full md:border-l border-slate-100 min-h-0 relative">
      {/* Building Header */}
      <div className="hidden md:block px-8 py-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          {data?.name}
        </h2>
        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 flex items-center gap-1">
          <MapPin size={10} /> {data?.address}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {!unit ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12">
            <p className="text-sm font-medium">Select a unit on the map</p>
          </div>
        ) : (
          <div className="animate-fade-in flex flex-col h-full">
            <div className="flex-1 p-4 md:p-8">
              {/* Unit Title & Status */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  {unit.title}
                </h3>
                <span
                  className={`px-3 py-1.5 rounded-md text-[11px] font-bold uppercase border ${unit.available ? availableClass : leasedClass}`}
                >
                  {unit.available ? "Available" : "Leased"}
                </span>
              </div>

              {/* Gallery Trigger Image */}
              <div
                onClick={onOpenGallery}
                className="cursor-pointer mb-6 group relative rounded-2xl overflow-hidden shadow-lg aspect-video"
              >
                <img
                  src={unit.img}
                  alt={unit.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Restored Gallery Icon and Text Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                  <div className="flex flex-col items-center text-white gap-2">
                    <ImageIcon size={32} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      View Gallery
                    </span>
                  </div>
                </div>
              </div>

              {/* Unit Specs */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Area
                  </p>
                  <p className="text-lg font-bold text-slate-800">
                    {unit.sqft} sqft
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Layout
                  </p>
                  <p className="text-lg font-bold text-slate-800">
                    {unit.beds}bd / {unit.baths}ba
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed mb-8">
                {unit.description}
              </p>

              {/* Fixed Download Button */}
              <a
                href="/assets/floorplan.pdf"
                target="_blank"
                className="w-full flex items-center justify-center gap-2 bg-[#102a43] text-white font-semibold py-4 rounded-full hover:bg-[#1b3a5a] transition-colors shadow-lg shadow-[#102a43]/20"
              >
                <Download size={18} /> Download Floorplan
              </a>
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between px-8 py-6 border-t border-slate-50 bg-white sticky bottom-0">
              <button
                onClick={onPrev}
                className="text-sm font-semibold text-slate-400 hover:text-[#102a43] transition-colors flex items-center gap-1"
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                {currentIndex + 1} / {total}
              </span>
              <button
                onClick={onNext}
                className="text-sm font-semibold text-slate-400 hover:text-[#102a43] transition-colors flex items-center gap-1"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
