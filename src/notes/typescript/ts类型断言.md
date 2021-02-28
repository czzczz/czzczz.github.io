# ts 类型断言

通过`as`关键字可以强制指定某个变量的类型，以此来避免类型检查带来的必须对逻辑进行修改的情况。

```ts
interface Foo {
	bar: number;
	bas: string;
}

const foo = {} as Foo;
foo.bar = 123;
foo.bas = 'hello';
```

若不进行断言，上述代码对空对象的再次赋值将会报错，这种情况在 js 迁移到 ts 时可能会遇到。

## 类型断言被认为是有害的

如果没有按约定添加属性，TypeScript 编译器并不会对此发出错误警告。

```ts
interface Foo {
	bar: number;
	bas: string;
}

const foo = {} as Foo;

// ahhh, 忘记了什么？
```

```ts
interface Foo {
	bar: number;
	bas: string;
}

const foo: Foo = {
	// 编译器将会提供 Foo 属性的代码提示
};
```

## 双重断言

当使用者了解传入参数更具体的类型时，类型断言能按预期工作:

```ts
function handler(event: Event) {
	const mouseEvent = event as MouseEvent;
}
```

然而，如下例子中的代码将会报错，尽管使用者已经使用了类型断言

```ts
function handler(event: Event) {
	const element = event as HTMLElement; // Error: 'Event' 和 'HTMLElement' 中的任何一个都不能赋值给另外一个
}
```

这时，可以先断言为 any，再断言为另一个：

```ts
function handler(event: Event) {
	const element = (event as any) as HTMLElement; // ok
}
```

### TypeScript 是怎么确定单个断言是否足够

当 S 类型是 T 类型的子集，或者 T 类型是 S 类型的子集时，S 能被成功断言成 T。这是为了在进行类型断言时提供额外的安全性，完全毫无根据的断言是危险的，如果你想这么做，你可以使用 any。
