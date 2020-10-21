import { hot } from 'react-hot-loader/root'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import { theme } from 'src/styles'
import { Home } from 'src/components/pages'

const Routes: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </MuiThemeProvider>
  )
}

export default hot(Routes)
