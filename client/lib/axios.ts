import { GetAuthToken } from './auth'

export const AxiosConfig = {
  headers: {
    Authorization: `Bearer ${GetAuthToken()}`,
  },
}
