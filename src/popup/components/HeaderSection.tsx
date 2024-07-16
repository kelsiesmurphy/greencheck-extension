import { Settings2 } from "lucide-react"

import Logo from "~components/logo"
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
    <div className="flex justify-between items-center bg-emerald-800 text-xl text-white font-medium py-4 px-6">
      <a href="https://getgreencheck.com/" target="_blank">
        <Logo />
      </a>
      <div className="flex gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="hover:bg-emerald-900 hover:text-white">
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
