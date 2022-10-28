import React, { useState, useEffect } from "react";
// import Button from 'react-bootstrap/Button';
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";
import "./Users.css";
import { useFormik } from "formik";
import { userSchema } from "./schemas";

function EditUser(props) {
  const rowId = props.id;
  const closeModal = props.close;

  const [initialValues, setInitialValues] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:5000/employees/${rowId}`);
    const data = result.data;
    delete data.id;
    setInitialValues(data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const editUserForm = useFormik({
    initialValues: initialValues,
    validationSchema: userSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      axios.put(`http://localhost:5000/employees/${rowId}`, values);
      closeModal();
      toast.success("Updated successfully", {
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    },
  });

  return (
    <section id="edit_users">
      <article>
        <h1 className="edit-user-title">Edit Employee</h1>
        <div className="react-form2">
          <Form onSubmit={editUserForm.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                id="name"
                value={editUserForm.values.name}
                onChange={editUserForm.handleChange}
                onBlur={editUserForm.handleBlur}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="username"
                name="username"
                id="username"
                value={editUserForm.values.username}
                onChange={editUserForm.handleChange}
                onBlur={editUserForm.handleBlur}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                value={editUserForm.values.email}
                onChange={editUserForm.handleChange}
                onBlur={editUserForm.handleBlur}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone No.</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Phone"
                name="phone"
                id="phone"
                value={editUserForm.values.phone}
                onChange={editUserForm.handleChange}
                onBlur={editUserForm.handleBlur}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                placeholder="Website"
                name="website"
                id="website"
                value={editUserForm.values.website}
                onChange={editUserForm.handleChange}
                onBlur={editUserForm.handleBlur}
              />
            </Form.Group>
            <Button variant="contained" color="primary" type="submit" style={{ marginRight: "0.5rem" }}>Update Employee</Button>
            <Button variant="contained" color="error" type="reset" onClick={closeModal}>Cancel</Button>
          </Form>
        </div>
      </article>
    </section>
  );
}

export default EditUser;
