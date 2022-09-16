import {
  OneToMany,
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { ClubBookEntity } from "./club_book.entity";
import { MeetingsEntity } from "./meetings.entity";
import { UsersEntity } from "./users.entity";
import { UsersClubsEntity } from "./user_club.entity";

@Entity("clubs")
export class ClubsEntity {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 300 })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  created_At: Date;

  @ManyToOne((type) => UsersEntity, (user) => user.clubs, {
    eager: true,
  })
  adm: UsersEntity;

  @OneToMany((type) => UsersClubsEntity, (user_clubs) => user_clubs.club)
  user_clubs: UsersClubsEntity;

  @OneToMany((type) => ClubBookEntity, (book) => book.club)
  book: ClubBookEntity[];

  @OneToMany(() => MeetingsEntity, (meeting) => meeting.club)
  meeting: MeetingsEntity;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
