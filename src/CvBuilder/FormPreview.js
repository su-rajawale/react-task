import React from 'react'
import './CvBuilder.css'

function FormPreview({formdata}) {
  return (
    <ul className='form-error-list'>
        {Object.entries(formdata).map(([key,value], i)=> (
            <li key={i}>{key}: {value}</li>
        ))}
    </ul>
  )
}

export default FormPreview