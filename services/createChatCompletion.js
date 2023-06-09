import prompts from 'prompts'
import { bgMagenta } from 'console-log-colors'
import ora from 'ora'
import { exitValidation, inputPropmt } from '../utils.js'

export default async function createChatCompletion (openai) {
  const messages = [{ role: 'system', content: 'You are a helpful assistant.' }]
  console.log(bgMagenta.bold(' >> chat \n'))

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

    const message = {
      role: 'user',
      content: value
    }

    messages.push(message)
    const spinner = ora('Cargando...').start()
    try {
      const res = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages
      })
      spinner.succeed(res.data.choices[0].message.content)
      messages.push(res.data.choices[0].message)
    } catch (error) {
      spinner.fail(error.message)
    }
  }
}
