import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';
import { MinLength, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['id_usuario'])
export class Cliente {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  @MinLength(45)
  @IsNotEmpty()
  nombre: string;

  @Column()
  @MinLength(45)
  @IsNotEmpty()
  apellido: string;

  @Column()
  @MinLength(45)
  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @Column()
  @MinLength(45)
  @IsNotEmpty()
  dirección: string;

  @Column()
  @MinLength(45)
  nombreMascota: string;

}
