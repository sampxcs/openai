import prompts from 'prompts'
import { bgMagenta } from 'console-log-colors'
import ora from 'ora'
import { exitValidation, inputPropmt } from '../utils.js'

export default async function createCompletion (openai) {
  console.log(bgMagenta.bold(' >> Generate text \n'))
  console.log('Creates a completion for the provided prompt\n')

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
      const res = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: value,
        max_tokens: 400
      })
      spinner.succeed(`Listo: \n${res.data.choices[0].text}\n`)
    } catch (error) {
      spinner.fail(error.message)
    }
  }
}
