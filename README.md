# Taskbrew ☕️

## Getting Started 🏁

1. Clone this repo 📁
2. Database setup 💾: Follow instructions on [Postgres.app](https://postgresapp.com/):
3. Setup environment variables 🌎
   1. Copy and paste the contents of [`.env.example`](./.env.example) into a new `.env` file
   2. For auth provider (GitHub and Google) client IDs and secrets, ask me for them if you're working with me, or just make your own
4. Install project dependencies 📦: `npm install`
5. Setup database migration 🐦‍: `npx prisma migrate dev`
6. Start development server 🍽️: `npm run dev`
7. [Optional] Start Prisma studio 🎨: `npx prisma studio`

Your development server will be running on [3000](http://localhost:3000) and Prisma Studio will be running on [5555](http://localhost:5555)

## Best Practices

### Folder Structure

- Generally, just follow [Next.js's app router folder structure](https://nextjs.org/docs/app/building-your-application/routing)
- If it makes sense to pull out a component, put it in [the components folder](./components/)
- Put all hooks in [the hooks folder](./hooks/)

### Styling

- Always use [tailwindcss](https://tailwindcss.com/)
- When it makes sense, opt to use [headlessui](https://headlessui.com/)

### Add a New Icon

1. Go [here](https://reactsvgicons.com/ant-design-icons)
2. Find the icon you want, and copy the TypeScript code for it
3. Open [the icons file](./components/icons.tsx)
4. Paste it in
5. Remove the import, export and comment, height, and width lines
6. Add `export` in front of the function definition
7. Import your icon from `@taskbrew/components/icons` in your usage

### Other

- Use [ChatGPT](https://chat.openai.com/)? 🤷‍♂️
