<!-- imageRoot:javascript\react -->

# react Hook

通过 Hook，可以在函数组件中完成原本只能在 class 组件中才能完成的操作，比如 state 和生命周期的操作（也叫副作用）。

## state Hook

```js
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);

  return (
      //
  )
}
```

`useState`的返回值为 state 属性以及其 setter 函数。由于该函数可多次调用，因此我们可以获得多个响应式变量以及其对应的 setter。

### state Hook 的函数式更新

`如果新的 state 需要通过使用先前的 state 计算得出`，那么可以将函数传递给 setState。该函数将接收先前的 state，并返回一个更新后的值。

```js
function Counter({ initialCount }) {
	const [count, setCount] = useState(initialCount);
	return (
		<>
			Count: {count}
			<button onClick={() => setCount(initialCount)}>Reset</button>
			<button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
			<button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
		</>
	);
}
```

## effect Hook

Effect Hook 可以让你在函数组件中执行副作用操作。

```js
import React, { useState, useEffect } from 'react';

function Example() {
	const [count, setCount] = useState(0);

	// Similar to componentDidMount and componentDidUpdate:
	useEffect(() => {
		// Update the document title using the browser API
		document.title = `You clicked ${count} times`;
		return function cleanup() {
			ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
		};
	});

	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	);
}
```

`useEffect`的效果相当于`componentDidMount`，`componentDidUpdate` 和`componentWillUnmount` 这三个函数的组合。

useEffect 的返回值为一个函数。React 会在组件卸载的时候执行清除操作。`而effect在每次渲染的时候都会执行。`

在一个组件内可以多次声明，实际执行会按照声明顺序执行，仅有助于逻辑上理解。

```js
function FriendStatus(props) {
  // ...
  useEffect(() => {
    // ...
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

```

以上代码实际执行效果将为：

```js
// Mount with { friend: { id: 100 } } props
ChatAPI.subscribeToFriendStatus(100, handleStatusChange); // 运行第一个 effect

// Update with { friend: { id: 200 } } props
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // 清除上一个 effect
ChatAPI.subscribeToFriendStatus(200, handleStatusChange); // 运行下一个 effect

// Update with { friend: { id: 300 } } props
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // 清除上一个 effect
ChatAPI.subscribeToFriendStatus(300, handleStatusChange); // 运行下一个 effect

// Unmount
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // 清除最后一个 effect
```

这样将生命周期函数的效果进行合并，优点为调用更加简洁，因为大多数时候我们都需要在页面渲染完成时做一些事情。但是在有的时候难以满足需求，或者会带来性能问题。

这时可以通过跳过 effect 来解决。

### 为 effect Hook 设置依赖

```js
// class组件中的解决方法：prevProps, prevState
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

这是很常见的需求，所以它被内置到了 useEffect 的 Hook API 中。如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React 跳过对 effect 的调用，只要传递数组作为 useEffect 的第二个可选参数即可：

```js
useEffect(() => {
	document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

如果传入的数组依赖频繁发生变化，可能导致 bug：

```js
function Counter() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const id = setInterval(() => {
			setCount(count + 1); // 这个 effect 依赖于 `count` state
		}, 1000);
		return () => clearInterval(id);
	}, []); // 🔴 Bug: `count` 没有被指定为依赖

	return <h1>{count}</h1>;
}
```

传入空的依赖数组 []，意味着该 hook 只在组件挂载时运行一次，并非重新渲染时。但如此会有问题，在 setInterval 的回调中，count 的值不会发生变化。`因为当 effect 执行时，会创建一个闭包，并将 count 的值被保存在该闭包当中`，且初值为 0。每隔一秒，回调就会执行 setCount(0 + 1)，因此，count 永远不会超过 1。

解决方案：[函数式更新](#state-hook%e7%9a%84%e5%87%bd%e6%95%b0%e5%bc%8f%e6%9b%b4%e6%96%b0)

```js
function Counter() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const id = setInterval(() => {
			setCount(c => c + 1); // ✅ 在这不依赖于外部的 `count` 变量
		}, 1000);
		return () => clearInterval(id);
	}, []); // ✅ 我们的 effect 不适用组件作用域中的任何变量

	return <h1>{count}</h1>;
}
```

此时，setInterval 的回调依旧每秒调用一次，但每次 setCount 内部的回调取到的 count 是最新值（在回调中变量命名为 c）。
