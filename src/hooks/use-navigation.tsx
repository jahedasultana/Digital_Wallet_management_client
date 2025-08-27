import { createContext, useContext } from "react"


export interface NavigationContextType {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider")
  }
  return context
}