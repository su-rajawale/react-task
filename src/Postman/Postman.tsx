import React, { useState } from 'react'
import { Box, MenuItem, Typography } from '@mui/material'
import * as yup from 'yup'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import './Postman.css'
import { Select, TextField } from 'formik-mui'

// import Form from 'react-bootstrap/Form'
import Button from '@mui/material/Button';
import { useFormik } from 'formik'
import InputGroup from 'react-bootstrap/InputGroup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';

const validationSchema = yup.object({
    method: yup.string().required('Please Select Method'),
    query: yup.string().required('Plese Enter Query')
})

const initialValues = {
    method: '',
    query: '',
    queryParams: [
        { key: '', value: '' }
    ],
    requestHeaders: [
        { key: '', value: '' }
    ]
}

const Postman = () => {
    const [tabkey, setTabKey] = useState<any | undefined>('queryparams');

    return (
        <Box p='24px'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, action) => {
                    if (values) {
                       await axios({
                        url: values.query,
                        method: values.method,
                        // params: values.queryParams,
                        // headers: values.requestHeaders
                       })
                    } else { alert('novalues') }
                }}
            >
                {({ values }) => (
                    <Form>
                        <Field name='method' component={TextField} select>
                            <MenuItem value='get'>GET</MenuItem>
                            <MenuItem value='post'>POST</MenuItem>
                            <MenuItem value='put'>PUT</MenuItem>
                            <MenuItem value='patch'>PATCH</MenuItem>
                            <MenuItem value='delete'>DELETE</MenuItem>
                        </Field>
                        <Field type='text' name='query' component={TextField} />

                        <Button variant='contained' color='primary' type='submit'>Send</Button>

                        <Tabs
                            id="controlled-tab-example"
                            activeKey={tabkey}
                            onSelect={(k) => setTabKey(k)}
                            className="mb-3"
                        >
                            <Tab eventKey="queryparams" title="Query Params">
                                <Typography fontSize='1.5rem' sx={{ marginBottom: '1rem' }}>Query Params</Typography>
                                <FieldArray name='queryParams'>
                                    {({ remove, push }) => (
                                        <div>
                                            {values.queryParams.length > 0 && values.queryParams.map((param, index) => (
                                                <div key={index}>
                                                    <Field type='text' name={`queryParams.${index}.key`} placeholder='Key' component={TextField} />
                                                    <Field type='text' name={`queryParams.${index}.value`} placeholder='value' component={TextField} />
                                                    <Button variant='contained' color='error' onClick={() => remove(index)}>remove</Button>
                                                </div>
                                            ))}
                                            <div>
                                                <Button variant='contained' color='primary' onClick={() => { push({ key: '', value: '' }) }}>Add</Button>
                                            </div>
                                        </div>
                                    )}
                                </FieldArray>
                            </Tab>
                            <Tab eventKey="requestheaders" title="Headers">
                                <Typography fontSize='1.5rem' sx={{ marginBottom: '1rem' }}>Request Headers</Typography>
                                <FieldArray name='requestHeaders'>
                                    {({ remove, push }) => (
                                        <div>
                                            {values.requestHeaders.length > 0 && values.requestHeaders.map((param, index) => (
                                                <div key={index}>
                                                    <Field type='text' name={`requestHeaders.${index}.key`} placeholder='Key' component={TextField} />
                                                    <Field type='text' name={`requestHeaders.${index}.value`} placeholder='value' component={TextField} />
                                                    <Button variant='contained' color='error' onClick={() => remove(index)}>remove</Button>
                                                </div>
                                            ))}
                                            <div>
                                                <Button variant='contained' color='primary' onClick={() => { push({ key: '', value: '' }) }}>Add</Button>
                                            </div>
                                        </div>
                                    )}
                                </FieldArray>
                            </Tab>
                            <Tab eventKey="json" title="JSON">
                                {/* tab */}
                            </Tab>
                        </Tabs>
                    </Form>
                )}

            </Formik>
        </Box >
    )
}

export default Postman