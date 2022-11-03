import React, {useState, useEffect, SetStateAction} from 'react'
import Select, { SingleValue } from "react-select";
import axios from "axios";
import { JSONSchema7 } from "json-schema"


type elementType = {
  label: string,
  value: string
}

function SchemaBuilder() {
  const [options, setOptions] = useState<elementType[]>();
  const [schema, setSchema] = useState<JSONSchema7[]>();
  const [elements, setElements] = useState([]);

  const getSchema = async () => {
    await axios.get("http://localhost:5000/schema").then((res) => {
      setSchema(res.data[0]);
    });
  };

  const getOptions = async () => {
    if (schema) {
      const tempArray: { label: string; value: string; }[] = [];
      console.log (tempArray)
      // const response = Object.entries(schema.properties);
      // response.forEach((element) => {
      //   tempArray.push({
      //     label: `${element[1].title}`,
      //     value: `${element[1].id}`,
      //   });
      //   setOptions(tempArray);
      // });
    }
  };

  const getElement = async (ev: SingleValue<elementType>) => {
    if(ev) {
      const value = parseInt(ev.value)
    console.log(value)
    }
  };

  useEffect(() => {
    getOptions();
    getSchema();
    // console.log(options)
  }, []);

  return (
        <div className="schema-builder" style={{padding: '24px'}}>
          <Select
            options={options}
            isSearchable
            onChange={getElement}
            // menuIsOpen={true}
          />
        </div>
  );
}

export default SchemaBuilder;
