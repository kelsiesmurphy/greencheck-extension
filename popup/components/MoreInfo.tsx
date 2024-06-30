"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "components/ui/form"
import { Input } from "components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  licensekey: z
    .string()
    .regex(/^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{8}-[a-zA-Z0-9]{8}-[a-zA-Z0-9]{8}$/, {
      message:
        "License key must be in the format: XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX"
    })
})

export default function MoreInfo({
  isValidated,
  validationMessage,
  handleValidation
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licensekey: ""
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const url = "https://api.gumroad.com/v2/licenses/verify"
    const productID = "umoqOSpjHvvaouQcW5kI7w=="

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
        "Failed to validate the license key. Please try again."
      )
      throw new Error("Network response was not ok")
    }

    const data = await response.json()
    console.log(data)

    if (data.success) {
      localStorage.setItem("licenseKey", values.licensekey)
      localStorage.setItem("isValidated", "true")
      handleValidation(true, "License key validated successfully.")
    } else {
      handleValidation(false, "Invalid license key.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Validate</CardTitle>
        <CardDescription>
          Validate your license key (you would have received it via email, or on
          Gumroad's checkout page).
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isValidated ? (
          <div>
            <p>{validationMessage}</p>
            {/* Additional information can be displayed here */}
            <p>
              Here is some additional information available only to validated
              users.
            </p>
          </div>
        ) : (
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
              {validationMessage && (
                <p style={{ color: "red" }}>{validationMessage}</p>
              )}
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}
