import React from 'react'
import {
  Badge as MuiBadge,
  BadgeProps as OldBadgeProps,
  styled
} from '@material-ui/core'
import { spacing, SpacingProps, compose } from '@material-ui/system'
import { Link } from 'react-router-dom'

type BadgeProps = OldBadgeProps & SpacingProps & ExtraProps

interface ExtraProps {
  component?: React.ReactElement | typeof Link | string
  to?: string
}

const StyledBadge = styled(({ newComponent, ...props }) => (
  <MuiBadge component={newComponent} {...props} />
))(compose(spacing))

const Badge: React.FC<BadgeProps> = ({ children, component, ...props }) => {
  return (
    <StyledBadge newComponent={component} {...props}>
      {children}
    </StyledBadge>
  )
}

StyledBadge.propTypes = {}

export default Badge
