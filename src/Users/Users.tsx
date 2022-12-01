import React, { useEffect, useState, useRef, useMemo } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import './Users.css'
import 'react-select-search/style.css'
import AddUser from './AddUser'
import EditUser from './EditUser'
import UserGrid from './UserGrid'

import Tooltip from '@mui/material/Tooltip'
import { employeesType } from './types'
import AddIcon from '@mui/icons-material/Add'
import Fab from '@mui/material/Fab';
import { Box } from '@mui/material'

function Users() {
    const [users, setUsers] = useState<employeesType[]>([])
    const [rowId, updateRowId] = useState<number | null>()
    const addUserModal = useRef<HTMLDialogElement>(null)
    const editUserModal = useRef<HTMLDialogElement>(null)
    const [pageSize, setPageSize] = useState<number>(10)
    const [loading, setLoading] = useState(false)
    
    const BASE_URL = 'http://localhost:5000/employees/'
    const getUsers = async () => {
        await axios.get(BASE_URL)
            .then(function (res) {
                setUsers(res.data)
                console.log('data fetched')
            })
            .catch(function (err) {
                // setFetchError('fetch-error')
            })
    }

    const deleteUser = async (id: number) => {
        await axios.delete(`${BASE_URL}${id}`)
        getUsers()
        toast.info('The User is deleted', {
            type: 'error',
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        })
    }

    // opening and closing of moadals

    const openEditUserModal = () => {
        if (editUserModal.current) {
            editUserModal.current.showModal()
        }
    }

    const openAddUserModal = () => {
        if (addUserModal.current) {
            addUserModal.current.showModal()
        }
    }

    const closeAddUserModal = () => {
        if (addUserModal.current) {
            addUserModal.current.close()
            getUsers()
        }
    }

    const closeEditUserModal = () => {
        if (editUserModal.current) {
            editUserModal.current.close()
            updateRowId(null)
            getUsers()
        }
    }

    useEffect(() => {
       getUsers()
    }, [])

    return (
        <Box p='24px' >
            <div className='users-heading'>
                <span><h1>Employees</h1></span>
                <span>
                    <Tooltip arrow title='Add Employee'>
                        <Fab color="primary" size='medium' onClick={openAddUserModal}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </span>
            </div>
           
           <UserGrid users={users} updateRowId={updateRowId} openEditUserModal={openEditUserModal} deleteUser={deleteUser} />

            <dialog id='add-user-modal' ref={addUserModal}>
                <AddUser close={closeAddUserModal} />
            </dialog>

            <dialog id='edit-user-modal' ref={editUserModal}>
                {rowId ? <EditUser id={rowId} close={closeEditUserModal} /> : null}
            </dialog>
            <ToastContainer />
        </Box>
    )
}

export default Users