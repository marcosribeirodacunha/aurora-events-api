import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Users from './Users';

@Entity('events')
class Events {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  organizer_id: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'organizer_id' })
  organizer: Users;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  location: string;

  @Column()
  photo: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Events;
