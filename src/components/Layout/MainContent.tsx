export default function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 overflow-auto">
      {children}
    </div>
  )
}