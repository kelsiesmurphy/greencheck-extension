import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        padding: 16
      }}>
      <h2>
        Hello World
      </h2>
      <button id="filter-button">Filter only green sites</button>
    </div>
  )
}

export default IndexPopup
