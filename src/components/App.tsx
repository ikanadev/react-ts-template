import { hot } from 'react-hot-loader/root';
import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, Typography } from '@material-ui/core';

export interface AppProps {
  name: string;
}

const App = (props: AppProps): JSX.Element => {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography variant="h3" color="primary">
          {`Hello ${props.name}, you're in a React + TS project`}
        </Typography>
      </Container>
    </Fragment>
  );
};

export default hot(App);
