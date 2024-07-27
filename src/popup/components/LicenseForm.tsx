"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "~components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~components/ui/form"
import { Input } from "~components/ui/input"

import copyText from "../../copy.json"

const formSchema = z.object({
  licensekey: z
    .string()
    .regex(/^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{8}-[a-zA-Z0-9]{8}-[a-zA-Z0-9]{8}$/, {
      message:
        "License key must be in the format: XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX"
    })
})

export default function LicenseForm({ handleValidation, validationMessage }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licensekey: ""
    }
  })

  async function onSubmit(values) {
    const url = "https://api.gumroad.com/v2/licenses/verify"
    const productID = "1lMFu-kYVe1oKzAajE6uvg=="

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        product_id: productID,
        license_key: values.licensekey
      })
    })

    if (!response.ok) {
      handleValidation(
        false,
        `Failed to validate the license key. Please try a valid license key, or contact GreenCheck support.`
      )
      throw new Error("Network response was not ok")
    }

    const data = await response.json()
    console.log(data)

    if (data.success) {
      chrome.storage.local.set({
        licenseKey: values.licensekey,
        isValidated: "true"
      })
      handleValidation(true, "License key validated successfully.")
    } else {
      handleValidation(false, "Invalid license key.")
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {copyText.popup.tabTwo.buttonText}
          </CardTitle>
          <CardDescription>
            {copyText.popup.tabTwo.beforeLicenseKeyEntry.description}
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="licensekey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Key</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </Form>
          <p className="mt-3">
            {validationMessage && <p>{validationMessage}</p>}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
