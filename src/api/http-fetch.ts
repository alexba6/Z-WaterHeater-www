
import { HttpApiSchema } from './http-schema'
import { AuthKey, AuthToken } from './type'

type PickDefined<T> = Pick<T, {[K in keyof T]: T[K] extends undefined ? never : K }[keyof T]>


type EndpointParameters<Endpoint, ParamsType extends string> =  Endpoint extends {parameters: Record<ParamsType, object>} ? Endpoint['parameters'][ParamsType] : undefined
type RequestBody<Endpoint, BodyType extends string='json'> = Endpoint extends {requestBody: Record<BodyType, object>} ? Endpoint['requestBody'][BodyType] : undefined
type RequestAuth<Endpoint> = Endpoint extends {auth: object} ? Endpoint['auth'] : undefined
type RequestToken<Endpoint> = Endpoint extends {token: object | string} ? Endpoint['token'] : undefined

type FetchOptions<Method, Query, Params, Json, Auth, Token> =
    RequestInit &
    {
        method: Method
    } &
    PickDefined<{
        query: Query,
        params: Params,
        json: Json,
        auth: Auth,
        token: Token
    }>


type SuccessResponse<Endpoint> = Endpoint extends {response: object} ? Endpoint['response'][keyof Endpoint['response']]: null


class FetchApi {
    private request: Response | undefined = undefined
    async query <Path extends keyof HttpApiSchema, Method extends keyof HttpApiSchema[Path]>(path: Path, options: FetchOptions<
        Method,
        EndpointParameters<HttpApiSchema[Path][Method], 'query'>,
        EndpointParameters<HttpApiSchema[Path][Method], 'path'>,
        RequestBody<HttpApiSchema[Path][Method]>,
        RequestAuth<HttpApiSchema[Path][Method]>,
        RequestToken<HttpApiSchema[Path][Method]>
        >) : Promise<SuccessResponse<HttpApiSchema[Path][Method]>> {
        let url = String(path)

        const o = {
            ...options,
            headers: {},
            mode: 'cors',
            cache: 'default'
        } as RequestInit & {
            json?: object
            headers: Record<string, string>
            query?: Record<string, any>
            params?: Record<string, any>
            auth?: AuthKey,
            token?: AuthToken
        }

        const params = o.params
        const query = o.query
        const auth = o.auth
        const token = o.token

        if (o.json) {
            o.body = JSON.stringify(o.json)

        }

        if(query) {
            const params = new URLSearchParams()
            Object.keys(query).forEach((k: string) => {
                if (query[k] !== undefined) {
                    params.set(k, query[k])
                }
            })
            url += `?${params.toString()}`
        }

        if(auth) {
            o.headers['Authorization-key'] = auth.key
            o.headers['Authorization-keyId'] = String(auth.keyId)
        }

        if (token) {
            o.headers['Authorization'] = token.token
        }

        if (params) {
            Object.keys(params).forEach(
                (k) => (url = url.replace(`{${k}}`, params[k]))
            )
        }

        this.request = await fetch(url, o)
        if (this.request.status >= 200 && this.request.status < 300) {
            return (await this.request.json())
        }
        throw Error('Bad request !')
    }

    get status() : number | undefined {
        if (this.request) {
            return this.request.status
        }
        return undefined
    }

    async error() : Promise<string | undefined> {
        if (this.request) {
            const json = await this.request.json()
            return json?.error
        }
    }
}

export default FetchApi
