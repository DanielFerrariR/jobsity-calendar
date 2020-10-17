import React from 'react'
import {
  MenuList as MuiMenuList,
  MenuListProps,
  styled
} from '@material-ui/core'

const StyledMenuList = styled(MuiMenuList)({})

const MenuList: React.FC<MenuListProps> = ({ children, ...props }) => {
  return <StyledMenuList {...props}>{children}</StyledMenuList>
}

StyledMenuList.propTypes = {}

export default MenuList
