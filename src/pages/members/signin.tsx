import axios from "axios";
import {NextPage} from "next"
import { useState } from "react";
import { signIn } from "../../utils/auth";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

const SignInPage: NextPage = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [cookies, setCookie] = useCookies(["jwt"]);
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value);
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await signIn(email, pwd);

    setCookie("jwt", `${response.data.jwt}`, { path: '/'}); // document.cookie = `jwt=Bearer ${response.data.jwt}; Path=/`;
    
    router.push('/posts/')

  // 유저 정보 확인
  //   const userData = axios.get("http://localhost:1337/api/users/me", {
  //     headers: {
  //       Authorization: `Bearer ${response.data.jwt}`
  //     }
  //   })

  //   console.log(userData);
  }

  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="uid">
            이메일
          </label>
          <input
            type="email"
            placeholder="admin@techhtml.com"
            id="uid"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">
            비밀번호
          </label>
          <input
            type="password"
            placeholder="******"
            id="pwd"
            value={pwd}
            onChange={handlePwdChange}
          />
        </div>
        <button>로그인</button>
      </form>
    </div>
  )
}

export default SignInPage