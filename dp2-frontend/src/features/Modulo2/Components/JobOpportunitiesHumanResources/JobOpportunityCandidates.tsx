import React from 'react'
import { Button, Table } from 'react-bootstrap';

const JobOpportunityCandidates = (props) => {

  const { jobOpp } = props;
  const [candidates, setCandidates] = React.useState([]);
  const [tipoOrden, setTipoOrden] = React.useState('ascendente');
  const [campoOrdenamiento, setCampoOrdenamiento] = React.useState('');

  const handleOrdenarPorCampo = (campo) => {
    if (campo === campoOrdenamiento) {
        setTipoOrden(tipoOrden === 'ascendente' ? 'descendente' : 'ascendente');
    } else {
        setCampoOrdenamiento(campo);
        setTipoOrden('ascendente');
    }
};

const returnLevel = (number) => {
  if(number === 1)return "Muy bajo";
  if(number === 2)return "Bajo";
  if(number === 3)return "Medio";
  if(number === 4)return "Alto";
  return "Muy alto"
}

  return (
    <div className='container'>
      <div className='row'>
        <h2>Posibles candidatos afines a UX/UI Designer</h2>
        <p className="text-muted">Necesidades de capacitación del empleado</p>
        {candidates && candidates.length === 0 ? <p>No se encontraron resultados.</p> : 
          <Table striped bordered className='tableGapsEmployees'>
              <thead>
                  <tr>
                      <th onClick={() => handleOrdenarPorCampo('training_type')}>
                          Tipo de capacitación
                          {campoOrdenamiento === 'training_type' && (
                              <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                          )}
                      </th>
                      <th onClick={() => handleOrdenarPorCampo('competence')}>
                          Competencia
                          {campoOrdenamiento === 'competence' && (
                              <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                          )}
                      </th>
                      <th onClick={() => handleOrdenarPorCampo('competence__type__name')}>
                          Descripción
                          {campoOrdenamiento === 'competence__type__name' && (
                              <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                          )}
                      </th>
                      <th onClick={() => handleOrdenarPorCampo('levelCurrent')}>
                          Tipo de competencia
                          {campoOrdenamiento === 'levelCurrent' && (
                              <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                          )}
                      </th>
                      <th onClick={() => handleOrdenarPorCampo('levelRequired')}>
                          Nivel actual
                          {campoOrdenamiento === 'levelRequired' && (
                              <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                          )}
                      </th>
                      <th onClick={() => handleOrdenarPorCampo('description')}>
                          Nivel requerido
                          {campoOrdenamiento === 'description' && (
                              <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                          )}
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {candidates && candidates.map((cand, index) => (
                      <tr key={index} className={index % 0 === 0 ? "evenRow" : "oddRow"}>
                          <td>{cand.training_type}</td>
                          <td>{cand.competence}</td>
                          <td>{cand.competence__type__name}</td>
                          <td>{returnLevel(cand.levelCurrent)}</td>
                          <td>{returnLevel(cand.levelRequired)}</td>
                          <td>{cand.description}</td>
                      </tr>
                  ))}
              </tbody>
          </Table>
        }
        <button className='btn btn-outline-primary col-1 ms-3 btn-sm'>Regresar</button>
      </div>
    </div>
  )
}

export default JobOpportunityCandidates