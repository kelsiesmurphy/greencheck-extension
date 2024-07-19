import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  async function websiteCarbonCheck(url: string) {
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

  const message = await websiteCarbonCheck(req.body.url)

  res.send({
    message
  })
}

export default handler
