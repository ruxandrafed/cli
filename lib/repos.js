const per_page = 100 // eslint-disable-line camelcase

module.exports = async function repos (client, org) {
  const method = org ? client.repos.getForOrg : client.repos.getAll
  const options = org ? { org, per_page } : { affiliation: 'owner', per_page }

  let response = await method(options)
  let { data } = response

  while (client.hasNextPage(response)) {
    response = await client.getNextPage(response)
    data = data.concat(response.data)
  }

  return data
}
