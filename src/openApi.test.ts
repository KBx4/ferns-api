import express, {Router} from "express";
import supertest from "supertest";

import {fernsRouter, FernsRouterOptions} from "./api";
import {addAuthRoutes, setupAuth} from "./auth";
import {setupServer} from "./expressServer";
import {Permissions} from "./permissions";
import {FoodModel, UserModel} from "./tests";

function addRoutes(router: Router, options?: Partial<FernsRouterOptions<any>>): void {
  router.use(
    "/food",
    fernsRouter(FoodModel as any, {
      ...options,
      allowAnonymous: true,
      populatePaths: ["ownerId"],
      permissions: {
        list: [Permissions.IsAny],
        create: [Permissions.IsAny],
        read: [Permissions.IsAny],
        update: [Permissions.IsAny],
        delete: [Permissions.IsAny],
      },
    })
  );
}

describe("openApi", function () {
  let server: supertest.SuperTest<supertest.Test>;
  let app: express.Application;
  beforeEach(async function () {
    process.env.REFRESH_TOKEN_SECRET = "testsecret1234";

    app = setupServer({addRoutes, userModel: UserModel as any, skipListen: true});
    setupAuth(app, UserModel as any);
    addAuthRoutes(app, UserModel as any);
  });

  it("gets the openapi.json", async function () {
    server = supertest(app);
    const res = await server.get("/openapi.json").expect(200);
    expect(res.body).toMatchSnapshot();
  });

  it("gets the swagger ui", async function () {
    server = supertest(app);
    await server.get("/swagger/").expect(200);
  });
});
