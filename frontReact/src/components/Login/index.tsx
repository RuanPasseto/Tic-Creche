'use client'

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Image from "next/image";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); 

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await fetch(`http://localhost:3000/users?username=${username}`, {
      method: 'GET',
    })
    .then(resposta => resposta.json());

    console.log(resp);

    if (resp.length === 0) {
      alert('Usuário / senha incorretos ');
    } else {
      if (resp[0].password !== password) {
        alert('Usuário / senha incorretos');
      } else {
        router.push("/patrimonio"); 
      }
    }
  };

  return (
    <div className="bg-sky-600 flex items-center justify-center h-screen w-screen">
      <div className="bg-slate-100 p-8 rounded-[40px] drop-shadow-2x1 w-[500px] h-[500px] flex justify-center flex-col items-center">
        <Image src="/logo.jpg" alt="logo" width={150} height={150} className="bg-blend-color-burn" />
        <h2 className="font-light p-4 mb-4 text-4xl"> Login </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <button type="submit" className="w-full bg-zinc-500 text-white font-semibold p-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
