"use client";

import { GlassPanel } from "@/components/glass-panel";
import { facts } from "@/data/facts";

export function AboutSection() {
  return (
    <section id="about" className="section relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[400px] bg-accent/5 rounded-full blur-[200px]"
        />
      </div>

      <div className="section-header mb-8">
        <h2 className="text-heading text-foreground mb-2">About</h2>
        <p className="text-base text-muted/90 font-sans">Final-year BSIT · Bahria University · Islamabad · Jan 2027</p>
      </div>

      <GlassPanel variant="lg" className="max-w-5xl mx-auto relative overflow-hidden z-10">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-50" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left column — visual anchor */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-4">
              <span className="text-accent font-display font-bold text-2xl">HA</span>
            </div>
            <span className="text-label text-muted uppercase tracking-wider mb-4 text-center">
              {facts.name}
            </span>
            <div className="w-full glass-panel-sm p-4 text-center">
              <span className="block text-caption text-muted/70 font-mono uppercase mb-2">
                Currently building
              </span>
              <span className="text-sm text-foreground font-medium">
                LLM agents &amp; infrastructure
              </span>
              <span className="block text-xs text-muted/60 font-mono mt-2">
                LangGraph · MCP · Kubernetes
              </span>
            </div>
          </div>

          {/* Right column — text content */}
          <div className="md:col-span-2">
            <p className="text-lg md:text-xl font-sans font-light text-muted/90 leading-relaxed mb-6">
              I build LLM agents and the infrastructure they run on — what draws me in is the part after the demo works: the queue that fills up, the webhook that arrives twice, the pod that crashes at 3 a.m.
            </p>

            <p className="text-body font-normal text-muted/90 leading-relaxed mb-6">
              My final year project, <span className="text-foreground font-semibold">AgentDine</span>, is a four-agent WhatsApp ordering platform that takes orders in Roman Urdu, Urdu, and English and checks inventory in real time. I built an OpenAI-compatible gateway that rate-limits per key, queues requests with backpressure, streams responses, cancels abandoned ones, and ships with dashboards, 22 tests, and CI.
            </p>

            <p className="text-body font-normal text-muted/90 leading-relaxed mb-6">
              My latest project is a read-only Kubernetes agent that diagnoses broken deployments. It got <span className="text-accent font-semibold">29 of 30</span> injected faults right in an eval I wrote, and the repo shows its failures as plainly as its wins.
            </p>

            <p className="text-body font-medium text-foreground/80 leading-relaxed">
              Give me a hard backend or AI problem — from an ordering bot to a model gateway to an agent that reads logs — and I&apos;ll build it, test it, and <span className="text-accent font-semibold">tell you honestly where it breaks</span>.
            </p>
          </div>
        </div>

        {/* Impact stats — 4 in a row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-border/30">
          <div className="text-center">
            <span className="block text-[32px] font-display font-bold text-accent">29/30</span>
            <span className="block text-xs text-muted/70 font-mono uppercase mt-1">fault-injection eval</span>
          </div>
          <div className="text-center">
            <span className="block text-[32px] font-display font-bold text-accent">70%</span>
            <span className="block text-xs text-muted/70 font-mono uppercase mt-1">retrieval faster</span>
          </div>
          <div className="text-center">
            <span className="block text-[32px] font-display font-bold text-accent">4 agents</span>
            <span className="block text-xs text-muted/70 font-mono uppercase mt-1">LangGraph orchestration</span>
          </div>
          <div className="text-center">
            <span className="block text-[32px] font-display font-bold text-accent">22 tests</span>
            <span className="block text-xs text-muted/70 font-mono uppercase mt-1">88.85% coverage</span>
          </div>
        </div>
      </GlassPanel>
    </section>
  );
}
