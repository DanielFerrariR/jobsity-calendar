import React from 'react'
import { Portal as MuiPortal, PortalProps } from '@material-ui/core'

const isTest = process.env.NODE_ENV === 'test'

const Portal: React.FC<PortalProps> = ({ children, ...props }) => {
  return (
    <MuiPortal disablePortal={isTest && true} {...props}>
      {children}
    </MuiPortal>
  )
}

export default Portal
