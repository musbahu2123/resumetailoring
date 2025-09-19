import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 px-6 bg-gray-900 text-white text-center text-sm">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <p>&copy; 2024 ResumeTailorAI. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center space-x-4">
          <Link href="/earn-credits" className="hover:underline">
            Earn Credits
          </Link>
          <Link href="/api-docs" className="hover:underline">
            API Docs
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
        </div>
      </div>
    </footer>
  );
}
