// // middleware.js
// import { NextResponse } from 'next/server'

// export function middleware(request) {
//     const { pathname } = request.nextUrl

//     // Define allowed paths - these are the ONLY pages users can access
//     const allowedPaths = [
//         '/courses/gravitation-basics',
//         '/quiz/universal-gravitation',
//         '/simulation'
//     ]

//     // Always allow Next.js internal routes and static files
//     if (
//         pathname.startsWith('/_next') ||
//         pathname.startsWith('/api') ||
//         pathname.startsWith('/favicon.ico') ||
//         pathname.startsWith('/_vercel') ||
//         pathname.includes('.')  // Allow static files like .css, .js, .png, etc.
//     ) {
//         return NextResponse.next()
//     }

//     // Check if the current path is in the allowed paths
//     if (allowedPaths.includes(pathname)) {
//         return NextResponse.next()
//     }

//     // Block ALL other paths and redirect to /courses/gravitation-basics
//     console.log(`Blocking access to: ${pathname}, redirecting to /courses/gravitation-basics`)
//     return NextResponse.redirect(new URL('/courses/gravitation-basics', request.url))
// }

// export const config = {
//     matcher: [
//         /*
//          * Match ALL request paths except static files and API routes
//          */
//         '/((?!_next/static|_next/image|favicon.ico|api).*)',
//     ],
// }