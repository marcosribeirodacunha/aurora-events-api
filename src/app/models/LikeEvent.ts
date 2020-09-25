import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import Event from './Event';
import User from './User';

@Entity('user_event_like')
class LikeEvent {
  @PrimaryColumn()
  user_id: string;

  @ManyToOne(() => User, user => user.likes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @PrimaryColumn()
  event_id: string;

  @ManyToOne(() => Event, event => event.likes)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column('boolean')
  is_like: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default LikeEvent;
