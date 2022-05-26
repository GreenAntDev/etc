import { Session } from "https://deno.land/x/neo4j_lite_client@4.4.1-preview/mod.ts";
export { Session, Transaction } from "https://deno.land/x/neo4j_lite_client@4.4.1-preview/mod.ts";
export * as Chai from "https://cdn.skypack.dev/chai@4.3.4?dts";

export interface IDictionary {
    [key: string] : any;
}

export interface APIContext {
    tenant: APITenantContext,
    request: APIRequestContext,
    response: APIResponseContext,
    appSettings: IDictionary,
    feature: IFeature,
    utils: APIUtils
}

export interface APITenantContext {
    id: string,
    domain: string,
    db: Session,
    cache: ICache,
    storage: IStorage,
    user: Object
}

export interface APIRequestContext {
    headers: Object
    cookies: IDictionary,
    params: IDictionary,
    data: IDictionary,
    files: Array<APIRequestFiles>
}

export interface APIRequestFiles {
    content: ArrayBuffer,
    filename: string,
    size: number,
    type: string
}

export interface APIUtils {
    createId: () => string,
    createHash: (value: string) => string,
    compareWithHash: (value: string, hash: string) => boolean,
    createSalt: (value: number) => string,
    featureFlag: (ctx: APIContext, flags: string[], func: Function) => Promise<any>
}

export interface APIResponseContext {
    redirect: (url: string, status: number) => Response,
    send: (body: Uint8Array|object|string, init: IDictionary) => Response,
    json: (body: object, status?: number) => Response,
    text: (body: string, status?: number) => Response,
    html: (body: string, status?: number) => Response,
}

export interface TestSuiteContext {
    run: Run,
    assert: Chai.Assert;
    params: IDictionary;
}

export interface Run {
    beforeAllTestCasesTask: () => {},
    afterAllTestCasesTask: () => {},
    beforeEachTestCaseTask: () => {},
    afterEachTestCaseTask: () => {},
    testCase: (name: string, description: string, tags: Array<string>, fn: () => {}) => {}
}

export interface IMessage {
    subject: string,
    data: any
}

export interface IQuery {
    query?: IDictionary,
    fields?: string[]
}

export interface IStorage {
    retrieve: (key: string) => any,
    save: (key: string, value: Uint8Array) => any,
    delete: (key: string) => any
}

export interface ICache {
    get: (key: string) => any,
    set: (key: string, value: any, expires?: number) => any,
    setExpires: (key: string, expires?: number) => undefined,
    remove: (key: string) => any
}

export interface IFeature {
    flag: (obj: IDictionary) => {}
}
