# CountryBeen

A web application memorizing countries where you've ever been to before and analyzing them visually with React and Typescript.

## Demo link:

Access this project at [CountryBeen](https://country-been.vercel.app/)!

## Table of Content:

- [About The App](#about-the-app)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)
- [Approach](#approach)
- [Status](#status)
- [Credits](#credits)
- [License](#license)

## About The App

[CountryBeen](https://country-been.vercel.app/) is one of my personal projects focusing on taking advantage of REST API (Country REST API), using React with Typescript to strictly check every variables in my projects to make the development more smoothly. Also, I adopt managing state by Redux-toolkit.

Users can search countries and add them to BucketList (favorite list) and Record (countries where users have been to), and once a country added to Record, react-simple-map showcases it on the map enabling users to check which countries they've been to visually.

What I'm going to improve is to fix layouts of components later on.

## Screenshots

![CountryBeen](https://user-images.githubusercontent.com/65790344/181345386-feb6a6d5-04d7-401c-ad3f-d30f44687ad4.png)

## Technologies

- `React` - version 18.1.0
- `Redux` - version 4.2.0
- `Typescript` - version 4.6.4
- `TailWind CSS` - version 3.0.24

## Setup

- Download or clone the repository
- Run `npm install`
- Run `npm run dev` to start running the app

## Approach

- Utilize Next.js to simplify compositions of application as well as maximize powerful features of Next.js such as Server-Side Rendering
- Introducing `next-theme` that is a library for next.js, automatically toggling light mode and dark mode based on users' screen modes
- Restricted the initial number of pokemons showcased in home page considering about the workloads of server and performances of the application
- Tried to make design simplify but have good-looking styles by taking advantage of `TailWind CSS` and UI components provided by `flowbite`.

## Status

[CountryBeen](https://country-been.vercel.app/) is still in progress (adding more features). Currently I'm adding database (firebase) to store the records efficiently to enhance the quality of the application.

## Credits

- [Kento Honda](https://github.com/keento0809)

## License

©︎KENTO HONDA 2022. All Rights Reserved.
