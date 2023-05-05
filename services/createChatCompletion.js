import prompts from 'prompts'
import colors from '@colors/colors/safe.js'
import ora from 'ora'
import { exitValidation, inputPropmt } from '../utils.js'

export default async function createChatCompletion (openai) {
  const messages = [{ role: 'system', content: 'You are a helpful assistant.' }]
  console.log(colors.bgMagenta.bold(' >> chat \n'))

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

    const message = {
      role: 'user',
      content: value
    }

    messages.push(message)
    const spinner = ora('Loading...').start()
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
