import React from "react"
import { useState, useEffect } from "react"
import styles from "./styles.module.css"
import validator from "@rjsf/validator-ajv8"
import Form from "@rjsf/mui"
import axios from "axios"
import { listofferProps } from "./types"
import { IChangeEvent } from "@rjsf/core"
import { Backdrop, CircularProgress } from "@mui/material"

const CreateOffers = ({ getOffers }: listofferProps) => {
  const [offerSchema, setOfferSchema] = useState()
  const [offerUiSchema, setOfferUiSchema] = useState()
  const [loading, setLoading] = useState(false)

  const getSchema = async () => {
    await axios.get("http://localhost:5000/offerSchema").then((res) => {
      setOfferSchema(res.data[0])
    })
  };

  const getUiSchema = async () => {
    await axios.get("http://localhost:5000/offerUischema").then((res) => {
      setOfferUiSchema(res.data[0])
    })
  };

  const handleSubmit = async (data: IChangeEvent<any, any>) => {
    setLoading(true)
    const submit = data.formData;
    const date = new Date().toDateString()
    Object.assign(submit, { updatedAt: `${date}`, active: true })
    await axios.post('http://localhost:5000/offers', submit)
      .then(() => {
        getOffers()
        setLoading(false)
      })
  };

  useEffect(() => {
    getSchema()
    getUiSchema()
  }, [])

  return (
    <div className={styles.offerCard}>
      <div className={styles.offerCardInner}>
        <div className={styles.offerTitle}>
          <h5>Create Offers</h5>
        </div>
        <div className={styles.offerForm}>
          {offerSchema && offerUiSchema && (
            <Form
              schema={offerSchema}
              uiSchema={offerUiSchema}
              validator={validator}
              // onChange={(data)=> console.log(data)}
              onSubmit={(data) => handleSubmit(data)}
            />
          )}
        </div>
      </div>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
    </div>
  );
};

export default CreateOffers