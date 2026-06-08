import { useContactModal } from "@/hooks/use-contact-modal";

const AWARDS = [
  { title: "Top Software Developer", issuer: "Clutch", year: "2023" },
  { title: "Top Mobile App", issuer: "The Manifest", year: "2023" },
  { title: "Best IT Company", issuer: "GoodFirms", year: "2022" },
  { title: "Top Web Developer", issuer: "Clutch", year: "2024" }
];

export default function Awards() {
  const { openModal } = useContactModal();

  return (
    <section className="bg-background py-32">
      <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <div className="inline-block px-4 py-1.5 rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold mb-6 border border-primary/20">
          {'<Recognition/>'}
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-16">We're Proud Of</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {AWARDS.map((award, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className="w-32 h-32 bg-secondary rounded-3xl rotate-45 flex items-center justify-center mb-10 transition-transform group-hover:rotate-0 duration-500 shadow-xl border-4 border-background outline outline-1 outline-border">
                <div className="-rotate-45 group-hover:rotate-0 transition-transform duration-500 font-display font-bold text-primary text-xl">
                  {award.year}
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1">{award.title}</h3>
              <p className="text-muted-foreground text-sm">— {award.issuer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-secondary text-secondary-foreground py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8">
          <span className="text-2xl font-display font-bold text-white">For software development — we've got you.</span>
          <button 
            onClick={openModal} 
            data-testid="button-hire-us"
            className="px-8 py-3 rounded-lg bg-primary text-white font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all btn-shimmer"
          >
            hire us
          </button>
        </div>
      </div>
    </section>
  );
}
