 "use client";

import { facts } from "@/data/facts";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function ExperienceSection() {
  return (
    <section id="experience" className="section relative overflow-hidden">
      <div className="section-header mb-12">
        <h2 className="text-heading text-foreground mb-2">Experience</h2>
        <p className="text-subhead text-muted/70">Professional journey and what I&apos;ve shipped.</p>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {facts.experience.map((exp) => (
            <article
              key={exp.employer}
              className="glass p-6 rounded-2xl border border-border/60 hover-lift transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent font-mono font-bold text-sm border border-accent/30">
                  {getInitials(exp.employer)}
                </div>
                <div className="flex-1">
                  <span className="block text-label text-accent uppercase tracking-wider mb-1">
                    {exp.employer}
                  </span>
                  <h3 className="font-display font-bold text-lg text-foreground mb-1">{exp.role}</h3>
                  <span className="block text-label text-muted font-mono mb-3">
                    {exp.period}
                    {exp.location ? " · " + exp.location : ""}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-tighter text-accent border border-accent/30 bg-accent/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <ul className="space-y-3 text-body text-muted/90 leading-relaxed">
                {exp.description.map((d) => (
                  <li key={d} className="flex items-start gap-2 relative pl-2">
                    <span className="mt-[6px] w-1 h-1 rounded-full bg-accent/50 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
