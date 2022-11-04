import { Button } from '@mui/material'
import React from 'react'
import styles from './Mix.module.css'

const Project = ( { classes, img, alt, section, title, desc, link } ) => {
  return (
    <div className={`${classes} ${styles.projectCard}`}>
      <div className={styles.cardInner}>
        <div className={styles.image}>
          <img src={img} alt={alt} />
        </div>
        <div className={styles.body}>
          <div className={styles.section}><span>{section}</span></div>
          <div className={styles.title}><h3>{title}</h3></div>
          <div className={styles.desc}><p>{desc}</p></div>
          {/* <a href={link} className={styles.link}>Visit Project</a> */}
          <div><Button variant='contained' color='primary' href={link}>Visit Project</Button></div>
        </div>
      </div>
    </div>
  )
}

export default Project