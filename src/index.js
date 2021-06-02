import React from 'react'
import ReactDOM from 'react-dom'
//REDUX SETUP
import { BrowserRouter } from 'react-router-dom'
import loadable from '@loadable/component'
import { PrerenderedComponent } from 'react-prerendered-component'

const prerenderedLoadable = (dynamicImport) => {
  const LoadableComponent = loadable(dynamicImport)
  return React.memo((props) => (
    // you can use the `.preload()` method from react-loadable or react-imported-component`
    <PrerenderedComponent live={LoadableComponent.load()}>
      <LoadableComponent {...props} />
    </PrerenderedComponent>
  ))
}
const MyComponent = prerenderedLoadable(() => import('./App'))

const rootElement = document.getElementById('root')

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(
    setTimeout(() => {
      ;<BrowserRouter>
        <MyComponent />
      </BrowserRouter>
    }, 3000),
    rootElement
  )
} else {
  ReactDOM.render(
    <BrowserRouter>
      <MyComponent />
    </BrowserRouter>,
    rootElement
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
