export interface IUser {
  readonly id: number;
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly address: UserAddress;
  readonly phone: string;
  readonly website: string;
  readonly company: UserCompany;
}

interface UserGeo {
  lat: string;
  lng: string;
}

interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: UserGeo;
}

interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

