import { Loader2Icon, Sprout, XCircle } from "lucide-react"

import GreenCheckDropDown from "~components/green-check-dropdown"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~components/ui/card"

import copyText from "../../copy.json"

export default function GreenEnergyCheck({ loading, greenWebFoundationData }) {
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
          greenWebFoundationData && (
            <>
              <div
                className={`rounded-lg p-4 flex gap-2 border ${
                  greenWebFoundationData.green
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-700 dark:border-emerald-600 dark:text-emerald-200 dark:bg-opacity-50"
                    : "bg-red-50 border-red-200 text-red-700 dark:bg-red-700 dark:border-red-600 dark:text-red-200 dark:bg-opacity-50"
                }`}>
                <div className="pt-[2px]">
                  {greenWebFoundationData.green ? (
                    <Sprout size={20} />
                  ) : (
                    <XCircle size={20} />
                  )}
                </div>
                <div className="max-w-64">
                  <h4 className="text-base font-medium">
                    {greenWebFoundationData.green ? "Good news!" : "Bad news"}
                  </h4>
                  <p className="text-sm">
                    {greenWebFoundationData.green ? (
                      <>
                        This website is hosted by{" "}
                        <a
                          href={greenWebFoundationData.hosted_by_website}
                          className="hover:underline">
                          {greenWebFoundationData.hosted_by}
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
              {greenWebFoundationData.green && (
                <GreenCheckDropDown
                  result={greenWebFoundationData}
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
