import cssText from "data-text:~style.css"
import type {
  PlasmoCSConfig,
  PlasmoCSUIProps,
  PlasmoGetInlineAnchorList
} from "plasmo"
import type { FC } from "react"
import { useEffect, useState } from "react"

import GreenCheckDropDown from "~components/green-check-dropdown"

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText.replaceAll(":root", ":host(plasmo-csui)")
  return style
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

export const getInlineAnchorList: PlasmoGetInlineAnchorList = async () =>
  document.querySelectorAll("div.g > div > div > div > div > span > a")

export const getShadowHostId = () => "greencheck-unique-id"

const SearchResults: FC<PlasmoCSUIProps> = ({ anchor }) => {
  const [result, setResult] = useState(null)
  const [checked, setChecked] = useState(false)
  const url = anchor.element.href

  useEffect(() => {
    apiCheck(url).then((result) => {
      setResult(result)
      setChecked(true)
    })
  }, [url])

  useEffect(() => {
    const block = anchor.element.querySelector("h3")
    if (block) {
      if (!block.hasAttribute("data-checked")) {
        block.setAttribute("data-checked", "true")
        block.textContent = "⏳ " + block.textContent
      }

      if (checked) {
        if (result && result.green) {
          block.textContent = block.textContent.replace("⏳", "🌱")
          if (result.hosted_by) {
            block.setAttribute("title", `Hosted by: ${result.hosted_by}`)
          }
        } else {
          block.textContent = block.textContent.replace("⏳", "")
        }
      }
    }
  }, [checked, result, anchor.element])

  if (result && result.green) return <GreenCheckDropDown result={result} />

  return null
}

export default SearchResults
