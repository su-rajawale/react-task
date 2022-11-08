import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { data } from './data'

type Data = {
    name: string
    username: string
    email: string
    website: string
    id: number
}[]

const Mix = () => {
    const [query, setQuery] = useState('')
    const [filtered, setFiltered] = useState<Data>(data)

    function filter() {
        const x = data.filter((entry) => Object.values(entry).some((val) => typeof val === 'string' && val.toLowerCase().includes(query.toLowerCase())))
        setFiltered(x)
        console.log('filter ran')
    }

    useEffect(() => {
        filter()
    }, [query])

    return (
        <div style={{ padding: 24 }}>
            <Box
                component="form"
                noValidate
            >
                <TextField label="Search" variant="outlined" onChange={(e) => setQuery(e.target.value)} />
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Website</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            filtered.map(({ id, name, username, email, website }, index) => {
                                return (

                                    <TableRow key={index}>
                                        <TableCell>{name}</TableCell>
                                        <TableCell>{username}</TableCell>
                                        <TableCell>{email}</TableCell>
                                        <TableCell>{website}</TableCell>
                                    </TableRow>
                                )
                            })
                        }

                    </TableBody>

                </Table>
            </TableContainer>
        </div>
    )
}

export default Mix
