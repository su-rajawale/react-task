import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import './Forms.css'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import { signUpSchema } from './schemas'

const initialValues = {
    name: '',
    email: '',
    password: '',
    confirm_password: ''
}

function Forms() {

    // Navigate

    const navigateTo = useNavigate()

    // States

    const [userRegistration, setUserRegistration] = useState({
        email: '',
        password: ''
    })

    const [isSuccessOpen, setIsSuccessOpen] = useState(false)

    const handleLoginClick = () => {
        setIsSuccessOpen(false)
        const image = document.querySelector('.cover-image')
        if (image.classList.contains('change')) {
            image.classList.remove('change')
        }
    }

    // Sliding image

    function toRight() {
        const image = document.querySelector('.cover-image')
        image.classList.add('change')
    }

    function toLeft() {
        const image = document.querySelector('.cover-image')
        image.classList.remove('change')
    }

    // Formik Handle Form *Registration

    const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit: (values, action) => {
            axios.post('http://localhost:5000/users', values)
            action.resetForm()
            setIsSuccessOpen(true)
        }
    })

    // Normal Handle Form *Login

    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUserRegistration({ ...userRegistration, [name]: value })
    }

    const submitForm = (e) => {
        e.preventDefault()
        axios.get('http://localhost:5000/users/')
            .then(function (res) {
                const user = res.data.find((any) => {
                    return any.email === userRegistration.email && any.password === userRegistration.password
                })

                if (user) {
                    toast('You are logged in', {
                        position: "top-right",
                        autoClose: 3000,
                        type: 'success',
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                    navigateTo("/home/users")

                } else {
                    toast('Wrong Email or Password', {
                        position: "top-right",
                        autoClose: 3000,
                        type: 'error',
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }
            })
    }

    return (
        <section id='forms'>
            <div className={isSuccessOpen ? 'success open' : 'success'}>
                <div className="wrapper">
                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                        <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                </div>
                <h2 className='success-modal-title'>Registration Successful</h2>
                <button className='input-button' onClick={handleLoginClick}>Login</button>
            </div>
            {/* <form action='' className='login-form'>

            <div className="form-group">
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' placeholder='Enter Email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' placeholder='Enter Password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

        </form> */}

            <div className='forms-container'>
                <article className="login-form">
                    <ToastContainer />
                    <h1 className='form-title'>Login</h1>
                    {/* <p style={
                     textAlign="center",
                     padding= "1rem",
                     marginBottom= "1rem"
                     border= "1px solid"
                     borderRadius= "8px",
                     color= "red",
                     borderColor= "red"
                }>Please Provide Valid Credentials</p> */}
                    <form onSubmit={submitForm}>
                        <div className="input-block">
                            <label className='input-label' htmlFor='email'>Email</label>
                            <input type="email" name='email'
                                required
                                value={userRegistration.email}
                                onChange={handleInput}
                            />
                        </div>

                        <div className="input-block">
                            <label className='input-label' htmlFor='password'>Password</label>
                            <input type="password" name='password'
                                required
                                value={userRegistration.password}
                                onChange={handleInput}
                            />
                        </div>

                        <button type="submit" className='input-button'>Login</button>
                        <p className="sign-up">
                            Dont have an account? <span onClick={toRight}>Register now</span>
                        </p>
                    </form>
                </article>

                <article className='registration-form'>
                    <h2 className='form-title'>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='input-block'>
                            <label className='input-label' htmlFor='name'>Name</label>
                            <input
                                type='name'
                                name='name'
                                autoComplete='off'
                                id='name'
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name ?
                                (<p className='form-error'>{errors.name}</p>) :
                                null}
                        </div>
                        <div className='input-block'>
                            <label className='input-label' htmlFor='email'>Email</label>
                            <input
                                type='email'
                                name='email'
                                autoComplete='off'
                                id='email'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email ?
                                (<p className='form-error'>{errors.email}</p>) :
                                null}
                        </div>
                        <div className='input-block'>
                            <label className='input-label' htmlFor='password'>Password</label>
                            <input
                                type='password'
                                name='password'
                                autoComplete='off'
                                id='password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password && touched.password ?
                                (<p className='form-error'>{errors.password}</p>) :
                                null}
                        </div>
                        <div className='input-block'>
                            <label className='input-label' htmlFor='confirm_password'>Confirm Password</label>
                            <input
                                type='password'
                                name='confirm_password'
                                autoComplete='off'
                                id='confirm_password'
                                value={values.confirm_password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.confirm_password && touched.confirm_password ?
                                (<p className='form-error'>{errors.confirm_password}</p>) :
                                null}
                        </div>
                        <div className='button-block'>
                            <button type='submit' className='input-button'>Register</button>
                        </div>
                        <p className="sign-up">
                            Already have an account? <span onClick={toLeft}>Sign In now</span>
                        </p>
                    </form>
                </article>
                <article className='cover-image'>
                </article>
            </div>
        </section>
    )
}

export default Forms