import { build, fake } from '@jackfranklin/test-data-bot'

export interface UserData {
  username: string
  email: string
  password: string
  first_name: string
  eula_acceptance: boolean
}

export interface CredentialData {
  name: string
  description: string
  login: string
  password: string
}

export interface MonkiData {
  name: string
  version: string
  extension: string
  contents: string
}

const buildUserData = build<UserData>('User', {
  fields: {
    username: fake((f) => f.internet.userName()),
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password()),
    first_name: '',
    eula_acceptance: true as any
  }
})

const buildCredentialData = build<CredentialData>('CredentialData', {
  fields: {
    name: fake((f) => f.name.firstName()),
    description: fake((f) => f.name.firstName()),
    login: fake((f) => f.internet.userName()),
    password: fake((f) => f.internet.password())
  }
})

const buildMonkiData = build<MonkiData>('MonkiData', {
  fields: {
    name: fake((f) => f.name.firstName()),
    version: fake((f) => f.name.firstName()),
    extension: 'js',
    contents: 'alert("Hello World")'
  }
})

export { buildUserData, buildCredentialData, buildMonkiData }
