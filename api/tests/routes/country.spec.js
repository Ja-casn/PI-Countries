/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  id: "VEN",
  name: "Venezuela",
  flag: "https://flagcdn.com/ve.svg",
  continent: "South America",
  capital: "Caracas",
  subregion: "South America",
  area: 916445,
  population: 28435943,
};

describe('Country routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(country)));
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
  });
  describe('GET /countries?name=Venezuela', () => {
    it('should get 200', () =>
      agent.get('/countries?name=Venezuela').expect(200)
    );
  });
  describe('GET /countries?name=unknown', () => {
    it('should get 404', () =>
      agent.get('/countries?name=unknown').expect(404)
    );
  });
  describe('GET /countries/:id', function () {

    it('GET responde con error si no se le pasa un id', async function () {
      let res = await agent.get('/countries/ARGENTINA')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql({error: 'No country with that id was found'})
        })
    })
  })
});

