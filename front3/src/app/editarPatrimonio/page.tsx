'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Item {
  id: number;
  nome_patrimonio: string;
  descricao: string;
  historico_manutencao: string;
  nr_serie: string;
  id_categoria: number;
  id_local_patrimonio: number;
}

interface EditItemFormProps {
  item: Item | undefined; // Certifica-se de que item possa ser undefined
  onSave: (formData: Item) => void;
}

const EditItemForm: React.FC<EditItemFormProps> = ({ item, onSave }) => {
  const [formData, setFormData] = useState<Item>({
    id: item?.id || 0, // Certifica-se de que id não seja undefined
    nome_patrimonio: item?.nome_patrimonio || '',
    descricao: item?.descricao || '',
    historico_manutencao: item?.historico_manutencao || '',
    nr_serie: item?.nr_serie || '',
    id_categoria: item?.id_categoria || 0, // Certifica-se de que id_categoria não seja undefined
    id_local_patrimonio: item?.id_local_patrimonio || 0, // Certifica-se de que id_local_patrimonio não seja undefined
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="w-1/2 mx-auto mt-4">
      <div className="mb-4">
        <label htmlFor="nome_patrimonio" className="block text-gray-600">Nome do Patrimônio</label>
        <input
          type="text"
          id="nome_patrimonio"
          name="nome_patrimonio"
          value={formData.nome_patrimonio}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="descricao" className="block text-gray-600">Descrição</label>
        <textarea
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="historico_manutencao" className="block text-gray-600">Histórico de Manutenção</label>
        <textarea
          id="historico_manutencao"
          name="historico_manutencao"
          value={formData.historico_manutencao}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="nr_serie" className="block text-gray-600">Número de Série</label>
        <input
          type="text"
          id="nr_serie"
          name="nr_serie"
          value={formData.nr_serie}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="id_categoria" className="block text-gray-600">ID da Categoria</label>
        <input
          type="number"
          id="id_categoria"
          name="id_categoria"
          value={formData.id_categoria}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="id_local_patrimonio" className="block text-gray-600">ID do Local do Patrimônio</label>
        <input
          type="number"
          id="id_local_patrimonio"
          name="id_local_patrimonio"
          value={formData.id_local_patrimonio}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Salvar</button>
    </form>
  );
}

export default EditItemForm;