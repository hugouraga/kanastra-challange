import { ReactElement, ReactNode } from "react"

function Header({ children }: { children: ReactNode }): ReactElement {

  return (
    <header className="mb-12">
      <div className="container mx-auto px-2 py-4 flex items-center justify-between">
        <div className="flex items-center mr-8">
          <img src='https://framerusercontent.com/images/f0btmN2GtVDhwuoOUM5xAjorM.png?scale-down-to=512' alt="Kanastra Logo" className="max-h-8 mr-4" />
        </div>
        {children}
      </div>
    </header>
  )
}

export { Header }