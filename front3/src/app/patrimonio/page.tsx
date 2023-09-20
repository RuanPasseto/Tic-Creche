'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';


// Componente patrimonio
function Patrimonio() {
  const [patrimonios, setPatrimonios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [locaisPatrimonio, setLocaisPatrimonio] = useState([]);
  const [patrimonioFormData, setPatrimonioFormData] = useState({
    nome_patrimonio: '',
    descricao: '',
    historico_manutencao: '',
    nr_serie: '',
    id_categoria: '',
    id_local_patrimonio: '',
  });

  useEffect(() => {
    carregarPatrimonios();
    carregarCategorias();
    carregarLocaisPatrimonio();
  }, []);

  async function carregarPatrimonios() {
    try {
      const response = await fetch('http://localhost:3001/patrimony');
      if (response.ok) {
        const data = await response.json();
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
      const response = await fetch('http://localhost:3001/category');
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
      const response = await fetch('http://localhost:3001/local-patrimony');
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
      const response = await fetch('http://localhost:3001/patrimony', {
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
    <div className='bg-neutral-200 min-h-full' onLoad={carregarPatrimonios}>
      
      <header className='bg-sky-500' >
        <span className="navbar-text p-0">
          <div className="row-flex min-h-full">
            <div className="col-12 p-0">
            <Image src="/logo.jpg" alt="logo" width={79.75} height={76.75} className="bg-blend-color-burn"/>
            </div>
          </div>
        </span>
      </header>

      <nav className="bg-sky-500 w-1/2 rounded-r-3xl h-16" >
        <button className="navbar-toggler" type="button" onClick={closeSideDrawer}>
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
      <main className="container col-md-10 mb-4 bg-neutral-200">
        <div className=" " >
          <div className="flex items-center">
            <div className="col-md-8 justify-center">
              <form id="patrimonioForm">
                <div className="form-group justify-center flex flex-col">
                  <h3 className='text-3xl '>Cadastro de Patrimônio</h3>
                  <label htmlFor="nome_patrimonio">Nome do Patrimônio:</label>
                  <input
                    type="text"
                    className="px-[6] py-[12] bg-slate-300 
                     rounded-md hover:bg-slate-400"
                    id="nome_patrimonio"
                    required
                  />

                  <label htmlFor="descricao">Descrição:</label>
                  <input type="text" className="px-[6] py-[12] bg-slate-300 
                     rounded-md hover:bg-slate-400"
                      id="descricao" required 
                  />
  
                  <label htmlFor="historico_manutencao">Histórico de Manutenção:</label>
                  <input
                    type="text"
                    className="px-[6] py-[12] bg-slate-300 
                     rounded-md hover:bg-slate-400"
                    id="historico_manutencao"
                    required
                  />

                  <label htmlFor="nr_serie">Número de Série:</label>
                  <input type="text" className="px-[6] py-[12] bg-slate-300 
                     rounded-md hover:bg-slate-400"
                      id="nr_serie" required />

                  <label htmlFor="categoria">Categoria:</label>
                  <select
                    className="form-select"
                    id="categoria"
                    name="categoria"
                    required
                  >
                    <option value="" disabled selected hidden>
                      Selecione a categoria
                    </option>
                  </select>

                  <label htmlFor="local_patrimonio">Local de Patrimônio:</label>
                  <select
                    className="form-select"
                    id="local_patrimonio"
                    name="local_patrimonio"
                    required
                  >
                    <option value="" disabled selected hidden>
                      Selecione o local de patrimônio
                    </option>
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
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>Histórico de Manutenção</th>
                      <th>Número de Série</th>
                      <th>Categoria</th>
                      <th>Local do Patrimônio</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody id="patrimonioTableBody"></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Patrimonio;
