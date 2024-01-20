import { gql } from "@apollo/client"
export const GET_MENUS = gql`
  query Menus {
    menus {
      nodes {
        id
        name
        menuItems {
          nodes {
            id
            label
            uri
            url
            parentId
          }
        }
      }
    }
  }
`

export const GET_FRONT_PAGE = gql`
  query NewQuery($language: LanguageCodeFilterEnum = EN) {
    pages(where: { language: $language, name: "home" }) {
      nodes {
        title
        home {
          section1Heading1
          section1Heading2
          section1Description
          section1ButtonText
          section1Image {
            mediaItemUrl
          }
          section2BusinessImages {
            image {
              mediaItemUrl
            }
          }
          section2Heading1
          section3Description
          section3Heading1
          section3Heading2
          section4Questionnaire {
            questionnaireImage {
              mediaItemUrl
            }
            questionnaireName
            questionnaireButtonText
            questionnaireContent
          }
          section5BackgroundImage {
            mediaItemUrl
          }
          section5ButtonText
          section5Description
          section5Heading1
          section5Heading2
          section5Image {
            mediaItemUrl
          }
          section6Description
          section6Heading1
          section6Heading2
          section7ButtonText
          section7Description
          section7Heading1
          section7Heading2
          section8ButtonText
          section8Description
          section8FormPlaceholder
          section8Heading1
        }
      }
    }
  }
`

export const GET_CONTACT_PAGE = gql`
  query NewQuery($language: LanguageCodeFilterEnum = EN) {
    pages(where: { language: $language, name: "contact-us" }) {
      nodes {
        title
        contactUs {
          address
          addressLink
          contactFormHeading
          contactNumber
          emailAddress
          fieldGroupName
          section1Description
          section1Heading1
          section1Heading2
        }
      }
    }
  }
`

export const GET_PRIVACY_PAGE = gql`
  query NewQuery($language: LanguageCodeFilterEnum = EN) {
    pages(where: { language: $language, name: "privacy-policy" }) {
      nodes {
        title
        content
      }
    }
  }
`

export const GET_TERMSCONDITION_PAGE = gql`
  query NewQuery($language: LanguageCodeFilterEnum = EN) {
    pages(where: { language: $language, name: "terms-and-condition" }) {
      nodes {
        title
        content
      }
    }
  }
`

export const GET_COOKIEPOLICY_PAGE = gql`
  query NewQuery($language: LanguageCodeFilterEnum = EN) {
    pages(where: { language: $language, name: "cookie-policy" }) {
      nodes {
        title
        content
      }
    }
  }
`

export const GET_FORMS_PAGE = gql`
  query NewQuery($language: LanguageCodeFilterEnum = EN) {
    pages(where: { language: $language, name: "forms" }) {
      nodes {
        title
        formsPage {
          questionnaireList {
            questionnaireButtonText
            questionnaireDescription
            questionnaireName
            questionnaireImage {
              mediaItemUrl
            }
          }
          section1Description
          section1Heading1
          section1Heading2
        }
      }
    }
  }
`

export const GET_CUSTOM_PAGE = gql`
  query NewQuery($language: LanguageCodeFilterEnum = EN) {
    pages(where: { name: "custom", language: $language }) {
      nodes {
        customPage {
          customPageHeading
          contactHeading
          contactButtonText
          contactButtonUrl
        }
      }
    }
  }
`

export const GET_CONTACT_FORM = gql`
  query MyQuery($id: ID = "1") {
    form(id: $id, idType: DATABASE_ID) {
      title
      fields {
        nodes {
          fieldId
          label
          type
          required
        }
      }
    }
  }
`

export const SUBMIT_CONTACT_FORM = gql`
  mutation SubmitContactForm($input: SubmitFormInput!) {
    submitForm(input: $input) {
      errors {
        fieldId
        message
        slug
      }
      message
      success
    }
  }
`

export const GET_ABOUT_PAGE = gql`
  query NewQuery($language: LanguageCodeFilterEnum = EN) {
    pages(where: { language: $language, name: "about-us" }) {
      nodes {
        title
        aboutUs {
          section1Description
          section1Heading1
          section1Heading2
          section2Image1 {
            mediaItemUrl
          }
          section2Image2 {
            mediaItemUrl
          }
          section2List {
            list
          }
          section3AllFeature {
            icon {
              mediaItemUrl
            }
            description
          }
          section3ButtonText
          section3Description
          section3Heading1
          section3Heading2
          section4Description
          section4Heading1
          section5ButtonText
          section5Description
          section5EmailPlaceholder
          section5Heading1
        }
      }
    }
  }
`

export const GET_FOOTER_OPTIONS = gql`
  query NewQuery($languages: [LanguageCodeEnum!] = EN) {
    allFooter(where: { languages: $languages }) {
      nodes {
        title
        footer {
          logo {
            mediaItemUrl
          }
          belowLogoContent
          builtWithText
          copyrightText
          email
          letsConnectText
          socialMedia {
            icon
            url
          }
          buildWithSite
          footerCopyrightSite
        }
      }
    }
  }
`

export const GET_FAQS = gql`
  query NewQuery($language: LanguageCodeFilterEnum = ALL) {
    allFaqs(where: { language: $language }) {
      nodes {
        title
        content
      }
    }
  }
`

export const GET_TESTIMONIAL = gql`
  query NewQuery($language: LanguageCodeFilterEnum = ALL) {
    allTestimonials(where: { language: $language }) {
      nodes {
        content
        title
        testimonialsFields {
          customerPosition
        }
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`

export const GET_HEADER_OPTIONS = gql`
  query MyQuery {
    allHeader {
      nodes {
        header {
          logo {
            mediaItemUrl
          }
          loginButtonText
          loginButtonUrl
        }
      }
    }
  }
`
