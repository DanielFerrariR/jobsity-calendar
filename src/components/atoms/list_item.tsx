import React from 'react'
import {
  ListItem as MuiListItem,
  ListItemProps as OldListItemProps,
  styled
} from '@material-ui/core'
import { Link } from 'react-router-dom'

type ListItemProps = OldListItemProps & ExtraProps

interface ExtraProps {
  component?: React.ReactElement | typeof Link | string
  to?: string
}

const StyledListItem = styled(({ newComponent, ...props }) => (
  <MuiListItem component={newComponent} {...props} />
))({})

const ListItem: React.FC<ListItemProps> = ({
  children,
  component,
  button,
  ...props
}) => {
  return (
    <StyledListItem newComponent={component} button={button as any} {...props}>
      {children}
    </StyledListItem>
  )
}

StyledListItem.propTypes = {}

export default ListItem
