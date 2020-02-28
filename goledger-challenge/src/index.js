import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './App';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#3e6edf',
		},

		secondary: {
			main: '#c91404',
		},
	},
});

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<App />
	</MuiThemeProvider>,
	document.getElementById('root')
);
