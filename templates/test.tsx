import { render, screen } from '@testing-library/react';
import {{COMPONENT_NAME}} from './{{COMPONENT_NAME}}';

test('renders {{COMPONENT_NAME}}', () => {
  render(<{{COMPONENT_NAME}}>Hello</{{COMPONENT_NAME}}> />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
