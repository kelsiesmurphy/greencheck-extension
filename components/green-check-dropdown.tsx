import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "components/ui/accordion"

const GreenCheckDropDown = ({ result }) => {
  return (
    <Accordion type="single" collapsible className="w-full pb-4">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          This website is hosted by a provider committed to reducing its
          environmental impact.
        </AccordionTrigger>
        <AccordionContent className="space-y-2">
          <p>
            Hosted by:{" "}
            <a href={result.hosted_by_website} className="font-semibold">
              {result.hosted_by}
            </a>
          </p>
          {result.supporting_documents.length > 0 ? (
            <div className="space-y-1">
              <p>Supporting documents:</p>
              <ol className="list-disc list-inside">
                {result.supporting_documents.map((document) => {
                  return (
                    <li>
                      <a href={document.link} className="hover:underline">{document.title}</a>
                    </li>
                  )
                })}
              </ol>
            </div>
          ) : (
            <p>There are no supporting documents available.</p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default GreenCheckDropDown
