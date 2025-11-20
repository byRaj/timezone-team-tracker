
import { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const DownloadProject = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateProjectZip = async () => {
    setIsGenerating(true);
    
    try {
      // Import JSZip dynamically
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();

      // Project structure and files
      const projectFiles = {
        // Root files
        'README.md': await fetch('/README.md').then(r => r.text()).catch(() => generateReadmeContent()),
        'package.json': JSON.stringify(generatePackageJson(), null, 2),
        'tailwind.config.ts': generateTailwindConfig(),
        'vite.config.js': generateViteConfig(),
        'postcss.config.js': generatePostcssConfig(),
        'components.json': JSON.stringify(generateComponentsJson(), null, 2),
        'PROJECT_OVERVIEW.md': generateProjectOverview(),
        
        // Backend files
        'backend/package.json': JSON.stringify(generateBackendPackageJson(), null, 2),
        'backend/server.js': generateServerJs(),
        'backend/.env': generateEnvFile(),
        'backend/models/TeamMember.js': generateTeamMemberModel(),
        'backend/routes/teamMembers.js': generateTeamMemberRoutes(),
        'backend/routes/connection.js': generateConnectionRoute(),
        'backend/scripts/seed.js': generateSeedScript(),
        'backend/README.md': generateBackendReadme(),
        
        // Frontend source files would be added here
        // (This is a simplified version - in a real implementation, 
        // you'd iterate through all your actual source files)
      };

      // Add files to ZIP
      for (const [filePath, content] of Object.entries(projectFiles)) {
        zip.file(filePath, content);
      }

      // Generate and download ZIP
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'team-availability-tracker.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      toast.success('Project downloaded successfully!');
      
    } catch (error) {
      console.error('Error generating project ZIP:', error);
      toast.error('Failed to generate project download');
    } finally {
      setIsGenerating(false);
    }
  };

  // Helper functions to generate file contents
  const generateReadmeContent = () => `# Team Availability Tracker

A full-stack real-time team availability tracking application.

## Quick Start

### Backend Setup
1. Navigate to backend folder: \`cd backend\`
2. Install dependencies: \`npm install\`
3. Start MongoDB service
4. Run: \`npm run dev\`

### Frontend Setup
1. Install dependencies: \`npm install\`
2. Run: \`npm run dev\`

## Features
- Real-time status updates
- Team member management
- MongoDB integration
- Modern React UI with Tailwind CSS

For detailed documentation, see PROJECT_OVERVIEW.md
`;

  const generatePackageJson = () => ({
    name: "team-availability-tracker",
    version: "1.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "vite build",
      preview: "vite preview"
    },
    dependencies: {
      react: "^18.3.1",
      "react-dom": "^18.3.1",
      "react-router-dom": "^6.26.2",
      "@tanstack/react-query": "^5.56.2",
      "lucide-react": "^0.462.0",
      "sonner": "^1.5.0",
      "socket.io-client": "^4.7.5"
    },
    devDependencies: {
      "@vitejs/plugin-react-swc": "^3.7.0",
      vite: "^5.4.8",
      tailwindcss: "^3.4.10",
      autoprefixer: "^10.4.20",
      postcss: "^8.4.47"
    }
  });

  const generateBackendPackageJson = () => ({
    name: "team-tracker-backend",
    version: "1.0.0",
    main: "server.js",
    scripts: {
      start: "node server.js",
      dev: "nodemon server.js"
    },
    dependencies: {
      express: "^4.19.2",
      mongoose: "^8.6.0",
      "socket.io": "^4.7.5",
      cors: "^2.8.5",
      dotenv: "^16.4.5"
    },
    devDependencies: {
      nodemon: "^3.1.4"
    }
  });

  const generateTailwindConfig = () => `import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;`;

  const generateViteConfig = () => `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 5173,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});`;

  const generatePostcssConfig = () => `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

  const generateComponentsJson = () => ({
    $schema: "https://ui.shadcn.com/schema.json",
    style: "default",
    rsc: false,
    tsx: true,
    tailwind: {
      config: "tailwind.config.ts",
      css: "src/index.css",
      baseColor: "slate",
      cssVariables: true,
      prefix: ""
    },
    aliases: {
      components: "@/components",
      utils: "@/lib/utils"
    }
  });

  const generateProjectOverview = () => `# Team Availability Tracker - Project Overview

## Features
- Real-time status updates with Socket.IO
- Team member management
- MongoDB integration
- Modern React UI with Tailwind CSS
- Admin panel for team management
- Timezone support
- Working hours tracking

## Technology Stack
- Frontend: React, Tailwind CSS, shadcn/ui
- Backend: Node.js, Express, MongoDB
- Real-time: Socket.IO
- Build Tool: Vite

## Setup Instructions
1. Install MongoDB
2. Setup backend (see backend/README.md)
3. Setup frontend (npm install && npm run dev)
4. Access at http://localhost:5173

## Architecture
- Frontend communicates with backend via REST API
- Real-time updates via WebSocket connection
- MongoDB for persistent data storage
`;

  const generateServerJs = () => `const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/team-tracker');

// Routes
app.use('/api/users', require('./routes/teamMembers'));
app.use('/api', require('./routes/connection'));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('status-update', (data) => {
    socket.broadcast.emit('status-update', data);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`;

  const generateEnvFile = () => `PORT=5000
MONGODB_URI=mongodb://localhost:27017/team-tracker
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development`;

  const generateTeamMemberModel = () => `const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  avatar: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['available', 'busy', 'in-meeting', 'offline'],
    default: 'offline'
  },
  timezone: { type: String, default: 'UTC' },
  location: { type: String, default: '' },
  workingHours: {
    start: { type: String, default: '09:00' },
    end: { type: String, default: '17:00' }
  },
  lastUpdated: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);`;

  const generateTeamMemberRoutes = () => `const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');

// Get all team members
router.get('/', async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new team member
router.post('/', async (req, res) => {
  try {
    const member = new TeamMember(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update member status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      { status, lastUpdated: new Date() },
      { new: true }
    );
    res.json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete team member
router.delete('/:id', async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;`;

  const generateConnectionRoute = () => `const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/test-connection', async (req, res) => {
  try {
    const state = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    res.json({
      status: 'success',
      connection: states[state],
      database: mongoose.connection.name
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;`;

  const generateSeedScript = () => `const mongoose = require('mongoose');
const TeamMember = require('../models/TeamMember');
require('dotenv').config();

const seedData = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Frontend Developer',
    status: 'available',
    timezone: 'America/New_York',
    location: 'New York, USA'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Backend Developer',
    status: 'busy',
    timezone: 'Europe/London',
    location: 'London, UK'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/team-tracker');
    await TeamMember.deleteMany({});
    await TeamMember.insertMany(seedData);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();`;

  const generateBackendReadme = () => `# Team Tracker Backend

Express.js backend with MongoDB and Socket.IO for real-time team tracking.

## Setup
1. Install dependencies: \`npm install\`
2. Start MongoDB service
3. Copy .env.example to .env and configure
4. Run: \`npm run dev\`

## API Endpoints
- GET /api/users - Get all team members
- POST /api/users - Create new member
- PUT /api/users/:id/status - Update status
- DELETE /api/users/:id - Delete member

## WebSocket Events
- status-update - Real-time status changes
- member-added - New member notifications
`;

  return (
    <Button 
      onClick={generateProjectZip}
      disabled={isGenerating}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      {isGenerating ? 'Generating...' : 'Download Project'}
    </Button>
  );
};

export default DownloadProject;
