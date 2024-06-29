import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*"],
  all_frames: true
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

function createTooltip(element, text) {
  const tooltipSpan = document.createElement("span")
  tooltipSpan.classList.add("tooltiptext")
  tooltipSpan.textContent = text

  const tooltipDiv = document.createElement("div")
  tooltipDiv.classList.add("tooltip")
  tooltipDiv.appendChild(element.cloneNode(true))
  tooltipDiv.appendChild(tooltipSpan)

  element.replaceWith(tooltipDiv)
}

async function addIndicators() {
  const resultBlocks = document.querySelectorAll('h3');

  for (let block of resultBlocks) {
    const parentAnchor = block.closest('a');
    if (parentAnchor && !block.hasAttribute('data-checked')) {
      block.textContent = '⏳ ' + block.textContent;

      block.setAttribute('data-checked', 'true');

      const url = parentAnchor.href;
      const result = await apiCheck(url);
      
      if (result && result.green) {
        block.textContent = block.textContent.replace('⏳ ', '✅ ');
        if (result.hosted_by) {
          createTooltip(parentAnchor, `Hosted by ${result.hosted_by}`);
        }
      } else {
        block.textContent = block.textContent.replace('⏳ ', '❌ ');
      }
    }
  }
}

window.addEventListener("load", addIndicators)

const observer = new MutationObserver(debounce(addIndicators, 300))
observer.observe(document.body, { childList: true, subtree: true })

function debounce(fn, delay) {
  let timeoutId
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}