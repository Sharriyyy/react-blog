import { useEffect, useState } from 'react'
import './sidebar.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Sidebar() {

  const [cats,setCat]= useState([])


  useEffect(()=>{
           const getCats = async ()=>{
            const res = await axios.get('/categories')
            setCat(res.data)
           }
           getCats()
  },[])
  return (
    <div className='sidebar'>
       <div className="sidebarItem">
                        <span className='sidebarTitle'>ABOUT ME</span>
                        <img src="https://images.pexels.com/photos/17400155/pexels-photo-17400155/free-photo-of-vela-en-mano.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                        <p>Just a guy roaming around the world</p>

       </div>
                    
                    <div className="sidebarItem">

                                    <span className='sidebarTitle'>CATEGORIES</span>  
                                    <ul className='sidebarList'>
                                         {cats.map((c)=>(
                                            <Link to={`/?cat=${c.name}`} className='link'>
                                           <li className="sidebarListItem">{c.name}</li>
                                            </Link>


                                         ))}
                                         
                                        </ul>       
                                            

                    </div>

                     <div className="sidebarItem">

                     <span className='sidebarTitle'>FOLLOW ME</span>
                     <div className="sidebarSocial">
                               
                     <i className="sidebarIcon  fa-brands   fa-facebook"></i>
                        <i className="sidebarIcon  fa-brands   fa-twitter"></i>
                           <i className="sidebarIcon  fa-brands   fa-discord"></i>
                                 <i className="sidebarIcon  fa-brands   fa-instagram"></i>
                               


                     </div>
                     </div>


       </div>
      

      

      
  )
}
