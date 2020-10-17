import React from 'react'
import { Popover as MuiPopover, PopoverProps, styled } from '@material-ui/core'

const isTest = process.env.NODE_ENV === 'test'

const StyledPopover = styled(MuiPopover)({})

const Popover: React.FC<PopoverProps> = ({ children, ...props }) => {
  return (
    <StyledPopover disablePortal={isTest && true} {...props}>
      {children}
    </StyledPopover>
  )
}

StyledPopover.propTypes = {}

export default Popover
