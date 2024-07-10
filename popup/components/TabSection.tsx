"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs"
import copyText from "copy.json"
import { FileBarChart2, Sprout } from "lucide-react"
import { useEffect, useState } from "react"
import Browser from "webextension-polyfill"

import CarbonAnalysis from "./CarbonAnalysis"
import GreenEnergyCheck from "./GreenEnergyCheck"
import LicenseForm from "./LicenseForm"

const TabSection = ({ isValidated, handleValidation }) => {
  const [greenHost, setGreenHost] = useState(null)
  const [loading, setLoading] = useState(true)

  const [lighthouseDiagnostics, setLighthouseDiagnostics] = useState(null)
  const [emissions, setEmissions] = useState(null)

  useEffect(() => {
    async function fetchGreenHost() {
      const tabs = await Browser.tabs.query({
        active: true,
        currentWindow: true
      })
      const usesGreenHost = await usesGreenHostCheck(tabs[0].url)

      setTimeout(() => {
        setGreenWebFoundationData(greenWebFoundationResponse)
        setWebsiteCarbonData(websiteCarbonResponse)
        setLoading(false)
      }, 1000)
    }
    fetchGreenHost()
  }, [])

  async function websiteCarbonCheck(url: string) {
    try {
      const hostname = new URL(url).hostname
      const response = await fetch(
        `https://api.websitecarbon.com/site?url=${hostname}`
      )

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error checking green energy status:", error)
      return null
    }
  }

  async function greenWebFoundationCheck(url: string) {
    try {
      const hostname = new URL(url).hostname
      const response = await fetch(
        `https://api.thegreenwebfoundation.org/api/v3/greencheck/${hostname}`
      )

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error checking green energy status:", error)
      return null
    }
  }
  return (
    <Tabs defaultValue="tab-one">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="tab-one">
          <Sprout className="mr-2 h-4 w-4" /> {copyText.popup.tabOne.buttonText}
        </TabsTrigger>
        <TabsTrigger value="tab-two">
          <FileBarChart2 className="mr-2 h-4 w-4" />{" "}
          {copyText.popup.tabTwo.buttonText}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab-one" className="py-2">
        <GreenEnergyCheck loading={loading} greenWebFoundationData={greenWebFoundationData} />
      </TabsContent>
      <TabsContent value="tab-two" className="py-2">
        {isValidated ? (
          <CarbonAnalysis />
        ) : (
          <LicenseForm handleValidation={handleValidation} />
        )}
      </TabsContent>
    </Tabs>
  )
}

export default TabSection
