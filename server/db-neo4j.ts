import type { Session, Driver } from "https://deno.land/x/neo4j_lite_client@4.4.1-preview2/mod.ts";    
import neo4j from "https://deno.land/x/neo4j_lite_client@4.4.1-preview2/mod.ts";    
import * as log from "https://deno.land/std@0.142.0/log/mod.ts";

let conn: Driver;

export const createInstance = async (tenant: any) : Promise<Session|null> => {
    try {
        const hostname = tenant.tenantConfig.appSettings.dbHostname;
        const database = tenant.tenantConfig.appSettings.dbDatabase;
        const username = tenant.tenantConfig.appSettings.dbUsername;
        const password = tenant.tenantConfig.appSettings.dbPassword;
        if (!conn) {
            const authToken = neo4j.auth.basic(username, password);
            conn = neo4j.driver(hostname, authToken);
        }
        const session = conn.session({ database });
        return session;
    }
    catch(e) {
        log.error(`Could not create a database session: neo4j`, e.message);
        return null;
    }
}
