import { Link } from 'gatsby'
import React from 'react'
import LanguageSwitcher from './LanguageSwitcher'

const Header = ({header,menus,currentMenuName}) => {
 
  return (
    <header className="global-header">
      
    <Link to="/"><img src={header.logo.mediaItemUrl} /></Link>


 <nav>
<div>
  {menus.map(menu => (
    menu.name === currentMenuName && (
      <div key={menu.id}>
   
        <ul>
          {menu.menuItems.nodes.map(item => (
            <li key={item.id}>
              <Link to={item.uri == '/nl/home/'?'/':item.uri.replace(/^\/nl\//, '/')}>
             {item.label} 
          </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  ))}

</div>
<ul>

    <LanguageSwitcher/>

</ul>
</nav>
</header>
  )
}

export default Header