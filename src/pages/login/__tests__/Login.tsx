import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';

import { mockInitialStore } from '../../../commons/mocks/StoreMocks';
import Login from '../Login';

jest.mock('../../../commons/utils/Constants', () => {
  return {
    __esModule: true,
    default: {
      authProviders: new Map([['luminus', { name: 'LumiNUS' }]]),
      defaultSourceChapter: 4,
      defaultSourceVariant: 'default'
    }
  };
});

test('Login renders correctly', async () => {
  const store = mockInitialStore();
  const app = (
    <Provider store={store}>
      <StaticRouter location="/login">
        <Login />
      </StaticRouter>
    </Provider>
  );
  const tree = render(app);
  expect(await tree.findByText('Log in with LumiNUS')).toBeTruthy();
});

test('Loading login renders correctly', async () => {
  const store = mockInitialStore();
  const app = (
    <Provider store={store}>
      <StaticRouter location="/login?code=abcde">
        <Login />
      </StaticRouter>
    </Provider>
  );
  const tree = render(app);
  expect(await tree.findByText('Logging In...')).toBeTruthy();
});
