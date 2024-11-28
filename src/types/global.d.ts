// Namespaces are declared as <Namespace>__<type> for better readability
import type { XOR } from "ts-xor";

// General component props
type ClassName = string | string[];

// Base types
type Status = "Closed" | "In Progress" | "Accepted";

// !TODO: Add duration and startDate to Process, both, types and form fields.
// !TODO: Inherit ProcessCard__Enterprise from Process.
interface Process{
	_id: string;
	jobPosition: string;
	modality: string;
	department: string;
	district: string;
	companyDescription: string;
	description: string;
	requirements: string;
	salary: string;
	skills: string;
	onboarding: string;
	benefits: string;
	status: Status;
	enterpriseId: string;
};

interface Practitioner{
	practitioner: boolean;
};
interface Enterprise{
	enterprise: boolean;
};
type User = XOR<Practitioner, Enterprise>;

// User extended props
type Applicant = {
	firstName: string;
	lastName: string;
	skills: string[];
};

// Cards types
interface ProcessCard__Enterprise {
	id: number;
	enterprise: true;
	status: Status;
	position: string;
	description: string;
	applicants: Applicant[];
};
interface ProcessCard__Practitioner
	extends Pick<Process,
	| "jobPosition"
	| "description"
	| "salary"
	| "status"> {
	id: number;
	practitioner: true;
	company: string;
	skills: string;
	requirements: string;
	benefits: string;
	publishedDate: string;
	startDate: string;
	duration: string;
	location: string;
};
type ProcessCard = XOR<ProcessCard__Enterprise, ProcessCard__Practitioner>;

// Link props
interface IconRight{
	iconLeft: boolean;
};
interface IconLeft{
	iconRight: boolean;
};
type IconPosition = XOR<IconRight, IconLeft>;
type IconName = string;
type IconProps =
	| ({icon: IconName} & IconPosition)
	| {icon?: undefined; iconLeft?: undefined; iconRight?: undefined;}
	;

// Practitioner view types
interface Practitioner__View__MyResumes{
	myResumes: boolean;
};
interface Practitioner__View__Internships{
	internships: boolean;
};
interface Practitioner__View__TrainingPack{
	trainingPack: boolean;
};
type Practitioner__View = XOR<
	Practitioner__View__MyResumes,
	Practitioner__View__Internships,
	Practitioner__View__TrainingPack
	>;

// Enterprise view props
interface Process{
	process: boolean;
};
interface Dashboard{
	dashboard: boolean;
};
type EnterpriseView = XOR<Process, Dashboard>;