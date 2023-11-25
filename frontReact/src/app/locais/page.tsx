'use client'


import React, { useState, useEffect } from 'react';
import { NavBar } from '@/components/SideBar';

interface LocalPatrimonio {
  id: number;
  nome_local: string;
}

const CadastroLocal: React.FC = () => {
  const [nomeLocal, setNomeLocal] = useState('');
  const [locaisPatrimonio, setLocaisPatrimonio] = useState<LocalPatrimonio[]>([]);
  const [localEmEdicao, setLocalEmEdicao] = useState<LocalPatrimonio | null>(null);

  useEffect(() => {
    carregarLocaisPatrimonio();
  }, []);

   const carregarLocaisPatrimonio = async () => {
    try {
      const response = await fetch('http://localhost:5500/local-patrimony');
      if (response.ok) {
        const data = await response.json();
        setLocaisPatrimonio(data);
      } else {
        console.error('Erro ao carregar locais de patrimônio:', response);
      }
    } catch (error) {
      console.error('Erro ao carregar locais de patrimônio:', error);
    }
  };

  async function excluirLocal(id: number) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5500/local-patrimony/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        alert('Local excluído com sucesso!');
        carregarLocaisPatrimonio(); 
      } else {
        const error = await response.json();
        alert('Erro ao excluir Local: ' + error.error);
      }
    } catch (error) {
      console.error('Erro ao excluir Local:', error);
    }
  }

  function handleEditarLocal(local: LocalPatrimonio) {
    setLocalEmEdicao(local);
  }

  const cadastrarLocal = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5500/local-patrimony', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome_local: nomeLocal }),
      });

      if (response.ok) {
        alert('Local cadastrado com sucesso!');
        setNomeLocal('');
        carregarLocaisPatrimonio(); 
      } else {
        const error = await response.json();
        alert('Erro ao cadastrar local: ' + error.error);
      }
    } catch (error) {
      console.error('Erro ao cadastrar local:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNomeLocal(event.target.value);
  };

  return (
    <>
      <NavBar />
      <main className="container col-md-10 mb-4 bg-neutral-200">
        <div className="flex items-center">
          <div className="col-md-8 justify-center ml-8">
            <form onSubmit={cadastrarLocal}>
              <div className="form-group justify-center flex flex-col mt-32">
                <h3 className="text-3xl">Cadastro de Local de Patrimônio</h3>
                <label htmlFor="nome_local">Nome do Local:</label>
                <input
                  type="text"
                  className="px-[6] py-[12] bg-slate-300 rounded-md hover:bg-slate-400"
                  id="nome_local"
                  name="nome_local"
                  value={nomeLocal}
                  onChange={handleChange}
                  required
                />
                <button
                  type="submit"
                  className="bg-sky-500 mt-4 rounded-lg p-2 text-zinc-50 hover:bg-sky-700"
                >
                  Cadastrar
                </button>
              </div>
            </form>

            <div className="mt-5">
              <h3 className="text-2xl">Locais Cadastrados</h3>
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
                      Nome do Local
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {locaisPatrimonio.map((local) => (
                    <tr key={local.id} className="border-b border-gray-300">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {local.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {local.nome_local}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700" onClick={() => handleEditarLocal(local)}>
                          Editar
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700" onClick={() => excluirLocal(local.id)}>
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
      </main>
    </>
  );
};

export default CadastroLocal;
