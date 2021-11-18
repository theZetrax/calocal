import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, _ev: NextFetchEvent) {
  const response = NextResponse.next()

  console.log('Status', response.status)

  return response
}
