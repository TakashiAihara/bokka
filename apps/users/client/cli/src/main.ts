import { program } from 'commander'

const main = (dryRun: boolean) => {
  getUser(dryRun)
}

program.option('-d, --dry-run', 'dry run')
program.parse()
const options = program.opts()

main(options.dryRun)
