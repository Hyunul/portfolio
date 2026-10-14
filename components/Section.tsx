export default function Section({
  id,
  eyebrow,
  title,
  tinted = false,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  tinted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 py-20 md:py-24 ${tinted ? "bg-slate-50 dark:bg-gray-900" : "bg-white dark:bg-gray-950"}`}
    >
      <div className="mx-auto max-w-[1120px] px-4">
        <p className="text-[13px] font-bold tracking-wide text-blue-600 dark:text-blue-400">{eyebrow}</p>
        <h2 className="mt-1.5 mb-10 text-3xl font-bold text-slate-900 dark:text-white">{title}</h2>
        {children}
      </div>
    </section>
  );
}
