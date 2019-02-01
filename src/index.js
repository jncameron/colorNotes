import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, { history } from './routes/AppRouter';
import GuestApp from './GuestApp';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

ReactDOM.render(<AppRouter />, document.getElementById('root'));

