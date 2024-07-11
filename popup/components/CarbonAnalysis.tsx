import { co2 } from "@tgwf/co2"
import copyText from "copy.json"
import { Loader2Icon, LoaderCircle } from "lucide-react"
import React, { useState } from "react"

import { Button } from "~components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~components/ui/card"
import { formatBytes } from "~lib/utils"

import { CarbonChart } from "./CarbonChart"

const CarbonAnalysis = ({
  url,
  setWebsiteCarbonData,
  greenWebFoundationData,
  websiteCarbonData
}) => {
  const [loading, setLoading] = useState(false)

  async function websiteCarbonCheck(url: string) {
    try {
      const hostname = new URL(url).hostname
      const response = await fetch(
        `https://api.websitecarbon.com/site?url=${hostname}`
      )

      const data = await response.json()
      setWebsiteCarbonData(data)
      return data
    } catch (error) {
      console.error("Error checking green energy status:", error)
      return null
    }
  }

  async function checkWebsite() {
    setLoading(true)
    try {
      const websiteCarbonResponse = await websiteCarbonCheck(url)
      console.log(websiteCarbonResponse)

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
            ) : (
              <>
                <CarbonChart websiteCarbonData={websiteCarbonData} />
                <p>Page tested: {websiteCarbonData.url}</p>
                <p>Page Size: {formatBytes(websiteCarbonData.bytes)}</p>
              </>
            )}
          </>
      </CardContent>
    </Card>
  )
}

export default CarbonAnalysis
