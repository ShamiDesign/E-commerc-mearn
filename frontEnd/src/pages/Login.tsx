import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { BASC_URL } from "../constants/BascURL";
import { useAuth } from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const usenavigat = useNavigate();
  // 1

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // 2 Handling Submit
  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError("Check submited data");
      return;
    }
    // call Api to create user
    const res = await fetch(`${BASC_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!res.ok) {
      setError("This user Allready created befor");
    }

    const token = await res.json();
    if (!token) {
      setError("Data not fount");
      return;
    }

    login(email, token);
    usenavigat("/");
    console.log(token);
  };

  return (
    <section className="flex  flex-col gap-4 px-14 pt-10 items-center">
      <h1 className="text-[40px] font-semibold mb-2">RegisterPage</h1>
      <div className="form flex flex-col gap-5 border border-gray-300 rounded shadow w-[500px] px-6 py-8 mb-10">
        <div className="flex flex-col gap-5">
          <TextField
            id="outlined-basic"
            label="user Name"
            name="email"
            variant="outlined"
            inputRef={emailRef}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            name="password"
            variant="outlined"
            inputRef={passwordRef}
          />
        </div>
        <div className="w-full ">
          <Button onClick={onSubmit} variant="contained" className="w-full">
            Login
          </Button>
        </div>
        {error && (
          <h3 className="text-red-500 font-semibold text-center">{error}</h3>
        )}
      </div>
    </section>
  );
};

export default RegisterPage;
