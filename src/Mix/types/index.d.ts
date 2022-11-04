import { Experimental_CssVarsProvider } from "@mui/material"

// types
export type Catagories = {
    id: number,
    title: string,
    classes: string,
    dataFilter: string
}

export type Projects = {
    id: number,
    classes: string,
    img: string,
    alt: string,
    section: string,
    heading: string,
    description: string,
    href: string
}

export type ProjectProps = {
    classes: string,
    img: string,
    alt: string,
    section: string,
    title: string,
    desc: string,
    link: string
}