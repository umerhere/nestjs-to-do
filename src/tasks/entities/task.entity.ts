import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column({ type: 'varchar', nullable: false }) title: string;
  @Column({ type: 'varchar', nullable: true }) details: string;
  @Column({ type: 'varchar', nullable: false }) status: string;
  @Column({ type: 'varchar', nullable: false }) priority: string;
  @Column({ type: 'timestamp', nullable: false }) due_date: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) date_of_creation: Date
  @Column({ type: 'boolean', default: false }) is_active: boolean
  
}
