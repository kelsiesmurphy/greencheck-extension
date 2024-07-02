import { co2 } from "@tgwf/co2"
import copyText from "copy.json"
import { LoaderCircle } from "lucide-react"
import React, { useState } from "react"

import { Button } from "~components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~components/ui/card"

const CarbonAnalysis = () => {
  const [loading, setLoading] = useState(false)
  const [pageSize, setPageSize] = useState(null)
  const [emissions, setEmissions] = useState(null)

  async function checkWebsite() {
    setLoading(true)
    try {
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
        <CardTitle>{copyText.popup.tabTwo.buttonText}</CardTitle>
        <CardDescription>
          {copyText.popup.tabTwo.afterLicenseKeyEntry.description}
        </CardDescription>
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
        <p>Page Size in Bytes: {JSON.stringify(pageSize)}</p>
        <p>Results: {JSON.stringify(emissions)}</p>
      </CardContent>
    </Card>
  )
}

export default CarbonAnalysis
