'use client'

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { NavBar } from '@/components/SideBar';

interface Funcionario {
  id: number;  
  nome: string;
  email: string;
  senha: string;
}

export default function CadastroFuncionario() {
  const [funcionario, setFuncionario] = useState<Funcionario>({
    id: 0, 
    nome: '',
    email: '',
    senha: '',
  });

  const [funcionariosCadastrados, setFuncionariosCadastrados] = useState<Funcionario[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFuncionario({ ...funcionario, [name]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(funcionario),
      });

      if (response.ok) {
        console.log('Funcionário cadastrado:', funcionario);
        setFuncionario({
          id: 0,
          nome: '',
          email: '',
          senha: '',
        });
        fetchFuncionariosCadastrados();
      } else {
        console.error('Erro ao cadastrar funcionário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error);
    }
  };

  const handleExcluirFuncionario = async (id: number) => {
    try {
      if (!id) {
        console.error('ID do funcionário não fornecido para exclusão.');
        return;
      }

      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Funcionário excluído:', id);
        fetchFuncionariosCadastrados();
      } else {
        console.error('Erro ao excluir funcionário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir funcionário:', error);
    }
  };

  const fetchFuncionariosCadastrados = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      if (response.ok) {
        const data = await response.json();
        setFuncionariosCadastrados(data);
      } else {
        console.error('Erro ao obter lista de funcionários:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao obter lista de funcionários:', error);
    }
  };

  useEffect(() => {
    fetchFuncionariosCadastrados();
  }, []);

  return (
    <>
      <NavBar />

      <div className='bg-neutral-200 min-h-full'>
        <main className="container col-md-10 mb-4 bg-neutral-200">
          <div className=" " >
            <div className="flex items-center">
              <div className="col-md-8 justify-center">
                <form id="patrimonioForm" onSubmit={handleSubmit}>
                  <div className="form-group justify-center flex flex-col mt-32">
                    <h3 className='text-3xl'>Cadastro de Funcionarios</h3>

                    <label htmlFor="nome">Nome do Funcionario:</label>
                    <input
                      type="text"
                      className="px-[6] py-[12] bg-slate-300 rounded-md hover:bg-slate-400"
                      id="nome"
                      name="nome"
                      value={funcionario.nome}
                      onChange={handleInputChange}
                      required
                    />

                    <label htmlFor="email">Email do Funcionario:</label>
                    <input
                      type="text"
                      className="px-[6] py-[12] bg-slate-300 rounded-md hover:bg-slate-400"
                      id="email"
                      name="email"
                      value={funcionario.email}
                      onChange={handleInputChange}
                      required
                    />

                    <label htmlFor="senha">Senha:</label>
                    <input
                      type="password"
                      className="px-[6] py-[12] bg-slate-300 rounded-md hover:bg-slate-400"
                      id="senha"
                      name="senha"
                      value={funcionario.senha}
                      onChange={handleInputChange}
                      required
                    />
                    <button type="submit" className="bg-sky-500 mt-4 rounded-lg p-2 text-zinc-50 hover:bg-sky-700" id="salvarButton">
                      Cadastrar
                    </button>
                  </div>
                </form>

                <div className="mt-8">
                  <h3 className="text-3xl">Funcionários Cadastrados</h3>
                  <table className="table-auto w-full mt-4">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Nome</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {funcionariosCadastrados.map((funcionario) => (
                        <tr key={funcionario.id}>
                          <td className="border px-4 py-2">{funcionario.nome}</td>
                          <td className="border px-4 py-2">{funcionario.email}</td>
                          <td className="border px-4 py-2">
                            <button
                              onClick={() => handleExcluirFuncionario(funcionario.id)}
                              className="bg-red-500 rounded p-1 text-white hover:bg-red-700"
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
