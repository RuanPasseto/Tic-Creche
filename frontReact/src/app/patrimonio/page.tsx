'use client'

import React, { useState, useEffect} from 'react';
import { NavBar } from '@/components/SideBar';

interface Patrimonios {
  id: number;
  nome_patrimonio: string;
  descricao: string;
  historico_manutencao: string;
  nr_serie: string;
  nome_categoria: string;
  nome_local: string;
}

type Categoria = {
  id: number;
  nome_categoria: string;
};

type Patrimonio ={
  id: number;
  nome_local: string
}


function Patrimonio() {
  const [patrimonios, setPatrimonios] = useState<Patrimonios[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [locaisPatrimonio, setLocaisPatrimonio] = useState<Patrimonio[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [patrimonioEmEdicao, setPatrimonioEmEdicao] = useState<Patrimonios | null>(null);
  const [patrimonioFormData, setPatrimonioFormData] = useState({
    nome_patrimonio: '',
    descricao: '',
    historico_manutencao: '',
    nr_serie: '',
    nome_categoria: '',
    nome_local: '',
  });

  function atualizarPatrimonioEmEdicao(patrimonio: Patrimonios) {
    setPatrimonioEmEdicao(patrimonio);
  }

  useEffect(() => {
    async function carregarDados() {
      await carregarCategorias();
      await carregarLocaisPatrimonio();
      await carregarPatrimonios()
      setDadosCarregados(true);
    }

    carregarDados();
  }, []);

  async function carregarPatrimonios() {
    console.log('aqui')
    try {
      const response = await fetch('http://localhost:5500/patrimony');
      if (response.ok) {
        const data = await response.json();
        console.log('patrimonio',data)
        setPatrimonios(data);
      } else {
        console.error('Erro ao carregar patrimônios:', response);
      }
    } catch (error) {
      console.error('Erro ao carregar patrimônios:', error);
    }
  }

  async function carregarCategorias() {
    try {
      const response = await fetch('http://localhost:5500/category');
      if (response.ok) {
        const data = await response.json();
        setCategorias(data);
      } else {
        console.error('Erro ao carregar categorias:', response);
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  }
  

  async function carregarLocaisPatrimonio() {
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
  }

  async function cadastrarPatrimonio(event: any) {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5500/patrimony', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(patrimonioFormData),
      });

      if (response.ok) {
        alert('Patrimônio cadastrado com sucesso!');
        setPatrimonioFormData({
          nome_patrimonio: '',
          descricao: '',
          historico_manutencao: '',
          nr_serie: '',
          nome_categoria: '',
          nome_local: '',
        });
        carregarPatrimonios();
      } else {
        const error = await response.json();
        alert('Erro ao cadastrar patrimônio: ' + error.error);
      }
    } catch (error) {
      console.error('Erro ao cadastrar patrimônio:', error);
    }
  }

  async function excluirPatrimonio(id: number) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5500/patrimony/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        alert('Patrimônio excluído com sucesso!');
        carregarPatrimonios(); 
      } else {
        const error = await response.json();
        alert('Erro ao excluir patrimônio: ' + error.error);
      }
    } catch (error) {
      console.error('Erro ao excluir patrimônio:', error);
    }
  }

  function handleEditarPatrimonio(patrimonio: Patrimonios) {
    setPatrimonioEmEdicao(patrimonio);
    setFormVisible(true);
  }


  function handleChange(event: any) {
    const { name, value } = event.target;
    setPatrimonioFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function closeSideDrawer(event: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
    <NavBar/>
    <div onLoad={carregarPatrimonios}>
      <main className="container col-md-10 mb-4 bg-neutral-200 ">
          <div className="flex items-center">
            <div className="col-md-8 justify-center ml-8">
              <form id="patrimonioForm" onSubmit={cadastrarPatrimonio}>
                <div className="form-group justify-center flex flex-col mt-32">
                  <h3 className='text-3xl '>Cadastro de Patrimônio</h3>
                  <label htmlFor="nome_patrimonio">Nome do Patrimônio:</label>
                  <input
                    type="text"
                    className="px-[6] py-[12] bg-slate-300 rounded-md hover:bg-slate-400"
                    id="nome_patrimonio"
                    name="nome_patrimonio" 
                    value={patrimonioFormData.nome_patrimonio} 
                    onChange={handleChange} 
                    required
                  />

                  <label htmlFor="descricao">Descrição:</label>
                  <input
                    type="text"
                    className="px-[6] py-[12] bg-slate-300 rounded-md hover:bg-slate-400"
                    id="descricao"
                    name="descricao"
                    value={patrimonioFormData.descricao}
                    onChange={handleChange}
                    required
                  />
  
                  <label htmlFor="historico_manutencao">Histórico de Manutenção:</label>
                  <input
                    type="text"
                    className="px-[6] py-[12] bg-slate-300 rounded-md hover-bg-slate-400"
                    id="historico_manutencao"
                    name="historico_manutencao"
                    value={patrimonioFormData.historico_manutencao}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="nr_serie">Número de Série:</label>
                  <input
                    type="text"
                    className="px-[6] py-[12] bg-slate-300 rounded-md hover-bg-slate-400"
                    id="nr_serie"
                    name="nr_serie"
                    value={patrimonioFormData.nr_serie}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="categoria">Categoria:</label>
                  <select
                    className="form-select"
                    id="categoria"
                    name="nome_categoria" // Altere para "nome_categoria" em vez de "categoria"
                    value={patrimonioFormData.nome_categoria} // Certifique-se de usar "nome_categoria"
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled selected hidden>
                      Selecione a categoria
                    </option>
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.nome_categoria}>
                        {categoria.nome_categoria}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="local_patrimonio">Local de Patrimônio:</label>
                  <select
                    className="form-select"
                    id="local_patrimonio"
                    name="nome_local" // Altere para "nome_local" em vez de "local_patrimonio"
                    value={patrimonioFormData.nome_local} // Certifique-se de usar "nome_local"
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled selected hidden>
                      Selecione o local de patrimônio
                    </option>
                    {locaisPatrimonio.map((local) => (
                      <option key={local.id} value={local.nome_local}>
                        {local.nome_local}
                      </option>
                    ))}
                  </select>
                <button type="submit" className="bg-sky-500 mt-4 rounded-lg p-2 text-zinc-50 hover:bg-sky-700" 
                id="salvarButton">
                  Cadastrar
                </button>
              </div>
              </form>
            </div>
          </div>
        <div className="row mt-5 justify-content-center">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Descrição
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Histórico de Manutenção
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Número de Série
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoria
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Local do Patrimônio
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patrimonios.map((patrimonio: Patrimonios) => (
                    <tr key={patrimonio.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {patrimonio.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {patrimonio.nome_patrimonio}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {patrimonio.descricao}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {patrimonio.historico_manutencao}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {patrimonio.nr_serie}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {patrimonio.nome_categoria}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {patrimonio.nome_local}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700" onClick={() => handleEditarPatrimonio(patrimonio)}>
                          Editar
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700" onClick={() => excluirPatrimonio(patrimonio.id)}>
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
    </div>
    </>
  );
}

export default Patrimonio;
