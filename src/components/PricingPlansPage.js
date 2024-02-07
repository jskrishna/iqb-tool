import React from "react"
import { useTranslation } from "react-i18next"
import { GET_CUSTOM_PAGE } from "../query/query"
import Loader from "./loader"
import { useQuery } from "@apollo/client"

export default function PricingPlansPage() {
  const { i18n } = useTranslation()
  const { loading, error, data } = useQuery(GET_CUSTOM_PAGE, {
    variables: {
      language: i18n.language?.toUpperCase(), // Adjust to match your GraphQL enum format
    },
  })

  if (loading) return <Loader />
  if (error) return <div>Error fetching data: {error.message}</div>
  return (
    <>
      <section className="custom-section">
        <div className="container">
          <div className="sec-header">
              <h2 className="secHeading">Prijzen</h2>
          </div>
          </div>
          </section>
          <section className="custom-section plan-page-sec">
          <div className="container">
          <div className="plan-sec-inr">
            <div className="plan-wrapper">
              <div className="plan-box">
                <div className="plan-box-inr">
                <h3 className="plan-title">Lite</h3>
                <div className="plan-price">
                  <h2>€379</h2>
                  <p>per jaar</p>
                </div>
                <div className="plan-dtl">
                  <p>Voor iedereen die af en toe bedrijfsinformatie nodig heeft voor het screenen van (potentiële) cliënten en risicomanagement.</p>
                </div>
                <div className="plan-btn">
                <button className="btn btn-primary">
                  <span>Bestel nu</span>
                </button>
                </div>
                <div className="plan-dtl-list">
                  <ul>
                    <li>
                    <label>1 user</label>
                    </li>
                    <li>
                    <label>84 <br/>view profiles per year</label>
                    </li>
                    <li>
                    <label>1,800 <br />export profiles pj </label>
                    </li>
                  </ul>
                </div>
              </div>
              </div>
              <div className="plan-box">
              <div className="plan-box-inr">
                <h3 className="plan-title">Business</h3>
                <div className="plan-price">
                  <h2>€949</h2>
                  <p>per jaar</p>
                </div>
                <div className="plan-dtl">
                  <p>For anyone who regularly needs up-to-date business information for client acceptance, monitoring and risk management.</p>
                </div>
                <div className="plan-btn">
                <button className="btn btn-primary">
                  <span>Bestel nu</span>
                </button>
                </div>
                <div className="plan-dtl-list">
                  <ul>
                    <li>
                    
                    <label>1 user</label>
                    </li>
                    <li>
                    
                    <label>240 <br/>view profiles per year</label>
                    </li>
                    <li>
                    
                    <label>4,200 <br />export profiles pj </label>
                    </li>
                  </ul>
                </div>
              </div>
              </div>
              <div className="plan-box">
              <div className="plan-box-inr">
                <h3 className="plan-title">Pro</h3>
                <div className="plan-price">
                  <h2>€1,899</h2>
                  <p>per jaar</p>
                </div>
                <div className="plan-dtl">
                  <p>For the professional who needs up-to-date company information on a daily basis for KYC processes & risk management.</p>
                </div>
                <div className="plan-btn">
                <button className="btn btn-primary">
                  <span>Bestel nu</span>
                </button>
                </div>
                <div className="plan-dtl-list">
                  <ul>
                    <li>
                    <label>1 user</label>
                    </li>
                    <li>
                    <label>720 <br/>view profiles per year</label>
                    </li>
                    <li>
                    <label>12,600 <br />export profiles pj </label>
                    </li>
                  </ul>
                </div>
              </div>
              </div>
              <div className="plan-box">
              <div className="plan-box-inr">
                <h3 className="plan-title">Unlimited</h3>
                <div className="plan-price">
                  <h2>Customized price</h2>
                </div>
                <div className="plan-dtl">
                  <p>Execute KYC processes accurately and assess risks better. Additional insights with the Risk & Compliance and Real Estate modules.</p>
                </div>
                <div className="plan-btn">
                <button className="btn btn-primary">
                  <span>Request price</span>
                </button>
                </div>
                <div className="plan-dtl-list">
                  <ul>
                    <li>
                    <label>Unlimited access</label>
                    </li>
                    <li>
                    <label>Unlimited <br/>view profiles per year</label>
                    </li>
                    <li>
                    <label>Unlimited <br />export profiles pj </label>
                    </li>
                  </ul>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
