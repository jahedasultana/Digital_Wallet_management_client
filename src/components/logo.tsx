export default function Logo() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='40'
      height='40'
      viewBox='0 0 100 100'
      fill='currentColor'
    >
      {/* Outer circle */}
      <circle
        cx='50'
        cy='50'
        r='48'
        stroke='currentColor'
        strokeWidth='4'
        fill='none'
      />

      {/* D letter */}
      <path
        d='M25 30v40h12c10 0 18-7 18-20s-8-20-18-20H25Z'
        fill='currentColor'
      />

      {/* W letter */}
      <path
        d='M60 30l6 40 8-20 8 20 6-40h-7l-4 23-7-17-7 17-4-23h-7Z'
        fill='currentColor'
      />
    </svg>
  );
}
