import React from "react";
import { useLoginContainer } from "./hooks/useLoginContainer";

export const LoginComponent = (): React.JSX.Element => {
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  } = useLoginContainer();

  return (
    <div>
      <h2>Login</h2>
      <span>Digite os seus dados de acesso nos campos abaixo.</span>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            placeholder="meuemail@email.com.br"
            onChange={handleEmailChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            placeholder="******"
            onChange={handlePasswordChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
