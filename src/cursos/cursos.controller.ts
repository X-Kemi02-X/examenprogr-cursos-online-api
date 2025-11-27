import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursosService.create(createCursoDto);
  }

  @Get()
  findAll() {
    return this.cursosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursosService.update(id, updateCursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursosService.remove(id);
  }
  @Post('reportes/horas-semanales')
  horasSemanales(@Body() body: { horasPorDia: number[] }) {
  return this.cursosService.horasSemanales(body.horasPorDia);
  }
  @Post('reportes/aprobacion')
  aprobacion(@Body() body: { notas: number[]; notaMinima: number }) {
  const { notas, notaMinima } = body;
  if (!Array.isArray(notas) || notas.length < 3 || notas.length > 5) {
    return { error: 'notas debe ser un arreglo de 3 a 5 números' };
  }
  return this.cursosService.aprobacion(notas, Number(notaMinima));
}
}
