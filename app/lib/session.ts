import 'server-only'
import { cookies } from 'next/headers'

type CookiesType = "session" | "roles";

export async function createSession(token: string, roles: string[]) {
    const expiresAt = new Date(Date.now() + 6 * 60 * 60 * 1000)
    cookies().set('session', token, {
        httpOnly: false,
        secure: false,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })

    // Store user role information in another cookie (optional)
    cookies().set('roles', JSON.stringify(roles), {
        httpOnly: false, // Accessible from the client
        secure: false,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

export async function updateRole(roles: string[]) {
    const expiresAt = new Date(Date.now() + 6 * 60 * 60 * 1000)


    // Store user role information in another cookie (optional)
    cookies().set('roles', JSON.stringify(roles), {
        httpOnly: false, // Accessible from the client
        secure: false,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

export function getSession(type: CookiesType) {
    return cookies().get(type);
}

export function deleteSession() {
    cookies().set('session', '', { expires: new Date(0), path: '/' });
    cookies().set('roles', '', { expires: new Date(0), path: '/' });
}