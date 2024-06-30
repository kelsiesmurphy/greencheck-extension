import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "components/ui/alert"
import cssText from "data-text:~style.css"
import { Sprout } from "lucide-react"
import type {
  PlasmoCSConfig,
  PlasmoCSUIProps,
  PlasmoGetInlineAnchorList,
  PlasmoGetOverlayAnchorList
} from "plasmo"
import type { FC } from "react"
import { useEffect, useState } from "react"

import { Button } from "~components/ui/button"

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

  if (result && result.green)
    return (
      <Accordion type="single" collapsible className="w-full pb-4">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            This website is hosted by a provider committed to reducing its
            environmental impact.
          </AccordionTrigger>
          <AccordionContent className="space-y-2">
            <p>
              Hosted by:{" "}
              <a href={result.hosted_by_website} className="font-semibold">
                {result.hosted_by}
              </a>
            </p>
            {result.supporting_documents.length > 0 ? (
              <div className="space-y-1">
                <p>Supporting documents:</p>
                <ol className="list-disc list-inside">
                  {result.supporting_documents.map((document) => {
                    return (
                      <li>
                        <a href={document.link}>{document.title}</a>
                      </li>
                    )
                  })}
                </ol>
              </div>
            ) : (
              <p>There are no supporting documents available.</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )

  return null
}

export default SearchResults
