import createError from './common/createError'
import errors from '!json!./resource/errorMessages.json'
import deleteRecords from './deleteRecords'
import sliceArray from './common/sliceArray'
import limit from '!json!./resource/limit.json'

/** Function: deleteAllRecords
 *   Can delete over 2000 records, but can't do rollback.
 *  @param {object} params
 *  @param {number} params.app
 *  @param {array} params.ids
 *  @param {boolean} params.isGuest
 *
 *  @return {object} result
 */
export default (params) => {
    'use strict'
    if (!(params && params.app)) {
        return createError(errors.required.app)
    } else if (!Array.isArray(params.ids)) {
        return createError(errors.shouldBeArray.ids)
    } else if (params.ids && params.ids.length < 1) {
        return createError(errors.emptyArray.ids)
    }

    let results = []

    let deleteAll = (begin) => {
        begin = begin || 0
        let isGuest = (params.isGuest) ? true : false
        let param = {
            app: params.app,
            ids: sliceArray(params.ids, begin),
            isGuest: isGuest
        }

        return deleteRecords(param).then((response) => {
            results = results.concat(response.results)
            begin += limit.bulk
            if (params.ids.length <= begin) {
                return {
                    results: results
                }
            }
            return deleteAll(begin)
        })
    }

    return deleteAll()
}
