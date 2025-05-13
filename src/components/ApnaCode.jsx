import React, { useState } from "react";

const ApnaCode = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newError = {};
    if (!formData.name.trim()) {
      newError.name = "Name is Required";
    }
    if (!formData.email.trim()) {
      newError.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newError.password = "Email is Invalid";
    }
    if (!formData.password.trim()) {
      newError.password = "Password is required";
    } else if (formData.password.length < 8) {
      newError.password = "Password atleast more than 8 character";
    }
    return newError;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    setErrors(validationError);

    if (Object.keys(validationError).length === 0) {
      alert("form successfully submitted");
      setFormData({ name: "", email: "", password: "" });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center mb-4 font-bold">Register</h1>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.name && <p className="text-blue-600">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.email && <p className="text-blue-600">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.password && (
            <p className="text-blue-600">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-900 hover:bg-blue-500 text-white border rounded-2xl px-4 py-2  "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ApnaCode;
