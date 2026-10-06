import React from 'react';

const LiveStatusBadge = ({ status }) => {
  let bg = "bg-gray-100 border border-gray-200";
  let text = "text-gray-600";
  let dot = "bg-gray-400";

  if (status === 'ON TIME') {
    bg = "bg-emerald-500/20 border border-emerald-500/30";
    text = "text-emerald-100";
    dot = "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]";
  } else if (status === 'DELAYED') {
    bg = "bg-amber-500/20 border border-amber-500/30";
    text = "text-amber-100";
    dot = "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]";
  } else if (status === 'RUNNING') {
    bg = "bg-blue-500/20 border border-blue-500/30";
    text = "text-blue-100";
    dot = "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]";
  } else if (status === 'CANCELLED') {
    bg = "bg-red-500/20 border border-red-500/30";
    text = "text-red-100";
    dot = "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]";
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-black tracking-widest uppercase ${bg} ${text} backdrop-blur-sm`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot} animate-pulse`}></span>
      {status}
    </span>
  );
};

export default LiveStatusBadge;
