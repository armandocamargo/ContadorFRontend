import React, { useState, useEffect } from 'react';
import api from '../api/api';
import styled from 'styled-components';
import { FaEye, FaEyeSlash, FaPlus } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem;
  background-color: #f0f0f0;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const AddButton = styled.button`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 10;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;

  &:hover {
    color: #007BFF;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    border-color: #007BFF;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
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

const DashboardPage = () => {
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCliente, setNewCliente] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    endereco: '',
    senhaGovBr: '',
    dataNascimento: ''
  });

  useEffect(() => {
    const fetchClientes = async () => {
      const response = await api.get('/clientes');
      setClientes(response.data);
    };
    fetchClientes();
  }, []);

  const handleClienteClick = (cliente) => {
    setSelectedCliente(selectedCliente?.id === cliente.id ? null : cliente);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCliente({
      ...newCliente,
      [name]: value,
    });
  };

  const handleAddCliente = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/clientes', newCliente);
      setClientes([...clientes, response.data]);
      alert('Cliente adicionado com sucesso!');
      setIsModalOpen(false);
      setNewCliente({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        endereco: '',
        senhaGovBr: '',
        dataNascimento: ''
      });
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
      alert('Ocorreu um erro ao adicionar o cliente.');
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <h1 style={{ color: '#007BFF', fontFamily: 'Poppins, sans-serif' }}>Clientes</h1>
      <ClienteList>
        {clientes.map((cliente) => (
          <ClienteItem key={cliente.id} onClick={() => handleClienteClick(cliente)}>
            {cliente.nome}
          </ClienteItem>
        ))}
      </ClienteList>
      
      <AddButton onClick={handleOpenModal}>
        <FaPlus />
      </AddButton>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <h2>Adicionar Novo Cliente</h2>
            <Form onSubmit={handleAddCliente}>
              <Input
                type="text"
                name="nome"
                placeholder="Nome"
                value={newCliente.nome}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="cpf"
                placeholder="CPF"
                value={newCliente.cpf}
                onChange={handleInputChange}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={newCliente.email}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="telefone"
                placeholder="Telefone"
                value={newCliente.telefone}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="endereco"
                placeholder="Endereço"
                value={newCliente.endereco}
                onChange={handleInputChange}
              />
              <Input
                type="password"
                name="senhaGovBr"
                placeholder="Senha do Gov BR"
                value={newCliente.senhaGovBr}
                onChange={handleInputChange}
              />
              <Input
                type="date"
                name="dataNascimento"
                value={newCliente.dataNascimento}
                onChange={handleInputChange}
              />
              <Button type="submit">Adicionar Cliente</Button>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

const ClienteList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ClienteItem = styled.li`
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #007BFF;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }
`;

export default DashboardPage;
