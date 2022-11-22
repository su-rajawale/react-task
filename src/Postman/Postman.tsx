import React, { useState } from 'react'

// Formik
import * as yup from 'yup'
import { Formik, Field, Form, FieldArray, FormikHelpers } from 'formik';
import { TextField } from 'formik-mui'

// CSS
import './Postman.css'
import 'react-json-pretty/themes/monikai.css'

// JSON beautifiers and editors
import prettyBytes from 'pretty-bytes';
import CodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'

// Bootstrap Tabs
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

// Axios
import axios, { AxiosResponseHeaders } from 'axios';

// Material UI
import { Box, MenuItem, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const validationSchema = yup.object({
    method: yup.string().required('Please Select Method'),
    query: yup.string().required('Plese Enter Query')
})

type Item = {
    key?: any,
    value?: any
}

type PostmanForm = {
    method: string;
    query: string;
    queryParams: {}[];
    requestHeaders: {}[];
}

const initialValues: PostmanForm = {
    method: '',
    query: '',
    queryParams: [{ key: '', value: '' }],
    requestHeaders: [{ key: '', value: '' }]
}


const Postman = () => {
    const [requestTabkey, setRequestTabKey] = useState<any | undefined>('queryparams');
    const [responseTabkey, setResponseTabKey] = useState<any | undefined>('body');
    const [jsonData, setJsonData] = useState<string>()
    const [responseHeaders, setResponseHeaders] = useState<AxiosResponseHeaders>()
    const [responseStatus, setResponseStatus] = useState<number>()
    const [responseSize, setResponseSize] = useState<string>()
    const [dataToSend, setDataToSend] = useState<string>('{}')
    const [jsonError, setJsonError] = useState(false)

    const handleSubmit = async (values: PostmanForm, action: FormikHelpers<PostmanForm>) => {
        if (values) {
            const hdr = values.requestHeaders
            const prm = values.queryParams

            let header = hdr.reduce((obj, item: Item) => Object.assign(obj, { [item.key]: item.value }), {})
            let param = prm.reduce((obj, item: Item) => Object.assign(obj, { [item.key]: item.value }), {})

            if (values.method === 'get') {
                await axios({
                    url: values.query,
                    method: values.method,
                    params: param
                }).catch(e => e)
                    .then((res) => {
                        setJsonData(res.data)
                        setResponseHeaders(res.headers)
                        setResponseStatus(res.status)
                        if (res.data && res.headers) {
                            const ldata = JSON.stringify(res.data)
                            const lheaders = JSON.stringify(res.headers)
                            const length = prettyBytes(ldata.length + lheaders.length)
                            setResponseSize(length)
                        }
                    })
            } else {
                let sendData
                try {
                    sendData = JSON.parse(dataToSend)
                } catch (e) {
                    setJsonError(true)
                    return
                }
                header = {} //clear header object because default empty values
                const jsonHeader = { 'content-type': 'application/json' }
                await axios({
                    url: values.query,
                    method: values.method,
                    headers: { ...header, ...jsonHeader },
                    data: dataToSend,
                }).catch(e => e)
                    .then((res) => {
                        setJsonData(res.data)
                        setResponseHeaders(res.headers)
                        setResponseStatus(res.status)
                        if (res.data && res.headers) {
                            const ldata = JSON.stringify(res.data)
                            const lheaders = JSON.stringify(res.headers)
                            const length = prettyBytes(ldata.length + lheaders.length)
                            setResponseSize(length)
                        }
                    })
            }
        } else { alert('No values Provided') }
        action.resetForm();
    }

    return (
        <Box p='24px' display='flex' flexDirection='column' gap='2rem'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={(values, action) => handleSubmit(values, action)}
            >
                {({ values }) => (
                    <Form id='postman_form' style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <Box display='flex' alignItems='flex-start'>
                            <Field id='method' name='method' component={TextField} select style={{ flexBasis: '8rem' }}>
                                <MenuItem value='get'>GET</MenuItem>
                                <MenuItem value='post'>POST</MenuItem>
                                <MenuItem value='put'>PUT</MenuItem>
                                <MenuItem value='patch'>PATCH</MenuItem>
                                <MenuItem value='delete'>DELETE</MenuItem>
                            </Field>
                            <Field type='text' id='query' name='query' component={TextField} style={{ flex: '1' }} />

                            <Button variant='contained' color='primary' type='submit' style={{ borderRadius: '0 4px 4px 0' }}>Send</Button>
                        </Box>

                        <Box>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={requestTabkey}
                                onSelect={(k) => setRequestTabKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="queryparams" title="Query Params">
                                    <Box display='flex' flexDirection='column' gap='1rem'>
                                        <Typography fontSize='1.1rem'>Query Params</Typography>
                                        <FieldArray name='queryParams'>
                                            {({ remove, push }) => (
                                                <>
                                                    {values.queryParams.length > 0 && values.queryParams.map((param: Item, index) => (
                                                        <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                            <Field type='text' name={`queryParams.${index}.key`} placeholder='Key' component={TextField} />
                                                            <Field type='text' name={`queryParams.${index}.value`} placeholder='value' component={TextField} />
                                                            <Button size='small' variant='contained' color='error' onClick={() => remove(index)}>remove</Button>
                                                        </div>
                                                    ))}
                                                    <div>
                                                        <Button size='small' variant='contained' color='primary' onClick={() => { push({ key: '', value: '' }) }}>Add</Button>
                                                    </div>
                                                </>
                                            )}
                                        </FieldArray>
                                    </Box>
                                </Tab>
                                <Tab eventKey="requestheaders" title="Headers">
                                    <Box display='flex' flexDirection='column' gap='1rem'>
                                        <Typography fontSize='1.1rem'>Request Headers</Typography>
                                        <FieldArray name='requestHeaders'>
                                            {({ remove, push }) => (
                                                <>
                                                    {values.requestHeaders.length > 0 && values.requestHeaders.map((header: Item, index) => (
                                                        <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                            <Field type='text' name={`requestHeaders.${index}.key`} placeholder='Key' component={TextField} />
                                                            <Field type='text' name={`requestHeaders.${index}.value`} placeholder='value' component={TextField} />
                                                            <Button size='small' variant='contained' color='error' onClick={() => remove(index)}>remove</Button>
                                                        </div>
                                                    ))}
                                                    <div>
                                                        <Button size='small' variant='contained' color='primary' onClick={() => { push({ key: '', value: '' }) }}>Add</Button>
                                                    </div>
                                                </>
                                            )}
                                        </FieldArray>
                                    </Box>
                                </Tab>
                                <Tab eventKey="json" title="JSON">
                                    <CodeMirror
                                        value={dataToSend || '{}'}
                                        onChange={(data) => setDataToSend(data)}
                                        extensions={[json()]}
                                    />
                                </Tab>
                            </Tabs>
                        </Box>
                    </Form>
                )}
            </Formik>
            <Box>
                <Tabs
                    activeKey={responseTabkey}
                    onSelect={(k) => setResponseTabKey(k)}
                    className="my-3"
                >
                    <Tab eventKey="body" title="Body">
                        {jsonData &&
                            <Box>
                                <Typography variant='h5' pb='0.4rem' fontWeight='bold'>Response</Typography>
                                <Box display='flex' gap='1rem' pb='1rem'>
                                    <Typography>Status: {responseStatus && `${responseStatus}`}</Typography> <Typography>Time: TBD</Typography> <Typography>Size: {responseSize && `${responseSize}`}</Typography>
                                </Box>
                                <Box width='25rem' height='25rem' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
                                    <CodeMirror
                                        value={JSON.stringify(jsonData, null, 2)}
                                        extensions={[json()]}
                                        editable={false}

                                    />
                                </Box>
                            </Box>}
                    </Tab>
                    <Tab eventKey="headers" title="Headers">
                        <ul className='res-headers'>
                            {responseHeaders && Object.entries(responseHeaders).map(([key, value], index) => {
                                return (
                                    <li key={index} style={{ display: 'flex', gap: '0.5rem' }}>
                                        <Typography variant='overline' fontWeight='bold' color='grey'>{key}</Typography>:
                                        <Typography variant='overline' color='grey'>{value}</Typography>
                                    </li>
                                )
                            })}
                        </ul>
                    </Tab>
                </Tabs>
            </Box>

            <Dialog
                open={jsonError}
                onClose={() => setJsonError(false)}
            >
                <DialogTitle style={{ color: 'red', fontWeight: 'bold' }}>
                    JSON Error
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ textAlign: 'center' }}>
                        Data your entered is not a valid JSON<br />
                        Please Provide a valid JSON
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setJsonError(false)} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    )
}

export default Postman