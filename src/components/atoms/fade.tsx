import React from 'react'
import { Fade as MuiFade, FadeProps, styled } from '@material-ui/core'

const StyledFade = styled(MuiFade)({})

const Fade: React.FC<FadeProps> = React.forwardRef((props, ref) => {
  return <StyledFade ref={ref} {...props} />
})

StyledFade.propTypes = {}

export default Fade
