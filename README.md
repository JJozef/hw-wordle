<div align="center">
<a href="https://hw-wordle.vercel.app">
<img src="https://hw-wordle.vercel.app/og.png">
</a>
<h1>Halloween Wordle</h1>
</div>

## 👻 Description

Halloween Wordle AI is an innovative and themed version of the popular word game, created for the midudev x Cloudinary hackathon. This game uses artificial intelligence to generate both the word to be guessed and a related image. Players must guess the Halloween word based on the AI-generated image, adding a unique and challenging twist to the classic game.

## 🕸️ Features

- AI-generated Halloween themed words
- AI-generated spooky images based on the secret word.
- Halloween atmospheric design
- Cloudinary integration for image management and optimization
- Game mode based on image interpretation
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
- Supabase and Prisma ORM

📥 Installation

1. Clone this repository:

```bash
git clone https://github.com/JJozef/hw-wordle.git
```

2. Install the dependencies:

```bash
bun i
```

3. Browse to the `.env.example` file, remove the `.example`, and add your credentials

4. Run migrations:

```bash
bun prisma db push

bun prisma generate
```

5. Start the development server:

```bash
bun dev
```

🏆 midudev x Cloudinary Hackathon

This project was created as part of the hackathon organized by midudev in collaboration with Cloudinary. The challenge was to create an innovative project using Cloudinary's capabilities, with a Halloween theme. This application takes a unique approach combining AI content generation with Cloudinary's efficient image management.
