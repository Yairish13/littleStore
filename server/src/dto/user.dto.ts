
export class UserResponse {
  id?: string;
  name: string;
  address: string;
  payment: "cash" | "credit";
  role: string;
}
export type payload = {
  id: string;
};
