![Gumroad logo](https://assets-global.website-files.com/6171b265e5c8aa59b42c3472/618ea7afd990103829d614ff_gumroad-logo.svg)

# Website builder

This project is a fullstack website builder for Gumroad, with lot's of cool features!

## Live website

Live version to try:-

[gumroad.online](https://gumroad.online)

Expample website made by this website builder:-

[iamafnansk.gumroad.online](https://iamafnansk.gumroad.online)

## Features

- Website builder
    - Profile on Subdomains based on username (with ssl)
    - Helpful sections
        - WYSIYWG Editor
        - Products section
        - Posts section
        - Featured product section
        - Image carousel
        - Custom HTML
            - With real code editor in the browser
        - URL Embed
        - Subscribe
    - Sections position mover (up/down)
    - Add, delete, update sections
    - Custom theme
- Authentication & Authorization
- Mobile responsive
- Profile settings page
    - With user details and theme update option
- Linting and prettier
- Active record validations
- Active storage utilisation
- Active model utilisation
- React with Rails!

## Tech Stack

**Client:** React, TailwindCSS, shadcn/ui, Tiptap, CodeMirror 6

**Server:** Ruby, Rails, Puma, React on Rails, Devise

**Database:** Postgres

## Scoping

![Scoping sketch](https://gumroad.nyc3.cdn.digitaloceanspaces.com/gumroad-scoping.png)

## Installation

You need these things installed on your system

- ruby
- rails
- nodejs
- yarn

```bash
  yarn install
  bundle install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`GUMROAD_DATABASE_PASSWORD`

For Active Storage (S3 Compatible)

`DIGITALOCEAN_ACCESS_KEY_ID`

`DIGITALOCEAN_SECRET_ACCESS_KEY`

## Run Locally

Clone the project

```bash
  git clone https://github.com/IamAfnanSk/gumroad
```

Go to the project directory

```bash
  cd gumroad
```

Install dependencies

```bash
  yarn install
  bundle install
```

Start the server

```bash
  ./bin/dev
```

## Optimizations

- Went ahead with single table approach so to avoid unnecessary complexity.

- Used custom hooks to reduce code duplication, created reusable components, used react context where it made sense to
  avoid prop drilling.

- Used rails concerns to extract common logic and reuse it.

- Basic optimizations like clearing useEffect to avoid memory leaks, etc

- Database: indexing, no N+1 queries, etc

- Hit API only when something is updated

- Cancel network request on multiple call before the first one finishes

## Lessons Learned

- Rails is so much more useful than I thought
- If you wanna use React with Rails, I suggest use react router instead of rails views because latter provided no extra
  benefit to me IMO - rather it just made react components hang loose.
- Webpacker is no longer actively maintained, read docs of shakapacker (Webpacker's successor) thoroughly before getting
  started.
- Don't reinvent the wheel - as always.

## Roadmap

- AI - something like based on prompt generate a website to start with

- Prebuilt templates?

- More options in WYSIWYG
    - Buttons
    - Image

- Tests - to make sure nothing breaks

- Products and Posts pages
    - List all
    - Update
    - Add new

- React for auth pages

- Analytics

- Sentry

- Move to render or fly from Heroku?

## Screenshots

![App Screenshot](https://gumroad.nyc3.cdn.digitaloceanspaces.com/Screenshot%202024-02-24%20at%202.23.40%E2%80%AFAM.png)

![App Screenshot](https://gumroad.nyc3.cdn.digitaloceanspaces.com/Screenshot%202024-02-24%20at%202.25.34%E2%80%AFAM.png)

![App Screenshot](https://gumroad.nyc3.cdn.digitaloceanspaces.com/Screenshot%202024-02-24%20at%202.26.10%E2%80%AFAM.png)

![App Screenshot](https://gumroad.nyc3.cdn.digitaloceanspaces.com/Screenshot%202024-02-24%20at%202.25.27%E2%80%AFAM.png)

## Demo Video

[Click here](https://www.youtube.com/embed/5VYWGL8gZ_8?si=l6D0rJ4oO6vrIjxd)

## Feedback

If you have any feedback, please reach out to me at [@iamafnansk](https://x.com/iamafnansk) on X

## Author

- [Afnan - afnan.dev](https://afnan.dev)

