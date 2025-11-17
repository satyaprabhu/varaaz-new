// @ts-nocheck
'use client'

import React, { useState, useMemo } from 'react';
import { Search, TrendingUp, Plus, X, ArrowRight, Star, Zap, CheckCircle, ExternalLink, Filter, ChevronDown, Sparkles, Menu, Users, Quote } from 'lucide-react';

// EDITABLE DATA - You can modify tool names, categories, momentum scores, etc. here
const TOOLS_DATA = [
  { id: 1, name: "Leonardo.ai", category: "AI Art Generators", url: "https://leonardo.ai", freePlan: true, paidFrom: 0, momentum: 87, verified: true, useCase: "Create stunning concept art and game assets", features: ["Fine-tuned AI models", "Real-time canvas editing", "Community model library"] },
  { id: 2, name: "Midjourney", category: "AI Art Generators", url: "https://midjourney.com", freePlan: false, paidFrom: 10, momentum: 94, verified: true, useCase: "Generate highly artistic and stylized imagery", features: ["Best-in-class artistic quality", "Discord-native workflow", "Version control for iterations"] },
  { id: 3, name: "Adobe Firefly", category: "AI Art Generators", url: "https://firefly.adobe.com", freePlan: true, paidFrom: 0, momentum: 82, verified: true, useCase: "Commercial-safe image generation for businesses", features: ["Adobe Creative Cloud integration", "Commercial licensing included", "Text effects and generative fill"] },
  { id: 4, name: "Ideogram", category: "AI Art Generators", url: "https://ideogram.ai", freePlan: true, paidFrom: 0, momentum: 76, verified: false, useCase: "Fast text-to-image with accurate text rendering", features: ["Superior text rendering in images", "Magic Prompt enhancement", "Fast generation speed"] },
  { id: 11, name: "GitHub Copilot", category: "AI Code Generators", url: "https://github.com/features/copilot", freePlan: false, paidFrom: 10, momentum: 96, verified: true, useCase: "AI pair programmer for faster coding", features: ["Context-aware code suggestions", "Multi-language support", "IDE integration (VS Code, JetBrains)"] },
  { id: 12, name: "ChatGPT", category: "AI Code Generators", url: "https://chat.openai.com", freePlan: true, paidFrom: 20, momentum: 98, verified: true, useCase: "Code generation, debugging, and explanations", features: ["Natural language to code", "Multi-language support", "Code review and optimization"] },
  { id: 13, name: "Tabnine", category: "AI Code Generators", url: "https://www.tabnine.com", freePlan: true, paidFrom: 12, momentum: 81, verified: true, useCase: "Private AI code completion for teams", features: ["Runs on your infrastructure", "Team-trained models", "Enterprise security"] },
  { id: 14, name: "Replit AI", category: "AI Code Generators", url: "https://replit.com", freePlan: true, paidFrom: 7, momentum: 85, verified: true, useCase: "Cloud IDE with AI coding assistant", features: ["Browser-based development", "Instant deployment", "Collaborative coding"] },
  { id: 22, name: "HeadshotPro", category: "AI Headshot Generator", url: "https://headshotpro.com", freePlan: false, paidFrom: 30, momentum: 88, verified: true, useCase: "Professional headshots for LinkedIn and resumes", features: ["Studio-quality results", "Multiple styles and backgrounds", "Corporate-ready output"] },
  { id: 23, name: "ProfilePictureAI", category: "AI Headshot Generator", url: "https://profilepicture.ai", freePlan: true, paidFrom: 5, momentum: 75, verified: false, useCase: "Quick stylized profile pictures for social media", features: ["100+ style options", "Fast processing", "Affordable pricing"] },
  { id: 24, name: "Remini", category: "AI Headshot Generator", url: "https://www.remini.ai", freePlan: true, paidFrom: 0, momentum: 83, verified: true, useCase: "Enhance and restore old photos", features: ["Photo enhancement AI", "Face restoration", "Mobile-first experience"] },
  { id: 31, name: "DALL-E", category: "AI Image Generators", url: "https://openai.com/dall-e", freePlan: true, paidFrom: 15, momentum: 92, verified: true, useCase: "Photorealistic image generation from text", features: ["Exceptional photorealism", "Inpainting and outpainting", "Safe content filtering"] },
  { id: 32, name: "Stable Diffusion", category: "AI Image Generators", url: "https://dreamstudio.ai", freePlan: true, paidFrom: 10, momentum: 86, verified: true, useCase: "Open-source flexible image generation", features: ["Open-source models", "ControlNet integration", "Custom model training"] },
  { id: 34, name: "Midjourney", category: "AI Image Generators", url: "https://midjourney.com", freePlan: false, paidFrom: 10, momentum: 94, verified: true, useCase: "Artistic image generation for creatives", features: ["Artistic style mastery", "Community gallery", "Remix and variation tools"] },
  { id: 41, name: "Otter.ai", category: "AI Meeting Assistants", url: "https://otter.ai", freePlan: true, paidFrom: 8, momentum: 91, verified: true, useCase: "Automated meeting transcription and notes", features: ["Real-time transcription", "Speaker identification", "Zoom/Teams integration"] },
  { id: 42, name: "Fireflies.ai", category: "AI Meeting Assistants", url: "https://fireflies.ai", freePlan: true, paidFrom: 0, momentum: 88, verified: true, useCase: "Record and search meeting conversations", features: ["AI-powered search", "CRM integration", "Action item extraction"] },
  { id: 43, name: "Fathom", category: "AI Meeting Assistants", url: "https://fathom.video", freePlan: true, paidFrom: 0, momentum: 84, verified: true, useCase: "Free Zoom meeting summaries and highlights", features: ["100% free forever", "Instant highlights", "Copy-paste summaries"] },
  { id: 51, name: "Suno AI", category: "AI Music Generator", url: "https://www.suno.ai", freePlan: true, paidFrom: 0, momentum: 90, verified: true, useCase: "Create full songs with vocals and instruments", features: ["Vocal generation", "Multiple genres", "Commercial licensing"] },
  { id: 52, name: "AIVA", category: "AI Music Generator", url: "https://www.aiva.ai", freePlan: true, paidFrom: 11, momentum: 75, verified: true, useCase: "Compose soundtrack music for media", features: ["Royalty-free licensing", "Style customization", "MIDI export"] },
  { id: 53, name: "Boomy", category: "AI Music Generator", url: "https://www.boomy.com", freePlan: true, paidFrom: 9, momentum: 72, verified: false, useCase: "Create and publish music to streaming platforms", features: ["Distribution to Spotify/Apple", "Revenue sharing", "Easy music creation"] },
  { id: 60, name: "Beautiful.ai", category: "AI Presentation Maker", url: "https://www.beautiful.ai", freePlan: true, paidFrom: 12, momentum: 82, verified: true, useCase: "Auto-designed presentation slides", features: ["Smart templates", "Auto-formatting", "Team collaboration"] },
  { id: 61, name: "Pitch", category: "AI Presentation Maker", url: "https://pitch.com", freePlan: true, paidFrom: 8, momentum: 79, verified: true, useCase: "Collaborative presentation building", features: ["Real-time collaboration", "Custom branding", "Analytics tracking"] },
  { id: 63, name: "SlidesAI", category: "AI Presentation Maker", url: "https://slidesai.io", freePlan: true, paidFrom: 5, momentum: 85, verified: false, useCase: "Convert text to slides instantly", features: ["Text-to-slides AI", "Multiple languages", "Google Slides integration"] },
  { id: 64, name: "Tome", category: "AI Presentation Maker", url: "https://tome.app", freePlan: true, paidFrom: 0, momentum: 88, verified: true, useCase: "AI-powered storytelling presentations", features: ["Narrative-driven design", "AI image generation", "Interactive embeds"] },
  { id: 70, name: "PromptBase", category: "AI Prompt Generators", url: "https://promptbase.com", freePlan: true, paidFrom: 0, momentum: 78, verified: true, useCase: "Buy and sell optimized AI prompts", features: ["Marketplace for prompts", "Quality-verified prompts", "Creator monetization"] },
  { id: 71, name: "PromptHero", category: "AI Prompt Generators", url: "https://prompthero.com", freePlan: true, paidFrom: 0, momentum: 81, verified: false, useCase: "Discover and share AI prompts", features: ["Large prompt library", "Model-specific prompts", "Community ratings"] },
  { id: 72, name: "FlowGPT", category: "AI Prompt Generators", url: "https://flowgpt.com", freePlan: true, paidFrom: 0, momentum: 83, verified: false, useCase: "ChatGPT prompt marketplace", features: ["ChatGPT-focused", "User ratings", "Free access"] },
  { id: 80, name: "Descript", category: "AI Video Editor", url: "https://www.descript.com", freePlan: true, paidFrom: 12, momentum: 93, verified: true, useCase: "Edit video by editing text transcript", features: ["Overdub voice cloning", "Multi-track editing", "Screen recording"] },
  { id: 81, name: "Runway", category: "AI Video Editor", url: "https://runwayml.com", freePlan: true, paidFrom: 15, momentum: 95, verified: true, useCase: "Generative AI for video creation and VFX", features: ["Text-to-video generation", "AI motion tracking", "Green screen removal"] },
  { id: 82, name: "Pika Labs", category: "AI Video Editor", url: "https://pikalabs.com", freePlan: true, paidFrom: 0, momentum: 86, verified: true, useCase: "Generate short video clips from text", features: ["Text-to-video AI", "Video style transfer", "Fast generation"] },
  { id: 83, name: "InVideo", category: "AI Video Editor", url: "https://invideo.io", freePlan: true, paidFrom: 10, momentum: 80, verified: false, useCase: "Template-based marketing videos", features: ["5000+ templates", "Text-to-video", "Stock media library"] },
  { id: 90, name: "ElevenLabs", category: "AI Voice Generator", url: "https://elevenlabs.io", freePlan: true, paidFrom: 5, momentum: 97, verified: true, useCase: "Ultra-realistic AI voice generation", features: ["Most realistic voices", "Voice cloning", "29 languages"] },
  { id: 91, name: "WellSaid Labs", category: "AI Voice Generator", url: "https://www.wellsaidlabs.com", freePlan: true, paidFrom: 99, momentum: 82, verified: true, useCase: "Enterprise-grade voice synthesis", features: ["Studio-quality voices", "Custom pronunciation", "Team workspaces"] },
  { id: 92, name: "Murf AI", category: "AI Voice Generator", url: "https://murf.ai", freePlan: true, paidFrom: 13, momentum: 85, verified: true, useCase: "Voiceover for presentations and videos", features: ["120+ voices", "Voice changer", "Video sync"] },
  { id: 98, name: "Speechify", category: "AI Voice Generator", url: "https://speechify.com", freePlan: true, paidFrom: 9, momentum: 84, verified: true, useCase: "Text-to-speech for accessibility", features: ["Natural reading voices", "Speed control", "Mobile & web apps"] }
];

const POPULAR_WORKFLOWS = [
  {
    id: 1,
    name: "Content Creator Stack",
    tools: ["ChatGPT", "Midjourney", "Descript"],
    category: "Content Creation",
    users: 2847
  },
  {
    id: 2,
    name: "Developer Productivity",
    tools: ["GitHub Copilot", "ChatGPT", "Tabnine"],
    category: "Development",
    users: 3921
  },
  {
    id: 3,
    name: "Marketing Suite",
    tools: ["Canva AI", "ChatGPT", "Beautiful.ai"],
    category: "Marketing",
    users: 2156
  },
  {
    id: 4,
    name: "Video Production Flow",
    tools: ["Runway", "ElevenLabs", "Descript"],
    category: "Video",
    users: 1843
  }
];

const REVIEWS = [
  {
    id: 1,
    userName: "Sarah Chen",
    role: "Content Creator",
    avatar: "SC",
    rating: 5,
    text: "SW-AI helped me discover the perfect workflow for my YouTube channel. The momentum scores are incredibly useful!",
    toolReviewed: "Descript",
    verified: true
  },
  {
    id: 2,
    userName: "Marcus Rodriguez",
    role: "Software Developer",
    avatar: "MR",
    rating: 5,
    text: "Finally, a directory that shows which AI tools actually work well together. Saved me weeks of trial and error.",
    toolReviewed: "GitHub Copilot",
    verified: true
  },
  {
    id: 3,
    userName: "Emma Thompson",
    role: "Marketing Manager",
    avatar: "ET",
    rating: 5,
    text: "The workflow builder is genius! I built our entire AI marketing stack in minutes.",
    toolReviewed: "Canva AI",
    verified: true
  }
];

export default function App() {
  // core UI state
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [workflow, setWorkflow] = useState<any[]>([]);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [filterFreePlan, setFilterFreePlan] = useState(false);
  const [sortBy, setSortBy] = useState('momentum');
  const [searchFilters, setSearchFilters] = useState<{
    categories: string[];
    momentumMin: number;
    verified: boolean;
  }>({ categories: [], momentumMin: 0, verified: false });
  const [compareTools, setCompareTools] = useState<any[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'warning' | 'success' } | null>(null);
  const [workflowName, setWorkflowName] = useState('My AI Stack');
  const [workflowDesc, setWorkflowDesc] = useState('');
  const [savedWorkflows, setSavedWorkflows] = useState<any[]>([]);
  const [isLoadingWorkflow, setIsLoadingWorkflow] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Load saved workflows from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('sw_ai_workflows');
    if (saved) {
      try {
        setSavedWorkflows(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load workflows:', e);
      }
    }
  }, []);

  // Helper: get initials (better-looking badges)
  const getInitials = (name: string) => name.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase();

  // Deduplicate tools by name (keep higher momentum entry)
  const dedupedTools = useMemo(() => {
    const map = new Map();
    TOOLS_DATA.forEach(t => {
      const key = t.name.trim().toLowerCase();
      if (!map.has(key) || (map.get(key).momentum || 0) < (t.momentum || 0)) {
        map.set(key, t);
      }
    });
    return Array.from(map.values());
  }, []);

  // derive categories dynamically (keeps UI in sync with data)
  const categories = useMemo(() => {
    return [...new Set(dedupedTools.map(t => t.category))];
  }, [dedupedTools]);

  const trendingTools = useMemo(() => {
    return [...dedupedTools].sort((a, b) => (b.momentum || 0) - (a.momentum || 0)).slice(0, 6);
  }, [dedupedTools]);

  const featuredTools = useMemo(() => {
    return dedupedTools.filter(t => t.verified && (t.momentum || 0) >= 90);
  }, [dedupedTools]);

  const filteredTools = useMemo(() => {
    let tools = dedupedTools;

    if (selectedCategory) {
      tools = tools.filter(t => t.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      tools = tools.filter(t =>
        (t.name || '').toLowerCase().includes(q) ||
        (t.category || '').toLowerCase().includes(q)
      );
    }

    // Apply search-specific filters
    if (filterFreePlan) {
      tools = tools.filter(t => t.freePlan);
    }

    if (searchFilters.verified) {
      tools = tools.filter(t => t.verified);
    }

    if (searchFilters.momentumMin > 0) {
      tools = tools.filter(t => (t.momentum || 0) >= searchFilters.momentumMin);
    }

    if (searchFilters.categories.length > 0) {
      tools = tools.filter(t => searchFilters.categories.includes(t.category));
    }

    if (sortBy === 'momentum') {
      tools = [...tools].sort((a, b) => (b.momentum || 0) - (a.momentum || 0));
    } else if (sortBy === 'name') {
      tools = [...tools].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }

    return tools;
  }, [dedupedTools, selectedCategory, searchQuery, filterFreePlan, sortBy, searchFilters]);

  const addToWorkflow = (tool: any) => {
    if (workflow.find(t => t.id === tool.id)) {
      return; // Already in workflow
    }

    if (workflow.length < 4) {
      setWorkflow(prev => [...prev, tool]);
      setNotification({ message: `${tool.name} added to workflow!`, type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    } else {
      setNotification({ message: 'Workflow is full! Max 4 tools allowed per workflow.', type: 'warning' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const removeFromWorkflow = (toolId: number) => {
    setWorkflow(prev => prev.filter(t => t.id !== toolId));
  };

  const addToCompare = (tool: any) => {
    if (compareTools.find(t => t.id === tool.id)) {
      return; // Already in compare
    }

    if (compareTools.length < 4) {
      setCompareTools(prev => [...prev, tool]);
      setNotification({ message: `${tool.name} added to comparison!`, type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    } else {
      setNotification({ message: 'Comparison is full! Max 4 tools allowed per comparison.', type: 'warning' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const removeFromCompare = (toolId: number) => {
    setCompareTools(prev => prev.filter(t => t.id !== toolId));
  };

  const saveWorkflow = () => {
    if (!workflowName.trim()) {
      setNotification({ message: 'Please enter a workflow name', type: 'warning' });
      return;
    }

    setIsLoadingWorkflow(true);

    // Simulate save operation (localStorage is instant, but add delay for UX feedback)
    setTimeout(() => {
      const newWorkflow = {
        id: Date.now(),
        name: workflowName,
        description: workflowDesc,
        tools: workflow,
        shareUrl: `workflow_${Date.now()}`,
        createdAt: new Date().toISOString(),
        savedCount: 0
      };

      const updated = [...savedWorkflows, newWorkflow];
      setSavedWorkflows(updated);
      localStorage.setItem('sw_ai_workflows', JSON.stringify(updated));

      setNotification({ message: `✓ Workflow "${workflowName}" saved! Share URL: sw-ai.com/w/${newWorkflow.shareUrl}`, type: 'success' });
      setIsLoadingWorkflow(false);

      setTimeout(() => {
        setWorkflow([]);
        setWorkflowName('My AI Stack');
        setWorkflowDesc('');
        setShowWorkflow(false);
        setNotification(null);
      }, 2000);
    }, 500);
  };

  const copyShareUrl = (shareUrl: string) => {
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/workflow/${shareUrl}`;
    navigator.clipboard.writeText(url);
    setNotification({ message: 'Workflow link copied to clipboard!', type: 'success' });
    setTimeout(() => setNotification(null), 2000);
  };

  const getMomentumColor = (momentum: number | undefined) => {
    if ((momentum || 0) >= 90) return 'text-green-600 bg-green-50';
    if ((momentum || 0) >= 75) return 'text-blue-700 bg-blue-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getMomentumLabel = (momentum: number | undefined) => {
    const m = momentum || 0;
    if (m >= 95) return '🔥 Trending';
    if (m >= 90) return '⭐ Top Tier';
    if (m >= 80) return '✓ Strong';
    if (m >= 70) return '→ Growing';
    return 'Standard';
  };

  // ---------- Render functions (kept as in-file functions for clarity) ----------
  const renderHeader = () => (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button onClick={() => { setCurrentView('home'); setSelectedCategory(null); setSelectedTool(null); }} aria-label="Go home" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6, #06b6d4)' }}>
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #1e3a8a, #3b82f6, #06b6d4)' }}>SW-AI</span>
            </button>
            <nav className="hidden md:flex gap-6">
              <button onClick={() => { setCurrentView('home'); setSelectedCategory(null); }} className="text-gray-600 hover:text-gray-900">Home</button>
              <button onClick={() => setShowWorkflow(true)} className="text-gray-600 hover:text-gray-900">Workflows</button>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-gray-900">Trending</button>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowWorkflow(true)} aria-label="Open workflow" className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Zap className="w-5 h-5" />
              {workflow.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 text-white text-xs rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)' }}>
                  {workflow.length}
                </span>
              )}
            </button>
            <button className="px-4 py-2 text-white rounded-lg font-medium hover:shadow-lg transition-shadow" style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6, #06b6d4)' }}>List Your Tool</button>
          </div>
        </div>
      </div>
    </header>
  );

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #1e3a8a, #3b82f6, #06b6d4)' }}>Discover AI Tools That Work Together</h1>
          <p className="text-xl text-gray-600 mb-8">Find, connect, and benchmark AI tools with real performance data</p>
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search AI tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      setCurrentView('search-inline');
                      setSelectedCategory(null);
                    }
                  }}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none text-lg" style={{ focusBorderColor: '#1e3a8a' }}
                  aria-label="Search tools"
                />
              </div>
              <button
                onClick={() => {
                  if (searchQuery.trim()) {
                    setIsSearching(true);
                    setTimeout(() => {
                      setCurrentView('search-inline');
                      setIsSearching(false);
                    }, 300);
                  }
                }}
                disabled={isSearching}
                className={`px-6 py-4 text-white rounded-lg font-medium whitespace-nowrap flex items-center gap-2 ${isSearching ? 'opacity-75' : ''}`}
                style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)' }}
              >
                {isSearching ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Search
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={() => setShowWorkflow(true)} className="px-8 py-4 text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-2xl transition-all" style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6, #06b6d4)' }}>
              ⚡ Build My Workflow
            </button>
            <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="px-6 py-3 bg-white border-2 border-gray-200 rounded-lg font-medium hover:border-cyan-500 hover:shadow-md transition-all">View All Tools</button>
          </div>
        </div>

        <div className="mb-16 rounded-2xl p-8 text-white" style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6, #06b6d4)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Featured Tools</h2>
            <span className="ml-auto px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">Premium Placement</span>
          </div>
          <p className="text-white text-opacity-90 mb-6">Top-rated AI tools verified by our team</p>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredTools.slice(0, 4).map(tool => (
              <div
                key={tool.id}
                className="bg-white rounded-xl p-6 text-gray-900 hover:shadow-2xl transition-all cursor-pointer"
                onClick={() => { setSelectedTool(tool); setCurrentView('detail'); }}
                role="button"
                tabIndex={0}
                aria-label={`Open details for ${tool.name}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                      {getInitials(tool.name)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{tool.name}</h3>
                      <p className="text-sm text-gray-600">{tool.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">{tool.momentum}</div>
                    <CheckCircle className="w-5 h-5 text-blue-700" />
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-500 mb-1">USE CASE</p>
                  <p className="text-gray-700">{tool.useCase}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-2">KEY FEATURES</p>
                  <div className="space-y-1">
                    {tool.features && tool.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-700 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 flex items-center justify-center gap-2">View Details <ArrowRight className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold">Rising AI Tools This Week</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {trendingTools.map((tool, idx) => (
              <div key={tool.id} className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-cyan-500 transition-all cursor-pointer hover:shadow-lg" onClick={() => { setSelectedTool(tool); setCurrentView('detail'); }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">{getInitials(tool.name)}</div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">#{idx + 1}</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{tool.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{tool.category}</p>
                <div className="flex items-center justify-between">
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getMomentumColor(tool.momentum)}`}>Momentum: {tool.momentum}</div>
                  {tool.verified && <CheckCircle className="w-5 h-5 text-blue-700" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {categories.map(cat => {
              const count = dedupedTools.filter(t => t.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setCurrentView('category'); }}
                  className="p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-cyan-500 transition-all text-left hover:shadow-lg"
                  aria-label={`Browse ${cat}`}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mb-3 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{cat}</h3>
                  <p className="text-sm text-gray-600">{count} tools</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools For You - Recommendation Engine */}
        <div className="mb-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-200">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-bold">Recommended for You</h2>
            <span className="ml-auto px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-full">AI-Curated</span>
          </div>
          <p className="text-gray-700 mb-6">Based on trending tools, we think you'll love these:</p>
          <div className="grid md:grid-cols-4 gap-4">
            {trendingTools.slice(0, 4).map((tool) => (
              <div
                key={tool.id}
                onClick={() => { setSelectedTool(tool); setCurrentView('detail'); }}
                className="bg-white rounded-lg p-4 border-2 border-amber-100 hover:border-amber-400 cursor-pointer transition-all hover:shadow-lg"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {getInitials(tool.name)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm">{tool.name}</h3>
                    <p className="text-xs text-gray-600">{getMomentumLabel(tool.momentum)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${getMomentumColor(tool.momentum)}`}>
                    {tool.momentum}
                  </span>
                  {tool.verified && <CheckCircle className="w-4 h-4 text-amber-600" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold">Popular Workflow Combinations</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {POPULAR_WORKFLOWS.map(workflow => (
              <div key={workflow.id} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-100 hover:border-blue-300 transition-all hover:shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{workflow.name}</h3>
                    <p className="text-sm text-gray-600">{workflow.category}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600 bg-white px-2 py-1 rounded-lg">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold">{workflow.users.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  {workflow.tools.map((tool, idx) => (
                    <React.Fragment key={tool}>
                      <div className="px-3 py-1 bg-white rounded-lg text-sm font-medium border border-blue-200">
                        {tool}
                      </div>
                      {idx < workflow.tools.length - 1 && <ArrowRight className="w-4 h-4 text-gray-400" />}
                    </React.Fragment>
                  ))}
                </div>
                <button onClick={() => setShowWorkflow(true)} className="w-full px-4 py-2 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 text-sm transition-all">Use This Workflow</button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Quote className="w-6 h-6 text-purple-500" />
              <h2 className="text-2xl font-bold">What Users Are Saying</h2>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-yellow-500">★ 4.8/5</div>
              <p className="text-xs text-gray-600">{REVIEWS.length}+ verified reviews</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map(review => (
              <div key={review.id} className="bg-white rounded-xl p-6 shadow-md border-2 border-transparent hover:border-purple-200 transition-all hover:shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {review.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm">{review.userName}</h4>
                        {review.verified && <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-gray-600">{review.role}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3 italic">"{review.text}"</p>
                <div className="pt-3 border-t border-gray-200">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">{review.toolReviewed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCategory = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => { setCurrentView('home'); setSelectedCategory(null); }}
            className="mb-6 flex items-center gap-1 hover:opacity-80 transition-opacity text-blue-100 hover:text-white"
          >
            ← Back to Home
          </button>

          <div className="mb-8">
            <h1 className="text-5xl font-black mb-3">{selectedCategory}</h1>
            <p className="text-blue-100 text-lg">Explore powerful AI tools in this category</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-30">
              <div className="text-3xl font-bold">{filteredTools.length}</div>
              <div className="text-blue-100 text-sm">Tools Available</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-30">
              <div className="text-3xl font-bold">{Math.round(filteredTools.reduce((sum, t) => sum + (t.momentum || 0), 0) / filteredTools.length)}</div>
              <div className="text-blue-100 text-sm">Avg. Momentum Score</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-30">
              <div className="text-3xl font-bold">{filteredTools.filter(t => t.verified).length}</div>
              <div className="text-blue-100 text-sm">Verified Tools</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="mb-6 flex gap-4 items-center flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={filterFreePlan} onChange={(e) => setFilterFreePlan(e.target.checked)} className="rounded" />
              <span>Free Plan Only</span>
            </label>
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 rounded-lg border-2 border-gray-200">
            <option value="momentum">Sort by Momentum</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <div key={tool.id} className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-cyan-500 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">{getInitials(tool.name)}</div>
                {tool.verified && <CheckCircle className="w-5 h-5 text-blue-700" />}
              </div>
              <h3 className="font-bold text-lg mb-2">{tool.name}</h3>
              {tool.useCase && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tool.useCase}</p>
              )}
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-100 rounded text-xs">{tool.freePlan ? 'Free Plan' : `From ${tool.paidFrom}`}</span>
                <div className={`px-2 py-1 rounded text-xs font-semibold ${getMomentumColor(tool.momentum)}`}>{tool.momentum}</div>
              </div>
              {tool.features && tool.features.length > 0 && (
                <div className="mb-4 space-y-1">
                  {tool.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-blue-700 mt-1 flex-shrink-0" />
                      <span className="text-xs text-gray-600 line-clamp-1">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Contact Details Section */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs font-semibold text-gray-600 mb-2">CONTACT DETAILS</p>
                {/* Contact details placeholder - awaiting data structure */}
              </div>

              <div className="flex gap-2">
                <button onClick={() => { setSelectedTool(tool); setCurrentView('detail'); }} className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-sm font-medium">View Details</button>
                <button onClick={() => addToWorkflow(tool)} className="px-4 py-2 border-2 border-blue-600 text-blue-700 rounded-lg hover:bg-blue-50 text-sm font-medium"><Plus className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDetail = () => {
    if (!selectedTool) return null;

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button onClick={() => setCurrentView(selectedCategory ? 'category' : 'home')} className="text-blue-700 hover:underline mb-6 flex items-center gap-1">← Back</button>

          <div className="bg-white rounded-xl p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl">{getInitials(selectedTool.name)}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-3xl font-bold">{selectedTool.name}</h1>
                    {selectedTool.verified && <CheckCircle className="w-6 h-6 text-blue-700" />}
                  </div>
                  <p className="text-gray-600">{selectedTool.category}</p>
                </div>
              </div>
              <a href={selectedTool.url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg flex items-center gap-2">Visit Tool <ExternalLink className="w-4 h-4" /></a>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className={`px-4 py-3 rounded-lg font-semibold ${getMomentumColor(selectedTool.momentum)} border-2 border-current border-opacity-20`}>
                <div className="text-sm mb-1">Momentum Score</div>
                <div className="text-2xl font-bold">{selectedTool.momentum}<span className="text-sm ml-1">/ 100</span></div>
                <div className="text-xs mt-2 opacity-80">{getMomentumLabel(selectedTool.momentum)}</div>
              </div>
              <div className="px-4 py-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-300">
                <div className="text-sm font-semibold text-blue-900 mb-2">What this means</div>
                <p className="text-xs text-blue-800">
                  {selectedTool.momentum >= 90 ? '⭐ Top performing tool with strong user adoption' :
                   selectedTool.momentum >= 80 ? '✓ Well-established with solid performance' :
                   selectedTool.momentum >= 70 ? '→ Growing tool with increasing popularity' :
                   'Standard tool in its category'}
                </p>
              </div>
              <div className="px-4 py-3 bg-gray-100 rounded-lg border-2 border-gray-300">
                <div className="text-sm font-semibold text-gray-900 mb-2">Pricing</div>
                <p className="text-sm font-bold text-gray-800">{selectedTool.freePlan ? '✓ Free Plan' : `From $${selectedTool.paidFrom}/mo`}</p>
                {selectedTool.verified && <p className="text-xs text-green-700 mt-1 font-semibold">✓ Verified Tool</p>}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3">Overview</h2>
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-blue-900 mb-1">PRIMARY USE CASE</p>
                <p className="text-blue-800 font-medium">{selectedTool.useCase}</p>
              </div>
              <p className="text-gray-700 leading-relaxed">{selectedTool.name} is a powerful AI tool in the {selectedTool.category} category. With a momentum score of {selectedTool.momentum}, it's showing strong performance in the market.</p>
            </div>

            {selectedTool.features && selectedTool.features.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Key Features</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedTool.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 flex-col sm:flex-row">
              <button onClick={() => addToWorkflow(selectedTool)} className="flex-1 px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 flex items-center justify-center gap-2"><Plus className="w-5 h-5" /> Add to Workflow</button>
              <button onClick={() => { addToCompare(selectedTool); if (compareTools.length > 0) setShowCompare(true); }} className="flex-1 px-6 py-3 border-2 border-blue-600 text-blue-700 rounded-lg font-medium hover:bg-blue-50 flex items-center justify-center gap-2"><span>⚖</span> Compare</button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8">
            <h2 className="text-xl font-bold mb-4">User Reviews</h2>
            <div className="space-y-4 mb-6">
              {/* reviews handling kept simple */}
            </div>
            <button className="px-6 py-3 border-2 border-blue-600 text-blue-700 rounded-lg font-medium hover:bg-blue-50 w-full">Write a Review</button>
          </div>

          <div className="bg-white rounded-xl p-8 mt-6">
            <h2 className="text-xl font-bold mb-4">Related Tools</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {dedupedTools.filter(t => t.category === selectedTool.category && t.id !== selectedTool.id).slice(0, 4).map(tool => (
                <button
                  key={tool.id}
                  onClick={() => { setSelectedTool(tool); setCurrentView('detail'); }}
                  className="p-4 border-2 border-gray-100 rounded-lg hover:border-cyan-500 text-left transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">{getInitials(tool.name)}</div>
                    <div>
                      <h3 className="font-semibold">{tool.name}</h3>
                      <p className="text-sm text-gray-600">Momentum: {tool.momentum}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSearchInline = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header with back button */}
        <button
          onClick={() => { setCurrentView('home'); setSearchQuery(''); }}
          className="mb-6 flex items-center gap-1 hover:opacity-80 transition-opacity text-blue-700 hover:text-blue-900 font-semibold"
        >
          ← Back to Home
        </button>

        {/* Title and result count */}
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2">
            Search Results for "<span className="text-blue-700">{searchQuery}</span>"
          </h1>
          <p className="text-gray-600">
            Found <span className="font-bold text-lg">{filteredTools.length}</span> tool{filteredTools.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Unified Search Hub - Quick Access Shortcuts */}
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
          <div className="mb-6">
            <h3 className="font-bold text-sm uppercase tracking-wide text-gray-700 mb-4">🔥 Quick Filters</h3>
            <div className="flex flex-wrap gap-3">
              {/* Popular filters */}
              <button
                onClick={() => setSearchFilters({...searchFilters, verified: !searchFilters.verified})}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  searchFilters.verified
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'bg-white border-2 border-blue-300 text-blue-700 hover:bg-blue-50'
                }`}
              >
                ✓ Verified Only
              </button>
              <button
                onClick={() => setSearchFilters({...searchFilters, momentumMin: searchFilters.momentumMin === 90 ? 0 : 90})}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  searchFilters.momentumMin === 90
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-white border-2 border-green-300 text-green-700 hover:bg-green-50'
                }`}
              >
                ⚡ Top Performers (90+)
              </button>
              <button
                onClick={() => setFilterFreePlan(!filterFreePlan)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  filterFreePlan
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white border-2 border-purple-300 text-purple-700 hover:bg-purple-50'
                }`}
              >
                💰 Free Only
              </button>
            </div>
          </div>

          {/* Trending Categories */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide text-gray-700 mb-3">Trending Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 6).map(cat => {
                const count = dedupedTools.filter(t => t.category === cat).length;
                const isSelected = searchFilters.categories.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      if (isSelected) {
                        setSearchFilters({...searchFilters, categories: searchFilters.categories.filter(c => c !== cat)});
                      } else {
                        setSearchFilters({...searchFilters, categories: [...searchFilters.categories, cat]});
                      }
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-700 text-white shadow-md'
                        : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-400'
                    }`}
                  >
                    {cat.split(' ')[0]} <span className="text-gray-500 ml-1">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main layout: filters sidebar + results grid */}
        <div className="flex gap-8">
          {/* Filters Sidebar - Left */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 border-2 border-gray-100 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-gray-600" />
                <h3 className="font-bold text-lg">Filters</h3>
              </div>

              <div className="space-y-6">
                {/* Pricing Filter */}
                <div>
                  <label className="block font-semibold text-sm mb-3 text-gray-700">Pricing</label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded">
                    <input type="checkbox" checked={filterFreePlan} onChange={(e) => setFilterFreePlan(e.target.checked)} className="rounded w-4 h-4" />
                    <span className="text-sm">Free Plan</span>
                  </label>
                </div>

                {/* Verification Filter */}
                <div>
                  <label className="block font-semibold text-sm mb-3 text-gray-700">Verification</label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded">
                    <input type="checkbox" checked={searchFilters.verified} onChange={(e) => setSearchFilters({...searchFilters, verified: e.target.checked})} className="rounded w-4 h-4" />
                    <span className="text-sm">Verified Only</span>
                  </label>
                </div>

                {/* Momentum Filter */}
                <div>
                  <label className="block font-semibold text-sm mb-3 text-gray-700">Min. Momentum</label>
                  <select value={searchFilters.momentumMin} onChange={(e) => setSearchFilters({...searchFilters, momentumMin: parseInt(e.target.value)})} className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 text-sm">
                    <option value={0}>All Momentum</option>
                    <option value={75}>75+</option>
                    <option value={80}>80+</option>
                    <option value={90}>90+</option>
                  </select>
                </div>

                {/* Sort Option */}
                <div>
                  <label className="block font-semibold text-sm mb-3 text-gray-700">Sort By</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 text-sm">
                    <option value="momentum">Momentum (High to Low)</option>
                    <option value="name">Name (A to Z)</option>
                  </select>
                </div>

                {/* Categories */}
                <div>
                  <label className="block font-semibold text-sm mb-3 text-gray-700">Categories</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {categories.map(cat => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded">
                        <input
                          type="checkbox"
                          checked={searchFilters.categories.includes(cat)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSearchFilters({...searchFilters, categories: [...searchFilters.categories, cat]});
                            } else {
                              setSearchFilters({...searchFilters, categories: searchFilters.categories.filter(c => c !== cat)});
                            }
                          }}
                          className="rounded w-4 h-4"
                        />
                        <span className="text-sm">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters Button */}
                {(filterFreePlan || searchFilters.verified || searchFilters.momentumMin > 0 || searchFilters.categories.length > 0) && (
                  <button
                    onClick={() => {
                      setFilterFreePlan(false);
                      setSearchFilters({ categories: [], momentumMin: 0, verified: false });
                    }}
                    className="w-full px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results Grid - Right */}
          <div className="flex-1">
            {filteredTools.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border-2 border-gray-100">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-700">No tools found</h3>
                <p className="text-gray-600 mb-6">Try different keywords or adjust your filters</p>
                <button onClick={() => { setCurrentView('home'); setSearchQuery(''); }} className="px-6 py-3 text-white rounded-lg font-medium" style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)' }}>Back to Home</button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map(tool => (
                  <div key={tool.id} className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-cyan-500 transition-all hover:shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">{getInitials(tool.name)}</div>
                      {tool.verified && <CheckCircle className="w-5 h-5 text-blue-700" />}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{tool.name}</h3>
                    {tool.useCase && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tool.useCase}</p>
                    )}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">{tool.freePlan ? 'Free Plan' : `From ${tool.paidFrom}`}</span>
                      <div className={`px-2 py-1 rounded text-xs font-semibold ${getMomentumColor(tool.momentum)}`}>{tool.momentum}</div>
                    </div>
                    {tool.features && tool.features.length > 0 && (
                      <div className="mb-4 space-y-1">
                        {tool.features.slice(0, 2).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-blue-700 mt-1 flex-shrink-0" />
                            <span className="text-xs text-gray-600 line-clamp-1">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2 flex-wrap">
                      <button onClick={() => { setSelectedTool(tool); setCurrentView('detail'); }} className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-sm font-medium">View Details</button>
                      <button onClick={() => { addToCompare(tool); if (compareTools.length === 0) setCompareTools([tool]); else setShowCompare(true); }} title="Add to compare (Max 4)" className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 text-sm font-medium" disabled={compareTools.length >= 4 && !compareTools.find(t => t.id === tool.id)}>⚖</button>
                      <button onClick={() => addToWorkflow(tool)} title="Add to workflow (Max 4)" className="px-4 py-2 border-2 border-blue-700 text-blue-700 rounded-lg hover:bg-blue-50 text-sm font-medium" disabled={workflow.length >= 4 && !workflow.find(t => t.id === tool.id)}><Plus className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSearchResults = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Search Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => { setCurrentView('home'); setSearchQuery(''); }}
            className="mb-6 flex items-center gap-1 hover:opacity-80 transition-opacity text-blue-100 hover:text-white"
          >
            ← Back to Home
          </button>

          <div className="mb-6">
            <h1 className="text-4xl font-black mb-2">Search Results</h1>
            <p className="text-blue-100 text-lg">for "<span className="font-bold">{searchQuery}</span>"</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white border-opacity-30">
              <div className="text-2xl font-bold">{filteredTools.length}</div>
              <div className="text-blue-100 text-sm">Results Found</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Advanced Filters */}
        <div className="mb-8 bg-white rounded-xl p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-bold text-lg">Refine Results</h3>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Free Plan Filter */}
            <div>
              <label className="block font-semibold text-sm mb-3 text-gray-700">Pricing</label>
              <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input type="checkbox" checked={filterFreePlan} onChange={(e) => setFilterFreePlan(e.target.checked)} className="rounded w-4 h-4" />
                <span className="text-sm">Free Plan Available</span>
              </label>
            </div>

            {/* Verified Filter */}
            <div>
              <label className="block font-semibold text-sm mb-3 text-gray-700">Verification</label>
              <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input type="checkbox" checked={searchFilters.verified} onChange={(e) => setSearchFilters({...searchFilters, verified: e.target.checked})} className="rounded w-4 h-4" />
                <span className="text-sm">Verified Tools Only</span>
              </label>
            </div>

            {/* Momentum Filter */}
            <div>
              <label className="block font-semibold text-sm mb-3 text-gray-700">Min. Momentum</label>
              <select value={searchFilters.momentumMin} onChange={(e) => setSearchFilters({...searchFilters, momentumMin: parseInt(e.target.value)})} className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 text-sm">
                <option value={0}>All Momentum</option>
                <option value={75}>75+</option>
                <option value={80}>80+</option>
                <option value={90}>90+</option>
              </select>
            </div>

            {/* Sort Option */}
            <div>
              <label className="block font-semibold text-sm mb-3 text-gray-700">Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 text-sm">
                <option value="momentum">Momentum (High to Low)</option>
                <option value="name">Name (A to Z)</option>
              </select>
            </div>
          </div>

          {/* Category Multi-Select */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <label className="block font-semibold text-sm mb-3 text-gray-700">Categories</label>
            <div className="grid md:grid-cols-5 gap-2">
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded border border-gray-200">
                  <input
                    type="checkbox"
                    checked={searchFilters.categories.includes(cat)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSearchFilters({...searchFilters, categories: [...searchFilters.categories, cat]});
                      } else {
                        setSearchFilters({...searchFilters, categories: searchFilters.categories.filter(c => c !== cat)});
                      }
                    }}
                    className="rounded w-4 h-4"
                  />
                  <span className="text-xs">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters Button */}
          {(filterFreePlan || searchFilters.verified || searchFilters.momentumMin > 0 || searchFilters.categories.length > 0) && (
            <button
              onClick={() => {
                setFilterFreePlan(false);
                setSearchFilters({ categories: [], momentumMin: 0, verified: false });
              }}
              className="mt-6 px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-700">No tools found</h3>
            <p className="text-gray-600 mb-6">Try different keywords or browse by category</p>
            <button onClick={() => { setCurrentView('home'); setSearchQuery(''); }} className="px-6 py-3 text-white rounded-lg font-medium" style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)' }}>Back to Home</button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredTools.map(tool => (
              <div key={tool.id} className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-cyan-500 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">{getInitials(tool.name)}</div>
                  {tool.verified && <CheckCircle className="w-5 h-5 text-blue-700" />}
                </div>
                <h3 className="font-bold text-lg mb-2">{tool.name}</h3>
                {tool.useCase && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tool.useCase}</p>
                )}
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs">{tool.freePlan ? 'Free Plan' : `From ${tool.paidFrom}`}</span>
                  <div className={`px-2 py-1 rounded text-xs font-semibold ${getMomentumColor(tool.momentum)}`}>{tool.momentum}</div>
                </div>
                {tool.features && tool.features.length > 0 && (
                  <div className="mb-4 space-y-1">
                    {tool.features.slice(0, 2).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-blue-700 mt-1 flex-shrink-0" />
                        <span className="text-xs text-gray-600 line-clamp-1">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => { setSelectedTool(tool); setCurrentView('detail'); }} className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-sm font-medium">View Details</button>
                  <button onClick={() => { addToCompare(tool); if (compareTools.length === 0) setCompareTools([tool]); else setShowCompare(true); }} title="Add to compare (Max 4)" className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 text-sm font-medium" disabled={compareTools.length >= 4 && !compareTools.find(t => t.id === tool.id)}>⚖</button>
                  <button onClick={() => addToWorkflow(tool)} title="Add to workflow (Max 4)" className="px-4 py-2 border-2 border-blue-700 text-blue-700 rounded-lg hover:bg-blue-50 text-sm font-medium" disabled={workflow.length >= 4 && !workflow.find(t => t.id === tool.id)}><Plus className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderCompare = () => (
    <div className="min-h-screen bg-white flex flex-col">
      {renderHeader()}
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <button onClick={() => { setShowCompare(false); setCompareTools([]); }} className="text-blue-700 hover:underline mb-2 flex items-center gap-1">← Back</button>
            <h1 className="text-3xl font-bold mb-2">Compare Tools</h1>
            <p className="text-gray-600">Compare up to 4 tools side-by-side</p>
          </div>

        {compareTools.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border-2 border-gray-100">
            <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-700">No tools selected for comparison</h3>
            <p className="text-gray-600 mb-6">Add 2-4 tools to compare them side-by-side</p>
            <button onClick={() => setShowCompare(false)} className="px-6 py-3 text-white rounded-lg font-medium" style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)' }}>Start Adding Tools</button>
          </div>
        ) : (
          <>
            {/* Desktop Table View (hidden on mobile) */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full bg-white rounded-xl border-2 border-gray-100">
                <thead>
                  <tr className="border-b-2 border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
                    <th className="px-6 py-4 text-left font-bold text-gray-700 min-w-48">Feature</th>
                    {compareTools.map((tool, idx) => {
                      const isHighestMomentum = compareTools.reduce((max, t) => (t.momentum || 0) > (max.momentum || 0) ? t : max) === tool;
                      return (
                        <th key={tool.id} className={`px-6 py-4 text-left font-bold min-w-60 ${isHighestMomentum ? 'bg-yellow-50 border-l-4 border-yellow-400' : ''}`}>
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-900">{tool.name}</span>
                                {isHighestMomentum && <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded text-xs font-bold">⭐ Best</span>}
                                {tool.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">{tool.category}</div>
                            </div>
                            <button
                              onClick={() => removeFromCompare(tool.id)}
                              className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {/* Pricing Row */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-700">Pricing</td>
                    {compareTools.map(tool => (
                      <td key={tool.id} className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm font-medium">
                          {tool.freePlan ? 'Free Plan' : `From $${tool.paidFrom}/mo`}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Momentum Row */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-700">Momentum Score</td>
                    {compareTools.map(tool => (
                      <td key={tool.id} className="px-6 py-4">
                        <div className={`px-3 py-1 rounded text-sm font-bold inline-block ${getMomentumColor(tool.momentum)}`}>
                          {tool.momentum}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Verified Row */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-700">Verified</td>
                    {compareTools.map(tool => (
                      <td key={tool.id} className="px-6 py-4">
                        {tool.verified ? (
                          <div className="flex items-center gap-2 text-green-700">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">Yes</span>
                          </div>
                        ) : (
                          <span className="text-gray-500">No</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Use Case Row */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-700">Use Case</td>
                    {compareTools.map(tool => (
                      <td key={tool.id} className="px-6 py-4">
                        <p className="text-sm text-gray-600">{tool.useCase || 'N/A'}</p>
                      </td>
                    ))}
                  </tr>

                  {/* Features Row */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-700">Features</td>
                    {compareTools.map(tool => (
                      <td key={tool.id} className="px-6 py-4">
                        <ul className="space-y-2">
                          {tool.features && tool.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Action Row */}
                  <tr className="border-b border-gray-100">
                    <td className="px-6 py-4 font-semibold text-gray-700">Action</td>
                    {compareTools.map(tool => (
                      <td key={tool.id} className="px-6 py-4">
                        <button
                          onClick={() => { setSelectedTool(tool); setCurrentView('detail'); setShowCompare(false); }}
                          className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-sm font-medium w-full"
                        >
                          View Details
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (shown on mobile/tablet) */}
            <div className="lg:hidden space-y-4">
              {compareTools.map(tool => (
                <div key={tool.id} className="bg-white rounded-xl border-2 border-gray-100 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {getInitials(tool.name)}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{tool.name}</h3>
                          <p className="text-xs text-gray-500">{tool.category}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCompare(tool.id)}
                      className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 border-t border-gray-200 pt-4">
                    {/* Pricing */}
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Pricing</span>
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm font-medium">
                        {tool.freePlan ? 'Free Plan' : `From $${tool.paidFrom}/mo`}
                      </span>
                    </div>

                    {/* Momentum */}
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Momentum</span>
                      <div className={`px-3 py-1 rounded text-sm font-bold ${getMomentumColor(tool.momentum)}`}>
                        {tool.momentum}
                      </div>
                    </div>

                    {/* Verified */}
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Verified</span>
                      {tool.verified ? (
                        <div className="flex items-center gap-2 text-green-700">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium text-sm">Yes</span>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-sm">No</span>
                      )}
                    </div>

                    {/* Use Case */}
                    <div>
                      <span className="font-semibold text-gray-700 block mb-2">Use Case</span>
                      <p className="text-sm text-gray-600">{tool.useCase || 'N/A'}</p>
                    </div>

                    {/* Features */}
                    {tool.features && tool.features.length > 0 && (
                      <div>
                        <span className="font-semibold text-gray-700 block mb-2">Features</span>
                        <ul className="space-y-2">
                          {tool.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action */}
                    <button
                      onClick={() => { setSelectedTool(tool); setCurrentView('detail'); setShowCompare(false); }}
                      className="w-full px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-sm font-medium mt-4"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add More Tools */}
            {compareTools.length < 4 && (
              <div className="mt-6 bg-white rounded-xl border-2 border-dashed border-blue-300 p-8 text-center">
                <p className="text-gray-600 mb-4">Add {4 - compareTools.length} more tool(s) to compare</p>
                <button
                  onClick={() => setShowCompare(false)}
                  className="px-6 py-3 text-white rounded-lg font-medium"
                  style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)' }}
                >
                  Add Another Tool
                </button>
              </div>
            )}
          </>
        )}
        </div>
      </div>
      {renderFooter()}
    </div>
  );

  const renderFooter = () => (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)' }}>
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">SW-AI</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              We help you find the right software for your business. Feel confident with the most comprehensive software search resource out there.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <span className="text-sm">f</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <span className="text-sm">𝕏</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <span className="text-sm">in</span>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold mb-4 text-white">Product</h4>
            <ul className="space-y-3">
              <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-400 hover:text-white transition-colors text-sm">Browse Tools</button></li>
              <li><button onClick={() => { setCurrentView('home'); setSelectedCategory(null); }} className="text-gray-400 hover:text-white transition-colors text-sm">Categories</button></li>
              <li><button onClick={() => setShowWorkflow(true)} className="text-gray-400 hover:text-white transition-colors text-sm">Workflows</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors text-sm cursor-not-allowed">List Your Tool</button></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold mb-4 text-white">Company</h4>
            <ul className="space-y-3">
              <li><button className="text-gray-400 hover:text-white transition-colors text-sm">About Us</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors text-sm">Blog</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors text-sm">Careers</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors text-sm">Contact</button></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold mb-4 text-white">Legal</h4>
            <ul className="space-y-3">
              <li><button className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors text-sm">Disclaimer</button></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 SW-AI. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Made with <span className="text-cyan-400">❤️</span> for software discovery
            </p>
          </div>
        </div>
      </div>
    </footer>
  );

  const renderWorkflow = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Build Your AI Stack</h2>
            <p className="text-gray-600">Combine tools to create your perfect workflow</p>
          </div>
          <button onClick={() => setShowWorkflow(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-6 h-6" /></button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {workflow.length === 0 ? (
            <div className="text-center py-12">
              <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No tools in your workflow yet</h3>
              <p className="text-gray-600 mb-6">Start adding AI tools to build your custom workflow (Max 4 tools)</p>
              <button onClick={() => { setShowWorkflow(false); setCurrentView('home'); }} className="px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800">Browse Tools</button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Workflow Details Form */}
              <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                <h3 className="font-semibold text-lg mb-4">Workflow Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Workflow Name *</label>
                    <input
                      type="text"
                      value={workflowName}
                      onChange={(e) => setWorkflowName(e.target.value)}
                      placeholder="e.g., Content Creator Suite"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description (Optional)</label>
                    <textarea
                      value={workflowDesc}
                      onChange={(e) => setWorkflowDesc(e.target.value)}
                      placeholder="e.g., Perfect for creating YouTube content - AI writing, image generation, and video editing all in one"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 h-20 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Tool List */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Your Tools ({workflow.length}/4)</h3>
                <div className="space-y-3">
                  {workflow.map((tool, idx) => (
                    <div key={tool.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div className="text-2xl font-bold text-gray-400 min-w-fit">#{idx + 1}</div>
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">{getInitials(tool.name)}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{tool.name}</h4>
                        <p className="text-sm text-gray-600">{tool.category}</p>
                      </div>
                      {idx < workflow.length - 1 && <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                      <button onClick={() => removeFromWorkflow(tool.id)} className="p-2 hover:bg-gray-200 rounded-lg flex-shrink-0"><X className="w-5 h-5" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {workflow.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex gap-3 flex-col sm:flex-row">
              <button
                onClick={saveWorkflow}
                disabled={isLoadingWorkflow}
                className={`flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 ${isLoadingWorkflow ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoadingWorkflow ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Save & Get Share Link
                  </>
                )}
              </button>
              <button onClick={() => { setShowWorkflow(false); setCurrentView('home'); }} disabled={isLoadingWorkflow} className={`px-6 py-3 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition ${isLoadingWorkflow ? 'opacity-50 cursor-not-allowed' : ''}`}>
                Add More Tools
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-3 text-center">Your workflow will be saved locally on this device and you'll get a shareable link</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {showCompare ? renderCompare() : (
        <>
          {renderHeader()}
          <div className="flex-1">
            {currentView === 'home' && renderHome()}
            {currentView === 'category' && renderCategory()}
            {currentView === 'detail' && renderDetail()}
            {currentView === 'search' && renderSearchResults()}
            {currentView === 'search-inline' && renderSearchInline()}
          </div>
          {renderFooter()}
          {showWorkflow && renderWorkflow()}

          {/* Notification Toast */}
          {notification && (
            <div className={`fixed top-8 right-8 px-6 py-4 rounded-lg font-medium shadow-lg animate-in fade-in slide-in-from-top z-50 ${
              notification.type === 'warning'
                ? 'bg-yellow-50 border-2 border-yellow-400 text-yellow-800'
                : 'bg-green-50 border-2 border-green-400 text-green-800'
            }`}>
              {notification.message}
            </div>
          )}

          {/* Floating Compare Button */}
          {compareTools.length > 0 && !showCompare && (
            <button
              onClick={() => setShowCompare(true)}
              className="fixed bottom-8 right-8 px-6 py-3 bg-blue-700 text-white rounded-lg font-bold shadow-lg hover:bg-blue-800 transition-all flex items-center gap-2 z-40"
            >
              <span>⚖ Compare ({compareTools.length})</span>
            </button>
          )}
        </>
      )}
    </div>
  );
}
