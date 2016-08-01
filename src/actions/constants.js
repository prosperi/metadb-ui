// just-in-case these ever change
export const COLLECTION = 'COLLECTION'
export const SCHEMA = 'SCHEMA'
export const WORK = 'WORK'
export const VOCABULARY = 'VOCABULARY'

// sufia constants
export const SUFIA_COLLECTION_PATH = 'collection'
export const SUFIA_WORK_PATH = 'generic_works'

// actions!
export const ADD_EMPTY_VALUE = 'ADD_EMPTY_VALUE'
export const ADD_WORK_VALUE_FIELD = `ADD_${WORK}_VALUE_FIELD`

// `CLEAR` removes all vocabularies. `CLEAR_VOCABULARIES`
// is grammatically accurate. 
export const CLEAR_VOCABULARY = `CLEAR_${VOCABULARY}`
export const CLEAR_VOCABULARIES = CLEAR_VOCABULARY

export const COLLECTION_CHANGE = `${COLLECTION}_CHANGE`

export const FETCH_COLLECTION = `FETCH_${COLLECTION}`
export const FETCH_ERROR = 'FETCH_ERROR'
export const FETCH_SCHEMA = `FETCH_${SCHEMA}`
export const FETCH_VOCABULARY = `FETCH_${VOCABULARY}`
export const FETCH_WORK = `FETCH_${WORK}`
export const FETCHING = 'FETCHING'

export const HAS_VOCABULARY = `HAS_${VOCABULARY}`

export const RECEIVED = 'RECEIVED'
export const RECEIVE_COLLECTION = `RECEIVE_${COLLECTION}`
export const RECEIVE_SCHEMA = `RECEIVE_${SCHEMA}` 
export const RECEIVE_VOCABULARY = `RECEIVE_${VOCABULARY}`
export const RECEIVE_WORK = `RECEIVE_${WORK}`

export const REMOVE_ERROR = `REMOVE_ERROR`
export const REMOVE_VALUE = 'REMOVE_VALUE'
export const REMOVE_VOCABULARY = `REMOVE_${VOCABULARY}`
export const REMOVE_WORK = `REMOVE_${WORK}`
export const REMOVE_WORK_VALUE_FIELD = `REMOVE_${WORK}_VALUE_FIELD`

export const SAVE_COLLECTION_CHANGES = `SAVE_${COLLECTION}_CHANGES`
export const SAVE_WORK_CHANGES = `SAVE_${WORK}_CHANGES`

export const WORK_CHANGE = `${WORK}_CHANGE`
