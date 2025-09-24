import cssText from "data-text:~style.css"
import type {
  PlasmoCSConfig,
  PlasmoCSUIProps,
  PlasmoGetInlineAnchorList
} from "plasmo"
import type { FC } from "react"
import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import GreenCheckDropDown from "~components/green-check-dropdown"

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText.replaceAll(":root", ":host(plasmo-csui)")
  return style
}

const backgroundWebsiteCarbonCheck = async (url: string) => {
  const resp = await sendToBackground({
    name: "gwf_check",
    body: {
      url: url
    }
  })

  return resp.message
}

export const getInlineAnchorList: PlasmoGetInlineAnchorList = async () =>
  document.querySelectorAll("div.A6K0A > div > div > div > div > div > span > a")

export const getShadowHostId = () => "greencheck-unique-id"

const SearchResults: FC<PlasmoCSUIProps> = ({ anchor }: { anchor: any }) => {
  const [result, setResult] = useState(null)
  const [checked, setChecked] = useState(false)
  const url = anchor.element.href

  useEffect(() => {
    backgroundWebsiteCarbonCheck(url).then((result) => {
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

      console.log(result)

      if (checked) {
        if (result && result.green) {
          block.textContent = block.textContent.replace("⏳ ", "🌱 ")
          if (result.hosted_by) {
            block.setAttribute("title", `Hosted by: ${result.hosted_by}`)
          }
        } else {
          block.textContent = block.textContent.replace("⏳ ", "")
        }
      }
    }
  }, [checked, result, anchor.element])

//   if (result && result.green)
//     return (
//       <GreenCheckDropDown
//         result={result}
//         text={
//           "This website is hosted by a provider committed to reducing its environmental impact."
//         }
//       />
//     )

  return null
}

export default SearchResults
