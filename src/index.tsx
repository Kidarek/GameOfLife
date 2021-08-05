import ReactDOM from "react-dom"
import { store } from './store'
import { Provider } from 'react-redux'
import "./index.css"
import Game from './components/Game'

import {
    ThemeProvider,
    // unstable_createMuiStrictModeTheme as createMuiTheme,
    createTheme
} from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
})


// ========================================
ReactDOM.render(
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Provider store={store}>
            <Game />
        </Provider>
    </ThemeProvider>,
    document.getElementById("root")
)

