
export default {
  formatDate (date) {
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    return y + '-' + m + '-' + d
  },
  timestampToTime (timestamp) {
    var date = new Date(timestamp)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = date.getDate()
    // var h = date.getHours() + ':'
    // var m = date.getMinutes() + ':'
    // var s = date.getSeconds()
    return Y + M + D
  }
}
