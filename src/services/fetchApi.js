import axios from "axios";
const baseUrl = "https://api.themoviedb.org/3/"
const token = process.env.REACT_APP_TMDB_TOKEN || '';

let headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json;charset=utf-8'
}
const fetchApi = (data) => {
  return axios.get(
    `${baseUrl}${data.path}`, 
    { 
      headers,
      params : data?.params
    }
  )
}
export const postFetchApi = (data) => {
  return axios.post( 
    `${baseUrl}${data.path}`,
    data?.params,
    {
      headers,
    }
  )
}
export default fetchApi