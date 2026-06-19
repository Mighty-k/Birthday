export default function ScrollCue({ targetId }: { targetId: string }) {
  const handleClick = () => {
    const el = document.getElementById(targetId)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex justify-center py-8">
      <button
        onClick={handleClick}
        className="group flex flex-col items-center gap-2 cursor-pointer"
        aria-label={`Scroll to next section`}
      >
        <span className="font-body text-xs text-mauve/50 tracking-widest uppercase group-hover:text-mauve/70 transition-colors">
          Continue
        </span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          className="text-mauve/40 group-hover:text-mauve/60 transition-colors animate-bounce"
        >
          <path
            d="M8 20L2 14H14L8 20Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  )
}
