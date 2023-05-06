import prompts from 'prompts'

export const inputPropmt = {
  type: 'text',
  name: 'value',
  message: '',
  validate: value => !value ? 'Enter a value please' : true
}

export const exitValidation = async () => {
  const { value } = await prompts({
    type: 'toggle',
    name: 'value',
    message: 'Are you sure you want to go out?',
    initial: true,
    active: 'yes',
    inactive: 'no'
  })
  return value
}
