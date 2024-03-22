import React, { useState } from "react";
import axios from "axios";
import "../styles/registration.scss";
import emailjs from '@emailjs/browser';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    username: ""
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make HTTP request to register user
    try {
      const response = await axios.post("http://localhost:3001/register", formData);
      console.log(response.data); // Log the response from the server
      const serviceId = 'service_dmqchgw';
      const templateId = 'template_6t5wma1';
      const publicKey = 'VbbEmsg2jvp21wFyq';
      // Create a new instance of EmailJS
      const templateParams = {
        from_name: name,
        from_email: email,
        to_name: 'Stocks App',
        message: "Welcome to Stocks App! You have successfully registered.",
      };

      emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
          console.log('SUCCESS!', response);
          setName('');
          setEmail('');
          setMessage('');
        })
        .catch((error) => {
          console.log('FAILED...', error);
        });
      alert("Registration successful!");

      setFormData({
        email: "",
        password: "",
        first_name: "",
        last_name: ""
      });

    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="body-wrapper registration-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="Enter email"
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            placeholder="Enter first name"
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            placeholder="Enter last name"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            placeholder="Enter username"
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
