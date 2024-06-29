import type {
  PlasmoCSConfig,
  PlasmoCSUIProps,
  PlasmoGetOverlayAnchorList
} from "plasmo"
import type { FC } from "react"
import { useEffect, useState } from "react"

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*"]
}

async function apiCheck(url) {
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

export const getOverlayAnchorList: PlasmoGetOverlayAnchorList = async () =>
  document.querySelectorAll("div.g > div > div > div > div > span > a")

const Tooltips: FC<PlasmoCSUIProps> = ({ anchor }) => {
  const [result, setResult] = useState(null)
  const url = anchor.element.href

  useEffect(() => {
    apiCheck(url).then(setResult)
  }, [url])

  if (result && result.green) {
    return (
      <span
        style={{
          borderRadius: 4,
          background: "violet",
          padding: 4,
          position: "absolute",
          top: 88
        }}>
        Hosted by: {JSON.stringify(result.hosted_by)}
      </span>
    )
  }
}

export default Tooltips
