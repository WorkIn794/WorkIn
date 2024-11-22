// Namespaces are declared as <Namespace>__<type> for better readability

// General component props
type ClassName = string | string[];

// User types
import type { XOR } from "ts-xor";

interface Practitioner{
	practitioner: boolean;
};
interface Enterprise{
	enterprise: boolean;
};
type User = XOR<Practitioner, Enterprise>;

// User extended props
type Status = "Closed" | "In Progress" | "Accepted";
type Applicant = {
	firstName: string;
	lastName: string;
	skills: string[];
};

interface ProcessCard__Enterprise{
	id: number;
	enterprise: true;
	status: Status;
	position: string;
	description: string;
	applicants: Applicant[];
};
interface ProcessCard__Practitioner{
	id: number;
	practitioner: true;
	company: string;
	jobPosition: string;
	status: Status;
	publishedTime: string;
	description: string;
	duration: string;
	salary: string;
	startDate: string;
	Location: string;
};
type ProcessCard = XOR<ProcessCard__Enterprise, ProcessCard__Practitioner>;

// Enterprise view props
interface Process{
	process: boolean;
};
interface Dashboard{
	dashboard: boolean;
};
type EnterpriseView = XOR<Process, Dashboard>;

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

// Practitioner types
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