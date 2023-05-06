import prompts from 'prompts'
import { bgMagenta } from 'console-log-colors'
import ora from 'ora'
import { exitValidation, inputPropmt } from '../utils.js'
import * as fs from 'fs'

export default async function createTranslation (openai) {
  console.log(bgMagenta.bold(' >> Traducir Audio \n'))
  console.log('Enter the path of the audio file you want to translate into English\n')

  while (true) {
    const { value } = await prompts(inputPropmt)

    if (value === 'exit') {
      if (await exitValidation()) break
      continue
    }
    if (value === 'clear' || value === 'cls') {
      console.clear()
      continue
    }
    const spinner = ora('Cargando...').start()
    try {
      const path = value.replaceAll('"', '')
      const res = await openai.createTranslation(
        fs.createReadStream(path),
        'whisper-1'
      )
      spinner.succeed(`Listo \n${res.data.text}\n`)
    } catch (error) {
      spinner.fail(error.message)
    }
  }
}
