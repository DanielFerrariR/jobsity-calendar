import React from 'react'
import {
  MenuItem as MuiMenuItem,
  MenuItemProps as OldMenuItemProps,
  styled
} from '@material-ui/core'
import { Link } from 'react-router-dom'

type MenuItemProps = OldMenuItemProps & ExtraProps

interface ExtraProps {
  component?: React.ReactElement | typeof Link | string
  to?: string
}

const StyledMenuItem = styled(({ newRef, newComponent, ...props }) => (
  <MuiMenuItem ref={newRef} component={newComponent} {...props} />
))({})

const MenuItem: React.FC<MenuItemProps> = React.forwardRef(
  ({ children, component, ...props }, ref) => {
    return (
      <StyledMenuItem newComponent={component} newRef={ref} {...props}>
        {children}
      </StyledMenuItem>
    )
  }
)

StyledMenuItem.propTypes = {}

export default MenuItem
