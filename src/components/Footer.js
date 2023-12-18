import { Link } from "gatsby"
import React from "react"
import { useTranslation } from 'react-i18next';


const Footer = ({ footer, menusFooter, currentMenuNameFooter }) => {
  const { i18n } = useTranslation();
  const date = new Date()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-box footer-logo">
          <Link to={`/`}>
              <img src={footer.logo.mediaItemUrl} alt="" />
            </Link>
            <p>{footer.belowLogoContent}</p>
          </div>
          <div className="footer-box">
              {menusFooter.map(
                menu =>
                  menu.name === currentMenuNameFooter && (
                        <ul className="footer-links" key={menu.id}>
                          {menu.menuItems.nodes.slice(0, 3).map(item => (
                            <li key={item.id}>
                              <Link
                                to={
                                  item.uri === "/nl/home/"
                                    ? "/"
                                    : item.uri.replace(/^\/nl\//, "/")
                                }
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                  )
              )}
            </div>
            <div className="footer-box">
              {menusFooter.map(
                menu =>
                  menu.name === currentMenuNameFooter && (
                        <ul className="footer-links" key={menu.id}>
                          {menu.menuItems.nodes.slice(3).map(item => (
                            <li key={item.id}>
                              <Link to={item.uri.replace(/^\/nl\//, "/")}>
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                  )
              )}
            </div>
          <div className="footer-box">
            <h4>{footer.letsConnectText}</h4>
            <ul className="footer-address">
              <li>
            <a className="decoration" href={"mailto:" + footer.email}>{footer.email}</a>
              </li>
            </ul>
              <ul className="social-menu">
                {footer.socialMedia.map((social, i) => (
                  <li key={i}>
                    <a target={"_blank"} href={social.url} dangerouslySetInnerHTML={{__html: social.icon}}>
                    </a>
                  </li>
                ))}
              </ul>
          </div>
        </div>
          <div className="footer-bottom">
          <p>
          © {date.getFullYear()}{" "}
            <a href="/" className="decoration">
            {footer.footerCopyrightSite}
            </a>{" "}
            |  {footer.copyrightText}
          </p>
          <p>
           {footer.builtWithText} ❤ <a href="https://nextige.com/"> {footer.buildWithSite}</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
