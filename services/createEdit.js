import prompts from 'prompts'
import { bgMagenta } from 'console-log-colors'
import ora from 'ora'
import { exitValidation } from '../utils.js'

export default async function createEdit (openai) {
  console.log(bgMagenta.bold(' >> Edit text \n'))
  console.log('Creates a new edit for the provided input and instruction\n')

  while (true) {
    const { input } = await prompts({
      type: 'text',
      name: 'input',
      message: 'Input',
      validate: value => !value ? 'Enter a value please' : true
    })

    if (input === 'exit') {
      if (await exitValidation()) break
      continue
    }
    if (input === 'clear' || input === 'cls') {
      console.clear()
      continue
    }

    const { instruction } = await prompts({
      type: 'text',
      name: 'instruction',
      message: 'Instruction',
      validate: value => !value ? 'Enter a value please' : true
    })

    if (instruction === 'exit') {
      if (await exitValidation()) break
      continue
    }
    if (input === 'clear' || input === 'cls' || instruction === 'clear' || instruction === 'cls') {
      console.clear()
      continue
    }

    const spinner = ora('Cargando...').start()
    try {
      const res = await openai.createEdit({
        model: 'text-davinci-edit-001',
        input,
        instruction
      })
      spinner.succeed(`Listo: \n${res.data.choices[0].text}\n`)
    } catch (error) {
      spinner.fail(error.message)
    }
  }
}
