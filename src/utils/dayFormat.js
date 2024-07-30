import dayjs from "dayjs"
import relativeTime  from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const dayFormat = {
  format: (time = '', format = 'YYYY-MM-DD') => {
    if(dayjs(time).isValid()) {
      const res = Date.parse(time)
      let timestamp = isNaN(res) ? time : res
      return dayjs(Number(timestamp)).format(format)
    }
  },
  relativeFormat: (time = '') => {
    const formatTime = dayFormat.format(time, 'YYYY-MM-DD HH:mm:ss')
    return dayjs(formatTime).fromNow() 
  }
}

export default dayFormat