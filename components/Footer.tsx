import { contacts } from "./Hero";

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-16 bg-[#0a1221] py-18 text-center text-white">
      <h2 className="text-[28px] font-bold">함께 일할 기회를 기다립니다</h2>
      <div className="mt-4 flex flex-wrap justify-center gap-x-7 gap-y-2 px-4 text-[15px] font-medium text-slate-300">
        {contacts.map((c) => (
          <a key={c.href} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="hover:text-white">
            {c.label}
          </a>
        ))}
      </div>
      <p className="mt-8 text-xs text-slate-500">© {new Date().getFullYear()} Woojin Jung</p>
    </footer>
  );
}
