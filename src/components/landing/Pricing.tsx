import React from 'react';
import { Check, Zap } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPremium: boolean;
  buttonText: string;
  onAction: () => void;
}

const PricingCard = ({ title, price, description, features, isPremium, buttonText, onAction }: PricingCardProps) => (
  <div className={`relative p-6 bg-[#171717] border ${isPremium ? 'border-[#ff6a6a]' : 'border-[#2e2e2e]'} hover:border-[#DEF767] flex flex-col h-full select-none group transition-colors duration-100`}>
    
    {/* Corner technical crosshairs */}
    <div className="absolute -top-[5px] -left-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
    <div className="absolute -top-[5px] -right-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
    <div className="absolute -bottom-[5px] -left-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
    <div className="absolute -bottom-[5px] -right-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>

    {isPremium && (
      <div className="absolute -top-3 left-6 bg-[#ff6a6a] text-[#171717] text-[10px] font-grozen font-bold px-3 py-1 uppercase tracking-widest z-10">
        Enterprise Standard
      </div>
    )}
    
    <div className="mb-6 mt-4">
      <h3 className="text-base font-grozen font-bold text-white mb-2 uppercase tracking-[0.04em]">{title}</h3>
      <p className="text-[13px] font-onest text-[#929292] leading-normal h-10">{description}</p>
    </div>
    
    <div className="mb-6 flex items-baseline gap-1">
      <span className="text-3xl font-geist font-mono font-bold text-white tracking-tight">{price}</span>
      {price !== 'Free' && <span className="text-[#5b5b5b] font-geist font-mono text-xs">/ month</span>}
    </div>
    
    <ul className="space-y-3 mb-8 flex-1">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3">
          <div className="mt-1 w-4 h-4 border border-[#2e2e2e] bg-[#181818] flex items-center justify-center flex-shrink-0 group-hover:border-[#DEF767] transition-colors duration-100">
            <Check className="w-2.5 h-2.5 text-[#929292] group-hover:text-white" />
          </div>
          <span className="text-[13px] font-onest text-[#929292] leading-normal">{feature}</span>
        </li>
      ))}
    </ul>
    
    <div className="mt-auto">
      <button 
        onClick={onAction} 
        className={`w-full py-3 text-xs uppercase tracking-[0.04em] font-grozen transition-colors duration-100 border
          ${isPremium 
            ? 'bg-[#ff6a6a] border-[#ff6a6a] text-[#171717] hover:bg-transparent hover:text-white hover:border-[#DEF767]' 
            : 'bg-[#181818] border-[#2e2e2e] text-[#929292] hover:border-[#DEF767] hover:text-[#DEF767]'
          }`}
      >
        {buttonText}
      </button>
    </div>
  </div>
);

interface PricingProps {
  onInit: () => void;
}

export const Pricing = ({ onInit }: PricingProps) => (
  <section id="pricing" className="pt-24 pb-24 px-6 bg-[#181818] relative z-20 border-t border-[#2e2e2e] w-full flex flex-col select-none">
    <div className="w-full">
      
      <div className="mb-16 border-l-2 border-[#ff6a6a] pl-6">
        <h2 className="text-xl font-grozen font-bold text-white mb-3 uppercase tracking-[0.04em]">Scale your neural infrastructure</h2>
        <p className="text-[13px] font-onest text-[#929292] leading-normal max-w-xl">
          Predictable pricing designed for ambitious engineering teams. No hidden compute fees. Fully transparent telemetry.
        </p>
      </div>

      {/* Trial Banner */}
      <div className="w-full mb-16 bg-[#171717] border border-[#2e2e2e] p-8 flex flex-col md:flex-row items-center justify-between relative group transition-colors duration-100 hover:border-[#DEF767]">
        {/* Corner technical crosshairs */}
        <div className="absolute -top-[5px] -left-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
        <div className="absolute -top-[5px] -right-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
        <div className="absolute -bottom-[5px] -left-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>
        <div className="absolute -bottom-[5px] -right-[5px] text-[#5b5b5b] font-mono text-[10px] select-none pointer-events-none">+</div>

        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 w-full text-center md:text-left">
          <div className="w-10 h-10 border border-[#2e2e2e] bg-[#181818] flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-[#DEF767]" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-grozen font-bold text-white mb-1 uppercase tracking-[0.04em]">Be a Trial User</h3>
            <p className="text-[13px] font-onest text-[#929292] leading-normal max-w-xl">
              Get full premium access completely free for two months. Just register your account and start orchestrating immediately.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex-shrink-0">
            <button 
              onClick={onInit} 
              className="bg-[#181818] border border-[#DEF767] text-[#DEF767] hover:bg-[#DEF767] hover:text-[#171717] font-grozen text-xs uppercase tracking-[0.04em] px-6 py-3 transition-colors duration-100"
            >
              Start 2-Month Free Trial
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid md:grid-cols-3 gap-6 mt-12 items-stretch">
        <PricingCard 
          title="Free"
          price="Free"
          description="For individuals exploring neural orchestration."
          features={[
            "5 new workflows per month",
            "1 week of agent memory persistence",
            "Standard execution speed",
            "Community Discord support",
            "Basic analytics dashboard"
          ]}
          isPremium={false}
          buttonText="Start for Free"
          onAction={onInit}
        />
        <PricingCard 
          title="Basic"
          price="299/-"
          description="For small teams deploying active agents."
          features={[
            "20 workflows per month",
            "7 weeks of memory per workflow",
            "Priority node processing",
            "Custom system prompts",
            "Email support (24h SLA)"
          ]}
          isPremium={false}
          buttonText="Choose Basic"
          onAction={onInit}
        />
        <PricingCard 
          title="Premium"
          price="599/-"
          description="For enterprise-scale autonomous pipelines."
          features={[
            "Unlimited workflows & executions",
            "Persistent, all-time memory storage",
            "Dedicated compute clusters",
            "Advanced multi-agent routing",
            "24/7 Priority engineering support"
          ]}
          isPremium={true}
          buttonText="Upgrade to Premium"
          onAction={onInit}
        />
      </div>
    </div>
  </section>
);
