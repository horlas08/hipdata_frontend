const ab = ['q', 'w', 1, 2]
// type Prettier<T> = {
//     [K in keyof T]: T[K]
// } & {}
type A = Pick<typeof ab, number>
const trash = {
    'login': ''
}

// Without & {}
type Regular<T> = {
    [K in keyof T]: T[K]
}

// With & {}
export type Prettier<T> = {
    [K in keyof T]: T[K]
} & {}

interface Person {
    name: string;
    age: number;
}

// Let's create variables with these types
const example1: Regular<Person> = { name: "John", age: 30 };
const example2: Prettier<Person> = { name: "John", age: 30 };


export {}