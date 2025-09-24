import { Loader2Icon, Sprout, XCircle } from "lucide-react"
import GreenCheckDropDown from "~components/green-check-dropdown"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~components/ui/card"
import copyText from "../../copy.json"

interface Props {
  loading: boolean
  greenWebFoundationData: any
}

export default function GreenEnergyCheck({ loading, greenWebFoundationData }: Props) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{copyText.popup.tabOne.buttonText}</CardTitle>
          <CardDescription>{copyText.popup.tabOne.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center min-h-[100px]">
          <Loader2Icon className="animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (!greenWebFoundationData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{copyText.popup.tabOne.buttonText}</CardTitle>
          <CardDescription>{copyText.popup.tabOne.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            There was an error trying to check this page. Please try again later, or{" "}
            <a href="mailto:greenchecksupport@proton.me" target="_blank" className="underline">
              contact our support
            </a>.
          </p>
        </CardContent>
      </Card>
    )
  }

  const isGreen = greenWebFoundationData.green

  return (
    <Card>
      <CardHeader>
        <CardTitle>{copyText.popup.tabOne.buttonText}</CardTitle>
        <CardDescription>{copyText.popup.tabOne.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`rounded-lg p-4 flex gap-2 border ${
            isGreen
              ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-700 dark:border-emerald-600 dark:text-emerald-200 dark:bg-opacity-50"
              : "bg-red-50 border-red-200 text-red-700 dark:bg-red-700 dark:border-red-600 dark:text-red-200 dark:bg-opacity-50"
          }`}>
          <div className="pt-[2px]">{isGreen ? <Sprout size={20} /> : <XCircle size={20} />}</div>
          <div className="max-w-64">
            <h4 className="text-base font-medium">
              {isGreen ? "This website is green!" : "This website might not be green."}
            </h4>
            <p className="text-sm">
              {isGreen ? (
                <>
                  This website is hosted by{" "}
                  <a href={greenWebFoundationData.hosted_by_website} target="_blank" className="underline">
                    {greenWebFoundationData.hosted_by}
                  </a>
                  , a provider committed to reducing its environmental impact.
                </>
              ) : (
                <>
                  It is unknown if this website runs on green energy, as the website host is not verified with{" "}
                  <a href="https://www.thegreenwebfoundation.org/" target="_blank" className="underline">
                    the Green Web Foundation
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        </div>
        {isGreen && <GreenCheckDropDown result={greenWebFoundationData} text="Supporting documentation" />}
      </CardContent>
    </Card>
  )
}
