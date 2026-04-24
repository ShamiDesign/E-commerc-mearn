import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { BASC_URL } from "../constants/BascURL";

const RegisterPage = () => {
  const [error, setRerror] = useState("");
  // 1
  const firtsNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // 2 Handling Submit
  const onSubmit = async () => {
    const firstName = firtsNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // call Api to create user
    const res = await fetch(`${BASC_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });
    if (!res.ok) {
      setRerror("This user Allready created befor");
    }

    const data = await res.json();
    console.log(data);
  };

  return (
    <section className="flex  flex-col gap-4 px-14 pt-10 items-center">
      <h1 className="text-[40px] font-semibold mb-2">RegisterPage</h1>
      <div className="form flex flex-col gap-5 border border-gray-300 rounded shadow w-[500px] px-6 py-8 mb-10">
        <div className="flex flex-col gap-5">
          <TextField
            id="outlined-basic"
            label="First Name"
            name="firstName"
            variant="outlined"
            inputRef={firtsNameRef}
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            name="lastName"
            variant="outlined"
            inputRef={lastNameRef}
          />
          <TextField
            id="outlined-basic"
            label="email"
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
            Submit
          </Button>
        </div>
        {error && <h3 className="text-red-500 font-semibold text-center">{error}</h3>}
      </div>
    </section>
  );
};

export default RegisterPage;
