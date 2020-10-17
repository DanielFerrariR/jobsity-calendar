import React from 'react'
import {
  ListItemText as MuiListItemText,
  ListItemTextProps as OldListItemTextProps,
  styled
} from '@material-ui/core'
import {
  compose,
  spacing,
  SpacingProps,
  palette,
  PaletteProps
} from '@material-ui/system'

type ListItemTextProps = OldListItemTextProps & SpacingProps & PaletteProps

const StyledListItemText = styled(MuiListItemText)(compose(spacing, palette))

const ListItemText: React.FC<ListItemTextProps> = ({ children, ...props }) => {
  return <StyledListItemText {...props}>{children}</StyledListItemText>
}

StyledListItemText.propTypes = {}

export default ListItemText
