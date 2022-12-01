import React, { useState } from 'react'

// Formik
import * as yup from 'yup'
import { Formik, Field, Form, FieldArray, FormikHelpers } from 'formik'
import { TextField } from 'formik-mui'

// CSS
import './Postman.css'
import 'react-json-pretty/themes/monikai.css'

// JSON beautifiers and editors
import prettyBytes from 'pretty-bytes';
import CodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'

// Axios
import axios, { AxiosError, AxiosResponseHeaders } from 'axios'

// Material UI
import { Backdrop, Box, CircularProgress, List, ListItem, MenuItem, Typography } from '@mui/material'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Fab from '@mui/material/Fab'

// Types
import { Item, PostmanForm, TabPanelProps } from './types'
import { BsBox } from 'react-icons/bs'

const validationSchema = yup.object({
    method: yup.string().required('Please Select Method'),
    query: yup.string().required('Plese Enter Query')
})

const initialValues: PostmanForm = {
    method: '',
    query: '',
    queryParams: [{ key: '', value: '' }],
    requestHeaders: [{ key: '', value: '' }]
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>{children}</>
            )}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}


// Check for empty values in object
function clean(obj: any) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined, obj[propName] === '') {
            delete obj[propName];
        }
    }
    return obj
}


const Postman = () => {
    const [jsonData, setJsonData] = useState<string>()
    const [responseHeaders, setResponseHeaders] = useState<AxiosResponseHeaders>()
    const [responseStatus, setResponseStatus] = useState<number>()
    const [responseSize, setResponseSize] = useState<string>()
    const [dataToSend, setDataToSend] = useState<string>('{}')
    const [jsonError, setJsonError] = useState(false)
    const [tabValue, setTabValue] = useState(0)
    const [tab2Value, setTab2Value] = useState(0)
    const [loading, setLoading] = useState(false)

    const handleTabValueChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    const handleTab2ValueChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab2Value(newValue)
    }

    const handleSubmit = async (values: PostmanForm, action: FormikHelpers<PostmanForm>) => {
        setLoading(true)
        if (values) {
            const hdr = values.requestHeaders
            const prm = values.queryParams

            let header = hdr.reduce((obj, item: Item) => Object.assign(obj, { [item.key]: item.value }), {})
            let param = prm.reduce((obj, item: Item) => Object.assign(obj, { [item.key]: item.value }), {})

            // clean empty values from parameters
            const cleanParams = clean(param)

            if (values.method === 'get') {
                await axios({
                    url: values.query,
                    method: values.method,
                    params: { ...cleanParams, ...param }
                })
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
                    .catch((e: AxiosError) => {
                        const message: any = { error: e.message }
                        setJsonData(message)
                    }).
                    finally(() => {
                        setLoading(false)
                    })
            } else {
                let sendData
                try {
                    sendData = JSON.parse(dataToSend)
                } catch (e) {
                    setLoading(false)
                    setJsonError(true)
                    return
                }

                // clean empty values form headers
                const cleanHeaders = clean(header)

                const jsonHeader = { 'content-type': 'application/json; CHARSET=UTF-8' }
                await axios({
                    url: values.query,
                    method: values.method,
                    headers: { ...cleanHeaders, ...jsonHeader },
                    data: dataToSend,
                })
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
                    .catch((e: AxiosError) => {
                        const message: any = { error: e.message }
                        setJsonData(message)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }
        } else { alert('No values Provided') }
        action.resetForm();
    }

    return (
        <Box p='24px' display='flex' flexWrap='wrap' gap='0.5rem'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={(values, action) => handleSubmit(values, action)}
            >

                {({ values }) => (
                    <Form id='postman_form' style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '18px 18px 18px 0', flexBasis: '45%' }}>

                        <Box gap='1rem' sx={{
                            display: 'flex',
                            alignItems: { xs: 'strech', md: 'flex-start' },
                            flexDirection: { xs: 'column', md: 'row' },
                            gap: '1rem'
                        }}>
                            <Field id='method' name='method' value={values.method} component={TextField} select style={{ flexBasis: 'max-content' }}>
                                <MenuItem disabled>--- Select Method ---</MenuItem>
                                <MenuItem value='get'>GET</MenuItem>
                                <MenuItem value='post'>POST</MenuItem>
                                <MenuItem value='put'>PUT</MenuItem>
                                <MenuItem value='patch'>PATCH</MenuItem>
                                <MenuItem value='delete'>DELETE</MenuItem>
                            </Field>
                            <Field type='text' id='query' name='query' value={values.query} component={TextField} style={{ flex: '1' }} />

                            <Button variant='contained' color='primary' type='submit'>Send</Button>
                        </Box>

                        <Box>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '1rem' }}>
                                <Tabs value={tabValue} onChange={handleTabValueChange} aria-label="basic tabs example">
                                    <Tab wrapped label="Query Params" {...a11yProps(0)} />
                                    <Tab label="Headers" {...a11yProps(1)} />
                                    <Tab label="JSON" {...a11yProps(2)} />
                                </Tabs>
                            </Box>

                            <TabPanel value={tabValue} index={0}>
                                <Box display='flex' flexDirection='column' gap='1rem'>
                                    <Typography fontSize='1.1rem'>Query Params</Typography>
                                    <FieldArray name='queryParams'>
                                        {({ remove, push }) => (
                                            <>
                                                {values.queryParams.length > 0 && values.queryParams.map((param: Item, index) => (
                                                    <Box key={index} display='flex' gap='0.5rem' alignItems='center' flexWrap='wrap'>
                                                        <Field type='text' name={`queryParams.${index}.key`} placeholder='Key' value={param.key} component={TextField} />
                                                        <Box display='flex' gap='1rem'>
                                                            <Field type='text' name={`queryParams.${index}.value`} placeholder='value' value={param.value} component={TextField} />
                                                            <Fab size='small' color='error' onClick={() => remove(index)}><RemoveIcon /></Fab>
                                                        </Box>
                                                    </Box>
                                                ))}
                                                <Box>
                                                    <Fab size='small' color='primary' onClick={() => { push({ key: '', value: '' }) }}><AddIcon /></Fab>
                                                </Box>
                                            </>
                                        )}
                                    </FieldArray>
                                </Box>
                            </TabPanel>

                            <TabPanel value={tabValue} index={1}>
                                <Box display='flex' flexDirection='column' gap='1rem'>
                                    <Typography fontSize='1.1rem'>Request Headers</Typography>
                                    <FieldArray name='requestHeaders'>
                                        {({ remove, push }) => (
                                            <>
                                                {values.requestHeaders.length > 0 && values.requestHeaders.map((header: Item, index) => (
                                                    <Box key={index} display='flex' gap='0.5rem' alignItems='center' flexWrap='wrap'>
                                                        <Field type='text' name={`requestHeaders.${index}.key`} placeholder='Key' value={header.key} component={TextField} />
                                                        <Box display='flex' gap='1rem'>
                                                            <Field type='text' name={`requestHeaders.${index}.value`} placeholder='value' value={header.value} component={TextField} />
                                                            {/* <Button size='small' variant='contained' color='error' onClick={() => remove(index)}>remove</Button> */}
                                                            <Fab size='small' color='error' onClick={() => remove(index)}><RemoveIcon /></Fab>
                                                        </Box>
                                                    </Box>
                                                ))}
                                                <Box>
                                                    {/* <Button size='small' variant='contained' color='primary' onClick={() => { push({ key: '', value: '' }) }}>Add</Button> */}
                                                    <Fab size='small' color='primary' onClick={() => { push({ key: '', value: '' }) }}><AddIcon /></Fab>
                                                </Box>
                                            </>
                                        )}
                                    </FieldArray>
                                </Box>
                            </TabPanel>

                            <TabPanel value={tabValue} index={2}>
                                <Box display='flex' flexDirection='column' gap='1rem'>
                                    <Typography fontSize='1.1rem'>JSON</Typography>
                                    <CodeMirror
                                        value={dataToSend || '{}'}
                                        onChange={(data) => setDataToSend(data)}
                                        extensions={[json()]}
                                    />
                                </Box>
                            </TabPanel>

                        </Box>

                    </Form>
                )}
            </Formik>
            <Box style={{ padding: '18px', border: '1px solid #d7d7d7', borderRadius: '8px', flex: '1' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '1rem' }}>
                    <Tabs value={tab2Value} onChange={handleTab2ValueChange}>
                        <Tab label="Response" {...a11yProps(0)} />
                        <Tab label="Headers" {...a11yProps(1)} />
                    </Tabs>
                </Box>

                <TabPanel value={tab2Value} index={0}>
                    {jsonData &&
                        <Box>
                            <Typography variant='h5' pb='0.4rem' fontWeight='bold'>Response</Typography>
                            <Box display='flex' gap='1rem' pb='1rem'>
                                <Typography>Status: {responseStatus && `${responseStatus}`}</Typography> <Typography>Time: TBD</Typography> <Typography>Size: {responseSize && `${responseSize}`}</Typography>
                            </Box>
                            <Box height='50vh' sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
                                <CodeMirror
                                    value={JSON.stringify(jsonData, null, 2)}
                                    extensions={[json()]}
                                    editable={false}

                                />
                            </Box>
                        </Box>}
                </TabPanel>

                <TabPanel value={tab2Value} index={1}>
                    <List dense>
                        {responseHeaders && Object.entries(responseHeaders).map(([key, value], index) => {
                            return (
                                <ListItem key={index} sx={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                    <Typography variant='overline' fontWeight='bold' color='grey'>{key}</Typography>:
                                    <Typography variant='overline' color='grey'>{value}</Typography>
                                </ListItem>
                            )
                        })}
                    </List>
                </TabPanel>

            </Box>

            <Dialog open={jsonError} onClose={() => setJsonError(false)}>

                <DialogTitle>
                    <Box display='flex' alignItems='center' alignContent='center' gap='1rem'>
                        <ReportGmailerrorredIcon color='error' fontSize='large' />
                        <Typography fontSize='1.2rem'>Invalid JSON</Typography>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
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
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box >
    )
}

export default Postman