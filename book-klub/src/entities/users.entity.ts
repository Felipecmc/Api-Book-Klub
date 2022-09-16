import { Entity, Column, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { ClubsEntity } from "./clubs.entity";
import { UsersClubsEntity } from "./user_club.entity";
import { Exclude } from "class-transformer";

@Entity("users")
export class UsersEntity {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 101 })
  @Exclude()
  password: string;

  @Column({ default: false })
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(
    () => UsersClubsEntity,
    (UsersClubsEntity) => UsersClubsEntity.club
  )
  user_clubs: UsersClubsEntity[];

  @OneToMany((type) => ClubsEntity, (clubs) => clubs.adm)
  clubs: ClubsEntity[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
