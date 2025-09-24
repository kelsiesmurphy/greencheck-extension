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
  const [tabInfo, setTabInfo] = useState<{ id: number; url: string } | null>(null)
  const [greenWebFoundationData, setGreenWebFoundationData] = useState<any>(null)
  const [websiteCarbonData, setWebsiteCarbonData] = useState<any>(null)
  const [loadingGWF, setLoadingGWF] = useState(true)

  useEffect(() => {
    const fetchTabData = async () => {
      setLoadingGWF(true)
      try {
        const tabs = await Browser.tabs.query({ active: true, currentWindow: true })
        const activeTab = tabs[0]
        if (!activeTab?.id || !activeTab.url) throw new Error("Cannot get active tab info")
        setTabInfo({ id: activeTab.id, url: activeTab.url })

        const gwfData = await sendToBackground({
          name: "gwf_check",
          body: { url: activeTab.url }
        })
        setGreenWebFoundationData(gwfData.message)
      } catch (error) {
        console.error("Error fetching Green Web Foundation data:", error)
        setGreenWebFoundationData(null)
      } finally {
        setLoadingGWF(false)
      }
    }

    fetchTabData()
  }, [])

  return (
    <Tabs defaultValue="tab-one">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="tab-one">
          <Sprout className="mr-2 h-4 w-4" /> {copyText.popup.tabOne.buttonText}
        </TabsTrigger>
        <TabsTrigger value="tab-two" disabled={!tabInfo || !greenWebFoundationData}>
          <FileBarChart2 className="mr-2 h-4 w-4" /> {copyText.popup.tabTwo.buttonText}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="tab-one" className="py-2">
        <GreenEnergyCheck loading={loadingGWF} greenWebFoundationData={greenWebFoundationData} />
      </TabsContent>

      <TabsContent value="tab-two" className="py-2">
        <CarbonAnalysis
          tabId={tabInfo?.id}
          greenWebFoundationData={greenWebFoundationData}
          websiteCarbonData={websiteCarbonData}
          setWebsiteCarbonData={setWebsiteCarbonData}
        />
      </TabsContent>
    </Tabs>
  )
}

export default TabSection
