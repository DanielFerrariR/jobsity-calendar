import React from 'react'
import { TableHead, TableBody } from 'src/components/atoms'
import { styled, TableHeadProps, TableBodyProps, fade } from '@material-ui/core'

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  '& tr th': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: 0
  }
}))

const StyledTableBody = styled(TableBody)(({ theme }) => ({
  '& tr td': {
    border: '1px solid black',
    verticalAlign: 'initial',
    padding: '8px',
    height: 120,
    width: 120,
    maxWidth: 120,
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      cursor: 'pointer'
    }
  },
  '& tr td:first-child': {
    backgroundColor: theme.palette.grey[200],
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      cursor: 'pointer'
    }
  },
  '& tr td:last-child': {
    backgroundColor: theme.palette.grey[200],
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      cursor: 'pointer'
    }
  }
}))

export const CustomTableHead: React.FC<TableHeadProps> = (props) => {
  return <StyledTableHead {...props} />
}

export const CustomTableBody: React.FC<TableBodyProps> = (props) => {
  return <StyledTableBody {...props} />
}
