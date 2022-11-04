import React, { useEffect, useState } from "react";
import styles from "./Mix.module.css";
import axios from "axios";
import Project from "./Project";
import mixitup from "mixitup";

function Mix() {
  const [catagories, setCatagories] = useState();
  const [projects, setProjects] = useState();

  const getCatagories = () => {
    axios
      .get("http://localhost:5000/catagories/")
      .then((res) => {
        setCatagories(res.data);
      })
      .catch((err) => {
        alert(`${err}`);
      });
  };

  const getProjects = () => {
    axios
      .get("http://localhost:5000/projects/")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        alert(`${err}`);
      });
  };

  useEffect(() => {
    getCatagories();
    getProjects();
  }, []);

  useEffect(() => {
    mixitup(document.querySelector(".project-wrapper"));
  }, []);

  return (
    <div className={styles.portfolio}>
      <div className={styles.catagoryBar}>
        <div className={styles.catagories}>
          <ul className={styles.navList}>
            {catagories?.map(({ id, title, classes, dataFilter }, index) => (
              <li
                key={index}
                className={`list ${index === 0 ? "active" : ""} ${classes}`}
                data-filter={dataFilter}
              >
                <span className={styles.catagoryTitle}>{title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`project-wrapper ${styles.projects}`}>
          {projects?.map((project) => (
            <Project
              id={project.id}
              classes={project.classes}
              img={project.img}
              alt={project.alt}
              section={project.section}
              title={project.heading}
              desc={project.description}
              link={project.href}
              key={project.id}
            />
          ))}
      </div>
    </div>
  );
}

export default Mix;
