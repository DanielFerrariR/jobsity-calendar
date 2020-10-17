import React from 'react'
import {
  Tooltip as MuiTooltip,
  TooltipProps as OldTooltipProps,
  styled
} from '@material-ui/core'
import { spacing, SpacingProps, compose, css } from '@material-ui/system'

type TooltipProps = OldTooltipProps & SpacingProps & ExtraProps

interface ExtraProps {
  css?: React.CSSProperties
  classes?: Partial<Record<'root', string>>
}

const StyledTooltip = styled(MuiTooltip)(css(compose(spacing)))

const Tooltip: React.FC<TooltipProps> = ({
  children,
  css: newCss = {},
  ...props
}) => {
  return (
    <StyledTooltip css={newCss} {...props}>
      {children}
    </StyledTooltip>
  )
}

StyledTooltip.propTypes = {}

export default Tooltip
