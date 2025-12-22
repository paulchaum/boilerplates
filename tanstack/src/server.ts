import handler, { createServerEntry } from '@tanstack/react-start/server-entry'
import logger from './lib/logger'

export default createServerEntry({
	fetch(request) {
		logger.debug({ url: request.url });
		return handler.fetch(request)
	},
})