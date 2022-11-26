# CountryBeen

A web application memorizing countries where you've ever been before and analyzing them visually with React and Typescript.

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

[CountryBeen](https://country-been.vercel.app/) is one of my personal projects focusing on taking advantage of REST API (Country REST API), using React with Typescript to strictly check every variable in my projects to make the development more smoothly. Also, I introduce Redux-toolkit to make the state management easier.

Users can search countries by putting country's name on the search section on the navbar and add them to BucketList (list of countries where users want to visit someday) and Record (list of countries where users have been). Once a country is added to Record, react-simple-map showcases it on the map enabling users to check which countries they've been to visually and easily.

This application also enables users to search the country from the regions. When users click the 'explore world' button or countries button on the nav bar, the page is jumped to the region select page containing six regions; Asia, Africa, Europe, North America, South America, and Oceania.

On the home page, there is a component showcasing three static data; the number of countries that users have been to before and those that users have added to the bucketList, and the percentage showing a rate comparing the amount of countries users have been before to the total number of countries in the world (245 countries).

What I'm going to work on to improve is fixing the layouts of components later on.

## Screenshots

![CountryBeen](https://user-images.githubusercontent.com/65790344/204110322-11c319fd-b0f1-4feb-81e7-67cab1068009.png)

## Technologies

- `React` - version 18.1.0
- `Redux` - version 4.2.0
- `Typescript` - version 4.6.4
- `TailWind CSS` - version 3.0.24

## Setup

- Download or clone the repository
- Run `npm install`
- Run `npm start` to start running the app

## Approach

- Utilize React.js and Redux with Typescript to make state management easier and improve the efficiency of developing the application thanks to the power of Typescript.
- Introducing `react-simple-map`, a library for React.js showcasing the world map with countries filled with colors where users have been before.
- Users can search countries using the search bar on the nav section or looking for them from regions via the 'countries' link on the home page.
- Adding features such as registrations to add countries to the bucket list (list of countries where users would like to visit in their future) and to the records (list of countries where users have been to) respectively utilizing the cloud firestore (firebase) as the database.
- Being considered to have a good user interface and is designed by `TailWind CSS` and `DaisyUI`, a third-party library for Tailwind CSS.

## Status

[CountryBeen](https://country-been.vercel.app/) is still in progress (cleaning up components). Currently I'm creating additional components for improving the structures of codes much simpler than now.

## Credits

- [Kento Honda](https://github.com/keento0809)

## License

©︎KENTO HONDA 2022. All Rights Reserved.
