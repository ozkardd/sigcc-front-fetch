import 'bootstrap/dist/css/bootstrap.min.css';
import './EvaluacionDeDesempenho.css';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import Matrix from '@features/Modulo3/components/Matrix/Matrix';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

type BaseFormProps = {
  employee: any;
  categories: any;
  projects: any;
  form?: any;
  isReadOnly?: boolean;
}

const BaseForm = ({employee, categories, projects, form, isReadOnly} : BaseFormProps) => {
  const [newForm, setNewForm] = useState(form);
  const aditionalSectionStyle = { width: "350px" };
  const aditionTitleStyle = { marginBottom: "20px" };
  const aditionContentStyle = { paddingLeft: "12px" };

  const evaluationCategory = (
    <Form.Select disabled={isReadOnly} value={form && form.evaluationCategory} onChange={onEvaluationChange()}>
      <option value={-1}>Seleccionar</option>
      {categories.map((category) => {
        return (
          <option value={category.id - 1} key={category.id}>
            {category.name}
          </option>
        );
      })}
    </Form.Select>
  );

  const asociatedProject = (
    <Form.Select disabled={isReadOnly} value={form && form.projectId} onChange={onProjectChange()}>
    <option value={-1}>Seleccionar</option>
      {projects.map((project) => {
        return (
          <option value={project.id} key={project.id}>
            {project.name}
          </option>
        );
      })}
    </Form.Select>
  );

  const evaluation =
    newForm && newForm.evaluationCategory != null ? (
      <Matrix
        header={["Muy mala", "Mala", "Regular", "Buena", "Muy buena"]}
        rows={categories[newForm.evaluationCategory].subcategories}
        evaluation={newForm.evaluation}
        isReadOnly={isReadOnly}
      />
    ) : (
      <div>Seleccione una categoría a evaluar</div>
    );

  const additionalCommentsAndSave = (
    <>
      <div className={isReadOnly ? `mb-4` : ''}>
        <InputGroup>
          <Form.Control
            value={form && form.additionalComments}
            disabled={isReadOnly}
            as="textarea"
            aria-label="With textarea"
            placeholder="Ingrese los comentarios o recomendaciones que crea conveniente"
            rows={3}
          />
        </InputGroup>
      </div>
      {!isReadOnly && (
        <div className="text-end mt-32 mb-4">
          <Button>Guardar evaluación</Button>
        </div>
      )}
    </>
  );

  const body = (
    <>
      <div className="ec-createDropdowns">
        <div className="ec-createDropdown">
          <Section
            title={"Categoría de evaluación"}
            content={evaluationCategory}
            sectionStyle={aditionalSectionStyle}
            titleStyle={aditionTitleStyle}
            contentStyle={aditionContentStyle}
          />
        </div>
        <div className="ec-createDropdown">
          <Section
            title={"Proyecto asociado"}
            content={asociatedProject}
            sectionStyle={aditionalSectionStyle}
            titleStyle={aditionTitleStyle}
            contentStyle={aditionContentStyle}
          />
        </div>
      </div>
      <Section
        title={"Evaluación"}
        content={evaluation}
        titleStyle={aditionTitleStyle}
      />
      <Section
        title={"Comentarios adicionales"}
        content={additionalCommentsAndSave}
        titleStyle={aditionTitleStyle}
      />
    </>
  );
  
  return (
    <div>
      <Layout
        title={`Evaluación continua - ${employee.FullName}`}
        body={body}
        subtitle='Evaluaciones continuas de trabajadores de los que te encuentras a cargo.'
      />
    </div>
  );

  function onEvaluationChange() {
    return e => {
      var value = Number(e.target.value);
      if(newForm) newForm.evaluation = null;
      setNewForm((prev) => ({
        ...prev,
        evaluationCategory: value >= 0 ? value : null,
      }));
    };
  }

  function onProjectChange() {
    return e => {
      var value = Number(e.target.value);
      setNewForm((prev) => ({
        ...prev,
        projectId: value >= 0 ? value : null,
      }));
    };
  }
};

export default BaseForm;