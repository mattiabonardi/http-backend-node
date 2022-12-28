import { TokenData } from "../../src/types/authentication.js";
import { createAccessToken, createRefreshToken, verifyAccessToken, verifyRefreshToken } from "../../src/managers/token.js";

describe("Token manager", () => {
    it("Check access token", () => {
        const tokenData: TokenData = {
            sessionId: "xxxx-xxxx-xxxx-xxxx",
            username: "admin"
        }
        const token = createAccessToken(tokenData);
        expect(token.length > 50);

        const tokenDataReturned = verifyAccessToken(token);
        expect(tokenData).toStrictEqual(tokenDataReturned)
    });

    it("Check refresh token", () => {
        const tokenData: TokenData = {
            sessionId: "xxxx-xxxx-xxxx-xxxx",
            username: "admin"
        }
        const token = createRefreshToken(tokenData);
        expect(token.length > 50);

        const tokenDataReturned = verifyRefreshToken(token);
        expect(tokenData).toStrictEqual(tokenDataReturned)
    });
});