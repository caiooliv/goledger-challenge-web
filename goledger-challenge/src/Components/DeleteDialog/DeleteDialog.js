import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';
import { Typography } from '@material-ui/core';
import api from '../../Services/Api';

export default function DeleteDialog({ open, name, handleClose }) {
	async function handleDelete() {
		const data = {
			'@assetType': 'contact',
			name,
		};

		await api.delete('delete', { data }).then(
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
		</div>
	);
}
