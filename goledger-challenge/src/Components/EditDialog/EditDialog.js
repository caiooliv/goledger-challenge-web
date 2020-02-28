import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import DialogActions from '@material-ui/core/DialogActions';
import Edit from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';

import api from '../../Services/Api';

export default function EditDialog({ open, contact, handleClose }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [age, setAge] = useState(0);
	const [phone, setPhone] = useState('');
	const [company, setCompany] = useState('');

	const handleAge = value => {
		setAge(parseInt(value));
	};
	useEffect(() => {
		setName(contact.name);
		setEmail(contact.email);
		handleAge(contact.age);
		setPhone(contact.phone);
		setCompany(contact.company);
	}, [contact]);

	async function handleRegister() {
		await api
			.put('update', {
				'@assetType': 'contact',
				name,
				phone,
				company,
				email,
				age,
			})
			.then(
				function(response) {
					console.log(response);
					handleClose();
				},
				function(response) {
					console.log(response);
					handleClose();
				}
			);
	}

	return (
		<div>
			<Dialog
				aria-labelledby="simple-dialog-title"
				open={open}
				onClose={handleClose}
				disableBackdropClick={true}
				disableEscapeKeyDown={true}
			>
				<DialogTitle
					style={{ backgroundColor: '#1f2033' }}
					id="simple-dialog-title"
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Edit
							style={{
								fontSize: 50,
								color: '#fff',
								paddingRight: 15,
							}}
						/>
						<h2 style={{ color: '#fff' }}>Editar Contato</h2>
					</div>
				</DialogTitle>
				<DialogContent>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginTop: 10,
							marginBottom: 5,
						}}
					>
						<TextField
							onChange={event => setName(event.target.value)}
							label="Nome"
							defaultValue={name}
							disabled={true}
						/>
						<TextField
							onChange={event => setEmail(event.target.value)}
							label="Email"
							defaultValue={email}
						/>
						<TextField
							onChange={event => setPhone(event.target.value)}
							label="Telefone"
							defaultValue={phone}
						/>
						<TextField
							label="Idade"
							inputProps={{ min: '0', step: '1' }}
							type="number"
							defaultValue={age}
							onChange={event => handleAge(event.target.value)}
						/>
						<TextField
							label="Companhia"
							defaultValue={contact.company}
							onChange={event => setCompany(event.target.value)}
						/>
					</div>
				</DialogContent>
				<Divider />
				<DialogActions>
					<Button
						variant="contained"
						color="primary"
						startIcon={<Edit />}
						onClick={handleRegister}
					>
						Editar
					</Button>
					<Button
						variant="contained"
						color="secondary"
						startIcon={<Close />}
						onClick={handleClose}
					>
						Cancelar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
