# Anopa Machipisa | Portfolio

Personal portfolio of Anopa Machipisa, a Computer Science student specialising in Data Science at Albukhary International University, Malaysia.

**Live site:** https://anopa-portfolio.vercel.app

## Features

- Animated hero with a swinging, draggable ID card and a scannable QR code
- About, Education, Experience, Skills, Projects, Certificates and Featured project sections
- Project filters by category, status labels (Completed, In progress, Concept) and a details popup
- Certificate previews with a full-size viewer and verification links
- Contact form with validation, connected to Formspree
- AI article generator interface (not connected to an AI service yet)
- Loading screen, back-to-top button and a responsive mobile menu

## Built with

React, Vite, JavaScript, HTML5, CSS3, Framer Motion and Lucide React.

## Run it locally

You need [Node.js](https://nodejs.org) (version 18 or newer).

```bash
git clone https://github.com/Anopa21/anopa-portfolio.git
cd anopa-portfolio
npm install
npm run dev
```

Open the address it prints, usually http://localhost:5173.

To test the production version:

```bash
npm run build
npm run preview
```

## Customise it

| What | Where |
| --- | --- |
| Photo (ID card and About) | Replace `src/assets/Ano.jpg` with your own image, keeping the same name |
| CV download | Put your PDF in the `public` folder, then set `CV_URL` in `src/components/Hero.jsx` to `'/your-cv-file.pdf'` |
| Projects | Edit the `projects` list in `src/components/Projects.jsx` |
| Project screenshots | Add images to `src/assets/projects/`, then set `image: 'file-name.jpg'` on the project |
| Certificates | Add images to `src/assets/certificates/` and edit the list in `src/components/Certificates.jsx` |
| Skills | Edit `src/components/Skills.jsx` |
| Experience | Add entries to the `experience` list in `src/components/Experience.jsx` |
| Social links | Edit the three links at the top of `src/components/SocialLinks.jsx` |
| QR code | Replace `src/assets/portfolio-qr.png` with a QR image for your website address |
| Contact form | Set `FORM_ENDPOINT` in `src/components/Contact.jsx` to your Formspree form address |

## AI article generator

The interface is built, but it is not connected to an AI service, and it says so when used. To connect it, create a small backend (for example a Vercel serverless function) that holds the API key as a private environment variable and accepts `POST { topic, tone }`, then returns `{ article: "text" }`. Put its address in `AI_ENDPOINT` in `src/components/AIShowcase.jsx`. **Never put an API key in the frontend code.**

## Deployment

The site is deployed on [Vercel](https://vercel.com), which rebuilds it automatically on every push to `main`. Build command: `npm run build`. Output directory: `dist`.

## Notes

- The CarePath AI project uses synthetic data only. No real patients and no trained model are connected.
- Projects marked "Concept" are ideas, not built work.

## Author

Anopa Machipisa · [GitHub](https://github.com/Anopa21) · [LinkedIn](https://www.linkedin.com/in/anopa-machipisa-931a17341)