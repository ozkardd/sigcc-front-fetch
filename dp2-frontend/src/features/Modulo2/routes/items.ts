import { TSidebarItemGroup } from "@routes/types/sidebarItem";
import { Roles } from "@routes/types/roles";
import { People, Person, Table, JournalCheck } from "react-bootstrap-icons";
import {
	GAPS_ANALYSIS_MODULE,
	COMPETENCES,
	GAPS_EMPLOYEES_ORG,
	GAPS_EMPLOYEE_EMP,
	EMPLOYEES_JOB_OPPORTUNITIES,
	MY_JOB_OPPORTUNITIES,
	INDEX,
	GAPS_EMPLOYEES_AREA,
	DEMAND_COMPANY_COURSES
} from "./path";

export const sideBarItemsGroup2: TSidebarItemGroup[] = [
	{
		groupName: "Competencias y RRHH",
		roles: [Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.HR_WORKER, Roles.GENERAL_MANAGER],
		children: [
			{	
				name: "Gestión de competencias",
				icon: People,
				roles: [Roles.HR_ADMIN],
				hasChildren: false,
				route: `/${GAPS_ANALYSIS_MODULE}/${COMPETENCES}/${INDEX}`
			},
			{
				name: "Competencias por puesto",
				icon: People,
				roles: [Roles.HR_ADMIN, Roles.HR_WORKER, Roles.GENERAL_MANAGER],
				hasChildren: false,
				route: `/${GAPS_ANALYSIS_MODULE}/${GAPS_EMPLOYEES_AREA}/${INDEX}`
			},
			{
				name: "Competencias por area",
				icon: People,
				roles: [Roles.HR_ADMIN, Roles.HR_WORKER, Roles.GENERAL_MANAGER],
				hasChildren: false,
				route: `/${GAPS_ANALYSIS_MODULE}/${GAPS_EMPLOYEES_ORG}/${INDEX}`
			},
			{
				name: "Ofertas laborales",
				icon: People,
				roles: [Roles.HR_ADMIN, Roles.HR_MANAGER, Roles.HR_WORKER],
				hasChildren: false,
				route: `/${GAPS_ANALYSIS_MODULE}/${EMPLOYEES_JOB_OPPORTUNITIES}/${INDEX}`
			}
		]
	},
	{
		groupName: "Brechas y oportunidades",
		roles: [Roles.WORKER],
		children: [
			{
				name: "Mis brechas",
				icon: People,
				roles: [Roles.WORKER],
				hasChildren: false,
				route: `/${GAPS_ANALYSIS_MODULE}/${GAPS_EMPLOYEE_EMP}/${INDEX}`
			},
			{
				name: "Mis oportunidades laborales",
				icon: People,
				roles: [Roles.WORKER],
				hasChildren: false,
				route: `/${GAPS_ANALYSIS_MODULE}/${MY_JOB_OPPORTUNITIES}/${INDEX}`
			}
		]
	},
	{
		groupName: "Demanda de cursos",
		roles: [Roles.HR_ADMIN, Roles.HR_MANAGER],
		children: [
			{
				name: "Generar demanda",
				icon: JournalCheck,
				roles: [Roles.HR_ADMIN, Roles.HR_WORKER],
				hasChildren: false,
				route: `/${GAPS_ANALYSIS_MODULE}/${DEMAND_COMPANY_COURSES}/${INDEX}`
			}
		]
	}
];
