import axios from "axios";

export const signIn = async (email: string, pwd: string) => {
  const response = await axios.post("http://localhost:1337/api/auth/local", {
    "identifier": email,
    "password": pwd
  })

  return response;
}
