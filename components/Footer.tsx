import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Gildong Hong. All rights reserved.
          </p>
        </div>

        <div className="flex space-x-6">
          {/* 실제 본인의 링크로 교체하세요 */}
          <Link 
            href="https://github.com/hyunul" 
            target="_blank" 
            className="text-gray-400 hover:text-white transition"
          >
            GitHub
          </Link>
        </div>
        
      </div>
    </footer>
  );
}