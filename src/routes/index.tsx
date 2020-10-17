import { hot } from 'react-hot-loader/root'
import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import { theme } from 'src/styles'
import { Home } from 'src/components/pages'

const Routes: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/"
          render={(): React.ReactElement => <Redirect to="/" />}
        />
      </Switch>
    </MuiThemeProvider>
  )
}

export default hot(Routes)
