import type { PlasmoMessaging } from "@plasmohq/messaging"

const tabBytesMap: Record<number, number> = {}

// Track bytes of all network requests
chrome.webRequest.onCompleted.addListener(
  (details) => {
    if (!tabBytesMap[details.tabId]) tabBytesMap[details.tabId] = 0

    const contentLengthHeader = details.responseHeaders?.find(
      (h) => h.name.toLowerCase() === "content-length"
    )

    const contentLength = contentLengthHeader?.value
      ? parseInt(contentLengthHeader.value)
      : 0

    tabBytesMap[details.tabId] += contentLength
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
)

// Background handler for Plasmo
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { tabId, green } = req.body

  if (typeof tabId !== "number" || (green !== 0 && green !== 1)) {
    return res.send({ error: "Invalid parameters" })
  }

  const bytes = tabBytesMap[tabId] || 0

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
