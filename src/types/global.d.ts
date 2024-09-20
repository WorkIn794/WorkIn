// User types
import type { XOR } from "ts-xor";

interface Practitioner{
	practitioner: boolean;
};
interface Enterprise{
	enterprise: boolean;
};
type User = XOR<Practitioner, Enterprise>;