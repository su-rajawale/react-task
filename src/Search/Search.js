import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Select from "react-select";

import "./Search.css";

function Search() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [countries, setCountries] = useState([])
  const [q, setQ] = useState("")
  const [searchParam] = useState(["capital", "name", "numericCode"])
  const [filterParam, setFilterParam] = useState(["All"])

  useEffect(() => {
    axios
      .get("http://localhost:5000/countries/")
      .then((res) => {
        setIsLoaded(true)
        setCountries(res.data)
      })
      .catch((err) => {
        setIsLoaded(true)
        setError(err)
      });
  }, []);

  const data = Object.values(countries)

  function search(countries) {
    return countries.filter((item) => {
      if (item.region == filterParam) {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (filterParam == "All") {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  }

  if (error) {
    return <p>{error.message}</p>
  } else if (!isLoaded) {
    return <>loading...</>
  } else {
    return (
      <div id="search">
        <div className="wrapper">
          <div className="search-wrapper">
            <TextField
              label="Search"
              variant="outlined"
              type="search"
              name="search-form"
              id="search-form"
              placeholder="Search for..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <div className="select">
              <Select
                options={[
                  { value: "All", label: "Filer by Region" },
                  { value: "Africa", label: "Africa" },
                  { value: "Americas", label: "America" },
                  { value: "Asia", label: "Asia" },
                  { value: "Europe", label: "Europe" },
                  { value: "Oceania", label: "Oceania" },
                ]}
                onChange={(e) => {
                  setFilterParam(e.value)
                }}
                aria-label="Filter Countries By Region"
              />
              <span className="focus"></span>
            </div>
          </div>
          <ul className="card-grid">
            {search(data).map((item) => (
              <li key={item.alpha3Code}>
                <article className="card">
                  <div className="card-image">
                    <img src={item.flag.large} alt={item.name} />
                  </div>
                  <div className="card-content">
                    <h2 className="card-name">{item.name}</h2>
                    <ol className="card-list">
                      <li>
                        population: <span>{item.population}</span>
                      </li>
                      <li>
                        Region: <span>{item.region}</span>
                      </li>
                      <li>
                        Capital: <span>{item.capital}</span>
                      </li>
                    </ol>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Search;
  