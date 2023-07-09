import { Link, useLocation } from 'react-router-dom'
import './singlePost.css'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Context } from '../../context/Context';

export default function SinglePost() {

  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [post, setPost] = useState({})
  const PF = 'http://localhost:5000/images/';
  const { user } = useContext(Context);
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [updateMode, setUpdateMode] = useState(false)

  




  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get('/posts/' + path);
        setPost(res.data);
        setTitle(res.data.title)
        setDesc(res.data.desc)
      } catch (error) {
        console.error(error);
      }
    };
    getPost();
  }, [path]);


  const handleDelete = async()=>{
    try{
      await axios.delete(`/posts/${post._id}`, {
        data: {username: user.username},})
      window.location.replace('/')
    }catch(err){


    }
    console.log(post.username === user.username)

};

 const handleUpdate = async () => {
  try{
    await axios.put(`/posts/${post._id}`, 
      {
        username: user.username, 
        title,
        desc,
      })
    // window.location.reload()
    setUpdateMode(false)
  }catch(err){

  }

};












  return (
    <div className='singlePost'>
        <div className="singlePostWrapper">
                      { post.photo && (
                      
            <img className='singlePostImg' src={PF + post.photo} alt="" />)}
            {
              updateMode ? <input type="text" value={title} className='singlePostTitleInput' autoFocus onChange={(e)=>setTitle(e.target.value)}/> : (

              
            <h1 className='singlePostTitle'> {title}
            {post.username === user?.username && (  
            <div className="singlePostEdit">
            <i class="singlePostIcon fa-solid fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
            <i class="singlePostIcon fa-sharp fa-solid fa-trash" onClick={handleDelete}></i>
            </div>
)}
            </h1>
            )
          }
            <div className="singlePostInfo">
                <span className='singlePostAuthor'>Author:
               
                          <Link to={`/?user=${post.username}`}className='link'>
                          <b>{post.username}</b>
                          </Link>
                 </span>
                <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
            </div>

                    {updateMode ? <textarea className='singlePostDescInput' value={desc} onChange={(e)=>setDesc(e.target.value)}/> : 

            <p className='singlePostDesc'>{desc}</p>
          }
          {updateMode &&   (
          <button className='singlePostButton' onClick={handleUpdate}>Update</button>
        )}
        </div>
    </div>
  )
}
