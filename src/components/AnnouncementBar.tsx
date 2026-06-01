export default function AnnouncementBar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 h-9 bg-secondary text-secondary-foreground text-sm overflow-hidden flex items-center whitespace-nowrap">
      <div className="flex animate-[ticker_30s_linear_infinite] items-center gap-0">
        {[...Array(8)].map((_, i) => (
          <span key={i} className="mx-8 font-medium tracking-wide shrink-0">
            🚀 TimeGlobalTech — Delivering world-class software solutions globally
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
