import axios from "axios";
import { Input, TextType } from "@/components/common/Input";
import { Button, BtnType } from "@/components/common/Button";

export default async function Page() {
  // const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/SignUp/api`);

  // console.log("data: ", res.data);

  return (
    <div className="mt-24">
      <form name="handleEmailAuth">
        <div className="flex-col">
          <input type="text" name="name" placeholder="John" />
          <input type="password" name="password" />
          <input type="password" name="confirmPassword" />
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
