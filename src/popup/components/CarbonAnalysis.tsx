import { Cloud, LoaderCircle, Scale, Zap } from "lucide-react"
import React, { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { Button } from "~components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~components/ui/card"
import { formatBytes } from "~lib/utils"

import copyText from "../../copy.json"
import { CarbonChart } from "./CarbonChart"
// import { IntensityChart } from "./IntensityChart"
import StatsCard from "./StatsCard"

const CarbonAnalysis = ({ url, setWebsiteCarbonData, websiteCarbonData }) => {
  const [loading, setLoading] = useState(false)

  const backgroundWebsiteCarbonCheck = async (url: string) => {
    const resp = await sendToBackground({
      name: "carbon_check",
      body: {
        url: url
      }
    })

    return resp.message
  }

  async function checkWebsite() {
    setLoading(true)
    try {
      const websiteCarbonResponse = await backgroundWebsiteCarbonCheck(url)

      setWebsiteCarbonData(websiteCarbonResponse)
    } catch (error) {
      console.error("Error checking website:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {copyText.popup.tabTwo.buttonText}
        </CardTitle>
        <CardDescription>
          {copyText.popup.tabTwo.afterLicenseKeyEntry.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <>
          {!websiteCarbonData ? (
            <div className="space-y-2">
              <Button onClick={checkWebsite}>
                {loading ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Running...
                  </>
                ) : (
                  <>Test Website</>
                )}
              </Button>
              <p>Please leave this extension open whilst running the test.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* <IntensityChart /> */}
              <CarbonChart websiteCarbonData={websiteCarbonData} />
              <StatsCard
                title="CO2"
                icon={<Cloud color="hsl(var(--muted-foreground))" size={20} />}
                number={`${websiteCarbonData.green ? websiteCarbonData.statistics.co2.renewable.grams.toPrecision(2) : websiteCarbonData.statistics.co2.grid.grams.toPrecision(2)} g`}
                description="The approximate amount of CO2 in grams transferred on each page load."
              />
              <StatsCard
                title="Energy"
                icon={<Zap color="hsl(var(--muted-foreground))" size={20} />}
                number={
                  websiteCarbonData.statistics.energy.toPrecision(2) + " KWg"
                }
                description="The approximate amount of energy transferred on each page load in KWg."
              />
              <StatsCard
                title="Page Size"
                icon={<Scale color="hsl(var(--muted-foreground))" size={20} />}
                number={formatBytes(websiteCarbonData.statistics.adjustedBytes)}
                description="The approximate number of bytes transferred by the page load, adjusted for first-time vs. returning visitor percentages."
              />
              <div className="flex justify-center">
                <p>
                  Page tested:{" "}
                  <a
                    className="hover:underline"
                    href={websiteCarbonData.url}
                    target="_blank">
                    {websiteCarbonData.url}
                  </a>
                </p>
              </div>
            </div>
          )}
        </>
      </CardContent>
    </Card>
  )
}

export default CarbonAnalysis
