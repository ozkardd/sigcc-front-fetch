import React, { useState } from 'react'
import { Button, Form, FormControl, InputGroup, Table } from 'react-bootstrap'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import BarChart1 from './Barchart1';
import './Read.css'
import { getCompetencesTypes, getEmployeeCompetences } from '@features/Modulo2/services/EmployeeGapsServices';

const Read = () => {

    const [palabrasClave, setPalabrasClave] = useState('');
    const [tipoOrden, setTipoOrden] = useState('ascendente');
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);
    const [tipoCompetenciaString, setTipoCompetenciaString] = useState('');
    const [tipoCompetenciaSelected, setTipoCompetenciaSelected] = useState(null);
    const [tiposCompetencia, setTiposCompetencia] = useState(null);
    const [campoOrdenamiento, setCampoOrdenamiento] = useState('');
    const [employeeCompetences, setEmployeeCompetences] = useState(null);
    const [competenciasData, setCompetenciasData] = useState([
        { competence__name: 'Programación en Java', competence__type__name: 'Técnico', levelCurrent: 2, levelRequired: 3, likeness: 66 },
        { competence__name: 'Liderazgo', competence__type__name: 'Habilidades blandas', levelCurrent: 4, levelRequired: 4, likeness: 100 },
        { competence__name: 'Programación modular', competence__type__name: 'Conocimiento', levelCurrent: 4, levelRequired: 5, likeness: 80 },
        { competence__name: 'Uso de Microsoft Word', competence__type__name: 'Técnico', levelCurrent: 2, levelRequired: 5, likeness: 40 },
        { competence__name: 'Innovación', competence__type__name: 'Habilidades blandas', levelCurrent: 3, levelRequired: 4, likeness: 75 },
        { competence__name: 'Gestión del Tiempo', competence__type__name: 'Conocimiento', levelCurrent: 1, levelRequired: 4, likeness: 25 }
    ]);

    React.useEffect(() => {
        getCompetencesTypes()
        .then(function (response){
            let temp = {
                id: -1,
                name: "Tipos de competencia"
            }
            let temp2 = {
                id: 0,
                name: "Todas"
            }
            let tipoCom = [];
            tipoCom.push(temp);
            tipoCom.push(temp2);
            response.forEach(res => tipoCom.push(res));
            setTipoCompetenciaString(temp.name);
            setTiposCompetencia(tipoCom);
            const obj = {
                idCompetencia: 0,
                palabraClave: "",
                idTipoCompetencia: 0,
                activo: 1,
                idEmpleado: 3
            }
            getEmployeeCompetences(obj)
            .then(function (response){
                setEmployeeCompetences(response);
            })
            .catch(function(error){
                console.log(error);
            })
        })
        // let temp = {
        //     id: -1,
        //     name: "Tipos de competencia"
        // }
        // let temp2 = {
        //     id: 0,
        //     name: "Todas"
        // }
        // let temp3 = {
        //     id: 1,
        //     name: "Técnico"
        // }
        // let temp4 = {
        //     id: 1,
        //     name: "Habilidades blandas"
        // }
        // let temp5 = {
        //     id: 1,
        //     name: "Conocimiento"
        // }
        // let tipoCom = [];
        // tipoCom.push(temp);
        // tipoCom.push(temp2);
        // tipoCom.push(temp3);
        // tipoCom.push(temp4);
        // tipoCom.push(temp5);
        // setTipoCompetenciaString(temp.name);
        // setTiposCompetencia(tipoCom);
        // setEmployeeCompetences(competenciasData);
    }, []);

    //para el grafico
    const optionsBar = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const dataBar = {
        labels: ['H1', 'H2', 'H3', 'H4', 'H5'],
        datasets: [
            {
                label: 'Valores',
                data: [3, 5, 1, 1, 3],
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
            },
        ],
    };

    const limpiarFiltros = () => {
        setPalabrasClave('')
        setTipoCompetenciaString('');
    };

    const handleOrdenarPorCampo = (campo) => {
        if (campo === campoOrdenamiento) {
            setTipoOrden(tipoOrden === 'ascendente' ? 'descendente' : 'ascendente');
        } else {
            setCampoOrdenamiento(campo);
            setTipoOrden('ascendente');
        }
    };

    const handleTipoCompetencias = (string) => {
        setTipoCompetenciaString(string);
        setTipoCompetenciaSelected(tiposCompetencia.filter(competencia => competencia.name === string));
    }

    const handleSearch = () => {
        const obj = {
            idCompetencia: 0,
            palabraClave: palabrasClave,
            idTipoCompetencia: tipoCompetenciaSelected[0].id,
            activo: 1,
            idEmpleado: 3
        }
        getEmployeeCompetences(obj)
        .then(function (response){
            setEmployeeCompetences(response);
        })
        // let competenciasFiltradas = competenciasData;
        // if (tipoCompetenciaString && tipoCompetenciaString !== "Tipos de competencia" && tipoCompetenciaString !== "Todas") {
        //     competenciasFiltradas = competenciasFiltradas.filter(competencia => competencia.competence__type__name === tipoCompetenciaString);
        // }
        // if (palabrasClave) {
        //     const palabrasClaveLower = palabrasClave.toLowerCase();
        //     competenciasFiltradas = competenciasFiltradas.filter(competencia =>
        //         competencia.competence__name.toLowerCase().includes(palabrasClaveLower) ||
        //         returnLevel(competencia.levelCurrent).toLowerCase().includes(palabrasClaveLower) ||
        //         returnLevel(competencia.levelRequired).toLowerCase().includes(palabrasClaveLower)
        //     );
        // }
        // setEmployeeCompetences(competenciasFiltradas);
    }

    const returnLevel = (number) => {
        if(number === 1)return "Muy bajo";
        if(number === 2)return "Bajo";
        if(number === 3)return "Medio";
        if(number === 4)return "Alto";
        return "Muy alto"
    }

    return (
        <div className='container-fluid container-view'>
            <div className='row'>
                <h2>Consolidado de competencias</h2>
                <p className="text-muted">Agrega, edita y desactiva competencias</p>
                <Form className="row align-items-center mb-4">
                    <Form.Group className="col-6">
                        <FormControl
                            placeholder="Ingrese palabras clave, código o nombre de las competencias"
                            aria-label="Buscar competencias"
                            aria-describedby="buscar-icono"
                            value={palabrasClave}
                            onChange={(e) => setPalabrasClave(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="filtroTipoCompetencia" className="col-3">
                        <select 
                            className="form-select" 
                            value={tipoCompetenciaString} 
                            onChange={(e) => handleTipoCompetencias(e.target.value)}
                        >
                            {tiposCompetencia && tiposCompetencia.map((tipoCom, index) => (
                                <option value={tipoCom.name} hidden={tipoCom.id === -1}>{tipoCom.name}</option>
                            ))}
                        </select>
                    </Form.Group>

                    <div className="col-3">
                        <Button variant="outline-secondary" className="me-2" onClick={limpiarFiltros}>
                            Limpiar Filtros
                        </Button>
                        <Button variant="primary" onClick={handleSearch}>Buscar</Button>
                    </div>
                </Form>
            </div>

            <div className='row align-items-start'>
                <div className='col-sm-12 col-md-6'>
                    <div className="table-container">
                    {employeeCompetences && employeeCompetences.length === 0 ? <p>No se encontraron resultados.</p> : 
                        <Table striped bordered className='tableGapsEmployees'>
                            <thead>
                                <tr>
                                    <th onClick={() => handleOrdenarPorCampo('competence__name')}>
                                        Nombre
                                        {campoOrdenamiento === 'competence__name' && (
                                            <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                        )}
                                    </th>
                                    <th onClick={() => handleOrdenarPorCampo('competence__type__name')}>
                                        Tipo
                                        {campoOrdenamiento === 'competence__type__name' && (
                                            <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                        )}
                                    </th>
                                    <th onClick={() => handleOrdenarPorCampo('levelCurrent')}>
                                        Nivel actual
                                        {campoOrdenamiento === 'levelCurrent' && (
                                            <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                        )}
                                    </th>
                                    <th onClick={() => handleOrdenarPorCampo('levelRequired')}>
                                        Nivel requerido
                                        {campoOrdenamiento === 'levelRequired' && (
                                            <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                        )}
                                    </th>
                                    <th onClick={() => handleOrdenarPorCampo('likeness')}>
                                        % de adecuacion
                                        {campoOrdenamiento === 'likeness' && (
                                            <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                                        )}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeeCompetences && employeeCompetences.map((competence, index) => (
                                    <tr key={index} className={index % 0 === 0 ? "evenRow" : "oddRow"}>
                                        <td>{competence.competence__name}</td>
                                        <td>{competence.competence__type__name}</td>
                                        <td>{returnLevel(competence.levelCurrent)}</td>
                                        <td>{returnLevel(competence.levelRequired)}</td>
                                        <td>{Math.round(competence.likeness) + "%"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    }
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='chart-container'>
                        <BarChart1 dataBarProps={employeeCompetences}/>
                    </div>
                </div>
            </div>


        </div>               
    )
}

export default Read
