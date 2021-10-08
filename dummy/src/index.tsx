import React from "react"
import ReactDom from "react-dom"

import { App } from './app'

export default () => <App />

export const mount = (Component) => {
    ReactDom.render(<Component />, document.getElementById('root'))
}

export const unmount = () => {
    ReactDom.unmountComponentAtNode(document.getElementById('root') as any)
}
