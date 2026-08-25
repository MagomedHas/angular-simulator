function getSum(a: number, b: number): number {
  return a + b;
}

let uploadStatus: 'loading' | 'success' | 'error';
let textFormat: 'uppercase' | 'lowercase' | 'capitalize';

interface IUser {
  name: string;
  surname: string;
  age: number;
  email: string;
  password: string;
  party?: string;
}

interface IAdmin extends IUser {
  accessLevel: number;
  group: string;
}

function formatString(str: string, format: 'uppercase' | 'lowercase' | 'capitalize'): string {
  if (format === 'uppercase') return str.toUpperCase();
  if (format === 'lowercase') return str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function deleteChar(str: string, char: string): string {
  return str.replaceAll(char, '');
}

const users: IUser[] = [
  {
    name: "Иван",
    surname: "Петров",
    age: 25,
    password: 'fg4rerwerdswfrtelp',
    email: "ivan.petrov@example.com"
  },
  {
    name: "Мария",
    surname: "Иванова",
    age: 30,
    password: 'sijsaepwwruoidfdjsid',
    email: "maria.ivanova@example.com"
  },
  {
    name: "Алексей",
    surname: "Сидоров",
    age: 22,
    password: 'diksdsoijhfgeehifjf',
    email: "alexey.sidorov@example.com"
  },
  {
    name: "Екатерина",
    surname: "Кузнецова",
    password: 'wpirfvgo[jugr[ojgb',
    age: 28,
    email: "ekaterina.kuznetsova@example.com"
  },
  {
    name: "Дмитрий",
    surname: "Смирнов",
    password: 'edorfjgujifescdo',
    age: 35,
    email: "dmitry.smirnov@example.com"
  }
]

users.sort((a, b) =>  a.age - b.age);
console.log(users);
