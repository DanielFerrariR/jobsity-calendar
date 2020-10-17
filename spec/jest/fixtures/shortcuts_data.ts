import { ShortcutsState } from 'src/store/shortcuts'

const shortcutsData: ShortcutsState = [
  {
    id: 5037,
    hook: null,
    credential_id: 3739,
    administered: true,
    prevent_clipboard: true,
    group_id: 8365
  },
  {
    id: 5035,
    hook: null,
    credential_id: 3738,
    administered: true,
    prevent_clipboard: false,
    group_id: 8365
  },
  {
    id: 5034,
    hook: null,
    credential_id: 3737,
    administered: true,
    prevent_clipboard: false,
    group_id: 8365
  },
  {
    id: 5033,
    hook: {
      id: 1,
      name: 'Dummy',
      description: null,
      s3_images_url: {
        tiny: '/assets/missing_monki.svg',
        thumb: '/assets/missing_monki.svg'
      },
      extension: 'dummy',
      updated_at: '2019-12-18T18:31:41.847Z',
      version: '1'
    },
    credential_id: 3736,
    administered: true,
    prevent_clipboard: false,
    group_id: 8365
  },
  {
    id: 5032,
    hook: null,
    credential_id: 3735,
    administered: true,
    prevent_clipboard: false,
    group_id: 8365
  },
  {
    id: 5029,
    hook: null,
    credential_id: 3734,
    administered: true,
    prevent_clipboard: false,
    group_id: 8365
  }
]

export default shortcutsData
