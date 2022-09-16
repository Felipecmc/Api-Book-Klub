import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import {
  fakeId,
  mockedAdmUserLogin,
  mockedAdmUserRegister,
  mockedBookRegister,
  mockedCategoryRegister,
  mockedUserLogin,
  mockedUserRegister,
  mockedWrongBook,
} from "../mocks";

describe("Testing books routes", () => {
  let connection: DataSource;
  let bookId: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUserRegister);
    await request(app).post("/users/adm").send(mockedAdmUserRegister);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /books - Must be able to create a book", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const createCategory = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCategoryRegister);

    mockedBookRegister.categoryId = createCategory.body.id;

    const response = await request(app)
      .post("/books")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedBookRegister);

    bookId = response.body.id;

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("author");
    expect(response.body).toHaveProperty("category");
    expect(response.status).toBe(201);
  });

  test("POST /books - Should not be able to create a book with a repeated name and author", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .post("/books")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedBookRegister);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /books - Should not be able to create a book without authentication", async () => {
    const response = await request(app).post("/books").send(mockedBookRegister);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /books - Should not be able to create a book with missing properties", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .post("/books")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedWrongBook);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /books - Should not be able to create a book with a non-existent category", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .post("/books")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedBookRegister);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("GET /books - Should be able to list all books", async () => {
    const response = await request(app).get("/books");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("DELETE /books/:id - Shold be able to delete a book", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedAdmUserLogin);

    const response = await request(app)
      .delete(`/books/${bookId}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /books/:id - Should not be able a book without authorization", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const createCategory = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCategoryRegister);

    mockedBookRegister.categoryId = createCategory.body.id;

    const createBook = await request(app)
      .post("/books")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedBookRegister);

    const response = await request(app).delete(`/books/${createBook.body.id}`);

    expect(response.status).toBe(401);
  });

  test("DELETE /books/:id - Should not be able to delete a book that doesn't exist", async () => {
    const userLoginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .delete(`/books/${fakeId}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(401);
  });
});
