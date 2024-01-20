import React from "react"
import { useTranslation } from "react-i18next"
import { GET_CUSTOM_PAGE } from "../query/query"
import Loader from "./loader"
import { useQuery } from "@apollo/client"

export default function CustomPage() {
  const { i18n } = useTranslation()
  const { loading, error, data } = useQuery(GET_CUSTOM_PAGE, {
    variables: {
      language: i18n.language?.toUpperCase(), // Adjust to match your GraphQL enum format
    },
  })

  if (loading) return <Loader />
  if (error) return <div>Error fetching data: {error.message}</div>
  const customPage = data.pages.nodes[0] // Assuming only one page with the given slug
  return (
    <>
      <section className="custom-section custom-page-sec">
        <div className="container">
          <div className="sec-header after-before-layer">
              <h2 className="secHeading">{customPage.customPage.customPageHeading}</h2>
                <p>{customPage.customPage.contactHeading}</p>
                <div className="useful-btn-wrap">
                  <a className="btn btn-primary" href={customPage.customPage.contactButtonUrl}>
                    <span>{customPage.customPage.contactButtonText}</span>
                  </a>
                </div>
          </div>
        </div>
      </section>
    </>
  )
}
