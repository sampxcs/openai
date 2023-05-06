import prompts from 'prompts'
import { bgMagenta, red, green } from 'console-log-colors'
import ora from 'ora'
import { exitValidation, inputPropmt } from '../utils.js'

export default async function createModeration (openai) {
  console.log(bgMagenta.bold(' >> Moderation \n'))
  console.log(`Classifies if text violates ${green('OpenAI\'s')} Content Policy\n`)

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
      const res = await openai.createModeration({
        input: value
      })
      if (res.data.results[0].flagged) {
        spinner.fail(`${red('Not allowed!')}`)
        const categories = res.data.results[0].categories
        for (const category in categories) {
          if (categories[category]) {
            console.log(red(category))
          }
        }
        console.log('')
      } else {
        spinner.succeed(`${green('Permitted\n')}`)
      }
    } catch (error) {
      spinner.fail(error.message)
    }
  }
}
