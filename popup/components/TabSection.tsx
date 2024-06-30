"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs"
import { Crown, Sprout } from "lucide-react"

import CheckEmissions from "./CheckEmissions"
import MoreInfo from "./MoreInfo"

const TabSection = ({ isValidated, validationMessage, handleValidation }) => {
  return (
    <Tabs defaultValue="check-emissions">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="check-emissions">
          <Sprout className="mr-2 h-4 w-4" /> Check Emissions
        </TabsTrigger>
        <TabsTrigger value="more-info">
          <Crown className="mr-2 h-4 w-4" /> More Info
        </TabsTrigger>
      </TabsList>
      <TabsContent value="check-emissions" className="py-2">
        <CheckEmissions />
      </TabsContent>
      <TabsContent value="more-info" className="py-2">
        <MoreInfo
          isValidated={isValidated}
          validationMessage={validationMessage}
          handleValidation={handleValidation}
        />
      </TabsContent>
    </Tabs>
  )
}

export default TabSection
