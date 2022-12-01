import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import './Quotation.css';
import { Controller, FieldValues, useFieldArray, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Select, { SingleValue } from 'react-select';
// import DatePicker from 'react-date-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';

const invoiceToOptions = [
  { label: 'Sarah Marquee', value: '1' },
  { label: 'Rambo Ramoo', value: '2' },
  { label: 'James Corden', value: '3' },
  { label: 'Donkey King', value: '4' }
]

const itemsOptions = [
  { label: 'Share Khan', value: 'sk' },
  { label: 'Bare Bears', value: 'bb' },
  { label: 'Shear Snakes', value: 'ss' },
  { label: 'Turquoise Turtles', value: 'tt' },
  { label: 'Ravenous Ravens', value: 'rr' },
]

type Option = {
  label: string,
  value: string
}

const InTextField = styled(TextField)({
  "& .MuiOutlinedInput-input:not(.MuiOutlinedInput-input.MuiInputBase-inputMultiline)": {
    padding: '0.5rem 1rem'
  }
})

const Quotation = () => {
  const { register, control, handleSubmit, watch } = useForm()
  const { fields, remove, append } = useFieldArray({ control, name: "items" })

  const [selectValue, setSelectValue] = useState<SingleValue<Option>>()
  const [quotePreview, setQuotePreview] = useState(false)
  // const [quoteData, setQuoteData] = useState<FieldValues | null>()
  const inputRef = useRef(null);

  const CustomInput = forwardRef((props: any, ref) => {
    return <InTextField {...props} ref={ref} />;
  });

  const Address = () => {
    if (selectValue) {
      if (selectValue.value === '1') {
        return (<Typography>Hall-Robbins PLC<br />
          7777 Mendez Plains<br />
          (616) 865-4180<br />
          don85@johnson.com</Typography>)
      }
      if (selectValue.value === '2') {
        return (<Typography>Mccann LLC and Sons<br />
          04033 Wesley Wall Apt. 961<br />
          (226) 204-8287<br />
          brenda49@taylor.info</Typography>)
      }
      if (selectValue.value === '3') {
        return (<Typography>Leonard-Garcia and Sons<br />
          5345 Robert Squares<br />
          (955) 676-1076<br />
        </Typography>)
      }
      if (selectValue.value === '4') {
        return (<Typography>Garcia-Cameron and Sons<br />
          8534 Saunders Hill Apt. 583<br />
          (970) 982-3353<br />
          brandon07@pierce.com</Typography>)
      } else {
        return null
      }
    } else {
      return null
    }
  }

  const handleSave = (data: FieldValues) => {
    setQuoteData(data)
    // Object.assign(data, { invoiceId: uuidv4() })
    // axios.post('http://localhost:5000/quotation', data)
  }

  return (
    <>
      <Box p='24px'>
        <Box display='flex' gap='1rem'>
          <Box display='flex' flexDirection='column' gap='0.8rem' flex='1' p='1rem' borderRadius='10px' border='1px solid rgba(224, 224, 224, 1)'>
            <img src='logo.png' width='auto' height='40px' style={{ alignSelf: 'flex-start' }} />
            <Typography fontSize='0.875rem' lineHeight='1.429' color='rgba(76, 78, 100, 0.6)'>
              Office 149, 450 South Brand Brooklyn<br />
              San Diego County, CA 91905, USA<br />
              +1 (123) 456 7891, +44 (876) 543 2198<br />
            </Typography>
            <Box width='60%'>
              <form onSubmit={handleSubmit(handleSave)} id='invoiceForm'>
                {/* <InTextField {...register("dateIssued")} />
              <InTextField {...register("dateDue")} /> */}
                <Controller
                  control={control}
                  name='dateIssued'
                  defaultValue={new Date()}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      closeOnScroll
                      onChange={onChange}
                      value={value}
                      selected={value}
                      customInput={<CustomInput inputRef={inputRef} />}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='dateDue'
                  defaultValue={new Date()}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      closeOnScroll
                      onChange={onChange}
                      value={value}
                      selected={value}
                      customInput={<CustomInput inputRef={inputRef} />}
                    />
                  )}
                />
                <Box display='flex' flexDirection='column' gap='0.8rem'>
                  <Controller
                    control={control}
                    name='invoiceTo'
                    render={
                      ({ field: { onChange, onBlur, value } }) => (
                        <Select
                          onChange={(e) => { onChange(e); setSelectValue(value) }}
                          onBlur={onBlur}
                          value={value}
                          options={invoiceToOptions}
                        />
                      )
                    }
                  />
                  <Address />
                </Box>
                <Box display='flex' flexDirection='column' gap='1rem' alignItems='flex-start'>
                  {fields.map((item, i) => (
                    <Box key={i} display='flex' gap='0.5rem' border='1px solid #d1d1d1' padding='1rem' borderRadius='8px'>
                      <Box display='flex' flexDirection='column' gap='1rem'>
                        <Box display='grid' gap='1rem' gridTemplateColumns='8rem 1fr 1fr'>
                          <Box display='flex' flexDirection='column' gap='0.5rem'>
                            <label htmlFor={`items.[${i}].template`}>Item</label>
                            <Controller
                              control={control}
                              name={`items.[${i}].template` as const}
                              render={
                                ({ field: { onChange, onBlur, value } }) => (
                                  <Select
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    options={itemsOptions}
                                  />
                                )
                              }
                            />
                          </Box>
                          <Box display='flex' flexDirection='column' gap='0.5rem'>
                            <label htmlFor={`items.[${i}].cost`}>Cost</label>
                            <InTextField
                              {...register(`items.[${i}].cost` as const)}
                              type='number'
                            />
                          </Box>
                          <Box display='flex' flexDirection='column' gap='0.5rem'>
                            <label htmlFor={`items.[${i}].hours`}>Hours</label>
                            <InTextField
                              {...register(`items.[${i}].hours` as const)}
                              type='number'
                            />
                          </Box>
                        </Box>
                        <InTextField
                          {...register(`items.[${i}].desc` as const)}
                          multiline
                          maxRows={4}
                          rows={4}
                        />
                      </Box>
                      <Box>
                        <IconButton size='small' onClick={() => remove(i)}>
                          <CloseIcon fontSize='inherit' />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                  <Button variant='contained' color='primary' onClick={() => append({})}>Add</Button>
                </Box>

                <Button variant='contained' color='primary' type='submit'>Submit</Button>
              </form>
            </Box>
          </Box>
          <Box flexBasis='30%' p='1rem' borderRadius='10px' border='1px solid rgba(224, 224, 224, 1)'>
            <Typography>Actions Bar</Typography>
            <Button variant='contained' color='primary' onClick={() => setQuotePreview(true)}>Preview</Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <Dialog open={quotePreview} onClose={() => setQuotePreview(false)}>
          <DialogTitle>
            <Box>
              <Typography fontSize='1.2rem'>Quotation Preview</Typography>
            </Box>
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              QuoteData
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setQuotePreview(false)} autoFocus>
              Close
            </Button>
          </DialogActions>

        </Dialog>
      </Box>
    </>
  )
}

export default Quotation