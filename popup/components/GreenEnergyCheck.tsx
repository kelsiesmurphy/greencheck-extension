import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "components/ui/card"
import copyText from "copy.json"
import { Loader2Icon, Sprout, XCircle } from "lucide-react"

import GreenCheckDropDown from "~components/green-check-dropdown"
import { Alert, AlertDescription, AlertTitle } from "~components/ui/alert"

export default function GreenEnergyCheck({ loading, greenHost }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {copyText.popup.tabOne.buttonText}
        </CardTitle>
        <CardDescription>{copyText.popup.tabOne.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center min-h-[100px]">
            <Loader2Icon className="animate-spin" />
          </div>
        ) : (
          greenHost && (
            <>
              <div
                className={`rounded-lg p-4 flex gap-2 border ${
                  greenHost.green
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-700 dark:border-emerald-600 dark:text-emerald-200 dark:bg-opacity-50"
                    : "bg-red-50 border-red-200 text-red-700 dark:bg-red-700 dark:border-red-600 dark:text-red-200 dark:bg-opacity-50"
                }`}>
                <div className="pt-[2px]">
                  {greenHost.green ? (
                    <Sprout size={20}/>
                  ) : (
                    <XCircle size={20}/>
                  )}
                </div>
                <div className="max-w-64">
                  <h4 className="text-base font-medium">
                    {greenHost.green ? "Good news!" : "Bad news"}
                  </h4>
                  <p className="text-sm">
                    {greenHost.green ? (
                      <>
                        This website is hosted by{" "}
                        <a
                          href={greenHost.hosted_by_website}
                          className="hover:underline">
                          {greenHost.hosted_by}
                        </a>
                        , a provider committed to reducing its environmental
                        impact.
                      </>
                    ) : (
                      <>This website is not hosted on green energy</>
                    )}
                  </p>
                </div>
              </div>
              {greenHost.green && (
                <GreenCheckDropDown
                  result={greenHost}
                  text={"Supporting documentation"}
                />
              )}
            </>
          )
        )}
      </CardContent>
    </Card>
  )
}
