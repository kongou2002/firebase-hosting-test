import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import localProductList from '../data';

function generateRandom() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'title', width: 130 },
    { field: 'description', headerName: 'description', width: 130 },
    {
        field: 'price',
        headerName: 'price',
        type: 'number',
        width: 90,
    },
    { field: 'discountPercentage', headerName: 'discount Percentage', width: 200 },
    { field: 'rating', headerName: 'rating', width: 130 },
    { field: 'category', headerName: 'category', width: 130 },
    { field: 'brand', headerName: 'brand', width: 130 },
];
//convert localProductList to array of objects
const rows = localProductList;
console.log({ rows })
export default function DataTable() {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                getRowId={(row) => generateRandom()}
            />
        </div>
    );
}