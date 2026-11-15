"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { facts } from "@/data/facts";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
};

const SUGGESTIONS = ["Best project?", "Tech stack?", "Is he open to work?", "Why hire him?"];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasGreeted = useRef(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const toggleChat = useCallback(() => {
    setOpen((o) => !o);
    if (!open) {
      if (!hasGreeted.current) {
        hasGreeted.current = true;
        setMessages([
          {
            role: "assistant",
            content: "Hi, I'm Hassnain's assistant. Ask me about his projects, stack, or experience.",
            sources: [],
          },
        ]);
      }
      if (error) setError(false);
    }
  }, [open, error]);

  const closeChat = useCallback(() => {
    setOpen(false);
    setMessages([]);
    setError(false);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;

      const userMessage: ChatMessage = { role: "user", content: text };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput("");
      setLoading(true);
      setError(false);

      try {
        // Send last 8 messages as history for follow-up context
        const history = newMessages.slice(-8).map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history }),
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: data.answer ?? "I don't know, please email me at abbashussnain818@gmail.com",
          sources: data.sources ?? [],
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      sendMessage(input);
    },
    [input, sendMessage]
  );

  const handleSuggestion = useCallback(
    (text: string) => {
      sendMessage(text);
    },
    [sendMessage]
  );

  if (!open) {
    return (
      <button
        id="chat-toggle"
        onClick={toggleChat}
        className="fixed bottom-[calc(2rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-50 flex flex-col items-center justify-center gap-1 h-10 w-10 rounded-full border border-solid border-accent/50 bg-background/90 backdrop-blur px-3 text-xs font-mono text-accent transition-all hover:bg-accent/20 hover:text-accent hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Open chat assistant"
        title="Chat with AI Assistant"
      >
        <svg className="h-6 w-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-50 w-[280px] sm:w-[340px] flex flex-col">
      <div className="border border-solid border-border rounded-lg bg-background/95 backdrop-blur shadow-xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-solid border-border/50 bg-panel/50">
          <h3 className="font-mono font-semibold text-foreground">Ask my agent</h3>
          <button
            onClick={closeChat}
            className="h-8 w-8 rounded border border-solid border-current/30 flex items-center justify-center text-xs text-muted hover:text-accent transition-colors"
            aria-label="Close chat"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 max-h-96 overflow-y-auto space-y-4">
          <div className="space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col gap-1 ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm font-sans ${
                    msg.role === "user"
                      ? "bg-accent text-accent-foreground"
                      : "bg-panel/50 text-foreground border border-solid border-border/50"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "assistant" && msg.sources && msg.sources.length > 0 && (
                  <div className="ml-1">
                    <p className="text-[10px] font-mono text-muted uppercase tracking-tighter">
                      Sources: {msg.sources.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-sans text-muted">Thinking…</span>
              </div>
            )}
            {error && (
              <div className="p-3 rounded bg-accent/10 border border-solid border-accent/30 flex items-start gap-2">
                <p className="text-xs font-sans text-accent">
                  AI assistant unavailable. Please try again or email me at {facts.links.email}.
                </p>
                <button
                  onClick={() => setError(false)}
                  className="ml-auto text-[10px] font-mono text-accent hover:underline"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>

          {/* Suggestion chips */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="px-2 py-1 text-[10px] font-mono border border-accent/30 rounded-full text-accent/80 hover:text-accent hover:border-accent transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="border-t border-solid border-border/50 p-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my projects, experience, or skills…"
              disabled={loading}
              className="flex-1 px-3 py-2 text-sm font-sans text-foreground bg-transparent border-none outline-none placeholder:text-muted/60"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-3 py-2 text-xs font-sans text-foreground bg-accent text-accent-foreground rounded hover:bg-accent/90 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Send
            </button>
          </div>
          <p className="mt-2 text-[10px] font-mono text-muted">
            Max 500 characters · 10 requests/minute
          </p>
        </form>
      </div>

      <div className="mt-2 flex justify-end">
        <button
          onClick={() => {
            closeChat();
          }}
          className="text-[10px] font-mono text-muted hover:text-accent transition-colors"
        >
          Close chat
        </button>
      </div>
    </div>
  );
}
