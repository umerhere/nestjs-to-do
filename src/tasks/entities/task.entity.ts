import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Status, Priority } from '../enum/task.enums';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('increment') id: number;
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
  
}
