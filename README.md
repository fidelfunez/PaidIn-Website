# PaidIn Marketing & Landing Website

A modern, responsive marketing website for PaidIn - the Bitcoin accounting software for small businesses.

## Features

- **Modern React + TypeScript** - Built with React 18 and TypeScript
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible, unstyled UI components
- **Responsive Design** - Optimized for all devices
- **Dark Mode Support** - Built-in theme switching

## Local Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PaidIn-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run check` - Type check with TypeScript

## Deployment

### Netlify Deployment

This project is configured for easy deployment on Netlify:

1. **Connect your repository** to Netlify
2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18` (or higher)

3. **Environment variables** (if needed):
   - Add any required environment variables in Netlify dashboard

4. **Deploy!** - Netlify will automatically build and deploy your site

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder** to your hosting provider

## 📁 Project Structure

```
├── client/                 # Frontend source code
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   └── main.tsx      # App entry point
│   └── index.html        # HTML template
├── attached_assets/       # Static assets
├── dist/                 # Build output (generated)
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Customization

### Styling
- **Tailwind CSS** - Modify `tailwind.config.ts` for theme customization
- **Components** - Edit components in `client/src/components/`
- **Pages** - Update page content in `client/src/pages/`

### Configuration
- **Vite** - Modify `vite.config.ts` for build settings
- **TypeScript** - Update `tsconfig.json` for TypeScript options

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port in `vite.config.ts` or kill the process using port 3000

2. **Build errors**
   - Run `npm run check` to identify TypeScript errors
   - Ensure all dependencies are installed with `npm install`

3. **Netlify deployment fails**
   - Check build logs in Netlify dashboard
   - Ensure build command and publish directory are correct
   - Verify Node.js version compatibility

## 📝 License

MIT License - Use it, fork it, build with it.

---

Built with 🧡 for PaidIn.
