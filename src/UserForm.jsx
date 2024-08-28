import React, { useState } from 'react';

function UserForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    information: '',
    contactNo: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate First Name and Last Name (Only alphabets)
    if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      newErrors.firstName = 'First name should contain only alphabets.';
    }
    if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      newErrors.lastName = 'Last name should contain only alphabets.';
    }

    const today = new Date();
    const birthDate = new Date(formData.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      newErrors.dob = 'You must be above 18 years old.';
    }

    if (!/^\d{10}$/.test(formData.contactNo)) {
      newErrors.contactNo = 'Contact number should be 10 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      let info = formData.information
      let splitInfo = info.split(' ')
      let newWords = splitInfo.map((word) => {
        let len = word.length
        let newWord = '';
        newWord += word[0].toUpperCase()
        for (let i = 1; i < len; i++) {
          newWord += word[i].toLowerCase()
        }
        // console.log(newWord)
        return newWord
      })
      // console.log("new", newWords)
      let newInfo = newWords.join(" ")
      setFormData({
        ...formData,
        'information': newInfo
      })
      console.log('Form submitted successfully:', formData);
    } else {
      console.log('Form contains errors:', errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-5 flex-col'>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className='px-4 py-2 rounded-lg bg-slate-800'
        />
        {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
      </div>

      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className='px-4 py-2 rounded-lg bg-slate-800'
        />
        {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
      </div>

      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
          className='px-4 py-2 rounded-lg bg-slate-800'
        />
        {errors.dob && <p style={{ color: 'red' }}>{errors.dob}</p>}
      </div>

      <div>
        <label>Information:</label>
        <textarea
          name="information"
          value={formData.information}
          onChange={handleChange}
          required
          className='px-4 py-2 rounded-lg bg-slate-800'
        />
      </div>

      <div>
        <label>Contact No.:</label>
        <input
          type="number"
          name="contactNo"
          value={formData.contactNo}
          onChange={handleChange}
          required
          className='px-4 py-2 rounded-lg bg-slate-800'
        />
        {errors.contactNo && <p style={{ color: 'red' }}>{errors.contactNo}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
