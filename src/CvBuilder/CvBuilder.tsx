import React from "react";
import { useState, useEffect } from "react";
import validator from "@rjsf/validator-ajv6";
import Form from "@rjsf/mui";
import axios from "axios";
import "./CvBuilder.css";
import FormPreview from "./FormPreview";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function CvBuilder() {
  const [schema, setSchema] = useState();
  const [uiSchema, setUiSchema] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState();
  const [preview, setPreview] = useState(false);

  const getSchema = async () => {
    await axios.get("http://localhost:5000/schema").then((res) => {
      setSchema(res.data[0]);
    });
  };

  const getUiSchema = async () => {
    await axios.get("http://localhost:5000/uischema").then((res) => {
      setUiSchema(res.data[0]);
    });
  };

  const handleSubmit = (data: any) => {
    console.log(data.formData)
    // setFormData(data.formData);
    setDialogOpen(true);
  };

  const handlePreview = () => {
    setPreview(true);
    setDialogOpen(false);
  };

  useEffect(() => {
    getSchema();
    getUiSchema();
  }, []);

  return (
    <>
      {!preview ? (
        <div id="cv-builder">
          {schema && uiSchema && (
            <Form
              schema={schema}
              uiSchema={uiSchema}
              validator={validator}
              // onChange={(data)=> setValues(data)}
              onSubmit={(data: any) => handleSubmit(data)} />
          )}
        </div>
      ) : (
        <FormPreview formdata={formData !== undefined ? formData : {}} />
      )}

      <Dialog open={dialogOpen}>
        <DialogTitle>Form Submitted Successfully</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your Form is successfully submitted you can see a preview of your
            data by clicking on priview button below
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePreview} autoFocus>
            Preview
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CvBuilder;
