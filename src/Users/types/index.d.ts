export type employeesType = {
    name: string,
    username: string,
    email: string,
    phone: string,
    website: string,
    id: number
}

export type editUserProps = {
    id: number,
    close: () => void
}

export type addUserProps = {
    close: () => void
}

