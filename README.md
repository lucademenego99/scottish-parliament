# ScottishParliament

scottish-parliament is an Angular application, generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4. It has been implemented as an exercise for the Web Architectures Master's Course in CS, whose assignment and report can be found in the folder `docs/`. The project is served as a Github Pages website.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Deployment

#### Github Pages
The project uses `angular-cli-ghpages` for the deployment on Github Pages. The command used to deploy a new version is: `ng deploy --base-href=/scottish-parliament/`.

#### Local Tomcat
The project can be deployed to a local Tomcat server by using maven. Its configuration can be found in the `pom.xml` file, where some variables probably need to be updated according to your configuration:
```
<tomcat.base.url>http://localhost:8080</tomcat.base.url>
<tomcat.username>admin</tomcat.username>
<tomcat.password>password</tomcat.password>
```

After that, the project can be deployed with `mvn clean install tomcat7:undeploy tomcat7:deploy`.

