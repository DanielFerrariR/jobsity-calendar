import { Box } from 'src/components/atoms'
import { styled } from '@material-ui/core'

const ColoredButton = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  height: 24,
  width: 24,
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    opacity: 0.8
  }
}))

export default ColoredButton
