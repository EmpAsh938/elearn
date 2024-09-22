import 'server-only'
import { cookies } from 'next/headers'

export async function createSession(token: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    return cookies().set('session', token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export function getSession() {
    return cookies().get('session')
}

export function deleteSession() {
    cookies().delete('session')
}