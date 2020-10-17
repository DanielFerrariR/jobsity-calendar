import { MonkisState } from 'src/store/monkis'

const monkisData: MonkisState = [
  {
    id: 19,
    name: 'monki1',
    version: '1',
    extension: 'javascript',
    contents: 'console.log("hello world")',
    enc_pwd: 'monki1'
  },
  {
    id: 20,
    name: 'monki2',
    version: '2',
    extension: 'php',
    contents: '<?= echo "Hello" ?>',
    enc_pwd: 'monki2'
  }
]

export default monkisData
