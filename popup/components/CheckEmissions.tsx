import { co2 } from "@tgwf/co2"
import { Button } from "components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "components/ui/card"
import { LoaderCircle } from "lucide-react"
import { useState } from "react"
import Browser from "webextension-polyfill"

import GreenCheckDropDown from "~components/green-check-dropdown"

export default function CheckEmissions() {
  const [loading, setLoading] = useState(false)
  const [pageSize, setPageSize] = useState(null)
  const [emissions, setEmissions] = useState(null)
  const [greenHost, setGreenHost] = useState(null)

  async function usesGreenHostCheck(url) {
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

  async function checkWebsite() {
    setLoading(true)
    try {
      const tabs = await Browser.tabs.query({
        active: true,
        currentWindow: true
      })
      const usesGreenHost = await usesGreenHostCheck(tabs[0].url)
      setGreenHost(usesGreenHost)

      const pageSizeInBytes = await calculatePageSize()
      setPageSize(pageSizeInBytes)

      const swd = new co2({ model: "swd" })
      const result = await swd.perByte(pageSizeInBytes)
      setEmissions(result)
    } catch (error) {
      console.error("Error checking website:", error)
    } finally {
      setLoading(false)
    }
  }

  async function calculatePageSize() {
    let totalSize = 0

    // Calculate size of HTML content
    const htmlSize = document.documentElement.outerHTML.length
    totalSize += htmlSize

    // Calculate size of resources
    const resources = performance.getEntriesByType("resource")
    resources.forEach((resource) => {
      totalSize += resource.transferSize || 0
    })

    return totalSize
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Check Website</CardTitle>
        <CardDescription>Check the emissions of the website</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={checkWebsite}>
          {loading ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> Running...
            </>
          ) : (
            "Test Website"
          )}
        </Button>
        {greenHost && greenHost.green ? (
          <div className="text-left">
            <GreenCheckDropDown result={greenHost}/>
          </div>
        ) : (
          <p>This website is not hosted on Green Energy</p>
        )}
        <p>Page Size in Bytes: {JSON.stringify(pageSize)}</p>
        <p>Results: {JSON.stringify(emissions)}</p>
      </CardContent>
    </Card>
  )
}
