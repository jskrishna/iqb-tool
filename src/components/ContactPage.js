import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GET_CONTACT_FORM, GET_CONTACT_PAGE, SUBMIT_CONTACT_FORM } from '../query/query';

export default function ContactPage() {

  const { i18n } = useTranslation();
  const [formData, setFormData] = useState([]);
  const [errors, setError] = useState({});
  const [msg,setMsg] = useState({success:"",error:""});

  useEffect(() => {
    if (msg.success !== '' || msg.error !== '') {
      // Clear success or error message after 3 seconds
      const timer = setTimeout(() => {
        setMsg({ success: '', error: '' });
      }, 3000);
  
      // Cleanup the timer to prevent memory leaks
      return () => clearTimeout(timer);
    }
  }, [msg]);
  




  const handleChange = (e) => {
    const { name, value } = e.target;
    let name1 = parseInt(name);
    let formDataNew = [...formData];
    const foundItem = formDataNew.find(item => item.id === name1);

    let updatedData = formDataNew.filter(item => item.id !== name1);

    if (foundItem) {
      foundItem.id = name1;
      foundItem.value = value;
      updatedData.push(foundItem);
    } else {
      let newObj = {};
      newObj.id = name1;
      newObj.value = value;
      updatedData.push(newObj);
    }

    setFormData(updatedData);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const checkValidation = (dataForm, formData, setError) => {
    const newError = {};
    let isSubmit = true;

    dataForm.forEach((field) => {
      const foundItem = formData.find(item => item.id === field.fieldId);
      if (field.__typename === "EmailField" && foundItem) {
        if (!validateEmail(foundItem.value)) {
          isSubmit = false;
          newError[field.fieldId] = "Invalid email";
        }
      }
      if (field.required) {
        if (!foundItem || foundItem.value === '') {
          isSubmit = false;
          newError[field.fieldId] = `${field.label} is required!`;
        }
      }


    });

    setError(newError);
    return isSubmit;
  };





  useEffect(() => {
    console.log(formData);
  }, [formData]);




  const { loading, error, data } = useQuery(GET_CONTACT_PAGE, {
    variables: {
      language: i18n.language?.toUpperCase(), // Adjust to match your GraphQL enum format
    },
  });


  const data1 = useQuery(GET_CONTACT_FORM, {
    variables: {
      id: i18n.language?.toUpperCase() == 'NL' ? "2" : "1", // Adjust to match your GraphQL enum format
    },
  });
  const [submitForm, { data: dataSubmit, loading: loadingSubmit, error: errorSubmit }] = useMutation(SUBMIT_CONTACT_FORM);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const ContactPage = data.pages.nodes[0];

  if (data1.loading) return <p>Loading...</p>;
  if (data1.error) return <p>Error: {data1.error.message}</p>;
  const ContactForm = data1.data.form.fields.nodes;

  const onSubmit = async () => {
    let form = document.getElementById("myForm");

    let checkValidations = checkValidation(ContactForm, formData, setError);
    console.log(checkValidations);
    if (checkValidations) {
      let msgNew = msg;
      try {
        const result = await submitForm({
          variables: {
            input: {
              formId: 1,
              data: formData
            }
          }
        });
        console.log(result);
      
        if (result.data.submitForm.success) {
          form.reset();
          msgNew.success = "Message sent successfully!"
          console.log('Message sent successfully!');
        }
      } catch (error) {

        msgNew.error = "Error submitting form!";
        console.error('Error submitting form:', error);
      }
      setMsg(msgNew);
    }
  };
  return (
    <div>
      <section>
        <h1>{ContactPage.contactUs.section1Heading1}</h1>
        <h2>{ContactPage.contactUs.section1Heading2}</h2>
        <p>{ContactPage.contactUs.section1Description}</p>
      </section>
      <section>
        <div>
          <div>
            <ul>
              <li><a href={`tel:${ContactPage.contactUs.contactNumber}`}>{ContactPage.contactUs.contactNumber}</a></li>
              <li><a href={`mailto:${ContactPage.contactUs.emailAddress}`}>{ContactPage.contactUs.emailAddress}</a></li>
              <li>{ContactPage.contactUs.address}</li>
            </ul>


          </div>
          <div>
            <h3>{ContactPage.contactUs.contactFormHeading}</h3>
            <form id="myForm" action='javascript:void(0)'>
            {ContactForm.map((field) => (
              <div key={field.fieldId}>
                {field.__typename === "TextboxField" || field.__typename === "EmailField" ? (
                  <div>
                    <label>{field.label}: </label>
                    <input
                      onChange={(e) => handleChange(e)}
                      name={field.fieldId}
                      type={field.type === 'textbox' ? 'text' : field.type}
           
                    />
                    {errors[field.fieldId] && <span className='error'>{errors[field.fieldId]}</span>}
                  </div>
                ) : field.__typename === "TextareaField" ? (
                  <div>
                    <label>{field.label}: </label>
                    <textarea
                      onChange={(e) => handleChange(e)}
                      name={field.fieldId}
                 
                    ></textarea>
                    {errors[field.fieldId] && <span>{errors[field.fieldId]}</span>}
                  </div>
                ) : field.__typename === "SubmitField" ? (
                  <button onClick={() => onSubmit()} type="submit">Submit</button>
                ) : null}
              </div>
            ))}
            </form>
            {msg.success ? <span className='success'>{msg.success}</span>:<span className='error'>{msg.error}</span>}
          </div>
        </div>
      </section>
      {/* Add more ACF fields here */}


    </div>

  );
}
