import { Link } from 'gatsby'
import React from 'react'

const Footer = ({footer,menusFooter,currentMenuNameFooter}) => {
    const date = new Date();
return (
    <footer>
    <div className=''>
    <div className=''>
   
    <Link href={"/"}><img src={footer.logo.mediaItemUrl} /></Link>
    <p>{footer.belowLogoContent}</p>
    </div>
    <div className=''>
    <div>
        {menusFooter.map(menu => (
          menu.name === currentMenuNameFooter && (
            
            <div key={menu.id}>
              
              <div>
<ul>
  {menu.menuItems.nodes.slice(0, 3).map(item => (
    <li key={item.id}>
      <Link href={item.uri == '/nl/home/'?'/':item.uri.replace(/^\/nl\//, '/')}>
             {item.label} 
          </Link>
    </li>
  ))}
</ul>
</div>

<div>
<ul>
  {menu.menuItems.nodes.slice(3).map(item => (
    <li key={item.id}>
      <Link to={item.uri.replace(/^\/nl\//, '/')}>
        {item.label} 
      </Link>
    </li>
  ))}
</ul>
</div>
            </div>
          )
        ))}
      
      </div>
    </div>
    <div className=''>
   <h3>{footer.letsConnectText}</h3>
   <a href={"mailto:"+footer.email}>{footer.email}</a>
   <div className=''>
    <ul>
      {footer.socialMedia.map((social,i)=>(
        <li key={i}><a href={social.icon.url}><img src={social.icon.mediaItemUrl} /></a></li>
      ))}
    </ul>
   </div>
   </div>
   <div className=''>
    © {date.getFullYear()} <p dangerouslySetInnerHTML={{ __html: footer.copyrightText }}></p>
    <p dangerouslySetInnerHTML={{ __html: footer.builtWithText }}></p>
   </div>
    </div>

  </footer>
  )
}

export default Footer