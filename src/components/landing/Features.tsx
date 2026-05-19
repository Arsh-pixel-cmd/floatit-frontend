import React from 'react';
import { Workflow, Layers, Terminal, type LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image?: string;
}

const FeatureCard = ({ icon: Icon, title, description, image }: FeatureCardProps) => (
  <div className="bg-[#171717] border border-[#2e2e2e] hover:border-[#DEF767] transition-colors duration-100 relative flex flex-col select-none group">
    {/* Corner technical crosshairs */}
    <div className="absolute -top-[5px] -left-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
    <div className="absolute -top-[5px] -right-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
    <div className="absolute -bottom-[5px] -left-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
    <div className="absolute -bottom-[5px] -right-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>

    {image && (
      <div className="w-full h-44 overflow-hidden border-b border-[#2e2e2e] relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-opacity duration-150" 
        />
      </div>
    )}
    
    <div className="p-6 flex-1 flex flex-col justify-between">
      <div>
        <div className="w-10 h-10 border border-[#2e2e2e] bg-[#181818] flex items-center justify-center mb-6 group-hover:border-[#DEF767] transition-colors duration-100">
          <Icon className="w-4 h-4 text-[#929292] group-hover:text-white" />
        </div>
        <h3 className="text-sm font-grozen font-bold text-white mb-2 uppercase tracking-[0.04em]">{title}</h3>
      </div>
      <p className="text-[13px] font-onest text-[#929292] leading-normal">{description}</p>
    </div>
  </div>
);

export const Features = () => (
  <section id="features" className="pt-24 pb-24 px-6 bg-[#181818] border-y border-[#2e2e2e] relative z-20 w-full flex flex-col select-none">
    <div className="w-full">
      <div className="mb-16 border-l-2 border-[#ff6a6a] pl-6">
        <h2 className="text-xl font-grozen font-bold text-white mb-3 uppercase tracking-[0.04em]">Precision at every node</h2>
        <p className="text-[13px] font-onest text-[#929292] leading-normal max-w-xl">
          Build sophisticated reasoning structures from Discovery to Delivery without the overhead of scaffolding code. 
          Enforced strictly via granular technical parameters.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={Workflow}
          title="Visual Node Architecture"
          description="Construct logic flows via an elegant canvas. Map inputs, outputs, and intricate dependencies without visual clutter."
          image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
        />
        <FeatureCard 
          icon={Layers}
          title="Isolated Project Spaces"
          description="Segment your orchestrations into secure, dedicated environments optimized for Marketing, Engineering, or R&D."
          image="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&w=800&q=80"
        />
        <FeatureCard 
          icon={Terminal}
          title="Granular Configuration"
          description="Absolute control over every agent. Parameterize API keys, precise delays, and foundational system prompts seamlessly."
          image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
        />
      </div>
    </div>
  </section>
);
