import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import LikeEvent from './LikeEvent';
import User from './User';

@Entity('events')
class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  organizer_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'organizer_id' })
  organizer: User;

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

  @OneToMany(() => LikeEvent, likeEvent => likeEvent.event, { eager: true })
  likes: LikeEvent[];
}

export default Event;
