import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useLoginContainer = () => {
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

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  }
}