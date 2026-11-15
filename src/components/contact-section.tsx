"use client";

import { facts } from "@/data/facts";

const contactBtn = (href: string, label: string) => (
  <a
    href={href}
    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-solid border-accent/30 text-accent font-mono text-xs font-bold uppercase tracking-tighter bg-accent/5 hover:bg-accent/10 hover:border-accent hover:shadow-[0_0_15px_rgba(0,242,255,0.4)] transition-all duration-200"
    target={href.startsWith("mailto") ? undefined : "_blank"}
    rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
  >
    {label}
  </a>
);

export function ContactSection() {
  const resumeHref = facts.links.resume || "#resume";

  return (
    <section id="contact" className="section border-b-0 pb-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-0 right-0 w-[60%] h-[400px] bg-accent/5 rounded-full blur-[200px]"
        />
      </div>

      <div className="section-header mb-8">
        <h2 className="text-heading text-foreground mb-2">Contact</h2>
        <p className="text-subhead text-muted/70">Get in touch</p>
      </div>

      <div className="glass p-8 rounded-2xl border border-border/50 max-w-[400px] mx-auto text-center">
        <div className="flex justify-center gap-3 mb-6">
          {contactBtn(resumeHref, "Resume")}
          {contactBtn(facts.links.github, "GitHub")}
          {contactBtn(facts.links.linkedin, "LinkedIn")}
          {contactBtn(`mailto:${facts.links.email}`, "Email")}
        </div>
        <a
          href={`mailto:${facts.links.email}`}
          className="text-accent font-mono text-sm underline underline-offset-4 hover:text-accent/80 hover-lift"
        >
          {facts.links.email}
        </a>
      </div>
    </section>
  );
}
