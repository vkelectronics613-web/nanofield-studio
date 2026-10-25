export function BananaLogo({ className = "w-7 h-7" }) {
  return (
    <svg 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M6.5 22.5C7.8 25.8 11.2 27.5 15.5 27C21.2 26.3 25.8 21.8 27.2 15.8C27.9 12.8 27.5 9.8 26.2 7.2C25.9 6.6 25.1 6.4 24.6 6.8C23.8 7.4 23.1 8.2 22.6 9.1C21.8 10.5 21.6 12.1 22 13.6C22.6 15.7 21.5 17.8 19.5 18.6C16.8 19.7 13.7 18.8 11.8 16.9C10.5 15.6 9.8 13.8 9.8 12C9.8 11.2 9.4 10.5 8.7 10.1C7.8 9.6 6.7 9.8 6.1 10.6C4.8 12.3 4.2 14.5 4.5 16.8C4.7 18.8 5.4 20.8 6.5 22.5Z" 
        fill="url(#banana-gradient)" 
      />
      <path 
        d="M26.2 7.2C26.8 5.8 27.2 4.3 27.5 2.8C27.6 2.3 27.2 1.8 26.7 1.9C25.2 2.2 23.8 2.8 22.5 3.6C21.8 4 21.5 4.8 21.8 5.6C22.3 6.9 23.3 8 24.6 8.7C25.3 9.1 26.1 8.4 26.2 7.2Z" 
        fill="#A855F7" 
      />
      <defs>
        <linearGradient id="banana-gradient" x1="4" y1="2" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C084FC" />
          <stop offset="0.5" stopColor="#9333EA" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
