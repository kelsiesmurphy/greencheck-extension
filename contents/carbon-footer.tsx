import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

export const config: PlasmoCSConfig = {
  matches: ["https://*/*"],
  exclude_matches: ["https://www.google.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText.replaceAll(":root", ":host(plasmo-csui)")
  return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(`footer`)

export const getShadowHostId = () => "greencheck-footer-unique-id"

const CarbonFooter = ({ anchor }: { anchor: any }) => {
  const [websiteCarbonData, setWebsiteCarbonData] = useState(null)

  const backgroundWebsiteCarbonCheck = async () => {
    const resp = await sendToBackground({
      name: "carbon_check",
      body: {
        url: "https://api.websitecarbon.com"
      }
    })

    setWebsiteCarbonData(resp.message)
  }

  useEffect(() => {
    backgroundWebsiteCarbonCheck()
  }, [])

  if (websiteCarbonData)
    return (
      <div className="w-full bg-emerald-700 flex justify-center p-4 font-medium text-white text-sm">
        <p>
          🌱{" "}
          {websiteCarbonData.green
            ? websiteCarbonData.statistics.co2.renewable.grams.toPrecision(2)
            : websiteCarbonData.statistics.co2.grid.grams.toPrecision(2)}
          g of CO<sub>2</sub> / view
        </p>
      </div>
    )
}

export default CarbonFooter
