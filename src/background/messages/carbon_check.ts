import type { PlasmoMessaging } from "@plasmohq/messaging"

const tabBytesMap: Record<number, number> = {}

chrome.webRequest.onCompleted.addListener(
  (details) => {
    if (!tabBytesMap[details.tabId]) tabBytesMap[details.tabId] = 0

    const contentLengthHeader = details.responseHeaders?.find(
      (h) => h.name.toLowerCase() === "content-length"
    )

    const contentLength = contentLengthHeader?.value
      ? parseInt(contentLengthHeader.value, 10)
      : 0

    tabBytesMap[details.tabId] += isNaN(contentLength) ? 0 : contentLength
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
)

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { tabId, green } = req.body

  if (typeof tabId !== "number" || (green !== 0 && green !== 1)) {
    return res.send({ error: "Invalid parameters" })
  }

  let bytes = tabBytesMap[tabId] || 0

  try {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        try {
          const resources = performance.getEntriesByType(
            "resource"
          ) as PerformanceResourceTiming[]
          const total = resources.reduce(
            (acc, r) => acc + (r.transferSize || 0),
            0
          )
          // Include the main document load too
          const nav = performance.getEntriesByType(
            "navigation"
          ) as PerformanceNavigationTiming[]
          const navBytes = nav.length > 0 ? nav[0].transferSize : 0

          return total + navBytes
        } catch (err) {
          console.error("Performance API failed:", err)
          return null
        }
      }
    })

    if (result && typeof result === "number" && result > 0) {
      bytes = result
    }
  } catch (err) {
    console.warn("Falling back to Content-Length bytes only:", err)
  }

  try {
    const response = await fetch(
      `https://api.websitecarbon.com/data?bytes=${bytes}&green=${green}`
    )
    const data = await response.json()
    res.send({ message: data })
  } catch (error) {
    console.error("Error fetching carbon data:", error)
    res.send({ error: "Failed to fetch carbon data" })
  }
}

export default handler
