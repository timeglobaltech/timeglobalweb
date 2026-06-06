import { useContactModal } from "@/hooks/use-contact-modal";

export default function CollaborateCTA() {
  const { openModal } = useContactModal();

  return (
    <section className="py-32 px-6 bg-secondary text-secondary-foreground text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-secondary to-secondary pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white">
          Collaborate with Us
        </h2>
        <p className="text-xl md:text-2xl text-secondary-foreground/80 mb-12 leading-relaxed">
          Time Global invests in fresh ideas. We help entrepreneurs bring brilliant projects to market and turn them into profitable digital products.
        </p>
        <button 
          onClick={openModal} 
          className="px-10 py-5 rounded-xl bg-gradient-to-r from-primary to-emerald-600 text-white font-bold text-xl hover:shadow-2xl hover:shadow-primary/30 transition-all hover:opacity-90 btn-shimmer"
        >
          let's discuss your idea
        </button>
      </div>
    </section>
  );
}
