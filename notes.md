# React Training Notes

## Imperative to Declarative

1. declare state
2. componetize
  - component doesn't have to be ui
  - e.g. "render to ears instead of eyes"
  - composability


## Compound components
Children.Map
```JavaScript
  React.Children.map(this.props.children, (child, index) => {
    return React.cloneElement(child, addProps)
  })
```

Think about html forms when thinking about components


## Context
4 types of state:
1. shared app state
2. prop state passed to children components
2. component internal state
3. state that needs to be shared in compound components

Use context as shared internal state for compound components.

Limit your use of context to small, self-contained pieces. Compound components are a decent use case.

Biggest problem: shouldComponentUpdate doesn't allow a check of context, a nested component using shouldComponentUpdate can screw up updates down the tree.

(OBSERVATION: this.setState callback: had no idea it existed. Is it better than await?)


## Higher Order Functions || Higher Order Components
Function that composes any arbitrary component to inject props.


## Render Callback || Render Props || Function as Child
A callback function as a child or 'render' prop of parent component.

Abstract out functionality that you want to share with other components, easily
pass props to child from the state of the parent in a clear, declarative way.

```javascript
class App extends React.Component {
//  ...
  render() {
    return (
      <Parent>
        {(param) => (
          <Child param={param} />
        )}
      </Parent>
    )
  }
//...
}

class Parent extends Component {
  render() {
    return this.props.children(param)
  }
}
```


## Controlled Components
Components that have their own state, but whose state can be controlled by a parent component if needed.

## Redux
The basic principles of redux can be implemented fairly easily using context.

## Performance & Rendering Optimizations
- Follow standard engineering performance optimizations
  - caching, memoization, etc.
- Use React.Perf
- `shouldComponentUpdate`
  - if a component changes most of the time, adding this will make render slower, because it will compare props and it will compare VDom.