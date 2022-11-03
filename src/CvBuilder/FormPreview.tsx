import React from 'react'
import './CvBuilder.css'

type AppProps = {
  formdata: Object
}

function FormPreview({ formdata }: AppProps) {
  return (
    <ul className='form-error-list'>
      {Object.entries(formdata).map(([key, value], i) => {
        return (
          <li key={i}>{key}: {value}</li>
        )
      }
      )}
    </ul>
  )
}

export default FormPreview