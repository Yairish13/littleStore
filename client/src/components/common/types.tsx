export interface newUser {
    name: string,
    address: string,
    password: string,
    payment: string |'cash' | 'credit',
    role: string,
  }