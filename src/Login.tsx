import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const LoginComponent = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin: React.FormEventHandler<HTMLFormElement> = async event => {
    try {
      event.preventDefault();
      await axios.post('/sessao/criar', {
        email,
        senha: password,
      });
      navigate('/despesas');
    } catch (error) {
      alert('Usuário ou senha inválidos');
    }
  };

  const verifySession = async () => {
    try {
      await axios.get('/sessao/usuario');
      navigate('/despesas');
    } finally {
      // do nothing
    }
  };

  useEffect(() => {
    verifySession();
  }, []);

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
