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