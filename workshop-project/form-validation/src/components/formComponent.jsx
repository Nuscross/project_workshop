import { useState } from 'react';
import './formComponent.css';

const FormComponent = () => {

  const [userName,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [rePassword,setRePassword] = useState("");

  const [errorUsername,setErrorUsername] = useState("");
  const [errorEmail,setErrorEmail] = useState("");
  const [errorPassword,setErrorPassword] = useState("");
  const [errorRePassword,setErrorRePassword] = useState("");

  const [userNameColor,setUsernameColor] = useState("");
  const [userEmailColor,setEmailColor] = useState("");
  const [userPasswordColor,setPasswordColor] = useState("");
  const [userRePasswordColor,setRePasswordColor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorUsername(userName.length > 8 ? "" : "ป้อนชื่อผู้ใช้มากกว่า 8 ตัวอักษร");
    setUsernameColor(userName.length > 8 ? "green" : "red");
    setErrorEmail(email.includes("@") ? "" : "รูปแบบอีเมลไม่ถูกต้อง");
    setEmailColor(email.includes("@") ? "green" : "red");
    setErrorPassword(password.length > 8 ? "" : "ป้อนรหัสผ่านมากกว่า 8 ตัวอักษร");
    setPasswordColor(password.length > 8 ? "green" : "red");
    setErrorRePassword((password === rePassword && rePassword !== "") ? "" : "รหัสผ่านไม่ตรงกัน");
    setRePasswordColor((password === rePassword && rePassword !== "") ? "green" : "red");
  }

  return (
    <div className="container">
      <h2>แบบฟอร์มลงทะเบียน</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label>ชื่อผู้ใช้</label>
          <input type="text" value={userName} onChange={(e) => setUsername(e.target.value)} style={{borderColor:userNameColor}} />
          <small style={{color:userNameColor}}>{errorUsername}</small>
        </div>
        <div className="form-control">
          <label>อีเมล</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={{borderColor:userEmailColor}} />
          <small style={{color:userEmailColor}}>{errorEmail}</small>
        </div>
        <div className="form-control">
          <label>รหัสผ่าน</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{borderColor:userPasswordColor}} />
          <small style={{color:userPasswordColor}}>{errorPassword}</small>
        </div>
        <div className="form-control">
          <label>ยืนยันรหัสผ่าน</label>
          <input type="password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} style={{borderColor:userRePasswordColor}} />
          <small style={{color:userRePasswordColor}}>{errorRePassword}</small>
        </div>
        <button type="submit">ลงทะเบียน</button>
      </form>  
    </div>
  )
}

export default FormComponent;