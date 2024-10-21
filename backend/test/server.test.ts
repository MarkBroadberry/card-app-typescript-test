import Prisma from "../src/db";
import { server } from "../src/server";

describe("test fastify endpoints", () => {
  let testEntry: any;
  let newEntry: any;
  beforeAll(async () => {
    //define test entries
    testEntry = await Prisma.entry.create({
      data: {
        title: "Test title",
        description: "Test description",
        created_at: new Date(),
        scheduled: new Date(),
      },
    });
    newEntry = {
      title: "New Test Title",
      description: "New Test Description",
      created_at: new Date(),
      scheduled: new Date(),
    };
  });

  afterAll(async () => {
    //clean up database - delete test entries.
    await Prisma.entry.delete({ where: { id: testEntry.id } });
    await Prisma.entry.deleteMany({
      where: {
        title: newEntry.title,
        description: newEntry.description,
        created_at: newEntry.created_at,
        scheduled: newEntry.scheduled,
      },
    });
  });

  it("/get/ should return an array of all entries", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/get/",
    });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBe(true);
  });

  it("/get/id should return a single entry", async () => {
    const response = await server.inject({
      method: "get",
      url: `/get/${testEntry.id}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().title).toEqual(testEntry.title);
    expect(response.json().description).toEqual(testEntry.description);
  });

  it("/get/id should throw a 500 error if the id is doesn't exist", async () => {
    const response = await server.inject({
      method: "get",
      url: "/get/999999",
    });
    expect(response.statusCode).toBe(500);
  });

  it("/create/ should create an entry in the database", async () => {
    const response = await server.inject({
      method: "post",
      url: "/create/",
      payload: newEntry,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().id).toBeDefined();
    expect(response.json().title).toEqual(newEntry.title);
  });

  it("/create/ should throw an error if the entry is empty", async () => {
    const newEntryTwo = {};
    const response = await server.inject({
      method: "post",
      url: "/create/",
      payload: newEntryTwo,
    });

    expect(response.statusCode).toBe(500);
  });

  it("/delete/id should delete a specific entry from the database", async () => {
    const entry = await Prisma.entry.create({
      data: {
        title: "Deletable title",
        description: "Deletable description",
        created_at: new Date(),
        scheduled: new Date(),
      },
    });
    const response = await server.inject({
      method: "delete",
      url: `/delete/${entry.id}`,
    });
    expect(response.statusCode).toBe(200);
    const deleted = await Prisma.entry.findUnique({ where: { id: entry.id } });
    expect(deleted).toBeNull();
  });

  it("/update/id should update a specific entry from the database", async () => {
    const updatedEntry = {
      title: "Updated Title",
      description: "Updated Description",
      created_at: new Date(),
      scheduled: new Date(),
    };
    const response = await server.inject({
      method: "put",
      url: `/update/${testEntry.id}`,
      payload: updatedEntry,
    });

    expect(response.statusCode).toBe(200);

    const updated = await Prisma.entry.findUnique({ where: { id: testEntry.id } });
    expect(updated).not.toBeNull();
    if (updated) {
      expect(updated.title).toEqual(updatedEntry.title);
      expect(updated.description).toEqual(updatedEntry.description);
    }
  });

  it("/update/id should throw a 500 error if the id doesn't exist", async () => {
    const response = await server.inject({
      method: "put",
      url: "/update/999999",
      payload: testEntry,
    });
    expect(response.statusCode).toBe(500);
  });
});
