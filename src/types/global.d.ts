// !TODO: Add namespace View to these types

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
interface PractitionerCard{
	practitioner: true;
	status: Status;
	timePublished: string;
	company: string;
	companyDescription: string;
	duration: string;
	startDate: string;
	location: string;
	salary: string;
};
interface EnterpriseCard{
	enterprise: true;
	status: Status;
	position: string;
	details: Applicant[];
};
type UserExtendedCard = XOR<PractitionerCard, EnterpriseCard>;

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