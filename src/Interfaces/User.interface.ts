interface ICreateUser {
  email: string;
  password: string;
  name: string;
}

interface ILoginUser {
  email: string;
  password: string;
}

export { ICreateUser, ILoginUser };
