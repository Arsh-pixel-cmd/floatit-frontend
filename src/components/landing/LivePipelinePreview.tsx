import React from 'react';
import { Search, Eye, Star, BarChart, Layout, Target, Satellite, Map, Smartphone, Image as ImageIcon, Link, Compass, FlaskConical, CheckSquare, Microscope, ClipboardList, type LucideIcon } from 'lucide-react';

interface PipelineCardProps {
  title: string;
  icon: LucideIcon;
  isHighlighted?: boolean;
}

const PipelineCard = ({ title, icon: Icon, isHighlighted }: PipelineCardProps) => (
  <div className="bg-[#181818] border border-[#2e2e2e] hover:border-[#DEF767] p-4 flex items-center gap-4 transition-colors duration-100 group cursor-default select-none relative">
    {/* Corner technical crosshairs for individual nodes */}
    <div className="absolute -top-[4px] -left-[4px] text-[#5b5b5b] font-mono text-[8px] select-none pointer-events-none">+</div>
    <div className="absolute -top-[4px] -right-[4px] text-[#5b5b5b] font-mono text-[8px] select-none pointer-events-none">+</div>
    <div className="absolute -bottom-[4px] -left-[4px] text-[#5b5b5b] font-mono text-[8px] select-none pointer-events-none">+</div>
    <div className="absolute -bottom-[4px] -right-[4px] text-[#5b5b5b] font-mono text-[8px] select-none pointer-events-none">+</div>

    <div className={`w-8 h-8 border border-[#2e2e2e] bg-[#171717] flex items-center justify-center flex-shrink-0 group-hover:border-[#DEF767] transition-colors duration-100`}>
      <Icon className="w-4 h-4 text-[#929292] group-hover:text-white" />
    </div>
    
    <div>
      <h4 className="text-[11px] font-onest font-bold text-white tracking-[0.04em] uppercase mb-1">{title}</h4>
      <div className="flex items-center gap-1.5">
        <div className={`w-1.5 h-1.5 ${isHighlighted ? 'bg-[#DEF767]' : 'bg-[#5b5b5b]'}`}></div>
        <span className="text-[9px] font-geist font-mono text-[#5b5b5b] uppercase tracking-widest">
          {isHighlighted ? 'Processing' : 'Standby'}
        </span>
      </div>
    </div>
  </div>
);

export const LivePipelinePreview = () => (
  <div className="w-full max-w-5xl mx-auto mt-8 relative z-10 select-none">
    {/* Outer Wrapper: Deep BG surface, sharp border */}
    <div className="bg-[#171717] border border-[#2e2e2e] relative">
      
      {/* Corner structural crosshairs */}
      <div className="absolute -top-[5px] -left-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
      <div className="absolute -top-[5px] -right-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
      <div className="absolute -bottom-[5px] -left-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
      <div className="absolute -bottom-[5px] -right-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>

      {/* Top technical bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#2e2e2e] bg-[#181818]">
        <div className="flex items-center gap-6">
          <div className="font-geist font-mono text-[10px] text-[#5b5b5b] tracking-wider uppercase">
            SEC: P_SYS_01 • 75% RAIL BOUNDARY ENGAGED
          </div>
        </div>
        <div className="flex items-center gap-2 border border-[#2e2e2e] bg-[#171717] px-3 py-1">
          <div className="w-1.5 h-1.5 bg-[#DEF767] animate-pulse"></div>
          <div className="text-[9px] font-geist font-mono font-bold text-[#DEF767] tracking-widest uppercase">
            Active Nodes: 16/16 Connected
          </div>
        </div>
      </div>

      <div className="p-6 overflow-x-auto">
        <div className="min-w-[800px] grid grid-cols-4 gap-6">
          {/* Column 1 */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-onest font-bold text-[#929292] tracking-[0.04em] uppercase mb-4 pb-2 border-b border-[#2e2e2e]">
              01 // Discover
            </h3>
            <PipelineCard title="Secondary Research" icon={Search} />
            <PipelineCard title="Observations" icon={Eye} />
            <PipelineCard title="Reviews" icon={Star} />
            <PipelineCard title="Primary Research" icon={BarChart} />
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-onest font-bold text-[#929292] tracking-[0.04em] uppercase mb-4 pb-2 border-b border-[#2e2e2e]">
              02 // Define
            </h3>
            <PipelineCard title="Architecture" icon={Layout} />
            <PipelineCard title="Persuasion Tools" icon={Target} />
            <PipelineCard title="Tech & Channels" icon={Satellite} />
            <PipelineCard title="UX Flow Mapping" icon={Map} />
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-onest font-bold text-[#929292] tracking-[0.04em] uppercase mb-4 pb-2 border-b border-[#2e2e2e]">
              03 // Develop
            </h3>
            <PipelineCard title="Screens" icon={Smartphone} />
            <PipelineCard title="Images & Texts" icon={ImageIcon} />
            <PipelineCard title="Interactions" icon={Link} />
            <PipelineCard title="Navigations" icon={Compass} />
          </div>

          {/* Column 4 */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-onest font-bold text-[#929292] tracking-[0.04em] uppercase mb-4 pb-2 border-b border-[#2e2e2e]">
              04 // Deliver
            </h3>
            <PipelineCard title="Brand Test" icon={FlaskConical} isHighlighted={true} />
            <PipelineCard title="Expert Review" icon={CheckSquare} />
            <PipelineCard title="UX Test" icon={Microscope} />
            <PipelineCard title="Usability Test" icon={ClipboardList} />
          </div>
        </div>
      </div>
    </div>
  </div>
);
