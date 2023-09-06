import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { Link } from 'gatsby';
import { GET_FAQS, GET_FRONT_PAGE, GET_TESTIMONIAL } from '../query/query';
import addToMailchimp from 'gatsby-plugin-mailchimp'




const HomePage = () => {
  const { i18n } = useTranslation();
  const [displayFaq, setDisplayFaq] = useState({ '1': true });
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState({success:'',error:''});
  const handleClick = (i) => {
    let newDisplayFaq = { ...displayFaq };
    newDisplayFaq[i] = !newDisplayFaq[i];
    setDisplayFaq(newDisplayFaq);
  }

  const handleSubscribe = async () => {
    addToMailchimp(email) // listFields are optional if you are only capturing the email address.
    .then(data => {
      // I recommend setting data to React state
      // but you can do whatever you want (including ignoring this `then()` altogether)
      if(data.result == "success"){
        let subscribe = {...subscribed};
        subscribe.success = data.msg;
        setSubscribed({...subscribe});
        setEmail("");
      }
      if(data.result == "error"){
        let subscribe = {...subscribed};
        subscribe.error = data.msg;
        setSubscribed({...subscribe});
      }
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
      // unnecessary because Mailchimp only ever
      // returns a 200 status code
      // see below for how to handle errors
    })
    console.log(email);
  };

  const { loading, error, data } = useQuery(GET_FRONT_PAGE, {
    variables: {
      language: i18n.language?.toUpperCase(), // Adjust to match your GraphQL enum format
    },
  });
  const { loading: loadingFaq, error: errorFaq, data: dataFaq } = useQuery(GET_FAQS, {
    variables: {
      language: i18n.language?.toUpperCase(), // Adjust to match your GraphQL enum format
    },
  });

  const { loading: loadingTestimonial, error: errorTestimonaial, data: dataTestimonial } = useQuery(GET_TESTIMONIAL, {
    variables: {
      language: i18n.language?.toUpperCase(), // Adjust to match your GraphQL enum format
    },
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const homePage = data.pages.nodes[0]; // Assuming only one page with the given slug

  if (loadingFaq) return <p>Loading...</p>;
  if (errorFaq) return <p>Error: {errorFaq.message}</p>;
  const faqs = dataFaq.allFaqs.nodes;


  if (loadingTestimonial) return <p>Loading...</p>;
  if (errorTestimonaial) return <p>Error: {errorTestimonaial.message}</p>;
  const allTestimonials = dataTestimonial.allTestimonials.nodes;
  return (
    <div>
      <main >
        <section>
          <h2>{homePage.home.section1Heading1}</h2>
          <h3>{homePage.home.section1Heading2}</h3>
          <p>{homePage.home.section1Description}</p>
          <button>{homePage.home.section1ButtonText}</button>
          <img src={homePage.home.section1Image.mediaItemUrl} alt="homepage banner" layout='fill' />
        </section>
        <section>
          <h2>{homePage.home.section2Heading1}</h2>
          {homePage.home.section2BusinessImages.map((bimage, i) => (
            <img key={i} src={bimage.image.mediaItemUrl} alt="homepage banner" layout='fill' />
          ))}

        </section>

        <section>
          <h2>{homePage.home.section3Heading1}</h2>
          <h3>{homePage.home.section3Heading2}</h3>
          <p>{homePage.home.section3Description}</p>
          {homePage.home.section4Questionnaire.map((item, i) => (
            <div key={i}>
              <h2>{item.questionnaireName}</h2>
              <p>{item.questionnaireContent}</p>
              <button>{item.questionnaireButtonText}</button>
              <img src={item.questionnaireImage.mediaItemUrl} alt="homepage banner" layout='fill' />
            </div>
          ))}
        </section>

        <section>
          <h2>{homePage.home.section5Heading1}</h2>
          <h3>{homePage.home.section5Heading2}</h3>
          <p>{homePage.home.section5Description}</p>
          <button>{homePage.home.section5ButtonText}</button>
          <div style={{ backgroundImage: `url(${homePage.home.section5BackgroundImage.mediaItemUrl})` }}>
            <img src={homePage.home.section5Image.mediaItemUrl} alt="homepage banner" layout='fill' />

          </div>

        </section>

        <section>
          <h2>{homePage.home.section6Heading1}</h2>
          <h3>{homePage.home.section6Heading2}</h3>
          <p>{homePage.home.section6Description}</p>
          {allTestimonials.map((item, i) => (
            <div key={i}>
              <p dangerouslySetInnerHTML={{ __html: item.content }}></p>

              <img src={item.featuredImage.node.mediaItemUrl} alt="homepage banner" layout='fill' />
              <h2>{item.title}</h2>
              <p>{item.testimonialsFields.customerPosition}</p>
            </div>
          ))}

        </section>

        <section>
          <h2>{homePage.home.section7Heading1}</h2>
          <h3>{homePage.home.section7Heading2}</h3>
          <p>{homePage.home.section7Description}</p>

          {faqs.map((item, i) => (
            <div key={i}>
              <h2 id={i} onClick={() => handleClick(i)}>{item.title}</h2>
              <p className={displayFaq[i] ? '' : 'd-none'} dangerouslySetInnerHTML={{ __html: item.content }}></p>
            </div>
          ))}
          <button>{homePage.home.section7ButtonText}</button>
        </section>

        <section>
          <h2>{homePage.home.section8Heading1}</h2>
          <h3>{homePage.home.section8Description}</h3>
          <div>
            <input type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder={homePage.home.section8FormPlaceholder} />
            <button onClick={()=>handleSubscribe()} >{homePage.home.section8ButtonText}</button>
            {subscribed.success && <span className='success'>{subscribed.success}</span>}
            {subscribed.error && <span className='error'>{subscribed.error}</span>}
          </div>

        </section>
      </main>

    </div>
  );
};

export default HomePage;
