import React from 'react'
import {
  Modal as MuiModal,
  ModalProps as OldModalProps,
  styled
} from '@material-ui/core'
import {
  spacing,
  SpacingProps,
  display,
  DisplayProps,
  flexbox,
  FlexboxProps,
  compose
} from '@material-ui/system'

type ModalProps = OldModalProps & SpacingProps & FlexboxProps & DisplayProps

const StyledModal = styled(MuiModal)(compose(spacing, flexbox, display))

const isTest = process.env.NODE_ENV === 'test'

const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  return (
    <StyledModal disablePortal={isTest && true} {...props}>
      {children}
    </StyledModal>
  )
}

StyledModal.propTypes = {}

export default Modal
