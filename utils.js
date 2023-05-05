import prompts from 'prompts'

export const inputPropmt = {
  type: 'text',
  name: 'value',
  message: '',
  validate: value => !value ? 'Ingresa un valor por favor' : true
}

export const exitValidation = async () => {
  const { value } = await prompts({
    type: 'toggle',
    name: 'value',
    message: 'Seguro que quiere salir?',
    initial: true,
    active: 'yes',
    inactive: 'no'
  })
  return value
}
