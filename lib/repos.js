module.exports = async function repos (client, org, perPage = 100) {
  const method = org ? client.repos.getForOrg : client.repos.getAll
  const options = org ? { org, per_page: perPage } : { affiliation: 'owner', per_page: perPage }

  let response = await method(options)
  let { data } = response

  while (client.hasNextPage(response)) {
    response = await client.getNextPage(response)
    data = data.concat(response.data)
  }

  return data
}
