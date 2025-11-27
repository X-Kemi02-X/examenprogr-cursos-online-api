import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cursos')
export class Curso {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  codigo: string;

  @Column()
  titulo: string;

  @Column()
  subtitulo: string;

  @Column()
  descripcion: string;

  @Column()
  nivel: string;

  @Column()
  duracion_horas: number;

  @Column()
  costo: number;

  @Column()
  modalidad: string;

  @Column()
  fecha_inicio: Date;

  @Column()
  estado: string;
}
