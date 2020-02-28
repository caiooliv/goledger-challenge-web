import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';
import { Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import api from '../../Services/Api';

export default function DeleteDialog({ open, name, handleClose }) {
	const [openAlertSucess, setOpenAlertSucess] = useState(false);
	const [openAlertError, setOpenAlertError] = useState(false);

	const handleCloseSucess = () => {
		setOpenAlertSucess(false);
		window.location.reload();
	};
	const handleCloseError = () => {
		setOpenAlertSucess(false);
		window.location.reload();
	};
	async function handleDelete() {
		const data = {
			'@assetType': 'contact',
			name,
		};

		await api.delete('delete', { data }).then(
			function(response) {
				console.log(response);
				setOpenAlertSucess(true);
			},
			function(response) {
				console.log(response);
				setOpenAlertError(true);
			}
		);
	}

	return (
		<div>
			<Dialog
				aria-labelledby="simple-dialog-title"
				open={open}
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
						<DeleteForever
							style={{
								fontSize: 50,
								color: '#fff',
								paddingRight: 15,
							}}
						/>
						<h2 style={{ color: '#fff' }}>Excluir Contato</h2>
					</div>
				</DialogTitle>
				<DialogContent>
					<div>
						<Typography>
							Tem certeza que deseja excluir o usuário :
						</Typography>
						<div>
							<Typography style={{ fontWeight: 'bold' }}>
								{name}
							</Typography>
						</div>
					</div>
				</DialogContent>
				<Divider />
				<DialogActions>
					<Button
						variant="contained"
						color="primary"
						startIcon={<DeleteForever />}
						onClick={handleDelete}
					>
						Excluir
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

			<Snackbar
				open={openAlertSucess}
				autoHideDuration={3000}
				onClose={handleCloseSucess}
			>
				<MuiAlert onClose={handleCloseSucess} severity="success">
					Contato excluído com sucesso
				</MuiAlert>
			</Snackbar>

			<Snackbar
				open={openAlertError}
				autoHideDuration={3000}
				onClose={handleCloseError}
			>
				<MuiAlert onClose={handleCloseError} severity="error">
					Falha na exclusão do contato
				</MuiAlert>
			</Snackbar>
		</div>
	);
}
