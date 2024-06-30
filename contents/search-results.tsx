import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "components/ui/tooltip"
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

async function addIndicators(result) {
  const resultBlocks = document.querySelectorAll("h3")

  for (let block of resultBlocks) {
    const parentAnchor = block.closest("a")
    if (parentAnchor && !block.hasAttribute("data-checked")) {
      block.textContent = "⏳ " + block.textContent

      block.setAttribute("data-checked", "true")

      if (result && result.green) {
        block.textContent = block.textContent.replace("⏳", "🌱")
      } else {
        block.textContent = block.textContent.replace("⏳", "")
      }
    }
  }
}

export const getOverlayAnchorList: PlasmoGetOverlayAnchorList = async () =>
  document.querySelectorAll("div.g > div > div > div > div > span > a")

const SearchResults: FC<PlasmoCSUIProps> = ({ anchor }) => {
  const [result, setResult] = useState(null)
  const url = anchor.element.href

  useEffect(() => {
    apiCheck(url).then((result) => {
      setResult(result)
      addIndicators(result)
    })
  }, [url])

  if (result && result.green) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent>
            Hosted by: {JSON.stringify(result.hosted_by)}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
}

export default SearchResults
