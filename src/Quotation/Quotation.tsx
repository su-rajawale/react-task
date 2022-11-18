import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import './Quotation.css'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { Form } from '@rjsf/mui'
import { RJSFSchema, UiSchema } from '@rjsf/utils'
import validator from "@rjsf/validator-ajv8"

const initialInvoices = {
  invoiceId: '#7895',
  dueDate: '',
  invoiceTo: ''
}

const Quotation = () => {

  const [itemsSchema, setItemsSchema] = useState<RJSFSchema>()
  const [itemsUiSchema, setItemsUiSchema] = useState<UiSchema>()


  const invoiceSchema = object({
    invoiceId: string().required('Invoice ID is required'),
    dueDate: string().required('Due date is required'),
    invoiceTo: string().required('Please Say who do you want send invoice to'),
  })

  const invoiceFrom = useFormik({
    initialValues: initialInvoices,
    validationSchema: invoiceSchema,
    onSubmit: (action, values) => {
      // submit logic
    }
  })

  const getItemsSchema = async () => {
    await axios.get('http://localhost:5000/itemsSchema/')
      .then((res) => {
        setItemsSchema(res.data[0])
      })
  }

  const getItemsUiSchema = async () => {
    await axios.get('http://localhost:5000/itemsUiSchema/')
      .then((res) => {
        setItemsUiSchema(res.data[0])
      })
  }

  const clickbtn = () => {
    const butn: HTMLButtonElement | null = document.querySelector('[title="Add Item"]')
    if (butn) { console.log(butn); butn.click() }
  }


  useEffect(() => {
    getItemsSchema()
    getItemsUiSchema()
    clickbtn()
  }, [])


  // const Address = () => {
  //   if (invoiceUser.current === 'json_todd') {
  //     return (<Typography>Mccann LLC and Sons<br />
  //       04033 Wesley Wall Apt. 961<br />
  //       (226) 204-8287<br />
  //       brenda49@taylor.info<br /></Typography>)
  //   }
  //   if (invoiceUser.current === 'chris_pratt') {
  //     return (<Typography>Hall-Robbins PLC<br />
  //       7777 Mendez Plains<br />
  //       (616) 865-4180<br />
  //       don85@johnson.com<br /></Typography>)
  //   }
  //   if (invoiceUser.current === 'bruce_jenson') {
  //     return (<Typography>Smith, Miller and Henry LLC<br />
  //       19022 Clark Parks Suite 149<br />
  //       (832) 323-6914<br />
  //       mejiageorge@lee-perez.com<br /></Typography>)
  //   }
  //   if (invoiceUser.current === '') {
  //     return (<h1>Empty String</h1>)
  //   }
  //   return (<h1>None Selected</h1>)
  // }

  return (
    <Box p='24px'>
      <Box display='flex' gap='1rem'>
        <Box display='flex' flexDirection='column' gap='0.8rem' flex='1' p='1rem' borderRadius='10px' border='1px solid rgba(224, 224, 224, 1)'>
          <img src='logo.png' width='auto' height='40px' style={{ alignSelf: 'flex-start' }} />
          <Typography fontSize='0.875rem' lineHeight='1.429' color='rgba(76, 78, 100, 0.6)'>
            Office 149, 450 South Brand Brooklyn<br />
            San Diego County, CA 91905, USA<br />
            +1 (123) 456 7891, +44 (876) 543 2198<br />
          </Typography>
          <Box>
            {/* Form */}
          </Box>
          <Box>
            {/* <Address /> */}
          </Box>
          <Box>
            {itemsSchema && itemsUiSchema &&
              <Form id='rjsf_items' schema={itemsSchema} uiSchema={itemsUiSchema} validator={validator} onSubmit={(data) => { console.log(data.formData) }} />
            }
          </Box>
        </Box>
        <Box flexBasis='30%' p='1rem' borderRadius='10px' border='1px solid rgba(224, 224, 224, 1)'>
          <Typography>Actions Bar</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Quotation