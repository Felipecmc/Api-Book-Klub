import { Entity, Column, ManyToOne, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { BooksEntity } from "./books.entity";

@Entity("categories")
export class CategoriesEntity {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => BooksEntity, (BooksEntity) => BooksEntity.category)
  books: BooksEntity;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
