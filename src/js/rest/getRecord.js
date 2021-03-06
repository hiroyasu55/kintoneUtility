import createError from './common/createError'
import errors from '!json!./resource/errorMessages.json'
import sendRequest from './common/sendRequest'

/** Function: getRecord
 *  @param {object} params
 *  @param {number} params.app
 *  @param {number} params.id
 *  @param {boolean} params.isGuest
 *
 *  @return {object} result
 */
export default (params) => {
    'use strict'
    if (!(params && params.app)) {
        return createError(errors.required.app)
    } else if (!(params && params.id)) {
        return createError(errors.required.id)
    }

    let param = {
        app: params.app,
        id: params.id
    }
    let isGuest = (params.isGuest) ? true : false

    return sendRequest('/k/v1/record', 'GET', param, isGuest)
}
