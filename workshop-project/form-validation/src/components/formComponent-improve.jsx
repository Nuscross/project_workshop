import { useState } from 'react';
import './formComponent.css';

const FormComponentImprove = () => {

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    rePassword: ""
  });

  const [formErrors, setFormErrors] = useState({
    userName: "",
    email: "",
    password: "",
    rePassword: ""
  });

  const [inputColors, setInputColors] = useState({
    userName: "",
    email: "",
    password: "",
    rePassword: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateInput = (name, value) => {

    let error = "";
    let color = "green";

    switch (name) {
      case "userName":
        if (value.length <= 8) {
          error = "ป้อนชื่อผู้ใช้มากกว่า 8 ตัวอักษร";
          color = "red";
        }
        break;
      case "email":
        if (!value.includes("@")) {
          error = "รูปแบบอีเมลไม่ถูกต้อง";
          color = "red";
        }
        break;
      case "password":
        if (value.length <= 8) {
          error = "ป้อนรหัสผ่านมากกว่า 8 ตัวอักษร";
          color = "red";
        }
        break;
      case "rePassword":
        if (value === "" || value !== formData.password) {
          error = "รหัสผ่านไม่ตรงกัน";
          color = "red";
        }
        break;
      default:
        break;
    }
    return { error, color };

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const newColors = {};

    Object.keys(formData).forEach((key) => {
      const { error, color } = validateInput(key, formData[key]);
      newErrors[key] = error;
      newColors[key] = color;
    });

    setFormErrors(newErrors);
    setInputColors(newColors);
  };

  return (
    <div className="container">
      <h2>แบบฟอร์มลงทะเบียน</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label>ชื่อผู้ใช้</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            style={{ borderColor: inputColors.userName }}
          />
          <small style={{ color: inputColors.userName }}>{formErrors.userName}</small>
        </div>
        <div className="form-control">
          <label>อีเมล</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{ borderColor: inputColors.email }}
          />
          <small style={{ color: inputColors.email }}>{formErrors.email}</small>
        </div>
        <div className="form-control">
          <label>รหัสผ่าน</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={{ borderColor: inputColors.password }}
          />
          <small style={{ color: inputColors.password }}>{formErrors.password}</small>
        </div>
        <div className="form-control">
          <label>ยืนยันรหัสผ่าน</label>
          <input
            type="password"
            name="rePassword"
            value={formData.rePassword}
            onChange={handleInputChange}
            style={{ borderColor: inputColors.rePassword }}
          />
          <small style={{ color: inputColors.rePassword }}>{formErrors.rePassword}</small>
        </div>
        <button type="submit">ลงทะเบียน</button>
      </form>
    </div>
  );
}

export default FormComponentImprove;