import axios from "axios"
import {useDispatch} from "react-redux"
import {setCredentials} from "../store/slices/authSlice"

const BASE_URL = "https://jsonplaceholder.typicode.com"

export const useApiService = () => {
  const fetchData = async endpoint => {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`)
      return {
        success: true,
        data: response.data,
        error: null,
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message || "Something went wrong",
      }
    }
  }

  const dispatch = useDispatch()

  const loginUser = async credentials => {
    try {
      const response = await api.post("/login", credentials)
      const {user, token} = response.data

      // Dispatch to Redux store
      dispatch(setCredentials({user, token}))

      return response.data
    } catch (error) {
      throw error
    }
  }

  return {fetchData, loginUser}
}
