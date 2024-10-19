# 🎃 Halloween Wordle AI

![Halloween Wordle AI Banner](https://res.cloudinary.com/demo/image/upload/w_700,c_thumb,g_face,f_auto,q_auto/halloween_wordle_ai.jpg)

## 👻 Description

Halloween Wordle AI is an innovative and themed version of the popular word game, created for the midudev x Cloudinary hackathon. This game uses artificial intelligence to generate both the word to be guessed and a related image. Players must guess the Halloween word based on the AI-generated image, adding a unique and challenging twist to the classic game.

## 🕸️ Features

- AI-generated Halloween themed words
- AI-generated spooky images based on the secret word.
- Halloween atmospheric design
- Cloudinary integration for image management and optimization
- Game mode based on image interpretation
- Leaderboard for each game
- Each set can be shared

## 🧙‍♀️ Using Cloudinary

Cloudinary has been used in this project to:

1. Store and serve the AI-generated images.
2. Apply transformations to the images to include the secret word in an unordered manner in the image
3. Optimize delivery of assets to improve performance

## 🦇 Technologies Used

- Next.js
- Cloudinary SDK
- Tailwind CSS
- OpenAI API for word generation
- DALL-E for image generation
- Turso database (sqlite) for storing game data and leaderboard
- Prisma ORM (with `adapter-libsql`)

📥 Installation

1. Clone this repository:

```bash
git clone https://github.com/tu-usuario/halloween-wordle-ai.git
```

2. Install the dependencies:

```bash
bun i
```

3. Browse to the `.env.example` file, remove the `.example`, and add your credentials

4. Run migrations:

```bash
# https://www.prisma.io/docs/orm/overview/databases/turso

# 1. Create a new database on turso site
# 2. Add your credentials to the .env file
# 3. Install turso (in windows use WSL)

# ----

# 1.
bun prisma generate

# 2.
bun prisma migrate dev --name init

# 3. (in windows terminal with WSL)
    # 1. init wsl
        wsl
    # 2. install turso
        curl -sSfL https://get.tur.so/install.sh | bash
    # 3. login
        turso auth login --headless

# 4. (in WSL)
turso db shell turso-prisma-db < ./prisma/migrations/20230922132717_init/migration.sql

# 5.
bun dev
```

🏆 midudev x Cloudinary Hackathon

This project was created as part of the hackathon organized by midudev in collaboration with Cloudinary. The challenge was to create an innovative project using Cloudinary's capabilities, with a Halloween theme. This application takes a unique approach combining AI content generation with Cloudinary's efficient image management.
