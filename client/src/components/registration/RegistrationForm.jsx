import React, {useContext, useState} from "react";
import { FC } from "react";
import {Context} from "../../index";

const RegistrationForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store } = useContext(Context);

  return (
    <div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type={"text"}
        placeholder={"Email"}
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type={"password"}
        placeholder={"password"}
      />
      <button onClick={() => store.registration(email, password)}>Регистрация</button>
    </div>
  );
};

export default RegistrationForm;
