import { AuthKey } from '../api/type'
import FetchApi from '../api/http-fetch'

export class Key {
    private _authKey: AuthKey

    constructor() {
        this._authKey = Key.keyStorage
    }

    set key(authKey: AuthKey) {
        this._authKey = authKey
        Key.keyStorage = authKey
    }

    removeKey() {
        this.key = {
            keyId: '',
            key: ''
        }
}

    get key(): AuthKey {
        return this._authKey
    }

    static set keyStorage(authKey: AuthKey) {
        localStorage.setItem('keyId', authKey.keyId)
        localStorage.setItem('key', authKey.key)
    }

    static get keyStorage(): AuthKey {
        const keyId = localStorage.getItem('keyId')
        const key = localStorage.getItem('key')

        return {
            keyId: keyId ? keyId : '',
            key: key ? key : ''
        }
    }

    async renewAndSaveKey() {
        const request = new FetchApi()
        this._authKey = await request.query('/api/auth/key-renew', {
            method: 'post',
            auth: this._authKey,
        })
    }
}

export const keyManager = new Key()
