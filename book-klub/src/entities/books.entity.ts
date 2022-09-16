import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { CategoriesEntity } from "./categories.entity";
import { ClubBookEntity } from "./club_book.entity";

@Entity("books")
export class BooksEntity {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  author: string;

  @ManyToOne(
    () => CategoriesEntity,
    (CategoriesEntity) => CategoriesEntity.books,
    {
      eager: true,
    }
  )
  category: CategoriesEntity;

  @OneToMany(() => ClubBookEntity, (club) => club.id)
  club: ClubBookEntity;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
