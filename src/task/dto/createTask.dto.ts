import { IsNotEmpty } from 'class-validator';

export class CreateTaskInputDto {
  @IsNotEmpty()
  title: string;

  description: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}

export class CreateTaskOutputDto {
  id: number;
  title: string;
  description: string;
  finished: boolean;

  constructor(
    id: number,
    title: string,
    description: string,
    finished: boolean,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.finished = finished;
  }
}
