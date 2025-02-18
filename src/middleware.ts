import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - docs (FastAPI Swagger docs)
     * - openapi.json (FastAPI OpenAPI schema)
     * - api/* (API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|docs|openapi.json|api/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}