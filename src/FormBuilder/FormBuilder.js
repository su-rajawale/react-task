import React, { useState, useEffect } from "react";
import { Form, FormBuilder as FormBuilderIo, FormEdit } from "@formio/react";
import axios from "axios";
import "formiojs/dist/formio.full.css";
import "./FormBuilder.css";
import { AiOutlineEdit } from "react-icons/ai";

function FormBuilder() {
  const [formData, setFormData] = useState({
    display: "form",
    components: [],
  });
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [empty, setEmpty] = useState(true);
  const [apiError, setApiError] = useState();
  const [submittedData, setSubmittedData] = useState();

  const printResult = (data) => {
    setIsloading(true);

    setTimeout(async () => {
      setIsDisplayed(false);
      setFormData(data);
      try {
        await axios.put("http://localhost:5000/form/1", data).catch(() => {
          setApiError(true);
        });
      } catch (error) {
        await axios.post("http://localhost:5000/form", formData).catch(() => {
          setApiError(true);
        });
      }
      setIsloading(false);
      setSubmittedData({});
    }, 2000);
  };

  const getFormData = async () => {
    await axios
      .get("http://localhost:5000/form/1")
      .then((res) => {
        setFormData(res.data);
      })
      .catch(() => {
        setApiError(true);
      });
  };

  const getEmpty = () => {
    if (formData.components.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  };

  const handleSubmit = (data) => {
    const submit = data.data;
    axios.post("http://localhost:5000/submits", submit).then((res) => {
      setSubmittedData(res.data);
      console.log(submittedData);
    });
  };

  useEffect(() => {
    getFormData();
  }, []);

  useEffect(() => {
    // console.log(formData)
    getEmpty();
  }, [formData]);

  return (
    <>
      {isLoading ? (
        <div className="form-loader">
          <div className="loader"></div>
        </div>
      ) : null}
      {isDisplayed ? (
        <div className="App">
          <div className="form-builder">
            <FormEdit
              form={formData}
              saveText="save &#128190;"
              saveForm={(data) => {
                printResult(data);
              }}
            >
              <FormBuilderIo
                form={formData}
                onChange={(schema) => setFormData(schema)}
                onSubmit={(data) => {
                  console.log(data);
                }}
                // saveForm={(data) => setFormData(data)}
                onSubmitDone={(data) => console.log(data)}
                onSaveComponent={(c) => console.log("saved")}
              />
            </FormEdit>
          </div>
        </div>
      ) : (
        <div id="form-data">
          <div className="form-heading">
            <h2 className="form-title">View Form</h2>
            <span className="form-edit" onClick={() => setIsDisplayed(true)}>
              <AiOutlineEdit />
            </span>
          </div>
          {!empty ? (
            <Form form={formData} onSubmit={(data) => handleSubmit(data)} />
          ) : null}
          {empty && apiError ? (
            <div className="form-error">
              <h2 className="form-error-heading">Oops! there's Nothing</h2>
              <h5 className="form-reasons">Possible Reasons</h5>
              <ul className="form-error-list">
                {empty ? (
                  <li>
                    No Form element exists, create one by clicking edit icon
                    above
                  </li>
                ) : null}
                {apiError ? (
                  <li>
                    Forms service is unreachable, check your internet connection
                  </li>
                ) : null}
              </ul>
            </div>
          ) : null}
        </div>
      )}

      {submittedData ? (
        <div className="form-data">
          <ul className="form-error-list">
            {Object.entries(submittedData)
              .filter(([key]) => key !== "submit")
              .map(([key, val]) => (
                <li key={key}>
                  <span>
                    {key}: {val}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}

export default FormBuilder;
