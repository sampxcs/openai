import { Configuration, OpenAIApi } from 'openai'
import prompt from 'prompt'
import colors from '@colors/colors/safe.js'
import ora from 'ora'
import * as dotenv from 'dotenv'
dotenv.config()

prompt.message = ''
prompt.delimiter = ''
prompt.start()
const spinner = ora('Generando respuesta...')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

console.log(`Ingresa tus preguntas para la ${colors.green('Inteligencia Artificial⚡')}
Cuando quieras salir usa el comando ${colors.red('exit')} o "ctr + c"
`)

while (true) {
  const input = await prompt.get({
    properties: {
      value: {
        description: '>>',
        required: true
      }
    }
  })

  if (input.value === 'exit') {
    console.log('Hasta luego!')
    break
  }

  spinner.start()
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: input.value,
    max_tokens: 400
  })
  spinner.succeed(`Listo ${completion.data.choices[0].text}
    `)
}
