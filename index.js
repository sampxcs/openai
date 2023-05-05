import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'
import prompts from 'prompts'
import colors from '@colors/colors/safe.js'

import { exitValidation } from './utils.js'

import createChatCompletion from './services/createChatCompletion.js'
import createCompletion from './services/createCompletion.js'
import createImage from './services/createImage.js'

dotenv.config()
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai = new OpenAIApi(configuration)

const actions = [
  { title: 'Generar texto', description: 'Crea un texto a partir de una solicitud dada', value: 1 },
  { title: 'Chatear', description: 'Chatea con la IA', value: 2 },
  { title: 'Generar imagenes', description: 'Crea una imagen dada una indicación', value: 3 },
  { title: 'Editar imagenes', description: 'Edita una imagen dada una imagen original y un aviso', value: 4, disabled: true },
  { title: 'Genera un vector', description: 'Crea un vector que representa el texto de entrada', value: 5, disabled: true },
  { title: 'Transcribir audio', description: 'Transcribe el audio al idioma de entrada', value: 6, disabled: true },
  { title: 'Traducir audio', description: 'Traduce el audio al inglés', value: 7, disabled: true },
  { title: 'salir', value: 0 }
]

const actionsPrompt = {
  type: 'select',
  name: 'action',
  message: 'Elige la accion que quiere realizar',
  choices: actions,
  initial: 0,
  hint: '- Usa las flechas del teclado para moverte',
  warn: '- Esta opción no esta disponible'
}

console.log(`Bienvenid@ a ${colors.green('Analytic Viaw⚡')} \n
Cuando quieras salir usa el comando ${colors.red('exit')}
Para limpiar la consola puedes usar el comando ${colors.green('clear')}\n`)

while (true) {
  const { action } = await prompts(actionsPrompt)
  if (!action) {
    if (await exitValidation()) break
    continue
  }

  switch (action) {
    case 1:
      await createCompletion(openai)
      break
    case 2:
      await createChatCompletion(openai)
      break
    case 3:
      await createImage(openai)
      break
  }
}

console.log('Hasta luego 👋\n')
