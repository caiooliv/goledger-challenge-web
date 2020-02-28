/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { Container, Grid, ExpansionPanelActions } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import Phone from '@material-ui/icons/Phone';
import Business from '@material-ui/icons/Business';
import Cake from '@material-ui/icons/Cake';
import Divider from '@material-ui/core/Divider';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';

import RegisterDialog from './Components/RegisterDialog/RegisterDialog';
import DeleteDialog from './Components/DeleteDialog/DeleteDialog';

import api from './Services/Api';
import logo from './Assets/Images/logo_branca.png';

function App() {
	const [contacts, setContacts] = useState([]);
	const [open, setOpen] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [deleteName, setDeleteName] = useState('');
	useEffect(() => {
		async function loadContacts() {
			const selector = {
				'@assetType': 'contact',
			};
			const response = await api.post('search', {
				selector,
			});

			setContacts(response.data.result);
		}
		loadContacts();
	}, []);

	function handleCreateContact() {
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}

	function handleDelete(value) {
		setDeleteName(value);
		setOpenDelete(true);
	}
	function handleCloseDelete() {
		setOpenDelete(false);
	}
	return (
		<Container style={{ backgroundColor: '#f5f5f5' }} maxWidth="sm">
			<Grid
				style={{
					backgroundColor: '#1f2033',
					height: '100%',
					width: '100%',
				}}
				justify="center"
				alignItems="center"
				container
				direction="row"
			>
				<Grid>
					<img src={logo} alt="Logo" />
				</Grid>
				<Grid>
					<h1 style={{ color: '#fff' }}>PhoneBook</h1>
				</Grid>
			</Grid>
			<Grid container style={{ paddingTop: 10, paddingBottom: 40 }}>
				<Button
					style={{ position: 'absolute' }}
					color="primary"
					variant="contained"
					aria-label="add"
					startIcon={<PersonAdd />}
					onClick={handleCreateContact}
				>
					Criar contato
				</Button>
			</Grid>
			<RegisterDialog open={open} handleClose={handleClose} />
			<DeleteDialog
				open={openDelete}
				name={deleteName}
				handleClose={handleCloseDelete}
			/>

			{contacts.map(contact => (
				<Grid
					style={{ paddingTop: 7, paddingBottom: 7 }}
					key={contact['@key']}
				>
					<ExpansionPanel>
						<ExpansionPanelSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1	bh-content"
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<Avatar>{contact.name.charAt(0)}</Avatar>
								<Typography style={{ paddingLeft: 5 }}>
									{contact.name}
								</Typography>
							</div>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Grid
								container
								direction="column"
								alignItems="flex-start"
								justify="flex-start"
							>
								<Grid
									container
									item
									direction="row"
									justify="flex-start"
									alignItems="center"
								>
									<AlternateEmail />
									<Typography style={{ paddingLeft: 4 }}>
										{contact.email}
									</Typography>
								</Grid>
								<Grid
									container
									item
									direction="row"
									justify="flex-start"
									alignItems="center"
								>
									<Phone />
									<Typography style={{ paddingLeft: 4 }}>
										{contact.phone}
									</Typography>
								</Grid>
							</Grid>
							<Grid
								container
								direction="column"
								alignItems="flex-start"
								justify="flex-start"
							>
								<Grid
									container
									item
									direction="row"
									justify="flex-start"
									alignItems="center"
								>
									<Cake />
									<Typography style={{ paddingLeft: 4 }}>
										{contact.age}
									</Typography>
								</Grid>
								<Grid
									container
									item
									direction="row"
									justify="flex-start"
									alignItems="center"
								>
									<Business />
									<Typography style={{ paddingLeft: 4 }}>
										{contact.company}
									</Typography>
								</Grid>
							</Grid>
						</ExpansionPanelDetails>

						<Divider />
						<ExpansionPanelActions>
							<Button
								variant="contained"
								color="primary"
								startIcon={<Edit />}
							>
								Editar
							</Button>
							<Button
								variant="contained"
								color="secondary"
								startIcon={<DeleteForever />}
								onClick={() => handleDelete(contact.name)}
							>
								Deletar
							</Button>
						</ExpansionPanelActions>
					</ExpansionPanel>
				</Grid>
			))}
		</Container>
	);
}

export default App;
