import React, {useRef, useLayoutEffect} from 'react'
function Header() {
    
  return (
    <div class="head">
        <div className='head-left'><img className='header-logo' src='../encore-logo-white.png'/></div>
        <div className='head-right'>   
          <div className='profile'>
            <div className='nav-icon'>
              <i class="fa-solid fa-calendar-days"></i>
              <i class="fa-solid fa-bell"></i>  
            </div>
            <h5>User Name</h5>
            <img className='profile' src='../user-white.png'/>
          </div>
        </div>
    </div>
  )
}
export default Header