import cssText from "data-text:~style.css"
import type {
  PlasmoCSConfig,
  PlasmoCSUIProps,
  PlasmoGetInlineAnchorList
} from "plasmo"
import type { FC } from "react"
import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

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
    body: { url }
  })
  return resp.message
}

export const getInlineAnchorList: PlasmoGetInlineAnchorList = async () => {
  return Array.from(document.querySelectorAll("a"))
    .filter((a) => {
      const href = a.getAttribute("href") || ""
      const h3 = a.querySelector("h3")
      return href.startsWith("http") && h3
    })
    .map((a) => ({ element: a }))
}

export const getShadowHostId = () => "greencheck-unique-id"

const SearchResults: FC<PlasmoCSUIProps> = ({ anchor }: { anchor: any }) => {
  const [result, setResult] = useState<any>(null)
  const [checked, setChecked] = useState(false)
  const url = anchor.element.href

  useEffect(() => {
    if (!url) return
    let canceled = false

    backgroundWebsiteCarbonCheck(url).then((res) => {
      if (!canceled) {
        setResult(res)
        setChecked(true)
      }
    })

    return () => {
      canceled = true
    }
  }, [url])

  useEffect(() => {
    const h3 = anchor.element.querySelector("h3")
    if (!h3) return

    if (!h3.hasAttribute("data-checked")) {
      h3.setAttribute("data-checked", "true")
      h3.textContent = "⏳ " + h3.textContent
    }

    if (checked && result) {
      if (result.green) {
        h3.textContent = h3.textContent.replace("⏳ ", "🌱 ")
        if (result.hosted_by) {
          h3.setAttribute("title", `Hosted by: ${result.hosted_by}`)
        }
      } else {
        h3.textContent = h3.textContent.replace("⏳ ", "")
      }
    }
  }, [checked, result, anchor.element])

  return null
}

export default SearchResults
