
import { ReactElement, ReactNode } from "react"

function NavMain({ children }: { children: ReactNode }): ReactElement {
  return (
    <nav className="md:flex space-x-4">
      {children}
    </nav>
  )
}

export { NavMain }