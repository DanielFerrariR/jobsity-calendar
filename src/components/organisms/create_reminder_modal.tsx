import React, { Dispatch, SetStateAction, useState } from 'react'
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
import { createReminder } from 'src/store/reminders'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

interface Form {
  text: string
  date: null | Date
  city: string
  color: string
}

const CreateReminderModal: React.FC<Props> = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const reminders = useSelector((state) => state.reminders)
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
    text: '',
    date: new Date(),
    city: '',
    color: colors[0]
  })

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

    if (!form.date) {
      return
    }

    setLoading(true)

    dispatch(
      createReminder(reminders || [], {
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
    <Modal open={open} setOpen={setOpen}>
      <Box component="form" onSubmit={handleFormSubmit}>
        <Typography mb={3} variant="h6">
          Create Reminder
        </Typography>
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
          required
        />
        <Box position="relative">
          <Button width={1} mb={3} type="submit" disabled={loading}>
            Create
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
      </Box>
    </Modal>
  )
}

export default CreateReminderModal
