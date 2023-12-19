import { Box, Pagination } from '@mui/material'
import React from 'react'

export default function TodoListPagination({
  totalPages,
  page,
  onPageChange
}) {
  return (
    <Box sx={{margin: "1rem"}}>
      <Pagination 
        count={totalPages} 
        page={page}
        onChange={(e, value) => {
          onPageChange(value)
        }}
      />
    </Box>
    )
}
