import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "components/ui/card"
import { Loader2Icon } from "lucide-react"
import copyText from "copy.json"

import GreenCheckDropDown from "~components/green-check-dropdown"

export default function GreenEnergyCheck({ loading, greenHost }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{copyText.popup.tabOne.buttonText}</CardTitle>
        <CardDescription>
          {copyText.popup.tabOne.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center min-h-[100px]">
            <Loader2Icon className="animate-spin" />
          </div>
        ) : greenHost && greenHost.green ? (
          <>
            <h3 className="text-sm font-medium">
              🌱 This website is hosted by{" "}
              <a href={greenHost.hosted_by_website} className="hover:underline">
                {greenHost.hosted_by}
              </a>
              , a provider committed to reducing its environmental impact.
            </h3>
            <GreenCheckDropDown
              result={greenHost}
              text={"Supporting documentation"}
            />
          </>
        ) : (
          <p>This website is not hosted on green energy</p>
        )}
      </CardContent>
    </Card>
  )
}
