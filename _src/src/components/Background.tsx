export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora-blob aurora-1 animate-drift -left-[12%] -top-[22%] h-[62vmax] w-[62vmax]" />
      <div className="aurora-blob aurora-2 animate-drift-slow -right-[18%] top-[6%] h-[52vmax] w-[52vmax]" />
      <div className="aurora-blob aurora-3 animate-drift left-[18%] top-[58%] h-[48vmax] w-[48vmax]" />
      <div className="grid-bg absolute inset-x-0 top-0 h-[92vh]" />
    </div>
  )
}
