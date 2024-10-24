import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f0f0f0 0%, #c9d6ff 100%);
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  transition: box-shadow 0.3s ease;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  &:hover {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007BFF;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.8rem;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
  font-size: 0.9rem;
`;

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ login: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(''); // Estado para armazenar o erro
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', credentials);
      console.log('Login response:', response.data);
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        setErrorMessage('Usuário ou senha inválidos.'); // Definindo mensagem de erro
      } else if (error.request) {
        setErrorMessage('Erro ao se conectar com o servidor. Tente novamente.');
      } else {
        setErrorMessage('Ocorreu um erro inesperado. Tente novamente.');
      }
    }
  };

  return (
    <Container>
      <LoginBox>
        <h2 style={{ fontFamily: 'Poppins, sans-serif', color: '#007BFF' }}>Login</h2>
        <form onSubmit={handleLogin}>
          <Input
            type="text"
            name="login"
            placeholder="Email ou CPF"
            value={credentials.login}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            value={credentials.password}
            onChange={handleChange}
          />
          <Button type="submit">Entrar</Button>
        </form>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>} {/* Renderizar erro */}
      </LoginBox>
    </Container>
  );
};

export default LoginPage;
