import React from "react"
import { useQuery, gql } from "@apollo/client"
import { useTranslation } from "react-i18next"
import { GET_FORMS_PAGE } from "../query/query"

const FormsPage = () => {
  const { i18n } = useTranslation()
  console.log(i18n.language)
  const { loading, error, data } = useQuery(GET_FORMS_PAGE, {
    variables: {
      language: i18n.language?.toUpperCase(), // Adjust to match your GraphQL enum format
    },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error fetching data: {error.message}</div>
  console.log(data)
  const formsPage = data.pages.nodes[0] // Assuming only one page with the given slug

  return (
    <>
      <section className="custom-section">
        <h2>{formsPage.formsPage.section1Heading1}</h2>
        <h3>{formsPage.formsPage.section1Heading2}</h3>
        <p>{formsPage.formsPage.section1Description}</p>
        {formsPage.formsPage.questionnaireList.map((item, i) => (
          <div key={i}>
            <h2>{item.questionnaireName}</h2>
            <p>{item.questionnaireDescription}</p>
            <button>{item.questionnaireButtonText}</button>
            <img
              src={item.questionnaireImage.mediaItemUrl}
              alt=""
              layout="fill"
            />
          </div>
        ))}
      </section>
    </>
  )
}

export default FormsPage
