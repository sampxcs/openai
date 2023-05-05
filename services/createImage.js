import prompts from 'prompts'
import colors from '@colors/colors/safe.js'
import ora from 'ora'
import { exitValidation, inputPropmt } from '../utils.js'

export default async function createImage (openai) {
  console.log(colors.bgMagenta(' >> Generar Imagen \n'))
  console.log(`Describe la imagen que quieres que la ${colors.green('Inteligencia Artificial')} cree\n`)

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
      const res = await openai.createImage({
        prompt: value,
        n: 1,
        size: '1024x1024'
      })
      spinner.succeed(`Listo \n${res.data.data[0].url}\n`)
    } catch (error) {
      spinner.fail(error.message)
    }
  }
}
