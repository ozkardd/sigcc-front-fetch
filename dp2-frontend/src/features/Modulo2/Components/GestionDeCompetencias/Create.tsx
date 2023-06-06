import React, { useState } from 'react';
import { Competencia, tipoCompetencia } from './Tipos';

type Props = {
  agregarCompetencia: (nuevaCompetencia: Competencia) => void;
  tipoCompetencias: tipoCompetencia[];
};

const AgregarCompetencia: React.FC<Props> = ({ agregarCompetencia, tipoCompetencias }) => {
  const [nuevaCompetencia, setNuevaCompetencia] = useState<Competencia>({
    id: 0,
    code: '',
    name: '',
    description: '',
    type: 0,
    active: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNuevaCompetencia((prevCompetencia) => ({
      ...prevCompetencia,
      [name]: value,
    }));
  };

  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTipoId = parseInt(e.target.value);
    const selectedTipoCompetencia = tipoCompetencias.find((tipo) => tipo.id === selectedTipoId);
    setNuevaCompetencia((prevCompetencia) => ({
      ...prevCompetencia,
      type: selectedTipoCompetencia?.id || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    agregarCompetencia(nuevaCompetencia);
    setNuevaCompetencia({
      id: 0,
      code: '',
      name: '',
      description: '',
      type: 0,
      active: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="codigo">Código:</label>
        <input
          type="text"
          className="form-control"
          id="codigo"
          name="code"
          value={nuevaCompetencia?.code || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          name="name"
          value={nuevaCompetencia?.name || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <input
          type="text"
          className="form-control"
          id="descripcion"
          name="description"
          value={nuevaCompetencia?.description || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="activo">Activo:</label>
        <input
          type="checkbox"
          className="form-check-input"
          id="activo"
          name="active"
          checked={nuevaCompetencia?.active || false}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tipo">Tipo de Competencia:</label>
        <select
          className="form-control"
          id="tipo"
          name="type"
          value={nuevaCompetencia?.type || ''}
          onChange={handleTipoChange}
        >
          <option value="">Seleccionar tipo de competencia</option>
          {tipoCompetencias.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.name}
            </option>
          ))}
        </select>
      </div>
      
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
  );
};

export default AgregarCompetencia;
