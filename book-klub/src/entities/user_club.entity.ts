import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { ClubsEntity } from "./clubs.entity";
import { UsersEntity } from "./users.entity";
import { v4 as uuid } from "uuid";

@Entity("user_club")
export class UsersClubsEntity {
  @PrimaryColumn("uuid")
  id: string;

  @ManyToOne(() => UsersEntity, (UsersEntity) => UsersEntity.id, {
    eager: true,
  })
  user: UsersEntity;

  @ManyToOne(() => ClubsEntity, (clubs) => clubs.user_clubs, {
    eager: true,
  })
  club: ClubsEntity;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
