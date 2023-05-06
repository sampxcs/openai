import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'
import prompts from 'prompts'
import { green, red } from 'console-log-colors'

import { exitValidation } from './utils.js'

import createChatCompletion from './services/createChatCompletion.js'
import createCompletion from './services/createCompletion.js'
import createImage from './services/createImage.js'
import createTranscription from './services/createTranscription.js'
import createTranslation from './services/createTranslation.js'
import createModeration from './services/createModeration.js'
import createEdit from './services/createEdit.js'

dotenv.config()
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai = new OpenAIApi(configuration)

const actions = [
  { title: 'Chat', description: 'Chat with the AI', value: 1 },
  { title: 'Generate text', description: 'Creates a completion for the provided prompt', value: 2 },
  { title: 'Edit text', description: 'Creates a new edit for the provided input and instruction', value: 3 },
  { title: 'Generate image', description: 'Creates an image given a prompt', value: 4 },
  { title: 'Transcribe audio', description: 'Transcribes audio into the input language', value: 5 },
  { title: 'Translate audio', description: 'Translates audio into into English', value: 6 },
  { title: 'Moderation', description: 'Classifies if text violates OpenAI\'s Content Policy', value: 7 },
  { title: 'exit', value: 0 }
]

const actionsPrompt = {
  type: 'select',
  name: 'action',
  message: 'Choose the action you want to perform',
  choices: actions,
  initial: 0
}

console.log(`Welcome to ${green('OpenAI⚡')} \n
When you want to exit use the ${red('exit')} command
To clear the console you can use the ${green('clear')} or ${green('cls')} commands\n`)

while (true) {
  const { action } = await prompts(actionsPrompt)
  if (!action) {
    if (await exitValidation()) break
    continue
  }

  switch (action) {
    case 1:
      await createChatCompletion(openai)
      break
    case 2:
      await createCompletion(openai)
      break
    case 3:
      await createEdit(openai)
      break
    case 4:
      await createImage(openai)
      break
    case 5:
      await createTranscription(openai)
      break
    case 6:
      await createTranslation(openai)
      break
    case 7:
      await createModeration(openai)
      break
  }
}

console.log('See you later 👋\n')
