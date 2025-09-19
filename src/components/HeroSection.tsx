// components/HeroSection.tsx
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  isLoggedIn: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
}

export default function HeroSection({
  isLoggedIn,
  onSignIn,
  onSignOut,
}: HeroSectionProps) {
  return (
    <div className="container mx-auto py-20 px-4 text-center">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-tight">
            <span className="text-[var(--color-primary)]">
              The world's most trusted
            </span>
            <br />
            AI-powered resume tailor
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[var(--color-text-secondary)]">
            Easily optimize your resume for any job description in seconds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-8">
            {isLoggedIn ? (
              <Button
                onClick={onSignOut}
                className="px-8 py-4 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white shadow-xl"
              >
                Logout
              </Button>
            ) : (
              <Button
                className="px-8 py-4 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white shadow-xl"
                onClick={onSignIn}
              >
                Get Started Free
              </Button>
            )}
            <Button
              variant="outline"
              className="px-8 py-4 text-lg border-2 border-gray-300 hover:bg-gray-100"
            >
              How It Works
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2">
          {/* SVG Placeholder */}
          <svg
            width="100%"
            height="auto"
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="25"
              y="45"
              width="200"
              height="250"
              rx="15"
              fill="#e0e7ff"
            />
            <path d="M75 70H175V80H75V70Z" fill="#9ba3c4" />
            <path d="M75 90H175V100H75V90Z" fill="#9ba3c4" />
            <path d="M75 110H175V120H75V110Z" fill="#9ba3c4" />
            <path d="M75 130H175V140H75V130Z" fill="#9ba3c4" />
            <path d="M75 150H175V160H75V150Z" fill="#9ba3c4" />
            <circle cx="280" cy="120" r="100" fill="#fbcfe8" />
            <path
              d="M225 100C225 100 240 70 280 70C320 70 335 100 335 100"
              stroke="#f472b6"
              strokeWidth="5"
            />
            <path
              d="M225 140C225 140 240 170 280 170C320 170 335 140 335 140"
              stroke="#f472b6"
              strokeWidth="5"
            />
            <rect
              x="260"
              y="115"
              width="40"
              height="10"
              rx="5"
              fill="#f472b6"
            />
            <rect
              x="260"
              y="130"
              width="40"
              height="10"
              rx="5"
              fill="#f472b6"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
