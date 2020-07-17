import React from 'react';
import {
	render,
	cleanup,
	fireEvent,
	waitFor,
	act,
} from '@testing-library/react';
import ContactForm from './ContactForm';

afterEach(() => {
	cleanup();
});

test('renders without crashing', () => {
	const { asFragment } = render(<ContactForm />);
	expect(asFragment()).toMatchSnapshot();
});

test('renders first name input and label', () => {
	const { getByTestId } = render(<ContactForm />);

	getByTestId('firstNameLabel');
	getByTestId('firstNameInput');
});

test('renders last name input and label', () => {
	const { getByTestId } = render(<ContactForm />);

	getByTestId('lastNameLabel');
	getByTestId('lastNameInput');
});

test('renders message textarea and label', () => {
	const { getByTestId } = render(<ContactForm />);

	getByTestId('messageLabel');
	getByTestId('messageTextarea');
});

test('renders disabled submit button ', async () => {
	const { getByTestId } = render(<ContactForm />);

	const button = getByTestId('submitButton');
	await waitFor(() => expect(button).toBeDisabled());
});

test('fills out form correctly and submits', async () => {
	const { getByTestId } = render(<ContactForm />);

	const firstName = getByTestId('firstNameInput');
	fireEvent.change(firstName, { target: { value: 'joseph' } });
	expect(getByTestId('firstNameInput')).toHaveValue('joseph');

	const lastName = getByTestId('lastNameInput');
	fireEvent.change(lastName, { target: { value: 'johnson' } });
	expect(getByTestId('lastNameInput')).toHaveValue('johnson');

	const email = getByTestId('emailInput');
	fireEvent.change(email, { target: { value: 'joejohnson@email.com' } });
	expect(getByTestId('emailInput')).toHaveValue('joejohnson@email.com');

	const message = getByTestId('messageTextarea');
	fireEvent.change(message, { target: { value: 'a message' } });
	expect(getByTestId('messageTextarea')).toHaveValue('a message');

	act(async () => {
		const button = getByTestId('submitButton');
		fireEvent.click(button);
	});

	const pre = await waitFor(() => getByTestId('pre'));
	expect(pre).toHaveTextContent('joseph');
	expect(pre).toHaveTextContent('johnson');
	expect(pre).toHaveTextContent('joejohnson@email.com');
	expect(pre).toHaveTextContent('a message');
});

// test('fills out form incorrectly and fails to submit', async () => {
// 	const { getByTestId } = render(<ContactForm />);

// 	const firstName = getByTestId('firstNameInput');
// 	fireEvent.change(firstName, { target: { value: 'joseph' } });
// 	expect(getByTestId('firstNameInput')).toHaveValue('joseph');

// 	const lastName = getByTestId('lastNameInput');
// 	fireEvent.change(lastName, { target: { value: 'johnson' } });
// 	expect(getByTestId('lastNameInput')).toHaveValue('johnson');

// 	const email = getByTestId('emailInput');
// 	fireEvent.change(email, { target: { value: 'joejohnson@email.com' } });
// 	expect(getByTestId('emailInput')).toHaveValue('joejohnson@email.com');

// 	const message = getByTestId('messageTextarea');
// 	fireEvent.change(message, { target: { value: 'a message' } });
// 	expect(getByTestId('messageTextarea')).toHaveValue('a message');

// 	act(() => {
// 		const submit = getByTestId('submitButton');
// 		fireEvent.click(submit);
// 	});

// 	const pre = await waitFor(() => getByTestId('pre'));
// 	expect(pre).toHaveTextContent('joseph');
// 	expect(pre).toHaveTextContent('johnson');
// 	expect(pre).toHaveTextContent('joejohnson@email.com');
// 	expect(pre).toHaveTextContent('a message');
// });
