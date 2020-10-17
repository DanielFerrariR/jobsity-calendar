import React from 'react'
import {
  Snackbar as MuiSnackbar,
  SnackbarProps,
  styled
} from '@material-ui/core'

const StyledSnackbar = styled(MuiSnackbar)({})

const Snackbar: React.FC<SnackbarProps> = (props) => {
  return <StyledSnackbar {...props} />
}

StyledSnackbar.propTypes = {}

export default Snackbar
