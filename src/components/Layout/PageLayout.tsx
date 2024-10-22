export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row w-screen h-screen overflow-hidden">
      {children}
    </div>
  )
}