import React from 'react'
import {
  ClickAwayListener as MuiClickAwayListener,
  ClickAwayListenerProps
} from '@material-ui/core'

const ClickAwayListener: React.FC<ClickAwayListenerProps> = (props) => {
  return <MuiClickAwayListener {...props} />
}

export default ClickAwayListener
