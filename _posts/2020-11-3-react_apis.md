---
layout:     post
title:      Reread React Soruce Code (Ⅴ)
subtitle:   Core APIs 
date:       2020-11-3
author:     lanbery
header-img: img/big-fronter.png
header-mask: 0.15
catalog: true
tags:
    - React
    - Big front
---

## Children 

```javascript
Children: {
    map,
    forEach,
    count,
    toArray,
    only,
  },
```

> 这个对象提供了一堆帮你处理props.children的方法，因为children是一个类似数组但是不是数组的数据结构，如果你要对其进行处理可以用React.Children外挂的方法

## createRef

> 新的ref用法，React即将抛弃<div ref="myDiv" />这种string ref的用法，将来你只能使用两种方式来使用ref

```js
class App extends React.Component{

  constructor() {
    this.ref = React.createRef()
  }

  render() {
    return <div ref={this.ref} />
    // or
    return <div ref={(node) => this.funRef = node} />
  }

}
```

## Component & PureComponent

> Component & PureComponent 这两个类基本相同，唯一的区别是PureComponent的原型上多了一个标识

```js
if (ctor.prototype && ctor.prototype.isPureReactComponent) {
  return (
    !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
  );
}

```

> 这是检查组件是否需要更新的一个判断，ctor就是你声明的继承自Component or PureComponent的类，他会判断你是否继承自PureComponent，如果是的话就shallowEqual比较state和props。

顺便说一下：React中对比一个ClassComponent是否需要更新，只有两个地方。一是看有没有shouldComponentUpdate方法，二就是这里的PureComponent判断


## createContext

```jsx
const { Provider, Consumer } = React.createContext('defaultValue')

const ProviderComp = (props) => (
  <Provider value={'realValue'}>
    {props.children}
  </Provider>
)

const ConsumerComp = () => (
  <Consumer>
    {(value) => <p>{value}</p>}
  </Consumber>
)
```


## forwardRef

> forwardRef是用来解决HOC组件传递ref的问题的，所谓HOC就是Higher Order Component，比如使用redux的时候，我们用connect来给组件绑定需要的state，这其中其实就是给我们的组件在外部包了一层组件，然后通过...props的方式把外部的props传入到实际组件。forwardRef的使用方法如下

```jsx
const TargetComponent = React.forwardRef((props, ref) => (
  <TargetComponent ref={ref} />
))
```

## Fragment

## createElement & cloneElement & createFactory & isValidElement

> createElement可谓是React中最重要的API了，他是用来创建ReactElement的



