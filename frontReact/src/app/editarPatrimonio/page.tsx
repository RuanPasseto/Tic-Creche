'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { NavBar } from '@/components/SideBar';


interface Patrimonios {
  id: number;
  nome_patrimonio: string;
  descricao: string;
  historico_manutencao: string;
  nr_serie: string;
  id_categoria: number;
  id_local_patrimonio: number;
}

type Categoria = {
  id: number;
  nome_categoria: string;
};

type Patrimonio = {
  id: number;
  nome_local: string;
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
    id_categoria: '',
    id_local_patrimonio: '',
  });

  useEffect(() => {
    async function carregarDados() {
      await carregarCategorias();
      await carregarLocaisPatrimonio();
      await carregarPatrimonios();
      setDadosCarregados(true);
    }

    carregarDados();
  }, []);


  async function carregarPatrimonios() {
    console.log('aqui')
    try {
      const response = await fetch('http://localhost:3000/patrimonios');
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
      const response = await fetch('http://localhost:3000/categorias');
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
      const response = await fetch('http://localhost:3000/locais_patrimonio');
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
      const response = await fetch('http://localhost:3000/patrimonios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(patrimonioFormData),
      });

      if (response.ok) {
        alert('Patrimônio Atualizado com sucesso!');
        setPatrimonioFormData({
          nome_patrimonio: '',
          descricao: '',
          historico_manutencao: '',
          nr_serie: '',
          id_categoria: '',
          id_local_patrimonio: '',
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
      const response = await fetch(`http://localhost:3000/patrimonios/${id}`, {
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

    // Preencha o formulário de edição com os dados do patrimônio em edição
    setPatrimonioFormData({
      nome_patrimonio: patrimonio.nome_patrimonio,
      descricao: patrimonio.descricao,
      historico_manutencao: patrimonio.historico_manutencao,
      nr_serie: patrimonio.nr_serie,
      id_categoria: patrimonio.id_categoria.toString(),
      id_local_patrimonio: patrimonio.id_local_patrimonio.toString(),
    });
  }

  async function atualizarPatrimonio(event: any) {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/patrimonios/${patrimonioEmEdicao?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(patrimonioFormData),
      });

      if (response.ok) {
        alert('Patrimônio atualizado com sucesso!');
        setFormVisible(false);
        carregarPatrimonios();
      } else {
        const error = await response.json();
        alert('Erro ao atualizar patrimônio: ' + error.error);
      }
    } catch (error) {
      console.error('Erro ao atualizar patrimônio:', error);
    }
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
    <NavBar />
    <div className='bg-neutral-200 min-h-full' onLoad={carregarPatrimonios}>

      <main className="container col-md-10 mb-4 bg-neutral-200">
        <div className=" " >
          <div className="flex items-center">
            <div className="col-md-8 justify-center">
              <form id="patrimonioForm" onSubmit={cadastrarPatrimonio}>
                <div className="form-group justify-center flex flex-col mt-32">
                  <h3 className='text-3xl '>Editar Patrimônio</h3>
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
                  <select className="form-select" id="categoria" name="categoria" required>
                    <option value="" disabled selected hidden>
                      Selecione a categoria
                    </option>
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nome_categoria}
                      </option>
                    ))}
                  </select>


                  <label htmlFor="local_patrimonio">Local de Patrimônio:</label>
                  <select className="form-select" id="local_patrimonio" name="local_patrimonio" required>
                    <option value="" disabled selected hidden>
                      Selecione o local de patrimônio
                    </option>
                    {locaisPatrimonio.map((local) => (
                      <option key={local.id} value={local.id}>
                        {local.nome_local}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button type="submit" className="bg-sky-500 mt-4 rounded-lg p-2 text-zinc-50 hover:bg-sky-700" 
                id="salvarButton">
                  Cadastrar
                </button>
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
          {patrimonio.id_categoria}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {patrimonio.id_local_patrimonio}
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
        </div>
      </main>
    </div>
    </>
  );
}

export default Patrimonio;
