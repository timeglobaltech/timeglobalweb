import { motion } from "framer-motion";

const BLOG_POSTS = [
  {
    title: "Scaling to 10M Users Without Breaking the Bank",
    category: "Architecture",
    date: "Mar 15, 2024",
    readTime: "8 min read",
    excerpt: "How we architected a serverless system that handles massive scale with minimal operational overhead.",
  },
  {
    title: "The AI Hype Cycle vs. Real Business Impact",
    category: "Strategy",
    date: "Mar 8, 2024",
    readTime: "6 min read",
    excerpt: "Cutting through the noise: which AI investments actually move the needle for businesses.",
  },
  {
    title: "Zero-Downtime Migrations at Scale",
    category: "DevOps",
    date: "Feb 28, 2024",
    readTime: "10 min read",
    excerpt: "Battle-tested patterns for migrating databases and infrastructure without losing a single user request.",
  },
];

export default function BlogPreview() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]"
          animate={{ y: [0, 40, 0], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div>
            <p className="font-mono text-xs text-primary tracking-[0.2em] uppercase mb-4">Latest Insights</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              From the <span className="text-primary italic">blog</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl">
              Expert insights and industry trends to help you stay ahead of the curve.
            </p>
          </div>
          <motion.a
            href="/blog"
            whileHover={{ x: 4, color: "var(--primary)" }}
            className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:gap-3 transition-all px-4 py-2 rounded-full hover:bg-primary/5"
          >
            View all posts <span>→</span>
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 p-8 hover:border-primary/40 transition-all shadow-lg hover:shadow-2xl hover:shadow-primary/10"
            >
              {/* Glow effect */}
              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur bg-gradient-to-br from-primary/20 to-transparent" />

              <div className="relative z-10 space-y-4">
                {/* Header with category and date */}
                <div className="flex items-start justify-between gap-4">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/30 group-hover:border-primary/60 transition-colors"
                  >
                    {post.category}
                  </motion.span>
                  <span className="text-xs text-muted-foreground/60 font-mono whitespace-nowrap">
                    {post.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold leading-snug group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10" />

                {/* Footer with read time and CTA */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono text-muted-foreground/70 group-hover:text-primary transition-colors">
                    {post.readTime}
                  </span>
                  <motion.span
                    whileHover={{ x: 2 }}
                    className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Read →
                  </motion.span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
