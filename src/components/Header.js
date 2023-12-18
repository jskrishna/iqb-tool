import { Link } from "gatsby";
import React, { useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from 'react-i18next';

const Header = ({ header, menus, currentMenuName }) => {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.getElementById("nav-icon").addEventListener("click", function () {
      var navIcon = this // 'this' refers to the element that triggered the event, in this case, the 'nav-icon' element
      var body = document.body
      // Toggle the 'open' class on the 'nav-icon' element
      navIcon.classList.toggle("open")
      // Toggle the 'menu-open' class on the body element
      body.classList.toggle("menu-open")
    })


    const currentUrl = new URL(window.location.href);
 
    
    window.history.replaceState({}, '', currentUrl.toString());
    window.history.replaceState({}, '', currentUrl.pathname);



  }, [])

  function removeBodyClass(){
    var body = document.body;
    body.classList.remove("menu-open");

  }

  return (
    <header className="main-header">
      <div className="container">
        <div className="header-inr">
          <div className="navbar-left">
            <Link to={`/`}>
              <img src={header.logo.mediaItemUrl} alt="" />
            </Link>
          </div>
          {menus.map(
            menu =>
              menu.name === currentMenuName && (
                <div key={menu.id + "zxy"} className="navbar-center">
                  <ul>
                    {menu.menuItems.nodes.map(item => (
                      <li key={item.id + "aab"}>
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
                </div>
              )
          )}
          <div className="navbar-right">
            <ul className="login-language-menu">
              <LanguageSwitcher />
            </ul>
            <div className="login-btn-wrap">
              <a className="btn btn-primary login-btn" href={header.loginButtonUrl}>
              {header.loginButtonText}
              </a>
            </div>
            <div className="sideToggle">
              <div id="nav-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <path
                    d="M1.875 4.75H13.125"
                    stroke="#232323"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M1.875 10.75H13.125"
                    stroke="#232323"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <svg
                  className="open-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <path
                    filerule="evenodd"
                    clipRule="evenodd"
                    d="M4.28033 2.21967C3.98744 1.92678 3.51256 1.92678 3.21967 2.21967C2.92678 2.51256 2.92678 2.98744 3.21967 3.28033L6.68934 6.75L3.21967 10.2197C2.92678 10.5126 2.92678 10.9874 3.21967 11.2803C3.51256 11.5732 3.98744 11.5732 4.28033 11.2803L7.75 7.81066L11.1746 11.2353C11.4675 11.5282 11.9424 11.5282 12.2353 11.2353C12.5282 10.9424 12.5282 10.4675 12.2353 10.1746L8.81066 6.75L12.2353 3.32538C12.5282 3.03249 12.5282 2.55761 12.2353 2.26472C11.9424 1.97183 11.4675 1.97183 11.1746 2.26472L7.75 5.68934L4.28033 2.21967Z"
                    fill="#232323"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="responsive-navigation">
        <div className="container">
          <div className="res-navigation-inr">
            <div className="res-nav-wrap">
              {menus.map(
                menu =>
                  menu.name === currentMenuName && (
                    <ul key={menu.id + "zyx"}>
                      {menu.menuItems.nodes.map(item => (
                        <li key={item.id + "aabc"} onClick={()=>removeBodyClass()}>
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
              <div className="language-wrap">
                <p className="language-label">Language</p>
                <div className="language-toggle">
                  <ul className="login-language-menu">
                  <LanguageSwitcher />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
