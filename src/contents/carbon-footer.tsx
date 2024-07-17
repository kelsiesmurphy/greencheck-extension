import cssText from "data-text:~style.css"
import { X } from "lucide-react"
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

const CarbonFooter = () => {
  const [hidden, setHidden] = useState(false)
  const [websiteCarbonData, setWebsiteCarbonData] = useState(null)

  const backgroundWebsiteCarbonCheck = async () => {
    const resp = await sendToBackground({
      name: "carbon_check",
      body: {
        url: location.href
      }
    })

    setWebsiteCarbonData(resp.message)
  }

  useEffect(() => {
    backgroundWebsiteCarbonCheck()
  }, [])

  if (websiteCarbonData && !hidden)
    return (
      <div className="w-full flex justify-center py-4">
        <div className="bg-emerald-700 flex justify-center items-center gap-3 py-2 px-6 shadow-md rounded-full font-medium text-white text-sm">
          <svg
            width="20"
            viewBox="0 0 128 129"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M65.435.921c1.66-.002 3.18-.003 4.6.08v16.602c-.001 5.349-.001 9.81.467 13.35.494 3.738 1.58 7.113 4.245 9.824 2.665 2.712 5.982 3.817 9.655 4.32 3.48.476 7.865.476 13.122.475h16.318c.081 1.444.08 2.99.078 4.68v26.912c0 10.941 0 19.607-.896 26.389-.923 6.98-2.866 12.63-7.245 17.085s-9.931 6.433-16.792 7.371c-6.666.912-15.183.912-25.936.912h-.661c-10.753 0-19.27 0-25.937-.912-6.86-.938-12.413-2.916-16.792-7.371-4.379-4.455-6.322-10.105-7.244-17.085-.896-6.782-.896-15.448-.896-26.39V52.679c0-10.94 0-19.607.896-26.389.922-6.98 2.865-12.63 7.244-17.085 4.38-4.455 9.932-6.432 16.792-7.37C43.12.92 51.637.92 62.39.921h3.045Zm7.804 69.195c1.475-2.238 4.456-2.838 6.658-1.332 2.198 1.504 2.779 4.532 1.307 6.766l-16.36 24.833c-.635.966-1.366 2.077-2.115 2.922-.883.997-2.394 2.335-4.7 2.529-2.308.195-4.015-.873-5.047-1.709-.875-.71-1.775-1.684-2.557-2.53l-8.598-9.294c-1.812-1.96-1.724-5.043.2-6.891a4.736 4.736 0 0 1 6.782.203l8.307 8.978 16.123-24.475Z"
              fill="#fff"
            />
            <path
              d="M83.882 8.695c-1.822-1.857-3.404-3.47-5.07-4.722v13.32c0 5.74.008 9.595.389 12.47.363 2.748.99 3.924 1.752 4.7.763.775 1.919 1.414 4.619 1.783 2.826.387 6.615.396 12.256.396h13.093c-1.231-1.695-2.816-3.305-4.642-5.158L83.882 8.695Z"
              fill="#fff"
            />
          </svg>
          <p>
            {websiteCarbonData.green
              ? websiteCarbonData.statistics.co2.renewable.grams.toPrecision(2)
              : websiteCarbonData.statistics.co2.grid.grams.toPrecision(2)}
            g of CO<sub>2</sub> / view
          </p>
          <X
            size={16}
            className="cursor-pointer"
            onClick={() => setHidden(true)}
          />
        </div>
      </div>
    )
}

export default CarbonFooter
