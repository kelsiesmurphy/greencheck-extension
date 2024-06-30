import { ThemeProvider } from "components/theme-provider"

import HeaderSection from "./components/HeaderSection"
import TabSection from "./components/TabSection"

import "~style.css"

function IndexPopup() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      <div className="flex flex-col min-w-[424px]">
        <HeaderSection />
        <div className="flex flex-col p-4">
          <TabSection />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default IndexPopup
