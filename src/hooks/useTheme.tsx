
import { ThemeProviderContext } from "@/contexts/theme.context"
import { useContext } from "react"


export function useTheme() {
  return useContext(ThemeProviderContext)
}
