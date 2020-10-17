import React from 'react'
import {
  ListItemSecondaryAction as MuiListItemSecondaryAction,
  ListItemSecondaryActionProps,
  styled
} from '@material-ui/core'

interface ExtraProps {
  muiName: string
}

const StyledListItemSecondaryAction = styled(MuiListItemSecondaryAction)({})

const ListItemSecondaryAction: React.FC<ListItemSecondaryActionProps> &
  ExtraProps = ({ children, ...props }) => {
  return (
    <StyledListItemSecondaryAction {...props}>
      {children}
    </StyledListItemSecondaryAction>
  )
}

ListItemSecondaryAction.muiName = 'ListItemSecondaryAction'
StyledListItemSecondaryAction.propTypes = {}

export default ListItemSecondaryAction
