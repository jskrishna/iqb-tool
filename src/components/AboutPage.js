import React, { useState } from "react"
import { useQuery, gql } from "@apollo/client"
import { useTranslation } from "react-i18next"
import { GET_ABOUT_PAGE, GET_TESTIMONIAL } from "../query/query"
import addToMailchimp from "gatsby-plugin-mailchimp"
import OwlCarousel from "react-owl-carousel3"

const options = {
  loop: true,
  nav: false,
  items: 3,
  margin: 20,
  dots: true,
  autoplayHoverPause: true,
  autoplay: false,
}

const AboutPage = () => {
  const { i18n } = useTranslation()
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState({ success: "", error: "" })
  const handleSubscribe = async () => {
    addToMailchimp(email)
      .then(data => {
        if (data.result == "success") {
          let subscribe = { ...subscribed }
          subscribe.success = data.msg
          subscribe.error = ""
          setSubscribed({ ...subscribe })
          setEmail("")
        }
        if (data.result == "error") {
          let subscribe = { ...subscribed }
          subscribe.error = data.msg
          subscribe.success = ""
          setSubscribed({ ...subscribe })
        }
        console.log(data)
      })
      .catch(error => {
        console.log(error)
      })
    console.log(email)
  }
  const { loading, error, data } = useQuery(GET_ABOUT_PAGE, {
    variables: {
      language: i18n.language?.toUpperCase(),
    },
  })

  const {
    loading: loadingTestimonial,
    error: errorTestimonaial,
    data: dataTestimonial,
  } = useQuery(GET_TESTIMONIAL, {
    variables: {
      language: i18n.language?.toUpperCase(),
    },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error fetching data: {error.message}</div>
  const aboutPage = data.pages.nodes[0] // Assuming only one page with the given slug

  if (loadingTestimonial) return <p>Loading...</p>
  if (errorTestimonaial) return <p>Error: {errorTestimonaial.message}</p>
  const allTestimonials = dataTestimonial.allTestimonials.nodes
  return (
    <>
      <section className="custom-section aboutus-sec">
        <div className="container">
          <div className="sec-header after-before-layer">
            <h6>{aboutPage.aboutUs.section1Heading1}</h6>
            <h2 className="secHeading">{aboutPage.aboutUs.section1Heading2}</h2>
            <p>{aboutPage.aboutUs.section1Description}</p>
          </div>
          <div className="about-sec-inr">
            <div className="about-ledt-content">
              <ul className="icon-list">
                {aboutPage.aboutUs.section2List.map((list, i) => (
                  <li
                    key={i}
                    dangerouslySetInnerHTML={{ __html: list.list }}
                  ></li>
                ))}
              </ul>
            </div>
            <div className="about-right-img">
              <div className="about-img-wrap">
                <img
                  className="img-1"
                  src={aboutPage.aboutUs.section2Image1.mediaItemUrl}
                />
                <img
                  className="img-2"
                  src={aboutPage.aboutUs.section2Image2.mediaItemUrl}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="custom-section useful-sec">
        <div className="container">
          <div className="sec-header after-before-layer">
            <h6>{aboutPage.aboutUs.section3Heading1}</h6>
            <h2 className="secHeading">{aboutPage.aboutUs.section3Heading2}</h2>
            <p>{aboutPage.aboutUs.section3Description}</p>
          </div>
          <div className="useful-inr">
            {aboutPage.aboutUs.section3AllFeature.map((feature, i) => (
              <div key={i} className="useful-item">
                <div className="useful-item-inr">
                  <img src={feature.icon.mediaItemUrl} />
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="useful-btn-wrap">
            <button className="btn btn-primary">
              <span>{aboutPage.aboutUs.section3ButtonText}</span>
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
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </section>
      <section className="custom-section testimonial-sec">
        <div className="container">
          <div className="sec-header after-before-layer">
            <h2 className="secHeading">{aboutPage.aboutUs.section4Heading1}</h2>
            <p>{aboutPage.aboutUs.section4Description}</p>
          </div>
          <div className="testimonial-wrapper">
            <OwlCarousel className="testimonial-slider" {...options}>
              {allTestimonials.map((item, i) => (
                <div className="item" key={i}>
                  <div className="testimonial-item-inr">
                    <div
                      className="review-msg"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    ></div>
                    <div className="author-d-wrap">
                      <div className="author-img">
                        <img
                          src={item.featuredImage.node.mediaItemUrl}
                          alt=""
                          layout="fill"
                        />
                      </div>
                      <div className="author-detail">
                        <h4>{item.title}</h4>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.testimonialsFields.customerPosition,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </section>
      <section className="custom-section newsletter-sec">
        <div className="container">
          <div className="sec-header after-before-layer">
            <h2 className="secHeading">{aboutPage.aboutUs.section5Heading1}</h2>
            <p>{aboutPage.aboutUs.section5Description}</p>
          </div>
          <div className="newsletter-inr">
            <div className="newsletter-wrap">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={aboutPage.aboutUs.section5EmailPlaceholder}
              />
              <button
                className="btn btn-primary"
                onClick={() => handleSubscribe()}
              >
                <span>{aboutPage.aboutUs.section5ButtonText}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_190_4121)">
                    <path
                      d="M20.2346 5.68609C20.6666 4.49109 19.5086 3.33309 18.3136 3.76609L3.70855 9.04809C2.50955 9.48209 2.36455 11.1181 3.46755 11.7571L8.12955 14.4561L12.2926 10.2931C12.4812 10.1109 12.7338 10.0101 12.996 10.0124C13.2582 10.0147 13.509 10.1199 13.6944 10.3053C13.8798 10.4907 13.9849 10.7415 13.9872 11.0037C13.9895 11.2659 13.8887 11.5185 13.7066 11.7071L9.54355 15.8701L12.2436 20.5321C12.8816 21.6351 14.5176 21.4891 14.9516 20.2911L20.2346 5.68609Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_190_4121">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
            {subscribed.success && (
              <span className="success">{subscribed.success}</span>
            )}
            {subscribed.error && (
              <span className="error">{subscribed.error}</span>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutPage
