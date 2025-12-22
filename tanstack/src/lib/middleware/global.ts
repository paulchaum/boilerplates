import { createStart } from '@tanstack/react-start'
import { logMiddleware } from './logging'

export const startInstance = createStart(() => {
	return {
		functionMiddleware: [logMiddleware],
	}
})