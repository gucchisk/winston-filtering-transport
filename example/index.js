const { FilteringTransport, TransportFilter, NoFilter } = require('winston-filtering-transport')
const { createLogger, transports } = require('winston')

const logger = createLogger({
  transports: [
    new FilteringTransport({
      filters: [
	new TransportFilter(new transports.Console(), (info, f) => {
	  return {
	    transporting: info,
	    filtering: info
	  }
	}),
	new NoFilter(new transports.Console())
      ]
    })
  ]
})


logger.info('hello')
