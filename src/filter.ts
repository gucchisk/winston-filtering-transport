import Transport = require('winston-transport')

export interface FilterResult {
  transporting: any,
  filtering: any
}

export type FilterFunc = (info: any, next: (() => void) | null) => FilterResult

export class TransportFilter {
  transport: Transport
  filterFunc: FilterFunc | null
  constructor(transport: Transport, filterFunc: FilterFunc | null) {
    this.transport = transport
    this.filterFunc = filterFunc
  }

  public doFilter(info: any): any {
    if (this.filterFunc === null) {
      this.transport.log(info, null)
      return info
    }
    const result = this.filterFunc(info, null)
    if (result.transporting !== null) {
      this.transport.log(info, null)
    }
    return result.filtering
  }
}

export class NoFilter extends TransportFilter {
  constructor(transport: Transport) {
    super(transport, null)
  }
}
