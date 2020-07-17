import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ContactForm = () => {
	const [data, setData] = useState();

	const { register, errors, handleSubmit, formState } = useForm({
		mode: 'onChange',
	});
	const onSubmit = (data) => {
		setData(data);
	};

	return (
		<div className='App'>
			<form onSubmit={handleSubmit(onSubmit)} data-testid='form'>
				<div>
					<label htmlFor='firstName' data-testid='firstNameLabel'>
						First Name*
					</label>
					<input
						data-testid='firstNameInput'
						name='firstName'
						placeholder='First Name'
						ref={register({ required: true })}
					/>
					{errors.firstName && (
						<p>Looks like there was an error: {errors.firstName.type}</p>
					)}
				</div>

				<div>
					<label htmlFor='lastName' data-testid='lastNameLabel'>
						Last Name*
					</label>
					<input
						data-testid='lastNameInput'
						name='lastName'
						placeholder='Last Name'
						ref={register({ required: true })}
					/>
					{errors.lastName && (
						<p>Looks like there was an error: {errors.lastName.type}</p>
					)}
				</div>

				<div>
					<label data-testid='emailLabel' htmlFor='email'>
						Email*
					</label>
					<input
						data-testid='emailInput'
						name='email'
						placeholder='Email'
						ref={register({
							required: true,
							pattern: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
						})}
					/>
					{errors.email && (
						<p>Looks like there was an error: {errors.email.type}</p>
					)}
				</div>
				<div>
					<label htmlFor='message' data-testid='messageLabel'>
						Message (Optional)
					</label>
					<textarea
						name='message'
						ref={register({ required: false })}
						data-testid='messageTextarea'
					/>
				</div>

				<label htmlFor='terms' data-testid='checkLabel'>
					I've Read and Agree to Terms And Conditions
				</label>
				<input
					type='checkbox'
					name='terms'
					data-testid='check'
					ref={register({ required: true })}
				/>
				{data && (
					<pre style={{ textAlign: 'left', color: 'white' }} data-testid='pre'>
						{JSON.stringify(data, null, 2)}
					</pre>
				)}
				<input
					type='submit'
					data-testid='submitButton'
					disabled={!formState.isValid}
				/>
			</form>
		</div>
	);
};

export default ContactForm;
