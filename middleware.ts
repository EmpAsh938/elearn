import { NextRequest, NextResponse } from 'next/server';

// Specify protected and public routes
const protectedRoutes = ['/dashboard', '/admin'];
const publicRoutes = ['/login', '/signup', '/forgot', '/'];

// Function to get session (replace with your own session handling logic)
function getSession(req: NextRequest) {
    const token = req.cookies.get('session')?.value;
    const roles = req.cookies.get('roles')?.value;
    return { token, roles: roles ? JSON.parse(roles) : null }; // Parse roles if necessary
}

function isProtectedRoute(path: string) {
    return protectedRoutes.some(route => path.startsWith(route));
}

function isPublicRoute(path: string) {
    return publicRoutes.includes(path);
}

export default async function middleware(req: NextRequest) {
    const { token, roles } = getSession(req);
    const path = req.nextUrl.pathname;

    // Check if the path matches a protected or public route
    const routeIsProtected = isProtectedRoute(path);
    const routeIsPublic = isPublicRoute(path);

    // Redirect to /login if the user is not authenticated and trying to access a protected route
    if (routeIsProtected && !token) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // Handle authenticated user access to protected routes
    if (routeIsProtected && token) {
        // Check for admin access to /admin
        if (path.startsWith('/admin') && !roles?.includes('ROLE_ADMIN')) {
            return NextResponse.redirect(new URL('/dashboard', req.nextUrl)); // Redirect to /dashboard if not admin
        }

        // Check for normal user access to /dashboard
        if (path.startsWith('/dashboard') && !roles?.includes('ROLE_NORMAL') && !roles?.includes('ROLE_SUBSCRIBED')) {
            return NextResponse.redirect(new URL('/admin', req.nextUrl)); // Redirect to /admin if not normal or subscribed
        }

        // Allow access to protected routes for authenticated users
        return NextResponse.next();
    }

    // Handle redirection for public routes if authenticated
    if (routeIsPublic && token) {
        // Check if the user is an admin
        if (roles?.includes('ROLE_ADMIN')) {
            return NextResponse.redirect(new URL('/admin', req.nextUrl));
        } else {
            return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
        }
    }

    // Allow access to other routes
    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
