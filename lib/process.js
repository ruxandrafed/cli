const { safeLoad } = require('js-yaml')
const { spawn } = require('child_process')
const { writeFile } = require('fs')
const Client = require('@octokit/rest')
const pMap = require('p-map')

const authenticate = require('./authenticate')
const headers = require('./headers')
const repos = require('./repos')
const log = require('./log')

const client = new Client({ headers })

module.exports = async argv => {
  await authenticate(client)

  const data = await repos(client, argv.name)
  const table = []
  const results = {}

  // throttle processing
  await pMap(data, async (repo, index) => {
    let file

    // display status
    log.info(`processing ${repo.full_name}...`)

    try {
      file = await client.repos.getContent({ owner: repo.owner.login, repo: repo.name, path: 'colophon.yml' })
    } catch (e) { }

    // did we find something?
    if (file) {
      // decode content of file
      const buff = new Buffer.from(file.data.content, 'base64')

      let colophon

      try {
        colophon = safeLoad(buff.toString())
      } catch (e) { }

      if (colophon) {
        results[repo.full_name] = colophon

        table.push({
          repo: repo.name,
          id: colophon.id,
          title: colophon.about.title
        })
      }
    }
  }, { concurrency: argv.concurrency })

  // display results
  console.table(table)

  // optionally write output to file
  if (argv.output) {
    writeFile(`${argv.output}.json`, JSON.stringify(results), () => {})
  }
}
