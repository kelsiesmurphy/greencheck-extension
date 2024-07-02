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
  const [lighthouseDiagnostics, setLighthouseDiagnostics] = useState(null)
  const [emissions, setEmissions] = useState(null)

  const getLighthouseReport = async () => {
    const url = "https://toastlog.com/"

    try {
      const res = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${process.env.PLASMO_PUBLIC_GOOGLE_CLOUD_KEY}`
      )
      const data = await res.json()
      setLighthouseDiagnostics(
        data.lighthouseResult.audits.diagnostics.details.items[0]
      )
      return data.lighthouseResult.audits.diagnostics.details.items[0]
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  async function checkWebsite() {
    setLoading(true)
    try {
      const pageSizeInBytes = await getLighthouseReport()

      const swd = new co2({ model: "swd" })
      const carbonResult = await swd.perByte(pageSizeInBytes.totalByteWeight)
      setEmissions(carbonResult)
    } catch (error) {
      console.error("Error checking website:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{copyText.popup.tabTwo.buttonText}</CardTitle>
        <CardDescription>
          {copyText.popup.tabTwo.afterLicenseKeyEntry.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!emissions ? (
          <Button onClick={checkWebsite}>
            {loading ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />{" "}
                Running...
              </>
            ) : (
              "Test Website"
            )}
          </Button>
        ) : (
          <>
            <p>
              Page Size:{" "}
              {JSON.stringify(
                lighthouseDiagnostics &&
                  Math.round(lighthouseDiagnostics.totalByteWeight / 1024)
              )}{" "}
              kB
            </p>
            <p>Carbon emitted per page load: {emissions.toFixed(2)}g</p>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default CarbonAnalysis
