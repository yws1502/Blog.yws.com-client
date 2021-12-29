import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => {
  const JWT = document.cookie.split(" ").filter((key) => {
    if (key.match("jwt") !== null) return key
  }).join("").replace("jwt=", "")

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${JWT}`
    }
  }).then(res => res.data)
}

export const useMember = () => {
  const { data, error} = useSWR("http://localhost:1337/api/users/me", fetcher)

  return {
    loggedIn: !!data, // 데이터를 했는지 안했는지 확인
    userData: data
  }
}
