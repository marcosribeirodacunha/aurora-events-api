import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import Events from './Events';
import Users from './Users';

@Entity('user_event_like')
class Likes {
  @PrimaryColumn()
  user_id: string;

  @ManyToOne(() => Users, users => users.likes)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @PrimaryColumn()
  event_id: string;

  @ManyToOne(() => Events, events => events.likes)
  @JoinColumn({ name: 'event_id' })
  event: Events;

  @Column('boolean')
  is_like: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Likes;
