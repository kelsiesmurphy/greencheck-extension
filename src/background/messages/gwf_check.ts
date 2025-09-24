import type { PlasmoMessaging } from "@plasmohq/messaging"

import green from "~assets/green.png"
import other from "~assets/other.png"

async function websiteCarbonCheck(url: string) {
  try {
    const hostname = new URL(url).hostname
    const response = await fetch(
      `https://api.thegreenwebfoundation.org/api/v3/greencheck/${hostname}`
    )
    const data = await response.json()
    chrome.action.setIcon({ path: data.green ? green : other })
    return data
  } catch (err) {
    console.error("Error in websiteCarbonCheck:", err)
    return null
  }
}

async function updateIconForActiveTab() {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tabs.length) return
    const activeTab = tabs[0]
    if (activeTab.url) {
      await websiteCarbonCheck(activeTab.url)
    }
  } catch (err) {
    console.error("Error updating icon for active tab:", err)
  }
}

chrome.tabs.onActivated.addListener(updateIconForActiveTab)
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url) updateIconForActiveTab()
})

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  let message = null
  if (req.body.url) {
    message = await websiteCarbonCheck(req.body.url)
  }
  res.send({ message })
}

export default handler
