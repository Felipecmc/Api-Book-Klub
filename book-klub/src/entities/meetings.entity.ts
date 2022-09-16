import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { ClubsEntity } from "./clubs.entity";

@Entity("meetings")
export class MeetingsEntity {
  @PrimaryColumn("uuid")
  readonly id: string;

  @ManyToOne(() => ClubsEntity, (club) => club.meeting, {
    eager: true,
  })
  club: ClubsEntity;

  @Column({ type: "date" })
  date: Date;

  @Column("time")
  hour: string;

  @Column({ length: 300 })
  description: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
