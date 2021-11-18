import { USER_TOKEN } from './auth'

const COOKIE_DELIMITER = '; '

export const SetCookie = (token: string) => {
  const cookies = document.cookie
    .split(COOKIE_DELIMITER)
    .map((value) => value.split('='))

  console.log({
    cookies,
  })
}
