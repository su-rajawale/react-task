import React, { useState } from 'react'
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid'
import { Box } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import { employeesType } from '../types'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Link } from 'react-router-dom'

function CustomToolbar() {
    return (
        <GridToolbarContainer sx={{ padding: '0.5rem 1rem', gap: '1rem', ["& .MuiButton-root"]: { padding: '0.4rem 0.8rem' } }}>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

type useGridProps = {
    users: employeesType[],
    updateRowId: (id: number | null) => void,
    openEditUserModal: () => void,
    deleteUser: (id: number) => Promise<void>
}


const UserGrid = ({users, updateRowId, openEditUserModal, deleteUser}: useGridProps ) => {
    const [pageSize, setPageSize] = useState<number>(10)
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

    const colDef: GridColDef[] = [
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
    ]

    return (
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
    )
}

export default UserGrid