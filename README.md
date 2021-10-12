## Welcome


Welcome to Vorna code interview. This test is just a blank `CRA (create-react-app)` project and you are free to do anything with it (installing packages, searching in the internet, etc.). In order to pass this test, you need to do a few simple things as follows:

1. ### Getting started

You are reading this file. So that means you already cloned the project and almost ready to start the project in development mode. Great! Keep going...

2. ### About the test itself

As you can see, there is an empty functional component in `App.js`. Your test begins here actually. You have to create a login page with a login form in it. Then get the credentials from user and log them in. After that redirect them to a `wallet-address` page which we will tell you about what you have to do. Here is a list of things that you need to know:
* The API is located at [https://api.cbex.ir](https://api.cbex.ir). Please use `axios` for your API calls, nothing else (which i already installed it for you).
* We will give you all the endpoints that you need for login, check authorization and wallet-address.
* Our API is token based. That means you have to send an API key in header of all of your requests. That way, the API can validate the user's login status.
* The API key which i mentioned above is taken from login endpoint. After the user enterred their credentials correctly, You will take a token in response of login endpoint. You will have to set the `authorization` header of your requests to `"Bearer {token from response}"`.
* There is an endpoint to check for user's authorization status. You will have to use this endpoint to validate their authorization status and store it in a `react context` or something.
* You should store their token in local storage so after they refresh the page, they stay logged in.
* After the user logged in successfully, you should start working on some simple endpoints for the `wallet-address` module (which we will tell you about them).

3. ### Wrapping things up

Since our company mainly works on crypto, it's good for you to pass a test containing what we do. But don't worry if you didn't finish all the tasks. Your coding style, programming skills and react skills matter the most to us. So keep your calm during the test and So keep calm during the test and Good luck.