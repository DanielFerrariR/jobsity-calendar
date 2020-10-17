import React from 'react'
import { Toolbar as MuiToolbar, ToolbarProps, styled } from '@material-ui/core'

const StyledToolbar = styled(MuiToolbar)({})

const Toolbar: React.FC<ToolbarProps> = (props) => {
  return <StyledToolbar {...props} />
}

StyledToolbar.propTypes = {}

export default Toolbar
