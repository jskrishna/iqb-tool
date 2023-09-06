import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { GET_ABOUT_PAGE, GET_TESTIMONIAL } from '../query/query';
import addToMailchimp from 'gatsby-plugin-mailchimp';

const AboutPage = () => {
  const { i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState({ success: '', error: '' });
  const handleSubscribe = async () => {
    addToMailchimp(email) // listFields are optional if you are only capturing the email address.
      .then(data => {
        // I recommend setting data to React state
        // but you can do whatever you want (including ignoring this `then()` altogether)
        if (data.result == "success") {
          let subscribe = { ...subscribed };
          subscribe.success = data.msg;
          subscribe.error = "";
          setSubscribed({ ...subscribe });
          setEmail("");
        }
        if (data.result == "error") {
          let subscribe = { ...subscribed };
          subscribe.error = data.msg;
          subscribe.success = "";
          setSubscribed({ ...subscribe });
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
  const { loading, error, data } = useQuery(GET_ABOUT_PAGE, {
    variables: {
      language: i18n.language?.toUpperCase(), // Adjust to match your GraphQL enum format
    },
  });

  const { loading: loadingTestimonial, error: errorTestimonaial, data: dataTestimonial } = useQuery(GET_TESTIMONIAL, {
    variables: {
      language: i18n.language?.toUpperCase(), // Adjust to match your GraphQL enum format
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;
  const aboutPage = data.pages.nodes[0]; // Assuming only one page with the given slug

  if (loadingTestimonial) return <p>Loading...</p>;
  if (errorTestimonaial) return <p>Error: {errorTestimonaial.message}</p>;
  const allTestimonials = dataTestimonial.allTestimonials.nodes;
  return (
    <>
      <section>
        <h2>{aboutPage.aboutUs.section1Heading1}</h2>
        <h3>{aboutPage.aboutUs.section1Heading2}</h3>
        <p>{aboutPage.aboutUs.section1Description}</p>
      </section>
      <section>
        <div>
          <ul>
            {aboutPage.aboutUs.section2List.map((list, i) => (
              <li key={i}>{list.list}</li>
            ))}
          </ul>
        </div>
        <div>
          <img src={aboutPage.aboutUs.section2Image1.mediaItemUrl} />
          <img src={aboutPage.aboutUs.section2Image2.mediaItemUrl} />
        </div>

      </section>
      <section>
        <div>
          <h2>{aboutPage.aboutUs.section3Heading1}</h2>
          <h3>{aboutPage.aboutUs.section3Heading2}</h3>
          <p>{aboutPage.aboutUs.section3Description}</p>
        </div>
        <div>
          {aboutPage.aboutUs.section3AllFeature.map((feature, i) => (
            <div key={i}>
              <img src={feature.icon.mediaItemUrl} />
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
        <button>{aboutPage.aboutUs.section3ButtonText}</button>
      </section>
      <section>
        <div>
          <h2>{aboutPage.aboutUs.section4Heading1}</h2>
          <p>{aboutPage.aboutUs.section4Description}</p>
        </div>
        <div>
          {allTestimonials.map((item, i) => (
            <div key={i}>
              <p dangerouslySetInnerHTML={{ __html: item.content }}></p>

              <img src={item.featuredImage.node.mediaItemUrl} alt="homepage banner" layout='fill' />
              <h2>{item.title}</h2>
              <p>{item.testimonialsFields.customerPosition}</p>
            </div>
          ))}
        </div>

      </section>
      <section>
        <h2>{aboutPage.aboutUs.section5Heading1}</h2>
        <p>{aboutPage.aboutUs.section5Description}</p>
        <div>
          <input type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} placeholder={aboutPage.aboutUs.section5EmailPlaceholder} />
          <button onClick={() => handleSubscribe()}>{aboutPage.aboutUs.section5ButtonText}</button>
          {subscribed.success && <span className='success'>{subscribed.success}</span>}
          {subscribed.error && <span className='error'>{subscribed.error}</span>}
        </div>

      </section>
    </>
  );
};

export default AboutPage;
