import { Switch } from "~components/ui/switch"

import HeaderOptions from "./HeaderOptions"

import "../style.css"

import { Button } from "~components/ui/button"

function OptionsIndex() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeaderOptions />
      <div className="container py-12 md:py-18 flex justify-center">
        <div className="flex-1 max-w-2xl">
          <div className="py-5 space-y-1">
            <h1 className="text-3xl font-semibold">Options</h1>
            <p className="text-sm text-muted-foreground">
              Update your settings for the GreenCheck extension.
            </p>
          </div>
          <hr />
          <div className="flex justify-between items-center">
            <div className="space-y-1 py-5">
              <h2 className="text-sm font-semibold">Profile</h2>
              <p className="text-sm text-muted-foreground">Lorum ipsum</p>
            </div>
            <Switch />
          </div>
          <hr />
          <div className="flex justify-between items-center">
            <div className="space-y-1 py-5">
              <h2 className="text-sm font-semibold">Profile</h2>
              <p className="text-sm text-muted-foreground">Lorum ipsum</p>
            </div>
            <Switch />
          </div>
          <div className="flex justify-end py-8">
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default OptionsIndex
