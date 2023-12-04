import React from "react"
import { useQuery, gql } from "@apollo/client"
import { useTranslation } from "react-i18next"
import { GET_FORMS_PAGE } from "../query/query"
import Loader from "./loader"

const FormsPage = () => {
  const { i18n } = useTranslation()
  console.log(i18n.language)
  const { loading, error, data } = useQuery(GET_FORMS_PAGE, {
    variables: {
      language: i18n.language?.toUpperCase(), // Adjust to match your GraphQL enum format
    },
  })

  if (loading) return <Loader/>
  if (error) return <div>Error fetching data: {error.message}</div>
  const formsPage = data.pages.nodes[0] // Assuming only one page with the given slug
  console.log(data);
  return (
    <>
   

 



      <section className="solution-section form-p-solution-sec">
          <div className="container">
            <div className="solution-inr">
              <div className="sec-header after-before-layer">
                <h6>{formsPage.formsPage.section1Heading1}</h6>
                <h2 className="secHeading">{formsPage.formsPage.section1Heading2}</h2>
                <p>{formsPage.formsPage.section1Description}</p>
              </div>
              <div className="image-content-inr">
                {formsPage.formsPage.questionnaireList.map((item, i) => (
                  <div className="image-content-wrapper" key={i}>
                    <div className="content-wrap">
                      <h2>{item.questionnaireName}</h2>
                      <p>{item.questionnaireDescription}</p>
                      <button className="btn btn-primary">
                        <span>{item.questionnaireButtonText}</span>{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="9"
                          height="12"
                          viewBox="0 0 9 15"
                          fill="none"
                        >
                          <path
                            d="M1 1L7.5 7.5L1 14"
                            stroke="white"
                            strokeWidth="2"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="image-wrap">
                      <img
                        src={item.questionnaireImage.mediaItemUrl}
                        alt=""
                        layout="fill"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>







    </>
  )
}

export default FormsPage
