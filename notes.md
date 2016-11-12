# Training Notes

## Imperative to Declarative

1. declare state
2. componetize
  - component doesn't have to be ui
  - "render to ears instead of eyes"
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
-  prop state passed to children components
-  component internal state
-  state that needs to be shared in compound components

Use context as shared internal state for compound components.

Limit your use of context to small, self-contained pieces like compound components are a decent
use case.

Biggest problem: shouldComponentUpdate

(OBSERVATION: this.setState callback: had no idea it existed. Is it better than await?)


## Higher Order Components
Cool stuff.


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


## Redux


## Performance & Rendering Optimizations
- Follow standard engineering performance optimizations
  - caching, memoization, etc.
- Use React.Perf

`shouldComponentUpdate`
- if a component changes most of the time, adding this will make render slower,
  because it will compare props and it will compare VDom.
