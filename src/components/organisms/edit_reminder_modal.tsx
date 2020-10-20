import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  DateTimePicker,
  CircularProgress
} from 'src/components/atoms'
import { Modal } from 'src/components/molecules'
import { useDispatch, useSelector } from 'src/store'
import { editReminder } from 'src/store/reminders'

interface Props {
  open: string | false
  setOpen: Dispatch<SetStateAction<string | false>>
}

interface Form {
  text: string
  date: null | Date
  city: string
  color: string
}

const EditReminderModal: React.FC<Props> = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const reminders = useSelector((state) => state.reminders)
  const reminder = reminders?.find((element) => element.id === open)
  const dispatch = useDispatch()
  const colors = [
    '#f44336',
    '#2196f3',
    '#4caf50',
    '#9c27b0',
    '#ff9800',
    '#795548'
  ]
  const [form, setForm] = useState<Form>({
    text: reminder?.text || '',
    date: reminder?.date || new Date(),
    city: reminder?.city || '',
    color: reminder?.color || colors[0]
  })

  useEffect(() => {
    setForm({
      text: reminder?.text || '',
      date: reminder?.date || new Date(),
      city: reminder?.city || '',
      color: reminder?.color || colors[0]
    })
  }, [open])

  const handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [name]: event.target.value
    })
  }

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!reminder) {
      return
    }

    if (!form.date) {
      return
    }

    setLoading(true)

    dispatch(
      editReminder(reminders || [], {
        id: reminder.id,
        text: form.text,
        date: form.date,
        city: form.city,
        color: form.color
      })
    )

    setLoading(false)
    setOpen(false)
  }

  return (
    <Modal open={!!open} setOpen={setOpen}>
      <Box component="form" onSubmit={handleFormSubmit}>
        <Typography mb={3} variant="h6">
          Edit Reminder
        </Typography>
        {!reminder && open ? (
          <>
            <Typography mb={3}>Invalid reminder</Typography>
            <Button width={1}>Close</Button>
          </>
        ) : (
          <>
            <Typography mb={1}>Choose a color</Typography>
            <Box display="flex" alignItems="center" mb={3}>
              {colors.map((each) => {
                return (
                  <Box
                    key={each}
                    style={{ cursor: 'pointer' }}
                    borderRadius={4}
                    width={24}
                    height={24}
                    bgcolor={each}
                    border={form.color === each && '3px solid black'}
                    onClick={() => setForm({ ...form, color: each })}
                    mr={1}
                  />
                )
              })}
            </Box>
            <TextField
              label="Text"
              inputProps={{
                maxLength: 30
              }}
              mb={3}
              width={1}
              onChange={handleChange('text')}
              value={form.text}
              required
            />
            <DateTimePicker
              label="Date"
              inputVariant="outlined"
              value={form.date}
              onChange={(date) => setForm({ ...form, date })}
              style={{ marginBottom: '24px' }}
              fullWidth
            />
            <TextField
              label="City"
              width={1}
              mb={3}
              onChange={handleChange('city')}
              value={form.city}
              required
            />
            <Box position="relative">
              <Button width={1} mb={3} type="submit" disabled={loading}>
                Edit
              </Button>
              {loading && (
                <CircularProgress
                  color="primary.main"
                  size={24}
                  position="absolute"
                  top="calc(50% - 12px)"
                  left="calc(50% - 12px)"
                />
              )}
            </Box>
            <Button width={1} variant="outlined" onClick={() => setOpen(false)}>
              Close
            </Button>
          </>
        )}
      </Box>
    </Modal>
  )
}

export default EditReminderModal
