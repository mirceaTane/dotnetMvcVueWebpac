# dotnetMvcVueWebpack
Boilerplate and configuration for .NET MVC with VueJS application

# How to use
All the content of this repo should go into the main directory of the .NET Core MVC solution.
After copying everywhere where it belongs, make sure you change the <PROJECT_NAME> placeholder in package.json with the actual project name.
Also, to ensure this works propery, the WebpackDevMiddleware must pe registered in Startup.cs. Also, the app must be set up to use static files.
npm install to isntall all dependencies.
npm run dev - builds and serves on specified port
