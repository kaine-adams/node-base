# Node Application Starting Point

A basic node application base, originally designed for kongregate and self hosted authentication.

Uses:

   - Docker: preconfigured enviroments
   - Passport: Authentication
   - Pug: Template Engine
   - Knex, MariaDB: Database Engine
   - Websockets: Realtime Communcation
   - Vue, Vuex: Reactive Front End with common state engine

Licenced under MIT.

**author:** Kaine S. Adams,
**email:** pirionxii@gmail.com,
**url:** https://www.pirion.net/

## How to Use:

Run Database:

   - `docker-compose up database -d`

Build, Run Webpack, Migrate Database, and Start Server: 

   - `docker-compose build web`
   - `docker-compose up web`

Dispose Enviroment:

   - `docker-compose down`
