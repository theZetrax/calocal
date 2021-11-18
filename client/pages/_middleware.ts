import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { setUserCookie } from '@lib/auth'

export function middleware(req: NextRequest, _ev: NextFetchEvent) {
  const response = setUserCookie(req, NextResponse.next())

  console.log({
    response,
  })

  return response
}
