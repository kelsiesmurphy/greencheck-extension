import { useEffect, useState } from "react"

import { ThemeProvider } from "~components/theme-provider"

import HeaderSection from "./components/HeaderSection"
import TabSection from "./components/TabSection"

import "~src/style.css"

function IndexPopup() {
  const [isValidated, setIsValidated] = useState(false)
  const [validationMessage, setValidationMessage] = useState(false)

  useEffect(() => {
    chrome.storage.local.get(["licenseKey", "isValidated"], (result) => {
      const { licenseKey, isValidated } = result

      if (licenseKey && isValidated === "true") {
        setIsValidated(true)
      }
    })
  }, [])

  const handleValidation = (isValid, message) => {
    setIsValidated(isValid)
    setValidationMessage(message)
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      <div className="flex flex-col min-w-[424px]">
        <HeaderSection />
        <div className="flex flex-col p-4">
          <TabSection
            isValidated={isValidated}
            validationMessage={validationMessage}
            handleValidation={handleValidation}
          />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default IndexPopup
