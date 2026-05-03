
import React, { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link, useParams, useNavigate } from 'react-router-dom';

const ThemeContex = createContext();
function Profile({name, age, role, onChangeClick}) {
 
  return (
    <>
    <div className='flex items-center gap-4 '>
      <h2>{name}</h2>
      <p>{age}</p>
      <p >{role} </p>
       </div>
       <button onClick={onChangeClick} >Change my name</button>
    </>
  )
}
function Button() {
 const {theme, setTheme} = useContext(ThemeContex) ;
 return (
  <button onClick={()=>theme ==='light'? setTheme('dark'): setTheme('light')}>Current theme : {theme}</button>
 )
}
 function Header({showHeader}) {
  if(showHeader)
  return (
<div>

    <nav>My App</nav>
    <Button />
</div>

    
  )
 }
function UserList({users}) {
  return (
    <ul className='bg-red'>

     {users.map((user) => (
         <li key={user.id}  >{user.name}</li>
        )
      )} 
        
        </ul>
      )
}
function Posts({posts}) {
  const navigate = useNavigate()
 return (
  <div>
 <button onClick={()=> navigate('/profile')}>Back to Profile</button>
  <div className="container">
    {posts.map((post) => (
      <div key={post.id}>

      <h2>{post.title}</h2>
      <p>{post.body}</p>
      </div>
    ))}
  </div>
    </div>
 )  
}
function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(event) {
    event.preventDefault();
    console.log({'userName':userName, 'password': password} )
  }
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name='userName' value={userName} onChange={(e)=> setUserName(e.target.value)} />
      <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} className="passord" />
      <button type='submit'>Submit</button>
    </form>
  )
}
function app() {
  const [theme, setTheme] = useState('light');
   const [name, setName] = useState('prakash')
 const age = '26';
 const role = 'Software Engineer';
 const [isEnableHeader, setIsEnableHeader] = useState(true)
 const users= [
  {id: '1', name: 'praksh'},
  {id : '2', name: 'Rahul'}
 ]
 const [post, setPost] = useState([])
 useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then((res) =>{
    if (!res) throw new Error('failed api')
      return  res.json()
  })
  .then((data) => 
  {
    setPost(data);
    console.log(data)
  })
 }, []);
 
 function onClickEvent() {
  if (name ==='Pakks') {
    setName('Prakash')
  }else{

    setName('Pakks');
  } 

  setIsEnableHeader(!isEnableHeader);
 }
  return (
    <>
    <BrowserRouter>
    <nav>
      <Link to='/profile'>Profile</Link>
      <Link to='/post'>Posts</Link>
    </nav>
    <ThemeContex.Provider value={{theme, setTheme}}>
    <Header showHeader={isEnableHeader}/>
    <h1 className='bg-red-50 text-xl bg-amber-100 '>Hello World</h1>
    <Routes>
      <Route path='/profile' element={<Profile name={name} role={role} age={age} onChangeClick={onClickEvent} />} >
    
      </Route>
      <Route path='/post' element={<Posts posts={post} />}>
    
      </Route>
    </Routes>
    <UserList users={users}/>
    <Login />
    </ThemeContex.Provider>
    </BrowserRouter>
    {/* <nav>
      <NavList></NavList>
    </nav> */}
    </>
  )
}

export default app