export interface IUser {
  readonly id: number;
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly address: {
    readonly street: string;
    readonly suite: string;
    readonly city: string;
    readonly zipcode: string;
    readonly geo: {
      readonly lat: string;
      readonly lng: string;
    }
  }
  readonly phone: string;
  readonly website: string;
  readonly company: {
    readonly name: string;
    readonly catchPhrase: string;
    readonly bs: string;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isUser(value: unknown): value is IUser {
  if (!isRecord(value)) return false;

  const { address, company } = value;
  if (!isRecord(address) || !isRecord(company)) return false;

  const { geo } = address;
  return (
    typeof value['id'] === 'number' &&
    Number.isFinite(value['id']) &&
    typeof value['name'] === 'string' &&
    typeof value['username'] === 'string' &&
    typeof value['email'] === 'string' &&
    typeof value['phone'] === 'string' &&
    typeof value['website'] === 'string' &&
    typeof address['street'] === 'string' &&
    typeof address['suite'] === 'string' &&
    typeof address['city'] === 'string' &&
    typeof address['zipcode'] === 'string' &&
    isRecord(geo) &&
    typeof geo['lat'] === 'string' &&
    typeof geo['lng'] === 'string' &&
    typeof company['name'] === 'string' &&
    typeof company['catchPhrase'] === 'string' &&
    typeof company['bs'] === 'string'
  );
}

export function isUserArray(value: unknown): value is IUser[] {
  return Array.isArray(value) && value.every(isUser);
}
