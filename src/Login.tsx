import React, { useState } from 'react';

export const LoginComponent = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    console.log('juliaEmail', event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    console.log('juliaSenha', event.target.value);
  };

  const handleLogin = () => {
    // Perform login logic here
  };

  return (
    <div>
      <h2>Login</h2>
      <span>Digite os seus dados de acesso nos campos abaixo.</span>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          placeholder="meuemail@email.com.br"
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          placeholder="******"
          onChange={handlePasswordChange}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
