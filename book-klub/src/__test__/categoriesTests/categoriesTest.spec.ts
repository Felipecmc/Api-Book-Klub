import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";

import {
    mockedCategoryRegister,
    mockedUserLogin,
    mockedUserRegister,
    mockedWrongCategoryRegister,
  } from "../mocks";
  

describe("Testing categories routes", () => {
    let connection: DataSource;
  
    beforeAll(async () => {
      await AppDataSource.initialize()
        .then((res) => {
          connection = res;
        })
        .catch((err) => {
          console.error("Error during Data Source initialization", err);
        });
  
      await request(app).post("/users").send(mockedUserRegister);
    });
  
    afterAll(async () => {
      await connection.destroy();
    });

    test("POST /categories - Must be able to create a category", async () => {
        const userLoginResponse = await request(app)
          .post("/users/login")
          .send(mockedUserLogin);
          
        const response = await request(app)
          .post("/categories")
          .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
          .send(mockedCategoryRegister);
        
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("id");
        expect(response.status).toBe(201);
      });

      test("POST /categories - Should not be able to create a category with a repeated name", async () => {
        const userLoginResponse = await request(app)
          .post("/users/login")
          .send(mockedUserLogin);
        const response = await request(app)
          .post("/categories")
          .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
          .send(mockedCategoryRegister);
    
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
      });

      test("POST /categories - Should not be able to create a category without authentication", async () => {
        const response = await request(app).post("/categories").send(mockedCategoryRegister);
    
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
      });

      test("POST /categories - Should not be able to create a category with missing properties", async () => {
        const userLoginResponse = await request(app)
          .post("/users/login")
          .send(mockedUserLogin);
        const response = await request(app)
          .post("/categories")
          .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
          .send(mockedWrongCategoryRegister);
    
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
      });

      test("GET /categories - Should be able to list all categories", async () => {
        const userLoginResponse = await request(app)
            .post("/users/login")
            .send(mockedUserLogin);

        const response = await request(app)
            .get("/categories")
            .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("map");
      });

      test("GET /categories - Should not be able to list all categories without authentication", async () => {

        const response = await request(app).get("/categories");
    
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
      })
}) 