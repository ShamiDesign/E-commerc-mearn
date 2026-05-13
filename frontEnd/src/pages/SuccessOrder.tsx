import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const SuccessOrder = () => {
    const usenavigat = useNavigate();
    const handelGoToHome = () => {
        usenavigat("/");

    }
  return (
    <section className=" flex flex-col gap-6 justify-center items-center  mt-20 ">
        <h1 className="text-green-800 font-semibold text-6xl ">Success Order
        </h1>
        <Button onClick={handelGoToHome} variant="outlined" size="large">Go To Home</Button>
        </section>
  )
}

export default SuccessOrder