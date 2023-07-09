import { Link } from 'react-router-dom';
import './topbar.css'
import { Context } from '../../context/Context';
import { useContext } from 'react';


export default function TopBar() {
  const {user, dispatch } =  useContext(Context)
  const PF = 'http://localhost:5000/images/'

  const handleLogout = () =>{
    dispatch({type:'LOGOUT'})
  }

  return (
    <div className='top'>
         <div className="topLeft">
         <i className="topIcon  fa-brands   fa-facebook"></i>
         <i className="topIcon  fa-brands   fa-twitter"></i>
         <i className="topIcon  fa-brands   fa-discord"></i>
         <i className="topIcon  fa-brands   fa-instagram"></i>
         </div>
         <div className="topCenter">
           <ul className='topList'>
                
                <li className='topListItem'>
                  <Link className='link' to='/'>HOME</Link>
                </li>
                <li className='topListItem'>
                <Link className='link' to='/about'>ABOUT</Link>
                 </li>
                <li className='topListItem'>
                <Link className='link' to='/contact'>CONTACT</Link>
                </li>
                <li className='topListItem'>
                <Link className='link' to='/write'>WRITE</Link>
                </li>
                <li className='topListItem' onClick={handleLogout}>
                  {user && 'LOGOUT'}
                </li>
              

           </ul>
       
         </div>
         <div className="topRight">

                              
                              
                               
                              

                        {  user ?
                           
                          (

                            <Link to='/settings'>
                            <><img className='topImg' src={PF+user.profilePic} alt="" /><i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
                            </></Link>
                          ) : 
                           (
                            <ul className='topList'>
                              <li className='topListItem'>
                                  
                              <Link className='link' to='/login'>Login</Link>
                                    

                              </li>
                              <li className='topListItem'>
                                  
                              <Link className='link' to='/register'>Register</Link>
                                    

                              </li>
                            </ul>
                           )}
                          
         
         </div>
        </div>
  )
}
