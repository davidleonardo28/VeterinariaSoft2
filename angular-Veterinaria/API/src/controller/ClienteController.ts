import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Cliente } from '../entity/Cliente';
import { validate } from 'class-validator';

export class ClienteController {
  static getAll = async (req: Request, res: Response) => {
    const clienteRepository = getRepository(Cliente);
    let clientes;

    try {
      clientes = await clienteRepository.find();
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (clientes.length > 0) {
      res.send(clientes);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const clienteRepository = getRepository(Cliente);
    try {
      const cliente = await clienteRepository.findOneOrFail(id);
      res.send(cliente);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { nombre, apellido, correo, direccion } = req.body;
    const cliente = new Cliente();

    cliente.nombre = nombre;
    cliente.apellido = apellido;
    cliente.correo = correo;
    cliente.dirección = direccion;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(cliente, validationOpt);
    if (errors.length > 0) {
      return res.status(200).json({ message: 'Valide los datos e intente nuevamente' });
    }

    const clienteRepository = getRepository(Cliente);
    try {
      await clienteRepository.save(cliente);
    } catch (e) {
      return res.status(409).json({ message: 'Problema al crear cliente' });
    }
    
    res.send('Cliente creado');
  };

  static edit = async (req: Request, res: Response) => {
    let cliente;
    const { id } = req.params;
    const { clientename, role } = req.body;

    const clienteRepository = getRepository(Cliente);
    // Try get cliente
    try {
      cliente = await clienteRepository.findOneOrFail(id);
      cliente.clientename = clientename;
      cliente.role = role;
    } catch (e) {
      return res.status(404).json({ message: 'Cliente not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(cliente, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save cliente
    try {
      await clienteRepository.save(cliente);
    } catch (e) {
      return res.status(409).json({ message: 'Clientename already in use' });
    }

    res.status(201).json({ message: 'Cliente update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const clienteRepository = getRepository(Cliente);
    let cliente: Cliente;

    try {
      cliente = await clienteRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'Cliente not found' });
    }

    // Remove cliente
    clienteRepository.delete(id);
    res.status(201).json({ message: ' Cliente deleted' });
  };
}

export default ClienteController;
