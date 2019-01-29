const {Command, flags} = require('@oclif/command')
const {cli} = require('cli-ux')
const generateReadme = require('../generate-readme')

const schema = {
  name: {
    prompt: 'What is the project name?',
  },
  ingress: {
    description: `One paragraph explaining the project. It should be breif and explain what the project does rather than exactly how its built.

_Optional_: If the project is not ready for production use it can be a good idea to add a note about the project status &mdash; for example _Experimetal_, _Alpha_ etc (also use emoji :warning: :construction: :information_source: to catch attention).
`,
    prompt: 'Write your description',
    default: 'TODO',
  },
  test: {
    confirmPrompt: 'Will you have tests?',
    prompt: 'Explain how to setup and get the tests running locally:',
    default: 'TODO',
  },
  deployment: {
    confirmPrompt: 'Will this project be deployed?',
    prompt: "If your project can be deployed add a short instruction for how the user can deploy the project. Similar to the [installation](#installation) section don't cover all the details, instead add links to more info.",
    default: 'TODO',
  },
  builtWith: {
    confirmPrompt: 'Do you want to list any notable technologies/libs/frameworks that you depend on?',
    prompt: 'Technologies separated by a , (comma)',
    default: 'TODO',
  },
  license: {
    prompt: 'What license are you going to use?',
    default: 'Apache-v2',
  },
  contributing: {
    confirmPrompt: 'Will you except contributions?',
    default: 'TODO',
  },
  acknowledgments: {
    confirmPrompt: 'Any acknowledgements?',
    confirm: 'Aacknowledgements separated by a , (comma)',
    default: 'TODO',
  },
}

const strToMarkdownList = (s, sep = ',') => `- ${s.split(sep).map(s => s.trim()).join('\n - ')}`

class ReadmeCommand extends Command {
  async run() {
    const {flags} = this.parse(ReadmeCommand)
    const force = flags.force
    const print = flags.print
    const interactive = flags.interactive
    const output = flags.output || 'README.md'
    const input = flags.input

    let data
    if (input) {
      data = await this.getDataFromPath()
    } else {
      data = await this.getDataInteractive()
    }

    const readme = generateReadme(data)
    if (print) {
      this.log(readme)
    } else {
      if (!force) {
        // TODO Check if output path already exists
      }

      if (interactive) {
        const forcedInteractive = await cli.confirm(`${output} already exists do you want to overwrite it?`)
        if (!forcedInteractive) {
          throw new Error(`${output} already exists, add --force if you want to over write it.`)
        }
      }

      throw new Error(`--output not implemented yet (nothing written to ${output})`)
    }

    this.log(JSON.stringify(data, 0, 2))
  }

  async getDataFromPath() {
    throw new Error('--input is not implemented yet!')
  }

  async getDataInteractive() {
    const data = {}
    data.name = await cli.prompt(schema.name.prompt)

    this.log(schema.ingress.description)
    data.ingress = await cli.prompt(schema.ingress.prompt, {default: schema.ingress.default})

    if (await cli.confirm(schema.test.confirmPrompt)) {
      data.test = await cli.prompt(schema.test.prompt, {default: schema.test.default})
    }

    if (await cli.confirm(schema.deployment.confirmPrompt)) {
      data.deployment = await cli.prompt(schema.deployment.prompt, {default: schema.deployment.default})
    }

    if (await cli.confirm(schema.builtWith.confirmPrompt)) {
      data.builtWith = strToMarkdownList(await cli.prompt(schema.builtWith.prompt, {default: schema.builtWith.default}))
    }

    data.license = await cli.prompt(schema.license.prompt, {default: schema.license.default})

    if (await cli.confirm(schema.contributing.confirmPrompt)) {
      data.contributing = await cli.prompt(schema.contributing.prompt, {default: schema.contributing.default})
    }

    if (await cli.confirm(schema.acknowledgments.confirmPrompt)) {
      data.acknowledgments = strToMarkdownList(await cli.prompt(schema.acknowledgments.prompt, {default: schema.acknowledgments.default}))
    }

    return data
  }
}

ReadmeCommand.description = `Describe the command here
Generate great open source README.md files.
`

ReadmeCommand.flags = {
  interactive: flags.boolean({char: 'i', default: true}),
  force: flags.boolean({char: 'f', default: false}),
  input: flags.string({char: 'i', description: 'input path'}),
  output: flags.string({char: 'o', description: 'output path'}),
}

module.exports = ReadmeCommand
