import {useState, useEffect} from 'react'
import Select from "react-select";
import axios from "axios";

function SchemaBuilder() {
  const [options, setOptions] = useState();
  const [schema, setSchema] = useState();
  const [elements, setElements] = useState([]);

  const getSchema = async () => {
    await axios.get("http://localhost:5000/schema").then((res) => {
      setSchema(res.data[0]);
    });
  };

  const getOptions = async () => {
    if (schema) {
      const tempArray = [];
      const data = schema.properties;
      const response = Object.entries(data);
      // console.log(response)
      response.forEach((element) => {
        tempArray.push({
          label: `${element[1].title}`,
          value: `${element[1].id}`,
        });
        setOptions(tempArray);
      });
    }
  };

  const getElement = async (ev) => {
    const value = parseInt(ev.value)
    console.log(value)
  };

  useEffect(() => {
    getOptions();
    getSchema();
  }, []);

  return (
        <div className="schema-builder" style={{padding: '24px'}}>
          <Select
            options={options}
            isSearchable
            onChange={(ev) => {
              getElement(ev);
            }}
            // menuIsOpen={true}
          />
        </div>
  );
}

export default SchemaBuilder;
