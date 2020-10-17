import React from 'react'
import { styled } from '@material-ui/core'
import {
  spacing,
  SpacingProps,
  sizing,
  SizingProps,
  compose,
  css
} from '@material-ui/system'

interface ExtraProps {
  css?: React.CSSProperties
}

type ImageProps = Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  'width' | 'height'
> &
  SizingProps &
  SpacingProps &
  ExtraProps

const StyledImage = styled('img')(css(compose(spacing, sizing)))

const Image: React.FC<ImageProps> = ({ css: newCss = {}, ...props }) => {
  return <StyledImage css={newCss} {...props} />
}

StyledImage.propTypes = {}

export default Image
