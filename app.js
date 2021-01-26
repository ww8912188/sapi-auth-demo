const crypto = require("crypto")
const queryString = require('query-string')
const axios = require('axios')

const API_KEY = ''
const API_SECRET = ''
const HOST = 'https://api.binance.com'

const genSig = (query, secret) => {
  let signature = crypto.createHmac("sha256", secret).update(query).digest("hex")
  return signature
}

const test = async () => {
  let timestamp = new Date().getTime()
  let query = {
    timestamp
  }
  let queryStr = queryString.stringify(query)
  let signature = genSig(queryStr, API_SECRET)
  let headers = {
    'X-MBX-APIKEY': API_KEY,
  }
  let request = `${HOST}/sapi/v1/capital/config/getall?timestamp=${timestamp}&signature=${signature}`
  console.log(request)
  let ret = await axios.get(request, { headers })
  console.log(ret)
}

test()
