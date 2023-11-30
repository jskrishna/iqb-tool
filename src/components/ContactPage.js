import React from "react"
import { useQuery, useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  GET_CONTACT_FORM,
  GET_CONTACT_PAGE,
  SUBMIT_CONTACT_FORM,
} from "../query/query"
import Loader from "./loader"

export default function ContactPage() {
  const { i18n } = useTranslation()
  const [formData, setFormData] = useState([])
  const [errors, setError] = useState({})
  const [msg, setMsg] = useState({ success: "", error: "" })

  useEffect(() => {
    if (msg.success !== "" || msg.error !== "") {
      // Clear success or error message after 3 seconds
      const timer = setTimeout(() => {
        setMsg({ success: "", error: "" })
      }, 3000)

      // Cleanup the timer to prevent memory leaks
      return () => clearTimeout(timer)
    }
  }, [msg])

  const handleChange = e => {
    const { name, value } = e.target
    let name1 = parseInt(name)
    let formDataNew = [...formData]
    const foundItem = formDataNew.find(item => item.id === name1)

    let updatedData = formDataNew.filter(item => item.id !== name1)

    if (foundItem) {
      foundItem.id = name1
      foundItem.value = value
      updatedData.push(foundItem)
    } else {
      let newObj = {}
      newObj.id = name1
      newObj.value = value
      updatedData.push(newObj)
    }

    setFormData(updatedData)
  }

  const validateEmail = email => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailPattern.test(email)
  }

  const checkValidation = (dataForm, formData, setError) => {
    const newError = {}
    let isSubmit = true

    dataForm.forEach(field => {
      const foundItem = formData.find(item => item.id === field.fieldId)
      if (field.__typename === "EmailField" && foundItem) {
        if (!validateEmail(foundItem.value)) {
          isSubmit = false
          newError[field.fieldId] = "Invalid email"
        }
      }
      if (field.required) {
        if (!foundItem || foundItem.value === "") {
          isSubmit = false
          newError[field.fieldId] = `${field.label} is required!`
        }
      }
    })

    setError(newError)
    return isSubmit
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const { loading, error, data } = useQuery(GET_CONTACT_PAGE, {
    variables: {
      language: i18n.language?.toUpperCase(), // Adjust to match your GraphQL enum format
    },
  })

  const data1 = useQuery(GET_CONTACT_FORM, {
    variables: {
      id: i18n.language?.toUpperCase() == "NL" ? "2" : "1", // Adjust to match your GraphQL enum format
    },
  })
  const [
    submitForm,
    { data: dataSubmit, loading: loadingSubmit, error: errorSubmit },
  ] = useMutation(SUBMIT_CONTACT_FORM)
  if (loading) return <Loader/>
  if (error) return <p>Error: {error.message}</p>
  const ContactPage = data.pages.nodes[0]

  if (data1.loading) return <Loader/>
  if (data1.error) return <p>Error: {data1.error.message}</p>
  const ContactForm = data1.data.form.fields.nodes

  const onSubmit = async () => {
    let form = document.getElementById("myForm")

    let checkValidations = checkValidation(ContactForm, formData, setError)
    console.log(checkValidations)
    if (checkValidations) {
      let msgNew = msg
      try {
        const result = await submitForm({
          variables: {
            input: {
              formId: 1,
              data: formData,
            },
          },
        })
        console.log(result)

        if (result.data.submitForm.success) {
          form.reset()
          msgNew.success = "Message sent successfully!"
          console.log("Message sent successfully!")
        }
      } catch (error) {
        msgNew.error = "Error submitting form!"
        console.error("Error submitting form:", error)
      }
      setMsg(msgNew)
    }
  }
  return (
    <>
      <section className="custom-section contact-page-sec">
        <div className="container">
          <div className="sec-header after-before-layer">
            <h6>{ContactPage.contactUs.section1Heading1}</h6>
            <h2 className="secHeading">
              {ContactPage.contactUs.section1Heading2}
            </h2>
            <p>{ContactPage.contactUs.section1Description}</p>
          </div>
          <div className="contact-page-inr">
            <div className="contact-page-left">
              <div className="">
                <ul className="address-link">
                  <li>
                    <a href={`tel:${ContactPage.contactUs.contactNumber}`}>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M15.0504 5C16.0272 5.19057 16.9248 5.66826 17.6285 6.37194C18.3322 7.07561 18.8099 7.97326 19.0004 8.95M15.0504 1C17.0797 1.22544 18.972 2.13417 20.4167 3.57701C21.8613 5.01984 22.7724 6.91101 23.0004 8.94M22.0004 16.92V19.92C22.0016 20.1985 21.9445 20.4742 21.8329 20.7293C21.7214 20.9845 21.5577 21.2136 21.3525 21.4019C21.1473 21.5901 20.905 21.7335 20.6412 21.8227C20.3773 21.9119 20.0978 21.9451 19.8204 21.92C16.7433 21.5856 13.7874 20.5341 11.1904 18.85C8.77425 17.3147 6.72576 15.2662 5.19042 12.85C3.5004 10.2412 2.44866 7.27099 2.12042 4.18C2.09543 3.90347 2.1283 3.62476 2.21692 3.36162C2.30555 3.09849 2.44799 2.85669 2.63519 2.65162C2.82238 2.44655 3.05023 2.28271 3.30421 2.17052C3.5582 2.05833 3.83276 2.00026 4.11042 2H7.11042C7.59573 1.99522 8.06621 2.16708 8.43418 2.48353C8.80215 2.79999 9.0425 3.23945 9.11042 3.72C9.23704 4.68007 9.47187 5.62273 9.81042 6.53C9.94497 6.88792 9.97408 7.27691 9.89433 7.65088C9.81457 8.02485 9.62928 8.36811 9.36042 8.64L8.09042 9.91C9.51398 12.4135 11.5869 14.4864 14.0904 15.91L15.3604 14.64C15.6323 14.3711 15.9756 14.1858 16.3495 14.1061C16.7235 14.0263 17.1125 14.0555 17.4704 14.19C18.3777 14.5286 19.3204 14.7634 20.2804 14.89C20.7662 14.9585 21.2098 15.2032 21.527 15.5775C21.8441 15.9518 22.0126 16.4296 22.0004 16.92Z"
                            stroke="#3333FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <label>{ContactPage.contactUs.contactNumber}</label>
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${ContactPage.contactUs.emailAddress}`}>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                            stroke="#3333FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 6L12 13L2 6"
                            stroke="#3333FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <label>{ContactPage.contactUs.emailAddress}</label>
                    </a>
                  </li>
                  <li>
                    <a href={`${ContactPage.contactUs.addressLink}`}>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                            stroke="#3333FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                            stroke="#3333FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <label>{ContactPage.contactUs.address}</label>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="contact-page-right">
              <div className="contact-right-inr">
                <div>
                  <h3>{ContactPage.contactUs.contactFormHeading}</h3>
                  <form id="myForm" action="javascript:void(0)">
                    {ContactForm.map(field => (
                      <div className="form-group" key={field.fieldId}>
                        {field.__typename === "TextboxField" ||
                        field.__typename === "EmailField" ? (
                          <>
                            <input
                              className="form-control"
                              placeholder={field.label}
                              onChange={e => handleChange(e)}
                              name={field.fieldId}
                              type={
                                field.type === "textbox" ? "text" : field.type
                              }
                            />
                            {errors[field.fieldId] && (
                              <span className="error">
                                {errors[field.fieldId]}
                              </span>
                            )}
                          </>
                        ) : field.__typename === "TextareaField" ? (
                          <>
                            <textarea
                              className="form-control"
                              placeholder={field.label}
                              onChange={e => handleChange(e)}
                              name={field.fieldId}
                            ></textarea>
                            {errors[field.fieldId] && (
                              <span>{errors[field.fieldId]}</span>
                            )}
                          </>
                        ) : field.__typename === "SubmitField" ? (
                          <button
                            onClick={() => onSubmit()}
                            type="submit"
                            className="btn btn-primary w-100"
                          >
                            Send a message
                          </button>
                        ) : null}
                      </div>
                    ))}
                  </form>
                  {msg.success ? (
                    <span className="success">{msg.success}</span>
                  ) : (
                    <span className="error">{msg.error}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
