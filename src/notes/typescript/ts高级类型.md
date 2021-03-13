# TS 的高级类型应用

通过 ts 语法让编译器自行推断变量类型

## 交叉和联合

### 交叉类型

```ts
type B = A & C;
```

B 将会拥有 A 和 C 的所有类型及成员，`若A和C存在两个同名但是不同类型的成员，则该成员的类型也会进行对应的交叉`

### 联合类型

```ts
type B = A | C;
```

B 既可以是 A 类型也可以是 C 类型，在接收不定类型参数时常常会用到

### 针对联合类型的类型保护和区分

对应基本类型如`number`及`string`等，可以直接用`typeof`进行类型区分
但是如果是一个自定义的复杂类型，需要定义一个类型保护函数（近似于 js 里根据是否存在某个成员来区分对象属性）
之后便可通过该函数来区分一个联合类型，ts 可以对其进行正确的类型推断

```ts
function isFish(pet: Fish | Bird): pet is Fish {
	return (<Fish>pet).swim !== undefined;
}

if (isFish(pet)) pet.swim();
else pet.fly();
```

## 常用的内置高级类型

### Record

将 K 中的每个属性(类型为 K，若为字符串字面量就只有对应的一个属性)，都转为 T 类型

```ts
type Record<K extends string, T> = {
	[P in K]: T;
};

type BB = Record<string, MayBe>;
```

### Pick

取出 T 中的对应的 key 构成新类型

```ts
type Pick<T, K extends keyof T> = {
	[P in K]: T[P];
};

type BB = Pick<May, 'data' | 'dataKey'>;
```

### Omit

去除类型中的对应成员

```ts
// 用Exclude取出T中没有在K存在的成员，然后用Pick取出其对应类型生成新的类型
type Omit<T, K extends string | number | symbol> = Pick<T, Exclude<keyof T, K>>;

type AA = {
	id: string;
	name: string;
	value?: number;
};
type CC = Omit<AA, 'id' | 'value'>; // { name: string }
```

### Readonly

将一个类型的所有成员转变为只读的

```ts
type Readonly<T> = {
	readonly [P in keyof T]: T[P];
};
```

### Partial

将一个类型的所有成员转变为可选的

```ts
type Partial<T> = {
	[P in keyof T]?: T[P];
};
```

## 常用的条件类型

### Exclude<T, U>

用于从类型 T 中去除不在 U 类型中的成员，`即取A对B的差集`

```ts
type AA = 1 | 2 | 3 | 4;
type BB = 1 | 2 | 5;
type CC = Exclude<AA, BB>; // 3 | 4
```

### Extract<T, U>

用于从类型 T 中取出可分配给 U 类型的成员，`即取二者交集`

```ts
type AA = 1 | 2 | 3 | 4;
type BB = 1 | 2 | 5;
type CC = Extract<AA, BB>; // 1 | 2
```

### NonNullable<T>

用于从类型 T（联合类型） 中去除 undefined 和 null 类型

```ts
type AA = 1 | 2 | 3 | 4 | undefined | null;
type CC = NonNullable<AA>; // 1 | 2 | 3 | 4
```

### ReturnType<T>

获取函数类型的返回类型

```ts
type AA = (data: string) => number;
type CC = ReturnType<AA>; // number
```

### InstanceType<T>

获取构造函数的实例类型

```ts
class AA {}
type CC = InstanceType<typeof AA>; // AA
```
