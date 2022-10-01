import React, { useState, useEffect } from 'react'
// import Button from 'react-bootstrap/Button';
import Button from '@mui/material/Button'
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { toast } from 'react-toastify';
import './Users.css'

function EditUser(props) {
    
    const rowId = props.id
    const closeModal = props.close

    const [user, setUser] = useState({
        // set default values for user data
        name: '',
        username: '',
        email: '',
        phone: '',
        website: ''
    })

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:5000/employees/${rowId}`)
        setUser(result.data)
    }

    useEffect(() => {
        loadUser()
    }, [])


    // onsubmit function runs form is submitted
    // and event is passed to process data from that event
    const onSubmit = async e => {
        // prevent default form behaviour
        e.preventDefault()

        // await put request with user array as data to add
        await axios.put(`http://localhost:5000/employees/${rowId}`, user)

        // navigate to users page after submit
        // navigate("/users")

        closeModal()

        // show success toast
        toast.success('Updated successfully', {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        })
    }

    // destructuring the user
    const { name, username, email, phone, website } = user

    // oninputchange runs each time input value changes
    // and updates values of corresponding inputs
    const onInputChange = e => {
        // set user in user array using setuser function and
        // map each user's name and value pair
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <section id="edit_users">
            <article>
                <h1 className='edit-user-title'>Edit Employee</h1>
                <div className='react-form2'>
                    <Form onSubmit={e => onSubmit(e)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" name='name'
                                onChange={e => onInputChange(e)}
                                value={name}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="username" name='username'
                                onChange={e => onInputChange(e)}
                                value={username}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" name='email'
                                onChange={e => onInputChange(e)}
                                value={email}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone No.</Form.Label>
                            <Form.Control type="tel" placeholder="Phone" name='phone'
                                onChange={e => onInputChange(e)}
                                value={phone}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Website</Form.Label>
                            <Form.Control type="text" placeholder="Website" name='website'
                                onChange={e => onInputChange(e)}
                                value={website}
                            />
                        </Form.Group>
                        {/* <Button variant="primary" type="submit" style={{marginRight: "0.5rem"}}>Update User</Button>
                        <Button variant="secondary" type="reset" onClick={closeModal}>Cancel</Button> */}
                        <Button variant='contained' color='primary' type="submit" style={{marginRight: "0.5rem"}}>Update Employee</Button>
                        <Button variant='contained' color='error' type="reset" onClick={closeModal}>Cancel</Button>
                    </Form>
                </div>
            </article>
        </section>
    )
}

export default EditUser