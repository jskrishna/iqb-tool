const path = require(`path`)
const languages = [
  {
    path: "/",
    code: "en",
  },
  {
    path: "/nl",
    code: "nl",
  },
]
exports.createPages = async ({ actions: { createPage } }) => {
  const HomepageTemplate = path.resolve("./src/pages/index.js")
  languages.forEach(lang => {
    createPage({
      path: lang.path,
      component: HomepageTemplate,
      context: {
        lang: lang.code,
      },
    })
  })
}