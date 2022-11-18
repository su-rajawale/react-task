import React, { useEffect, useState, useRef, useMemo } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import './Users.css'
import 'react-select-search/style.css'
import AddUser from './AddUser'
import EditUser from './EditUser'


import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { employeesType } from './types'
import AddIcon from '@mui/icons-material/Add'
import Fab from '@mui/material/Fab';


import { 
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector, } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import { gridClasses } from '@mui/material'

import { alpha, styled } from '@mui/material/styles'
// import { AiOutlineDrag } from 'react-icons/ai'
// import { MdOutlineDragHandle } from 'react-icons/md'
// import Table from '@mui/material/Table'
// import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
// import TableContainer from '@mui/material/TableContainer'
// import TableHead from '@mui/material/TableHead'
// import TableRow from '@mui/material/TableRow'
// import { Button } from '@mui/material'

function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{padding: '0.5rem 1rem', gap: '1rem', ["& .MuiButton-root"]: { padding: '0.4rem 0.8rem' }}}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

function Users() {
    const [users, setUsers] = useState<employeesType[]>([])
    // const [fetchError, setFetchError] = useState('')
    const BASE_URL = 'http://localhost:5000/employees/'

    const [rowId, updateRowId] = useState<number | null>()
    const addUserModal = useRef<HTMLDialogElement>(null)
    const editUserModal = useRef<HTMLDialogElement>(null)
    const [pageSize, setPageSize] = useState<number>(10)

    const getUsers = async () => {
        await axios.get(BASE_URL)
            .then(function (res) {
                setUsers(res.data)
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

    const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  ["& .MuiDataGrid-row:nth-of-type(even)"]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

    const colDef: GridColDef[] = useMemo(()=> [
        {
            field: 'id', headerName: 'No.', maxWidth: 40, renderCell: (params) => {
                return (<><span>{params.row.id}</span></>)
            }
        },
        { field: 'name', headerName: 'Name', flex: 1, editable:true },
        { field: 'username', headerName: 'Username', flex: 0.5 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'phone', headerName: 'Phone', flex: 0.5 },
        { field: 'website', headerName: 'Website', flex: 0.5 },
        {
            field: 'action', headerName: 'Action', flex: 1, renderCell: (params) => {
                return (
                    <div className='action'>
                        <Tooltip arrow title='View Employee'>
                            <Link to={`/users/${params.row.id}`}>
                                <IconButton color='secondary'>
                                    <VisibilityIcon />
                                </IconButton>
                            </Link>
                        </Tooltip>
                        <Tooltip arrow title='Edit Employee'>
                            <IconButton color='primary' onClick={() => { updateRowId(params.row.id); openEditUserModal() }}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow title='Delete Employee'>
                            <IconButton color='error' onClick={() => { deleteUser(params.row.id) }}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                )
            }
        }
    ], [users])

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
            <StripedDataGrid
                rows={users}
                columns={colDef}
                autoHeight
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[10, 20, 50, 100]}
                getRowSpacing={(params) => ({
                    top: params.isFirstVisible ? 0 : 5,
                    bottom: params.isLastVisible ? 0 : 5
                })}
                components={{
                    Toolbar: CustomToolbar
                }}
            />

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