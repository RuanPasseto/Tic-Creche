'use client'

import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';

interface Funcionario {
  nome: string;
  cargo: string;
}

export default function CadastroFuncionario() {
  const [funcionario, setFuncionario] = useState<Funcionario>({
    nome: '',
    cargo: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFuncionario({ ...funcionario, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    console.log('Funcionário cadastrado:', funcionario);

    setFuncionario({
      nome: '',
      cargo: '',
    });
  };

  return (
    <div className='bg-neutral-200 min-h-full'>
      
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
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
      <main className="container col-md-10 mb-4 bg-neutral-200">
        <div className=" " >
          <div className="flex items-center">
            <div className="col-md-8 justify-center">
              <form id="patrimonioForm">
                <div className="form-group justify-center flex flex-col">
                  <h3 className='text-3xl '>Cadastro de Funcionarios</h3>
                  <label htmlFor="nome_patrimonio">Nome do Funcionario:</label>
                  <input
                    type="text"
                    className="px-[6] py-[12] bg-slate-300 
                     rounded-md hover:bg-slate-400"
                    id="nome_patrimonio"
                    required
                  />

                  <label htmlFor="descricao">Cargo:</label>
                  <input type="text" className="px-[6] py-[12] bg-slate-300 
                     rounded-md hover:bg-slate-400"
                      id="descricao" required 
                  />
                </div>
                
                <button type="submit" className="bg-sky-500 mt-4 rounded-lg p-2 text-zinc-50 hover:bg-sky-700" 
                id="salvarButton">
                  Cadastrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
