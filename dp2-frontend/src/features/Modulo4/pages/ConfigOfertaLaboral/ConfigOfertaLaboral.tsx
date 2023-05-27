import React from "react";
import { BsTrash } from "react-icons/bs";
import {
    Form,
    ButtonGroup,
    FormGroup,
    FormControl,
    FormText,
    FormLabel,
    FormSelect,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Modal } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import axiosInt from "@config/axios";
import { Fragment, ChangeEvent, useEffect, useRef, useState } from "react";
import Sidebar from "@components/Sidebar";
import sidebarItems from "../../utils/sidebarItems";
import PhotoCard from "@features/Modulo4/components/PhotoCard";
import SearchInput from "@features/Modulo4/components/SearchInput";
import CustomInput from "@features/Modulo4/components/CustomInput";
import { TextCenter } from "react-bootstrap-icons";

function ConfigOfertaLaboral(props: any) {
    const createLP = () => {
        /*
        const data = {
            nombre: refLpName.current?.value,
            descripcion: refLpDescription.current?.value,
        };

        axiosInt
            .post("capacitaciones/learning_path/", data)
            .then(function (response) {
                navigate(
                    `/modulo1/rutadeaprendizaje/detalle/${response.data.id}`
                );
            })
            .catch(function (error) {
                console.log(error);
            });
            */
    };
    const loadLPs = () => {
        /*
        axiosInt
            .get("capacitaciones/learning_path/")
            .then(function (response) {
                setLps(response.data);
                setLpsFiltered(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });*/
    };

    useEffect(() => {
        loadLPs();
    }, []);

    const stylesSelect = {
        display: "flex",
        alignItems: "center",
        marginBottom: "0.78rem",
    };

    // AREA DE TRABAJO
    const [selectedNombreOferta, setSelectedNombreOferta] = useState("");

    const handleNombreOferta = (event: any) => {
        const optionValue = event.target.value;
        setSelectedNombreOferta(optionValue);
    };

    // DESCRIPCIONES 3 CUSTOM INPUTS
    const [introduccionOferta, setIntroduccionOferta] = useState("");
    const handleInputChangeIntroduccionOferta = (event: any) => {
        const optionValue = event.target.value;
        setIntroduccionOferta(optionValue);
    };

    const [descripcionPuesto, setDescripcionPuesto] = useState("");
    const handleInputChangeDescripcion = (event: any) => {
        const optionValue = event.target.value;
        setDescripcionPuesto(optionValue);
    };

    const [descripcionResponsa, setDescripcionResponsa] = useState("");
    const handleInputChangeResponsa = (event: any) => {
        const optionValue = event.target.value;
        setDescripcionResponsa(optionValue);
    };

    // IMAGEN DE REFERENCIA
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
        }
        inputRef.current?.files &&
            setUploadedFileName(
                inputRef.current.files[0].name.substring(0, 10) + "..."
            );
    };
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(
        null
    );
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = () => {
        inputRef.current?.click();
    };

    // MODAL DEL BUSCADOR, ABRE Y RETORNA LOS VALORES
    const [showModalBuscador, setShowModalBuscador] = useState(false);
    const handleShowBuscadorFromButtom = () => {
        setShowModalBuscador(true);
    };
    const handleCloseBuscadorFromButtom = () => {
        setShowModalBuscador(false);
    };
    const handleOptionSelectBuscador = (selectedOption) => {
        console.log(selectedOption);
        setSelectedNombreOferta(selectedOption);
    };

    // ESTOS MODAL SE USARAN EN LOS BOTONES DE ELIMINAR Y GUARDAR
    const [showPublicarModal, setShowPublicarModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);

    const handlePublicar = () => {
        // Lógica para eliminar
        setShowPublicarModal(false);
    };

    const handleDelete = () => {
        // Lógica para eliminar
        setShowDeleteModal(false);
    };

    const handleSaveChanges = () => {
        // Lógica para guardar cambios
        setShowSaveModal(false);
    };
    return (
        <Sidebar
            items={sidebarItems}
            active="/modulo1/configurar-oferta-laboral"
        >
            <div className="row">
                <div className="col">
                    <h1>Configurar oferta laboral</h1>
                    <p>
                        <small
                            className="opacity-50"
                            style={{ marginBottom: "10rem" }}
                        >
                            Portal que presenta la configuración disponible para
                            el proceso de selección de una oferta laboral.
                        </small>
                    </p>
                </div>
                <div style={{ flex: "0 0 15rem" }} className="col text-end">
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-target="#createLPModalChoose"
                        data-bs-toggle="modal"
                        onClick={() => setShowPublicarModal(true)}
                    >
                        <span className="me-3">Publicar oferta</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-plus-circle"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                    </button>

                    {/* Modal para Guardar Cambios */}
                    <Modal
                        show={showPublicarModal}
                        onHide={() => setShowPublicarModal(false)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Publicar Oferta Laboral</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            ¿Desea publicar la oferta laboral?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => setShowPublicarModal(false)}
                            >
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={handlePublicar}>
                                Guardar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            <div className="row">
                {/* FILA   ------- */}
                <div className="col-8">
                    <div style={stylesSelect}>
                        <span style={{ width: "100%", marginRight: "1rem" }}>
                            Nombre del proceso de seleccion: (*)
                        </span>
                        <input
                            style={{ width: "130%" }}
                            className="form-control"
                            type="text"
                            placeholder="Especificar el nombre del proceso de seleccion"
                            value={selectedNombreOferta}
                            onChange={handleNombreOferta}
                            readOnly // Hace que el input sea de solo lectura
                        />
                        <div className="col-3">
                            <Button
                                style={{ marginLeft: "90px" }}
                                onClick={handleShowBuscadorFromButtom}
                            >
                                Buscar proceso
                            </Button>
                        </div>
                    </div>
                    <span>Introducción a la oferta laboral:</span>
                    <div
                        style={{
                            marginTop: "0.28rem",
                            marginBottom: "0.78rem",
                        }}
                    >
                        <CustomInput
                            placeholder="Introducción a la oferta laboral"
                            onChange={handleInputChangeIntroduccionOferta}
                            widthConfig="100%"
                            heightConfig="70%"
                        />
                    </div>

                    <span>Descripción de la oferta laboral:</span>
                    <div
                        style={{
                            marginTop: "0.28rem",
                            marginBottom: "0.78rem",
                        }}
                    >
                        <CustomInput
                            placeholder="Descripción de la oferta"
                            onChange={handleInputChangeDescripcion}
                            widthConfig="100%"
                            heightConfig="70%"
                        />
                    </div>

                    <span>Descripción de las responsabilidades:</span>
                    <div
                        style={{
                            marginTop: "0.28rem",
                            marginBottom: "0.78rem",
                        }}
                    >
                        <CustomInput
                            placeholder="Descripción de las responsabilidades"
                            onChange={handleInputChangeResponsa}
                            widthConfig="100%"
                            heightConfig="70%"
                        />
                    </div>
                </div>

                {/*---------------------------------------------------------------------------- */}

                <div className="col-3">
                    {/* FILA   ------- */}
                    <span>Imagen referencial:</span>
                    <div className="image-upload">
                        <div>
                            <PhotoCard
                                imageSrc={previewUrl}
                                width={140}
                                height={100}
                            />
                        </div>
                        <input
                            type="file"
                            ref={inputRef}
                            onChange={handleImageUpload}
                            className="d-none"
                            accept="image/*"
                        />
                        <button
                            style={{
                                width: "9em",
                                height: "3em",
                                marginBottom: "0.78rem",
                            }}
                            onClick={handleUpload}
                            className={`btn btn-outline-${
                                uploadedFileName ? "success" : "primary"
                            }`}
                        >
                            {uploadedFileName
                                ? uploadedFileName
                                : "Subir imagen"}
                        </button>
                    </div>
                    {/* FILA   ------- */}
                </div>
            </div>
            <div
                className="row"
                style={{ marginBottom: "0.78rem", marginTop: "8.78rem" }}
            >
                <div className="col">
                    {/* Botón Eliminar */}
                    <Button
                        variant="danger"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        Eliminar oferta
                    </Button>
                </div>
                <div className="col text-end">
                    {/* Botón Guardar Cambios */}
                    <Button
                        variant="primary"
                        onClick={() => setShowSaveModal(true)}
                    >
                        Guardar Cambios
                    </Button>
                </div>
            </div>
            {/* Modal para Eliminar */}
            <Modal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar esta oferta laboral?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Modal para Guardar Cambios */}
            <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Guardar Cambios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Deseas guardar los cambios realizados en la oferta laboral?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowSaveModal(false)}
                    >
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
            <div>
                <p>Opción seleccionada: {selectedNombreOferta + " "}</p>
            </div>
            {showModalBuscador && (
                <SearchInput
                    onClose={handleCloseBuscadorFromButtom}
                    onSelect={handleOptionSelectBuscador}
                />
            )}
        </Sidebar>
    );
}

export default ConfigOfertaLaboral;