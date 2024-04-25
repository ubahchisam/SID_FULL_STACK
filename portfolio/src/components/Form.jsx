import React, { useState } from "react"
import axios from "axios"

function Form() {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        subject:'',
        phone:'',
        message:''
    });
    const [errors, setErrors] = useState({});

    const handleChange =(e) =>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    }


    const validateForm = () =>{
    const errors = {};
    if (!formData.name.trim()){
        errors.name = 'Name is required';
    }

    if(!formData.email.trim()){
        errors.email = 'Email is required';
    } else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Invalid email format';
    }

    if(!formData.subject.trim()){
        errors.subject = 'Subject is required';
    }

    if(!formData.message.trim()){
        errors.message = 'Message is requuired';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {

            try{
                const response = await axios.post('http://127.0.0.1:8000/contact/postcontact/',formData);
                console.log('Form submitted',response.data);
                alert('Message sent successfully');
                // page reload
                window.location.reload();
            }
            catch (error) {
                console.error('Error submitting form',error);
            }
        }
    };


    return (
    <>
    <form action="" onSubmit={handleSubmit}>
        <div className="d-flex mt-3">
            <div className="flex-grow-1 me-2">
                <input type="text" name="name" value={formData.name} placeholder="Name" className={`form-control ${errors.name && 'is-invalid' }`} onChange={handleChange}/>
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="flex-grow-1 ms-2">
                <input type="email" name="email" value={formData.email} placeholder="Email" className={`form-control ${errors.email && 'is-invalid' }`} onChange={handleChange}/>
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
        </div>
        <div className="d-flex mt-3">
            <div className="flex-grow-1 me-2">
                <input type="text" name="phone" value={formData.phone} placeholder="Phone (Optional)" className="form-control" onChange={handleChange}/>
            </div>
            <div className="flex-grow-1 ms-2">
                <input type="text" name="subject" value={formData.subject} placeholder="Subject" className={`form-control ${errors.subject && 'is-invalid' }`} onChange={handleChange}/>
                {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
            </div>
        </div>
        <textarea name="message" id="" cols="30" rows="10" className={`form-control mt-3 ${errors.subject && 'is-invalid' }`} onChange={handleChange} value={formData.message} placeholder=" Enter your message here">  
        </textarea>
        {errors.message && <div className="invalid-feedback">{errors.message}</div>}
        
        <button className="btn btn-danger mt-3">Submit</button>
    </form>
    </>
);
}

export default Form;