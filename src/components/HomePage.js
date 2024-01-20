import React, { useRef, useState } from "react"
import { gsap } from "gsap"
import { useQuery } from "@apollo/client"
import { useTranslation } from "react-i18next"
import { GET_FAQS, GET_FRONT_PAGE, GET_TESTIMONIAL } from "../query/query"
import addToMailchimp from "gatsby-plugin-mailchimp"
import OwlCarousel from "react-owl-carousel3"
import Loader from "./loader"

const options = {
  loop: true,
  nav: false,
  items: 3,
  margin: 20,
  dots: true,
  autoplayHoverPause: true,
  autoplay: false,
  responsive: {
    0: {
      items: 1,
    },

    600: {
      items: 2,
      center: false,
    },

    1024: {
      items: 3,
    },
  },
}

const partnerOptions = {
  loop: false,
  nav: false,
  items: 5,
  margin: 20,
  dots: false,
  autoplayHoverPause: true,
  autoplay: false,
  responsive: {
    0: {
      items: 2.5,
    },

    600: {
      items: 4,
      center: false,
    },

    1024: {
      items: 5,
    },
  },
}

const HomePage = () => {
  const { i18n } = useTranslation()
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState({ success: "", error: "" })
  let faqs = []

  const handleSubscribe = async () => {
    addToMailchimp(email) // listFields are optional if you are only capturing the email address.
      .then(data => {
        // I recommend setting data to React state
        // but you can do whatever you want (including ignoring this `then()` altogether)
        if (data.result === "success") {
          let subscribe = { ...subscribed }
          subscribe.success = data.msg
          setSubscribed({ ...subscribe })
          setEmail("")
        }
        if (data.result === "error") {
          let subscribe = { ...subscribed }
          subscribe.error = data.msg
          setSubscribed({ ...subscribe })
        }
      })
      .catch(error => {
      })
  }

  const [openAccordion, setOpenAccordion] = useState(0)
  const accordionRefs = useRef([])

  const handleAccordionClick = index => {
    if (index === openAccordion) {
      gsap.to(
        accordionRefs.current[index].querySelector(".accordion__details"),
        {
          height: 0,
          duration: 0.5,
          ease: "power1.inOut",
          onComplete: () => setOpenAccordion(null),
        }
      )
    } else {
      if (openAccordion !== null) {
        gsap.to(
          accordionRefs.current[openAccordion].querySelector(
            ".accordion__details"
          ),
          {
            height: 0,
            duration: 0.5,
            ease: "power1.inOut",
          }
        )
      }
      setOpenAccordion(index)
      gsap.fromTo (
        accordionRefs.current[index].querySelector(".accordion__details"),
        { height: 0 },
        {
          height: "auto",
          duration: 0.5,
          ease: "power1.inOut",
        }
      )
    }
  }

  const { loading, error, data } = useQuery (GET_FRONT_PAGE, {
    variables: {
      language: i18n.language?.toUpperCase(), // Adjust to match your GraphQL enum format
    },
  })
  const {
    loading: loadingFaq,
    error: errorFaq,
    data: dataFaq,
  } = useQuery(GET_FAQS, {
    variables: {
      language: i18n.language?.toUpperCase(), // Adjust to match your GraphQL enum format
    },
  })

  const {
    loading: loadingTestimonial,
    error: errorTestimonaial,
    data: dataTestimonial,
  } = useQuery(GET_TESTIMONIAL, {
    variables: {
      language: i18n.language?.toUpperCase(), // Adjust to match your GraphQL enum format
    },
  })

  if (loading) return <Loader />
  if (error) return <p>Error: {error.message}</p>

  const homePage = data.pages.nodes[0] // Assuming only one page with the given slug

  if (loadingFaq) return <p>Loading...</p>
  if (errorFaq) return <p>Error: {errorFaq.message}</p>
  faqs = dataFaq.allFaqs.nodes

  if (loadingTestimonial) return <p>Loading...</p>
  if (errorTestimonaial) return <p>Error: {errorTestimonaial.message}</p>
  const allTestimonials = dataTestimonial.allTestimonials.nodes

  return (
    <>
      <main>
        <section className="main-banner">
          <div className="container">
            <div className="banner-inr">
              <div className="banner-left">
                <h6 className="label-des">{homePage.home.section1Heading1}</h6>
                <h1>{homePage.home.section1Heading2}</h1>
                <p>{homePage.home.section1Description}</p>
                <div className="banner-btn-wrap">
                  <button className="btn btn-primary">
                    <span>{homePage.home.section1ButtonText}</span>
                  </button>
                </div>
              </div>
              <div className="banner-right">
                <img
                  src={homePage.home.section1Image.mediaItemUrl}
                  alt="homepage banner"
                  layout="fill"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="custom-section business-partner">
          <div className="container">
            <div className="business-partner-inr">
              <h4>{homePage.home.section2Heading1}</h4>
              <div className="partner-wrap">
                <OwlCarousel className="partner-slider" {...partnerOptions}>
                  {homePage.home.section2BusinessImages.map((bimage, i) => (
                    <div key={i+'owl'}>
                      <img
                        src={bimage.image.mediaItemUrl}
                        alt=""
                        layout="fill"
                      />
                    </div>
                  ))}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </section>
        <section className="solution-section">
          <div className="container">
            <div className="solution-inr">
              <div className="sec-header after-before-layer">
                <h6>{homePage.home.section3Heading1}</h6>
                <h2 className="secHeading">{homePage.home.section3Heading2}</h2>
                <p>{homePage.home.section3Description}</p>
              </div>
              <div className="image-content-inr">
                {homePage.home.section4Questionnaire.map((item, i) => (
                  <div className="image-content-wrapper" key={i+'abc'}>
                    <div className="content-wrap">
                      <h2>{item.questionnaireName}</h2>
                      <p>{item.questionnaireContent}</p>
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
        <section className="upon-section">
          <div className="container">
            <div
              className="upon-inr"
              style={{
                backgroundImage: `url(${homePage.home.section5BackgroundImage.mediaItemUrl})`,
              }}
            >
              <div className="sec-header">
                <h6>{homePage.home.section5Heading1}</h6>
                <h2 className="secHeading">{homePage.home.section5Heading2}</h2>
                <p>{homePage.home.section5Description}</p>
                <div className="upon-btn-wrap">
                  <button className="btn btn-white">
                    <span>{homePage.home.section5ButtonText}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="9"
                      height="12"
                      viewBox="0 0 9 15"
                      fill="none"
                    >
                      <path
                        d="M1 1L7.5 7.5L1 14"
                        stroke="#0E0B3D"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="upon-image-wrap">
                <img
                  src={homePage.home.section5Image.mediaItemUrl}
                  alt=""
                  layout="fill"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="custom-section testimonial-sec">
          <div className="container">
            <div className="sec-header after-before-layer">
              <h6>{homePage.home.section6Heading1}</h6>
              <h2 className="secHeading">{homePage.home.section6Heading2}</h2>
              <p>{homePage.home.section6Description}</p>
            </div>
            <div className="testimonial-wrapper">
              <OwlCarousel className="testimonial-slider" {...options}>
                {allTestimonials.map((item, i) => (
                  <div className="item" key={i+'testi'}>
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
        <section className="faq-sec">
          <div className="container">
            <div className="faq-inr">
              <div className="sec-header after-before-layer">
                <h6>{homePage.home.section7Heading1}</h6>
                <h2 className="secHeading">{homePage.home.section7Heading2}</h2>
                <p>{homePage.home.section7Description}</p>
              </div>
              <div className="faq-wrapper">
                {faqs.map((item, i) => (
                  <div
                  key={i+'faq'}
                    className={`accordion__item ${
                      openAccordion === i  ? "open" : ""
                    }`}
                    ref={el => (accordionRefs.current[i] = el)}
                  >
                    <div
                      className="faq-title accordion__header"
                      onClick={() => handleAccordionClick(i)}
                    >
                      <span>{item.title}</span>{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                      >
                        <path
                          d="M17.25 9.75L11.75 15.25L6.25 9.75"
                          stroke="#6C6F93"
                          strokeWidth="2"
                        ></path>
                      </svg>
                    </div>
                    <div
                      className="faq-content accordion__details"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="faq-btn-wrap">
                <button className="btn btn-primary">
                  <span>{homePage.home.section7ButtonText}</span>
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
          </div>
        </section>
        <section className="custom-section newsletter-sec">
          <div className="container">
            <div className="sec-header after-before-layer">
              <h2 className="secHeading">{homePage.home.section8Heading1}</h2>
              <p>{homePage.home.section8Description}</p>
            </div>
            <div className="newsletter-inr">
              <div className="newsletter-wrap">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={homePage.home.section8FormPlaceholder}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => handleSubscribe()}
                >
                  <span>{homePage.home.section8ButtonText}</span>
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
      </main>
    </>
  )
}

export default HomePage
