"use client"

import { FileBarChart2, Sprout } from "lucide-react"
import { useEffect, useState } from "react"
import Browser from "webextension-polyfill"

import { sendToBackground } from "@plasmohq/messaging"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~components/ui/tabs"

import copyText from "../../copy.json"
import CarbonAnalysis from "./CarbonAnalysis"
import GreenEnergyCheck from "./GreenEnergyCheck"

const TabSection = () => {
  const [url, setURL] = useState("")
  const [greenWebFoundationData, setGreenWebFoundationData] = useState(null)
  const [websiteCarbonData, setWebsiteCarbonData] = useState(null)
  const [loading, setLoading] = useState(true)

  const backgroundWebsiteCarbonCheck = async (url: string) => {
    const resp = await sendToBackground({
      name: "gwf_check",
      body: {
        url: url
      }
    })

    return resp.message
  }
  useEffect(() => {
    const fetchGreenHost = async () => {
      setLoading(true)

      try {
        const tabs = await Browser.tabs.query({
          active: true,
          currentWindow: true
        })
        const activeURL = tabs[0]?.url ?? ""
        setURL(activeURL)

        const greenWebFoundationResponse =
          await backgroundWebsiteCarbonCheck(activeURL)
        setGreenWebFoundationData(greenWebFoundationResponse)
      } catch (error) {
        console.error("Error fetching Green Web Foundation data:", error)
        setGreenWebFoundationData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchGreenHost()
  }, [])

  return (
    <Tabs defaultValue="tab-one">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="tab-one">
          <Sprout className="mr-2 h-4 w-4" /> {copyText.popup.tabOne.buttonText}
        </TabsTrigger>
        <TabsTrigger value="tab-two" disabled={!url || !greenWebFoundationData}>
          <FileBarChart2 className="mr-2 h-4 w-4" />{" "}
          {copyText.popup.tabTwo.buttonText}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab-one" className="py-2">
        <GreenEnergyCheck
          loading={loading}
          greenWebFoundationData={greenWebFoundationData}
        />
      </TabsContent>
      <TabsContent value="tab-two" className="py-2">
        <CarbonAnalysis
          websiteCarbonData={websiteCarbonData}
          greenWebFoundationData={greenWebFoundationData}
          setWebsiteCarbonData={setWebsiteCarbonData}
        />
      </TabsContent>
    </Tabs>
  )
}

export default TabSection
