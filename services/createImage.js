import prompts from 'prompts'
import { bgMagenta, green } from 'console-log-colors'
import ora from 'ora'
import { exitValidation, inputPropmt } from '../utils.js'

export default async function createImage (openai) {
  console.log(bgMagenta.bold(' >> Generate image \n'))
  console.log(`Describe the image you want ${green('Artificial Intelligence')} to create\n`)

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
