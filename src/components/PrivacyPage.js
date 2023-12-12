import React from "react"
import { useQuery } from "@apollo/client"
import { useTranslation } from "react-i18next"
import { GET_PRIVACY_PAGE } from "../query/query"
import Loader from "./loader"

const PrivacyPage = () => {
  const { i18n } = useTranslation()
  const { loading, error, data } = useQuery(GET_PRIVACY_PAGE, {
    variables: {
      language: i18n.language?.toUpperCase(), // Adjust to match your GraphQL enum format
    },
  })

  if (loading) return <Loader />
  if (error) return <div>Error fetching data: {error.message}</div>
  const privacyPage = data.pages.nodes[0] // Assuming only one page with the given slug

  return (
    <>
      <section className="custom-section content-page-sec">
        <div className="container">
          <div className="content-page-inr">
            <h2>{privacyPage.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: privacyPage.content }}></p>
          </div>
        </div>
      </section>
    </>
  )
}

export default PrivacyPage
