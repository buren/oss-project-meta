const {Command, flags} = require('@oclif/command')

class ReadmeCommand extends Command {
  async run() {
    const {flags} = this.parse(ReadmeCommand);
    const output = flags.output || 'README.md';
    
    this.log(`output ${output}`);
  }
}

ReadmeCommand.description = `Describe the command here
Generate great open source README.md files.
`

ReadmeCommand.flags = {
  output: flags.string({char: 'o', description: 'output path'}),
}

module.exports = ReadmeCommand
