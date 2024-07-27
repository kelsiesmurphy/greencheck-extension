import type { PlasmoMessaging } from "@plasmohq/messaging"

import green from "~assets/green.png"
import other from "~assets/other.png"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  let message = null

  async function websiteCarbonCheck(url: string) {
    try {
      const hostname = new URL(url).hostname
      const response = await fetch(
        `https://api.thegreenwebfoundation.org/api/v3/greencheck/${hostname}`
      )
      const data = await response.json()

      const result = await new Promise<{ [key: string]: any }>((resolve) => {
        chrome.storage.local.get(["licenseKey", "isValidated"], resolve)
      })
      const { licenseKey, isValidated } = result

      if (licenseKey && isValidated === "true") {
        chrome.action.setIcon({ path: data.green ? green : other })
      }

      return data
    } catch (error) {
      console.error("Error checking green energy status:", error)
      return null
    }
  }

  async function updateIconForActiveTab() {
    const queryOptions = { active: true, currentWindow: true }
    const tabs = await chrome.tabs.query(queryOptions)

    if (tabs.length > 0) {
      const activeTab = tabs[0]
      if (activeTab.url) {
        message = await websiteCarbonCheck(activeTab.url)
      }
    }
  }

  chrome.tabs.onActivated.addListener(async () => {
    const result = await new Promise<{ [key: string]: any }>((resolve) => {
      chrome.storage.local.get(["licenseKey", "isValidated"], resolve)
    })
    const { licenseKey, isValidated } = result
    if (licenseKey && isValidated === "true") {
      await updateIconForActiveTab()
    }
  })

  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      const result = await new Promise<{ [key: string]: any }>((resolve) => {
        chrome.storage.local.get(["licenseKey", "isValidated"], resolve)
      })
      const { licenseKey, isValidated } = result
      if (licenseKey && isValidated === "true") {
        await updateIconForActiveTab()
      }
    }
  })

  const initialResult = await new Promise<{ [key: string]: any }>((resolve) => {
    chrome.storage.local.get(["licenseKey", "isValidated"], resolve)
  })
  const { licenseKey, isValidated } = initialResult
  if (licenseKey && isValidated === "true") {
    await updateIconForActiveTab()
  }

  if (req.body.url) {
    message = await websiteCarbonCheck(req.body.url)
  }

  res.send({
    message
  })
}

export default handler
