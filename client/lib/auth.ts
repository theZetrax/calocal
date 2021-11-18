import type { NextResponse, NextRequest } from 'next/server'

export const USER_TOKEN = 'user-token'

export const setUserCookie = (request: NextRequest, response: NextResponse) => {
  const cookie = request.cookies[USER_TOKEN]

  // If cookie is not found
  // Set the cookie
  if (!cookie) {
    response.cookie(USER_TOKEN, cookie, { httpOnly: true })
  }

  // Passing the response
  return response
}
