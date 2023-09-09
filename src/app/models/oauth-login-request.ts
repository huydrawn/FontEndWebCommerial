export class OauthLoginRequest {
    provideRegisteration: string;
    accessToken: string;
    expriedAt: number;

    constructor(provideRegisteration: string,
        accessToken: string,
        expriedAt: number) {
            this.provideRegisteration = provideRegisteration;
            this.accessToken = accessToken;
            this.expriedAt = expriedAt;
    }
}
