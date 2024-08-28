import type { NextRequest } from 'next/server'
import { NextResponse } from "next/server"

export function middleware(req: NextRequest) {
    const privateRoutes: string[] = ['/profile', '/favorites']
    const token = req.cookies.get('nextauth.token')?.value;
    const { origin } = req.nextUrl

    const route = req.nextUrl.pathname;
    if (privateRoutes.includes(route) || route.startsWith('/edit')) {
        if (!token) {
            return NextResponse.redirect(`${origin}/signin`)
        }
    }

    const response = NextResponse.next()
    return response;
}

export const config = {
    matcher: ['/profile', '/favorites', '/edit/post/:id*', '/', '/signin', '/signup', '/post/:slug*']
}