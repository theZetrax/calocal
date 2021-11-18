export const USER_TOKEN = 'user-token'

export const GetAuthToken = () => {
  return localStorage.getItem(USER_TOKEN) || undefined
}
