import React from 'react'
import {
  Backdrop as MuiBackdrop,
  BackdropProps,
  styled
} from '@material-ui/core'

const StyledBackdrop = styled(MuiBackdrop)({})

const Backdrop: React.FC<BackdropProps> = (props) => {
  return <StyledBackdrop {...props} />
}

StyledBackdrop.propTypes = {}

export default Backdrop
