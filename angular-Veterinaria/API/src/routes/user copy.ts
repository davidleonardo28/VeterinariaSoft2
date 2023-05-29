import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { ClienteController } from './../controller/ClienteController';
import { Router } from 'express';

const router = Router();

// Get all clientes
router.get('/', ClienteController.getAll);

// Get one cliente
router.get('/:id', [checkJwt, checkRole(['admin'])], ClienteController.getById);

// Create a new cliente
router.post('/', [checkJwt, checkRole(['admin'])], ClienteController.new);

// Edit cliente
router.patch('/:id', [checkJwt, checkRole(['admin'])], ClienteController.edit);

// Delete
router.delete('/:id', [checkJwt, checkRole(['admin'])], ClienteController.delete);

export default router;
