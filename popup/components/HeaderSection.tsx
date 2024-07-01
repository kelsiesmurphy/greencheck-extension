import { Settings2 } from "lucide-react"

import { ModeToggle } from "~components/mode-toggle"
import { Button } from "~components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "~components/ui/tooltip"

const HeaderSection = () => {
  return (
    <div className="flex justify-between items-center bg-green-800 text-xl text-white font-medium p-4">
      <div>GreenCheck Header</div>
      <div className="flex gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="hover:bg-green-900 hover:text-white">
                <a
                  href={`chrome-extension://${process.env.PLASMO_PUBLIC_CRX_ID}/options.html`}
                  target="_blank">
                  <Settings2 className="h-4 w-4" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Options</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ModeToggle />
      </div>
    </div>
  )
}

export default HeaderSection
