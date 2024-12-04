// Namespaces are declared as <Namespace>__<type> for better readability
import type { XOR } from "ts-xor";
import type { ObjectId } from "mongodb";

// General component props
type ClassName = string | string[];
type Status = "Closed" | "In Progress" | "Accepted";

// !TODO: Change processes to a ObjectId[]
interface Enterprise{
	_id: ObjectId;
	email: string;
	password: string;
	contactNumber: string;
	firstName: string;
	lastName: string;
	plan: string;
	processes: string[];
	enterpriseName: string;
};

// !TODO: Add duration and startDate to Process, both, types and form fields.
interface Process{
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

interface Session{
	_id: ObjectId;
	email: string;
};

/* ~~ User types props ~~ */
interface User__Practitioner{
	practitioner: boolean;
};
interface User__Enterprise{
	enterprise: boolean;
};
type User = XOR<User__Practitioner, User__Enterprise>;

/* ~~ Process cards types ~~ */
type ProcessCard__Applicant = {
	firstName: string;
	lastName: string;
	skills: string[];
};

// Enterprise cards types
interface ProcessCard__Enterprise {
	id: number;
	enterprise: true;
	position: string;
	status: Status;
	description: string;
	applicants: ProcessCard__Applicant[];
};

// Practitioner cards types
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

/* ~~ View types ~~ */

// Enterprise view types
interface EnterpriseView__Processes{
	processes: boolean;
};
interface EnterpriseView__Dashboard{
	dashboard: boolean;
};
type EnterpriseView = XOR<EnterpriseView__Processes, EnterpriseView__Dashboard>;

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