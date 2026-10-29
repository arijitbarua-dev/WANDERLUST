import { headers } from "next/headers";
import { auth } from "./auth";

export const getTokenFromServer = async () => {
    const jwtToken = await auth.api.getToken({
        headers: await headers(),
    });

    const token = `Beear ${jwtToken?.token}`;

    return token;
}