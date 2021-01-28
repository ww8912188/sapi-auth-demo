const crypto = require("crypto")
const queryString = require('query-string')
const axios = require('axios')

const API_KEY = 'QmC53GMFUP2YTamtCKZn3MHuQoK6YRl6v13QkfE6w5ALRZzhNdgSn1omiVxBm2w1'
const API_SECRET = '10b44wmFANPUHE7qaTacLKR43vuZcSFKvLMrn1ajODCA6nlcjDSecMFbXSDj1EiX'
// const HOST = 'https://api.binance.com'
const HOST = 'http://internal-tk-dev-sapi-alb-1564553427.ap-northeast-1.elb.amazonaws.com:9056'

const genSig = (query, secret) => {
  let signature = crypto.createHmac("sha256", secret).update(query).digest("hex")
  return signature
}

const test_GET = async () => {
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
  try {
    let ret = await axios.get(request, { headers })
    console.log(ret)
  } catch (err) {
    console.log(err)
  }
}

const test_POST = async () => {
  let query = {
    asset: 'USDT',
    timestamp: new Date().getTime()
  }
  let queryStr = queryString.stringify(query)
  let signature = genSig(queryStr, API_SECRET)
  let headers = {
    'X-MBX-APIKEY': API_KEY
  }
  let request = `${HOST}/sapi/v1/asset/dust?${queryStr}&signature=${signature}`
  console.log(request)
  try {
    let ret = await axios.post(request, {}, { headers })
    console.log(ret)
  } catch (err) {
    console.log(err)
  }
}

const test = async () => {
  await test_GET()
  await test_POST()
}

test()
