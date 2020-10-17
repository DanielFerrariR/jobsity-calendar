import React from 'react'
import {
  ListItemIcon as MuiListItemIcon,
  ListItemIconProps,
  styled
} from '@material-ui/core'

const StyledListItemIcon = styled(MuiListItemIcon)({})

const ListItemIcon: React.FC<ListItemIconProps> = ({ children, ...props }) => {
  return <StyledListItemIcon {...props}>{children}</StyledListItemIcon>
}

StyledListItemIcon.propTypes = {}

export default ListItemIcon
