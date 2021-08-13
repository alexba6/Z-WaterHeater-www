import FetchApi from '../../api/http-fetch'

import { StoreState, StoreDispatch } from '../index'

import { keyManager } from '../../tools/authKey'
import {OutputGroup, OutputGroupWithoutId} from "../../type/outputGroup";

export const loadOutputGroup = (forceReload: boolean=false) => {
    return async (dispatch: StoreDispatch, getState: StoreState) => {
        if (forceReload || getState().outputGroups.status !== ('READY' || 'PENDING')) {
            dispatch({
                type: 'outputGroup/status',
                status: 'PENDING',
                error: null
            })
            const request = new FetchApi()
            try {
                const dataOutputGroups = await request.query('/api/out-group', {
                    method: 'get',
                    auth: keyManager.key
                })
                dispatch({
                    type: 'outputGroup/load',
                    outputGroups: dataOutputGroups.outGroups
                })
            }
            catch (e) {
                dispatch({
                    type: 'outputGroup/status',
                    status: 'ERROR',
                    error: {
                        type: 'ERROR_LOAD',
                        message: String(await request.error())
                    }
                })
            }
        }
    }
}

export const deleteOutputGroup = (outputGroup: OutputGroup) => {
    return async (dispatch: StoreDispatch) => {
        dispatch({
            type: 'outputGroup/status',
            status: 'PENDING'
        })
        const request = new FetchApi()
        await request.query('/api/out-group/{groupId}', {
            method: 'delete',
            auth: keyManager.key,
            params: {
                groupId: outputGroup.id
            }
        })
        dispatch({type: 'outputGroup/delete', outputGroup})
        dispatch({
            type: 'outputGroup/status',
            status: 'READY'
        })
    }
}

export const updateOutputGroup = (outputGroups: Array<OutputGroup>) => {
    return async (dispatch: StoreDispatch) => {
        dispatch({
            type: 'outputGroup/status',
            status: 'PENDING'
        })
        const request = new FetchApi()
        for (const outputGroup of outputGroups) {
            await request.query('/api/out-group/{groupId}', {
                method: 'put',
                auth: keyManager.key,
                params: {
                    groupId: outputGroup.id
                },
                json: {
                    ...outputGroup
                }
            })
            dispatch({
                type: 'outputGroup/update',
                outputGroup: outputGroup
            })
            dispatch({
                type: 'outputGroup/status',
                status: 'READY'
            })
        }
    }
}

export const addOutputGroup = (outputGroup: OutputGroupWithoutId) => {
    return async (dispatch: StoreDispatch) => {
        dispatch({
            type: 'outputGroup/status',
            status: 'PENDING'
        })
        const request = new FetchApi()
        const newOutputGroup = await request.query('/api/out-group', {
            method: 'post',
            auth: keyManager.key,
            json: { ...outputGroup }
        })
        dispatch({ type: 'outputGroup/add', outputGroup: newOutputGroup.group })
        dispatch({
            type: 'outputGroup/status',
            status: 'READY'
        })
    }
}