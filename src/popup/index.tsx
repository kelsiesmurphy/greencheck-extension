import { useEffect, useState } from "react"

import { ThemeProvider } from "~components/theme-provider"

import HeaderSection from "./components/HeaderSection"
import TabSection from "./components/TabSection"

import "~style.css"

function IndexPopup() {
  const [isValidated, setIsValidated] = useState(false)
  const [validationMessage, setValidationMessage] = useState(false)

  useEffect(() => {
    const storedLicenseKey = localStorage.getItem("licenseKey")
    const validationStatus = localStorage.getItem("isValidated")

    if (storedLicenseKey && validationStatus === "true") {
      setIsValidated(true)
    }
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
