import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*"]
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

async function addIndicators() {
  const resultBlocks = document.querySelectorAll("h3")

  for (let block of resultBlocks) {
    const parentAnchor = block.closest("a")
    if (parentAnchor && !block.hasAttribute("data-checked")) {
      block.textContent = "⏳ " + block.textContent

      block.setAttribute("data-checked", "true")

      const url = parentAnchor.href
      const result = await apiCheck(url)

      if (result && result.green) {
        block.textContent = block.textContent.replace("⏳", "✅")
      } else {
        block.textContent = block.textContent.replace("⏳", "❌")
      }
    }
  }
}

window.addEventListener("load", () => {
  addIndicators()
})
