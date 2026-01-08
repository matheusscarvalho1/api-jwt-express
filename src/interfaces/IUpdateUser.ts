export interface UpdateUserBody {
  firstName?: string;
  lastName?: string;
  age?: number;
  email?: string;
  password?: string;
}

export interface UpdateUserDTO {
  id: string;
  body: UpdateUserBody;
}
