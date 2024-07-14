import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { Status, Priority } from '../enum/task.enums';
import { v4 as uuid } from 'uuid'

@Entity()
export class Task {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column({ type: 'varchar', nullable: false, unique: true }) uid: string
  @Column({ type: 'varchar', nullable: false }) title: string;
  @Column({ type: 'varchar', nullable: true }) details: string;
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
    nullable: false,
  })
  status: Status;

  @Column({
    type: 'enum',
    enum: Priority,
    default: Priority.BLUE,
    nullable: false,
  })
  priority: Priority;
  @Column({ type: 'timestamp', nullable: false }) due_date: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) date_of_creation: Date
  @Column({ type: 'boolean', default: false }) is_active: boolean

  @BeforeInsert() async createDefaults() {
    this.uid = uuid()
  }
}
