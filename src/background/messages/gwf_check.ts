import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

import green from "~assets/green.png"
import other from "~assets/other.png"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  async function websiteCarbonCheck(url: string) {
    try {
      const hostname = new URL(url).hostname
      const response = await fetch(
        `https://api.thegreenwebfoundation.org/api/v3/greencheck/${hostname}`
      )
      const data = await response.json()

      // const storage = new Storage()
      // const storedLicenseKey = await storage.get("licenseKey")
      // const validationStatus = await storage.get("isValidated")

      // if (storedLicenseKey && validationStatus === "true") {
      //   chrome.action.setIcon({ path: data.green ? green : other })
      // }

      return data
    } catch (error) {
      console.error("Error checking green energy status:", error)
      return null
    }
  }

  const message = await websiteCarbonCheck(req.body.url)

  res.send({
    message
  })
}

export default handler
