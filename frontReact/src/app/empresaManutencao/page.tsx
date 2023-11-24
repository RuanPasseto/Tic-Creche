'use client'

import React, { useState, useEffect} from 'react';
import { NavBar } from '@/components/SideBar';

interface Empresa {
  id: number;
  nome_Empresa: string;
  tecnico: string;
  phone: string;
  email: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string
}



function EmpresaManutencao() {
  const [empresa, setEmpresa] = useState<Empresa[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [empresaEmEdicao, setEmpresaEmEdicao] = useState<Empresa | null>(null);
  const [empresaFormData, setEmpresaFormData] = useState({
  
    nome_Empresa: '',
    tecnico: '',
    phone: '',
    email: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
  });


  useEffect(() => {
    async function carregarDados() {
      await carregarEmpresa()
      setDadosCarregados(true);
    }

    carregarDados();
  }, []);

  async function carregarEmpresa() {
    console.log('aqui')
    try {
      const response = await fetch('http://localhost:3000/empresa');
      if (response.ok) {
        const data = await response.json();
        console.log('patrimonio',data)
        setEmpresa(data);
      } else {
        console.error('Erro ao carregar patrimônios:', response);
      }
    } catch (error) {
      console.error('Erro ao carregar patrimônios:', error);
    }
  }

  async function cadastrarEmpresa(event: any) {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/empresa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(empresaFormData),
      });

      if (response.ok) {
        alert('Empresa cadastrado com sucesso!');
        setEmpresaFormData({
          nome_Empresa: '',
          tecnico: '',
          phone: '',
          email: '',
          rua: '',
          numero: '',
          bairro: '',
          cidade: '',
        });
        carregarEmpresa();
      } else {
        const error = await response.json();
        alert('Erro ao cadastrar empresa: ' + error.error);
      }
    } catch (error) {
      console.error('Erro ao cadastrar empresa:', error);
    }
  }

  async function excluirEmpresa(id: number) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/empresa/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        alert('Patrimônio excluído com sucesso!');
        carregarEmpresa(); 
      } else {
        const error = await response.json();
        alert('Erro ao excluir patrimônio: ' + error.error);
      }
    } catch (error) {
      console.error('Erro ao excluir patrimônio:', error);
    }
  }

  function handleEditarEmpresa(empresa: Empresa) {
    setEmpresaEmEdicao(empresa);
    setFormVisible(true);
  }


  function handleChange(event: any) {
    const { name, value } = event.target;
    setEmpresaFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <>
    <NavBar/>
    <div onLoad={carregarEmpresa}>
      <main className="container col-md-10 mb-4 bg-neutral-200 ">
          <div className="flex items-center">
            <div className="col-md-8 justify-center ml-8">
              <form id="patrimonioForm" onSubmit={cadastrarEmpresa}>
                <div className="form-group justify-center flex flex-col mt-32">
                  <h3 className='text-3xl '>Cadastro de Empresa</h3>
                  <label htmlFor="nome_patrimonio">Nome da empresa:</label>
                  <input
                    type="text"
                    className="px-[6] py-[12] bg-slate-300 rounded-md hover:bg-slate-400"
                    id="nome_patrimonio"
                    name="nome_patrimonio" 
                    value={empresaFormData.nome_Empresa} 
                    onChange={handleChange} 
                    required
                  />

                  <label htmlFor="descricao">Tecnico Responsavel:</label>
                  <input
                    type="text"
                    className="px-[6] py-[12] bg-slate-300 rounded-md hover:bg-slate-400"
                    id="descricao"
                    name="descricao"
                    value={empresaFormData.tecnico}
                    onChange={handleChange}
                    required
                  />
  
                  <label htmlFor="historico_manutencao">Telefone:</label>
                  <input
                    type="text"
                    className="px-[6] py-[12] bg-slate-300 rounded-md hover-bg-slate-400"
                    id="historico_manutencao"
                    name="historico_manutencao"
                    value={empresaFormData.phone}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="nr_serie">Email:</label>
                  <input
                    type="email"
                    className="px-[6] py-[12] bg-slate-300 rounded-md hover-bg-slate-400"
                    id="nr_serie"
                    name="nr_serie"
                    value={empresaFormData.email}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="nr_serie">Rua:</label>
                  <input
                    type="text"
                    className="px-[6] py-[12] bg-slate-300 rounded-md hover-bg-slate-400"
                    id="nr_serie"
                    name="nr_serie"
                    value={empresaFormData.rua}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="nr_serie">Número:</label>
                  <input
                    type="number"
                    className="px-[6] py-[12] bg-slate-300 rounded-md hover-bg-slate-400"
                    id="nr_serie"
                    name="nr_serie"
                    value={empresaFormData.numero}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="nr_serie">Bairro:</label>
                  <input
                    type="text"
                    className="px-[6] py-[12] bg-slate-300 rounded-md hover-bg-slate-400"
                    id="nr_serie"
                    name="nr_serie"
                    value={empresaFormData.bairro}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="nr_serie">Cidade:</label>
                  <input
                    type="text"
                    className="px-[6] py-[12] bg-slate-300 rounded-md hover-bg-slate-400"
                    id="nr_serie"
                    name="nr_serie"
                    value={empresaFormData.cidade}
                    onChange={handleChange}
                    required
                  />


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
                      Nome da Empresa
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tecnico
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telefone
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rua
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Numero
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bairro
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cidade
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {empresa.map((empresa: Empresa) => (
                    <tr key={empresa.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {empresa.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {empresa.nome_Empresa}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {empresa.tecnico}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {empresa.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {empresa.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {empresa.rua}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {empresa.numero}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {empresa.bairro}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {empresa.cidade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700" onClick={() => handleEditarEmpresa(empresa)}>
                          Editar
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700" onClick={() => excluirEmpresa(empresa.id)}>
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

export default EmpresaManutencao;
