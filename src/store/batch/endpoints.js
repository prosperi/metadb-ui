import { put } from '../api'

export function batchUpdates ({search, updates}) {
	const path = '/batch_edits.json'
	const payload = {
		update_type: 'update',
		search,
		updates,
	}

	return put(path, payload)
}
