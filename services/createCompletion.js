import prompts from 'prompts'
import colors from '@colors/colors/safe.js'
import ora from 'ora'
import { exitValidation, inputPropmt } from '../utils.js'

export default async function createCompletion (openai) {
  console.log(colors.bgMagenta(' >> Generar Texto \n'))
  console.log('Crea un texto a partir de una solicitud dada\n')

  while (true) {
    const { value } = await prompts(inputPropmt)

    if (value === 'exit') {
      if (await exitValidation()) break
      continue
    }
    if (value === 'clear') {
      console.clear()
      continue
    }
    const spinner = ora('Loading...').start()
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
