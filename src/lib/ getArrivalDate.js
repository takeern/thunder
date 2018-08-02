const request = require('superagent')
const moment = require('moment')
require('superagent-charset')(request)
require('superagent-proxy')(request)

const logger = require('./lib/logconfig')

const getArrivalTime = (stationName, trainName) => {
  const czEn = encodeURI(stationName).replace(/%/g, '-')
  const time = moment().format('L').split('/')
  const rq = `${time[2]}-${time[0]}-${time[1]}`
  const date = new Date()
  const url = 'http://dynamic.12306.cn/mapping/kfxt/zwdcx/LCZWD/cx.jsp'
  const proxy = 'http://127.0.0.1:8888'
  return new Promise ((reslove) => {
    request
    .get(url)
    .query({
      cz:stationName,
      cc:trainName,
      rq:rq,
      tp:date.getTime(),
      cxlx:'0',
      czEn:czEn,
    })
    .proxy(proxy)
    .charset('gbk')
    .set({
      'Accept-Encoding': 'gzip, deflate',
      'host':'dynamic.12306.cn',
      'Proxy-Connection':'keep-alive',
      'Referer':'http://dynamic.12306.cn/mapping/kfxt/zwdcx/LCZWD/CCCX.jsp',
      'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36',
    })
    .end((err, res) => {
      if(err) logger.error(`get arrival data eeror,cz:${stationName},trainName:${trainName}`)
      reslove(res.text)
    })
  })
}

module.exports = getArrivalTime
