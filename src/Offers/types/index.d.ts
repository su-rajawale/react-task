import React from "react"

export type offerType = {
    title: string,
    default: boolean,
    link: string,
    file: string,
    updatedAt: string,
    active: boolean,
    id: number
  }

  export type listofferProps = {
    offers?: offerType[] | undefined,
    getOffers: ()=> any
  } & React.ComponentProps