import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Toggle from 'react-toggle';
import { Helmet } from 'react-helmet';

import api from '../../services/api';
import { useTheme } from '../../hooks/theme';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error, Header } from './style';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });

  const { changeTheme, theme } = useTheme();

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite autor/nome do repositório.');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo} `);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse repositório.');
    }
  }

  function handleThemeChange(): void {
    changeTheme();
  }

  return (
    <>
      <Helmet>
        <style>
          {theme === 'dark' && 'body { background-color: #2f3136; }'}
        </style>
      </Helmet>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Toggle
          icons={false}
          defaultChecked={theme !== 'dark'}
          onChange={handleThemeChange}
        />
      </Header>
      <Title theme={theme}>Explore repositórios do Github</Title>

      <Form
        theme={theme}
        hasError={!!inputError}
        onSubmit={handleAddRepository}
      >
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories theme={theme}>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`/repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />

            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
