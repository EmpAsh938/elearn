import { NextRequest, NextResponse } from 'next/server'
import { getSession } from './app/lib/session'

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/admin']
const publicRoutes = ['/login', '/signup', '/forgot', '/']

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    // 3. Decrypt the session from the cookie
    const token = getSession();


    // 4. Redirect to /login if the user is not authenticated
    if (isProtectedRoute) {
        if (!token) {
            // No token found, redirect to login
            return NextResponse.redirect(new URL('/login', req.nextUrl))
        }

    }



    // 5. Redirect to /dashboard if the user is authenticated
    if (
        isPublicRoute &&
        token
    ) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}