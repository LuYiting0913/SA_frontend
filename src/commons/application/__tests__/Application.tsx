import { shallow } from 'enzyme';
import { useSelector } from 'react-redux';

import Application from '../Application';

// JSDOM does not implement window.matchMedia, so we have to mock it.
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {}
    };
  };

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));
const useSelectorMock = useSelector as jest.Mock;

test('Application renders correctly', () => {
  useSelectorMock.mockReturnValue({ name: 'Bob' });

  const app = <Application />;
  const tree = shallow(app);
  expect(tree.debug()).toMatchSnapshot();
});
