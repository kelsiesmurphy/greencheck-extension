import { sendToBackground } from "@plasmohq/messaging"

export {}

const backgroundWebsiteCarbonCheck = async (url: string) => {
  const resp = await sendToBackground({
    name: "gwf_check",
    body: {
      url: url
    }
  })

  return resp.message
}

async function fetchGreenHost() {
  await backgroundWebsiteCarbonCheck(
    location.href
  )
}
fetchGreenHost()
