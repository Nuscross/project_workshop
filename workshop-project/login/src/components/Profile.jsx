import { useEffect, useState } from "react";

const Profile = () => {

  const token = localStorage.getItem('accessToken');

  const [user,setUser] = useState([]);

  const fetchUser = async () => {
    return fetch("https://www.melivecode.com/api/auth/user",{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => response.json())
    .then(result => {
      if (result.status === 'ok') {
        setUser(result.user);
      }
      else {
        window.location.href = "/login";
      }
    })
    .catch(error => console.error('error', error))
  } 

  useEffect(()=>{
    fetchUser();
  },[])

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = "/login";
  }

  return (
    <div>
      <img alt="" src={user.avatar} />
      <h2>Welcome {user.fname} {user.lname}</h2>
      <button type="button" onClick={handleLogout}>Log Out</button>
    </div>
  )

}

export default Profile