import Transport = require('winston-transport')
import { TransportFilter } from './filter'

export class FilteringTransport extends Transport {
  filters: TransportFilter[]
  constructor(opts) {
    super(opts)
    this.filters = opts.filters
  }

  log(info, callback) {
    let currentInfo = info
    for (let i = 0; i < this.filters.length; i++) {
      currentInfo = this.filters[i].doFilter(info)
      if (currentInfo === false) {
        return false
      }
    }
    return info
  }
}
