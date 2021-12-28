import axios from "axios";
import {NextPage} from "next"
import { useState } from "react";
import { signIn } from "../../utils/auth";
const SignInPage: NextPage = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value);
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await signIn(email, pwd);
    console.log(response)

    document.cookie = `jwt=Bearer ${response.data.jwt}; Path=/`


    // 아래처럼하기 싫으면 async, await 하자!
    // signIn(email, pwd).then((res) => {
    //   console.log(res)
    // })
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