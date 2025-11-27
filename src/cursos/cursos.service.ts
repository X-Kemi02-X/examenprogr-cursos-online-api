import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from './curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}

  create(createCursoDto: CreateCursoDto) {
    const curso = this.cursoRepository.create(createCursoDto);
    return this.cursoRepository.save(curso);
  }

  findAll() {
    return this.cursoRepository.find();
  }

  findOne(id: string) {
    return this.cursoRepository.findOne({ where: { id } });
  }

  async update(id: string, updateCursoDto: UpdateCursoDto) {
    const curso = await this.cursoRepository.findOne({ where: { id } });
    if (!curso) return null;
    Object.assign(curso, updateCursoDto);
    return this.cursoRepository.save(curso);
  }

  async remove(id: string) {
    const curso = await this.cursoRepository.findOne({ where: { id } });
    if (!curso) return null;
    return this.cursoRepository.remove(curso);
  }
  horasSemanales(horasPorDia: number[]) {
  let totalHoras = 0;
  for (let i = 0; i < horasPorDia.length; i++) {
    totalHoras += Number(horasPorDia[i]); 
  }
  const promedio = totalHoras / 7;
  let mensaje = '';

  if (promedio < 1) {
    mensaje = 'Estás estudiando muy poco';
  } else if (promedio <= 3) {
    mensaje = 'Buen ritmo de estudio';
  } else {
    mensaje = 'Excelente dedicación';
  }
  return { totalHoras, promedio: Math.round(promedio * 100) / 100, mensaje };
}
}
