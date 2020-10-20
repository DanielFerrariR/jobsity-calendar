import React, { Dispatch, SetStateAction, useState } from 'react'
import {
  Box,
  Tooltip,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button
} from 'src/components/atoms'
import { Modal } from 'src/components/molecules'
import { Delete, Edit } from '@material-ui/icons'
import { useTheme } from '@material-ui/core'
import { useSelector, useDispatch } from 'src/store'
import { deleteReminder, deleteReminders } from 'src/store/reminders'
import { isSameDay } from 'src/utils'
import EditReminderModal from './edit_reminder_modal'

interface Props {
  open: false | Date
  setOpen: Dispatch<SetStateAction<false | Date>>
}

const ListRemindersModal: React.FC<Props> = ({ open, setOpen }) => {
  const reminders = useSelector((state) => state.reminders)
  const filteredReminders = open
    ? reminders?.filter((element) => isSameDay(element.date, open))
    : []
  const sortedReminders = filteredReminders?.sort((first, second) => {
    if (first.date < second.date) {
      return -1
    }

    if (first.date > second.date) {
      return 1
    }

    return 0
  })
  const theme = useTheme()
  const [openEditReminderModal, setOpenEditReminderModal] = useState<
    string | false
  >(false)
  const dispatch = useDispatch()

  const editReminder = (id: string) => {
    setOpen(false)
    setOpenEditReminderModal(id)
  }

  const deleteAllReminders = () => {
    dispatch(deleteReminders(reminders || [], sortedReminders || []))
    setOpen(false)
  }

  return (
    <>
      <Modal open={!!open} setOpen={setOpen}>
        <Box display="flex" alignItems="center" mb={3}>
          <Typography>Reminders</Typography>
          <Tooltip title="Trash">
            <IconButton
              aria-label="Trash"
              onClick={deleteAllReminders}
              data-testid="iconbutton-reminders-list-trash"
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
        <List
          mb={3}
          width={1}
          height={200}
          border={1}
          color="grey.400"
          borderRadius={theme.shape.borderRadius}
          css={{ overflow: 'auto' }}
        >
          {sortedReminders &&
            sortedReminders.map((each, count) => (
              <ListItem button key={each.id}>
                <ListItemText
                  data-testid={`listitemtext-user-list-${count}`}
                  color="text.primary"
                >
                  <Box
                    xs={{
                      width: 140,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden'
                    }}
                    sm={{
                      width: 200,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden'
                    }}
                  >
                    {each.date.getHours()}:{each.date.getMinutes()}&nbsp;&nbsp;
                    {each.text}
                  </Box>
                </ListItemText>
                <ListItemSecondaryAction>
                  <Box display="flex" alignItems="center">
                    <Tooltip title="Edit">
                      <IconButton
                        aria-label="Edit"
                        onClick={() => editReminder(each.id)}
                        data-testid={`iconbutton-reminders-list-edit-${count}`}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        aria-label="Delete"
                        onClick={() =>
                          dispatch(deleteReminder(reminders || [], each.id))
                        }
                        data-testid={`iconbutton-reminders-list-delete-${count}`}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
        <Button width={1} onClick={() => setOpen(false)}>
          Close
        </Button>
      </Modal>
      <EditReminderModal
        open={openEditReminderModal}
        setOpen={setOpenEditReminderModal}
      />
    </>
  )
}

export default ListRemindersModal
