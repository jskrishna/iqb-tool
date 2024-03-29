import React from "react"
import { useTranslation } from "react-i18next"
import { GET_PRICINGPLANS_PAGE } from "../query/query"
import Loader from "./loader"
import { useQuery } from "@apollo/client"

export default function PricingPlansPage() {
  const { i18n } = useTranslation()
  const { loading, error, data } = useQuery(GET_PRICINGPLANS_PAGE, {
    variables: {
      language: i18n.language?.toUpperCase(), // Adjust to match your GraphQL enum format
    },
  })

  if (loading) return <Loader />
  if (error) return <div>Error fetching data: {error.message}</div>
  const pricingPage = data.pages.nodes[0] // Assuming only one page with the given slug
  console.log(pricingPage)
  return (
    <>
      <section className="custom-section">
        <div className="container">
          <div className="sec-header">
            <h2 className="secHeading">{pricingPage.pricingPlans.heading}</h2>
          </div>
        </div>
      </section>
      <section className="custom-section plan-page-sec">
        <div className="container">
          <div className="plan-sec-inr">
            <div className="plan-wrapper">
              {pricingPage.pricingPlans.pricingPlans.map((item, i) => (
                <div className="plan-box">
                  <div className="plan-box-inr">
                    <h3 className="plan-title">{item.type}</h3>
                    <div className="plan-price">
                      <h2 dangerouslySetInnerHTML={{ __html: item.price }}></h2>
                      <p
                        dangerouslySetInnerHTML={{ __html: item.validity }}
                      ></p>
                    </div>
                    <div
                      className="plan-dtl"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    ></div>
                    <div className="plan-btn">
                      <button className="btn btn-primary">
                        <span>{item.buttonText}</span>
                      </button>
                    </div>
                    <div className="plan-dtl-list">
                      <ul>
                        {item.noOfUsers ? (
                          <li>
                            {item.noOfUsers == "Unlimited access" ||
                            item.noOfUsers == "Onbeperkt toegang" ? (
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                                  stroke="#1367FF"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                                  stroke="#1367FF"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M23 20.9989V18.9989C22.9993 18.1126 22.7044 17.2517 22.1614 16.5512C21.6184 15.8508 20.8581 15.3505 20 15.1289"
                                  stroke="#1367FF"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16 3.12891C16.8604 3.34921 17.623 3.84961 18.1676 4.55122C18.7122 5.25283 19.0078 6.11574 19.0078 7.00391C19.0078 7.89208 18.7122 8.75499 18.1676 9.4566C17.623 10.1582 16.8604 10.6586 16 10.8789"
                                  stroke="#1367FF"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                                  stroke="#1367FF"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                                  stroke="#1367FF"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}

                            <label>{item.noOfUsers}</label>
                          </li>
                        ) : (
                          ""
                        )}
                        {item.viewsProfilePerYear ? (
                          <li>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                stroke="#1367FF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17 9L10.125 16L7 12.8182"
                                stroke="#1367FF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <label>{item.viewsProfilePerYear}</label>
                          </li>
                        ) : (
                          ""
                        )}
                        {item.exportProfilesPj ? (
                          <li>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                stroke="#1367FF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17 9L10.125 16L7 12.8182"
                                stroke="#1367FF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <label>{item.exportProfilesPj}</label>
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </div>
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
