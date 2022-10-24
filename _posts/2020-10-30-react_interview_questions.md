---
layout:     post
title:      React Coding (Ⅳ)
subtitle:   Interview Questions
date:       2020-10-30
author:     lanbery
header-img: img/big-fronter.png
header-mask: 0.15
catalog: true
tags:
    - React
    - Big front
---

# 常见面试题

- jsx和Fiber有什么关系
- react17之前jsx文件为什么要声明import React from 'react'，之后为什么不需要了
- Fiber是什么，它为什么能提高性能

## hooks 

- 为什么hooks不能写在条件判断中?

## 状态/生命周期

- setState是同步的还是异步的 ?
- componentWillMount、componentWillMount、componentWillUpdate为什么标记UNSAFE ?

### React <=16.3 

![<=16.3](/img/front/react-circle-life-old.png)

**Old React**
- 挂载
  - constructor : 在React组件挂载之前被调用，在为React.Component子类实现构造函数时，应在其他语句之前调用
  - componentWillMount
  - render
  - componentDidMount 
- 更新
  - componentWillReceiveProps
  - shouldComponentUpdate
  - componentWillUpdate
  - render
  - componentDidUpdate 
- 卸载
  - componentWillUnmount 

![>16.3](/img/front/react-circle-life-17.x.png)

- 挂载
  - constructor
  - getDerivedStateFromProps
  - render : 方法是class组件中唯一必须实现的方法，用于渲染dom, render()方法必须返回reactDOM
  - componentDidMount :在组件挂载后 (插入DOM树后) 立即调用，componentDidMount() 是发送网络请求、启用事件监听方法的好时机，并且可以在 此钩子函数里直接调用 setState()
- 更新
  - getDeriverStateFromProps
  - shouldComponentUpdate : shouldComponentUpdate(nextProps, nextState)  在组件更新之前调用，可以控制组件是否进行更新， 返回true时组件更新， 返回false则不更新
  - render
  - getSnapshotBeforeUpdate : getSnapshotBeforeUpdate(prevProps, prevState) 在最近一次的渲染输出被提交之前调用。也就是说，在 render 之后，即将对组件进行挂载时调用
  - componentDidUpdate
- 卸载
  - componentWillUnmount
  
### 16.x VS 17.x

- 16 : babel-loader会预编译JSX为React.createElement(...)
- 17 : React 17中的 JSX 转换不会将 JSX 转换为 React.createElement， 而是自动从 React 的 package 中引入新的入口函数并调用。

#### 事件代理更改

```js
onst rootNode = document.getElementById('root');
ReactDOM.render(<App />, rootNode);

```
![](/img/front/react-16vs17-events.png)

在React 16和更早的版本中，React将对大多数事件执行document.addEventListener（）。React 17将在后调用rootNode.addEventListener（）


### React 16.x的三大新特性

> Time Slicing, Suspense，hooks

- Time Slicing（解决CPU速度问题）使得在执行任务的期间可以随时暂停，跑去干别的事情，这个特性使得react能在性能极其差的机器跑时，仍然保持有良好的性能

- Suspense （解决网络IO问题）和lazy配合，实现异步加载组件。 能暂停当前组件的渲染, 当完成某件事以后再继续渲染，解决从react出生到现在都存在的「异步副作用」的问题，而且解决得非

的优雅，使用的是「异步但是同步的写法」，我个人认为，这是最好的解决异步问题的方式

此外，还提供了一个内置函数 componentDidCatch，当有错误发生时, 我们可以友好地展示 fallback 组件；可以捕捉到它的子元素（包括嵌套子元素）抛出的异常；可以复用错误组件


## Component 

- react元素$$typeof属性什么
- react怎么区分Class组件和Function组件
- 函数组件和类组件的相同点和不同点 

## 开放性问题

- 1. 说说你对react的理解/请说一下react的渲染过程
- 2. 聊聊react生命周期
- 3. 简述diff算法
- 4. react有哪些优化手段
- 5. react为什么引入jsx
- 6. 说说virtual Dom的理解
- 7. 你对合成事件的理解
- 8. 我们写的事件是绑定在dom上么，如果不是绑定在哪里？
- 9. 为什么我们的事件手动绑定this(不是箭头函数的情况)
- 10. 为什么不能用 return false 来阻止事件的默认行为？
- 11. react怎么通过dom元素，找到与之对应的 fiber对象的
- 12. 点击Father组件的div，Child会打印Child吗
  
```js
function Child() {
  console.log('Child');
  return <div>Child</div>;
}
    
    
function Father(props) {
  const [num, setNum] = React.useState(0);
  return (
    <div onClick={() => {setNum(num + 1)}}>
      {num}
      {props.children}
    </div>
  );
}
    
    
function App() {
  return (
    <Father>
      <Child/>
    </Father>
  );
}
    
const rootEl = document.querySelector("#root");
ReactDOM.render(<App/>, rootEl);
```

- 13. 打印顺序是什么

```js
function Child() {
  useEffect(() => {
    console.log('Child');
  }, [])
  return <h1>child</h1>;
}
    
function Father() {
  useEffect(() => {
    console.log('Father');
  }, [])
      
  return <Child/>;
}
    
function App() {
  useEffect(() => {
    console.log('App');
  }, [])
    
  return <Father/>;
}
```

- 14. useLayoutEffect/componentDidMount和useEffect的区别是什么

```js
class App extends React.Component {
  componentDidMount() {
    console.log('mount');
  }
}
    
useEffect(() => {
  console.log('useEffect');
}, [])
```

- 15. 