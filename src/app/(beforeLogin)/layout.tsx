interface LayoutProps {
  children: React.ReactNode
  // modal: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-[100%]">
      {children}
      {/* {modal} */}
    </div>
  )
}
