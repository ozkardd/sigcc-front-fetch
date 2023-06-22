import { useEffect, useState } from 'react';
import { formatDashboardJson, navigateTo } from '@features/Modulo3/utils/functions';
import { Form, Button } from 'react-bootstrap';
import Layout from '@features/Modulo3/components/Layout/Content/Content';
import Section from '@features/Modulo3/components/Layout/Section/Section';
import TableCategories from '@features/Modulo3/components/Tables/TableCategories';
import LoadingScreen from '@features/Modulo3/components/Shared/LoadingScreen/LoadingScreen';
import NoDataFound from '@features/Modulo3/components/Shared/NoDataFound/NoDataFound';
import cat from '@features/Modulo3/jsons/Categories';
import { listAllCategorias } from '@features/Modulo3/services/categories';
import { CATEGORIES_CREATE, CATEGORIES_INDEX } from '@features/Modulo3/routes/path';
import '../EvaluacionContinua/EvaluacionContinua.css';
import { CONTINUOS_EVALUATION_TYPE } from '@features/Modulo3/utils/constants';
const Index = () => {

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await listAllCategorias(CONTINUOS_EVALUATION_TYPE);
      if(response){
        console.log("response",response);
        setCategories(response)
      }
        
      setIsLoading(false);
    })();
  }, []);

  const filters = (
		<Form.Group controlId="searchEmployees" className="d-flex justify-content">
        <Form.Control
		placeholder="Buscar categoría"
		aria-describedby="ec-indexSearch"
        className="me-2 w-90"
		/><Button variant="primary">Buscar</Button>
		</Form.Group>
  );


  const table =(
    <div>
      <TableCategories rows ={categories}/>
    </div>
  );

  const content = (
		<>
			{categories && categories.length > 0 ? (
				<div className="row mt-32">
					{table}
				</div>
			) : (
				<NoDataFound />
			)}
			<div className="text-end">
				<Button
					onClick={() => {
						navigateTo(CATEGORIES_CREATE);
					}}>
					Agregar nueva categoría
				</Button>
			</div>
		</>
	);

  const body = (
    <Section
      title={"Categorías"}
      content={isLoading ? <LoadingScreen/> : content}
      filters={filters}
    />
  );

  return (
    <Layout
        title={`Gestión de Categorías`}
		body={body}
		route={CATEGORIES_INDEX}
		subtitle={``}
			/>
		
	);
};

export default Index;