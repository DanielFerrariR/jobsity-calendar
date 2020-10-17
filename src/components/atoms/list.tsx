import React from 'react'
import {
  List as MuiList,
  ListProps as OldListProps,
  styled
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import {
  compose,
  sizing,
  SizingProps,
  spacing,
  SpacingProps,
  borders,
  BordersProps,
  palette,
  PaletteProps,
  css
} from '@material-ui/system'

type ListProps = OldListProps &
  SizingProps &
  SpacingProps &
  BordersProps &
  PaletteProps &
  ExtraProps

interface ExtraProps {
  css?: React.CSSProperties
  component?: React.ReactElement | typeof Link | string
  to?: string
}

const StyledList = styled(({ newComponent, ...props }) => (
  <MuiList component={newComponent} {...props} />
))(css(compose(sizing, spacing, borders, palette)))

const List: React.FC<ListProps> = ({
  children,
  component,
  css: newCss = {},
  ...props
}) => {
  return (
    <StyledList newComponent={component} css={newCss} {...props}>
      {children}
    </StyledList>
  )
}

StyledList.propTypes = {}

export default List
