import React from 'react';
import { Library as LibraryIcon, Book, Layers, FileText, Search, Star, Clock, TrendingUp } from 'lucide-react';

const sampleLibraryItems = [
  {
    id: '1',
    title: 'Double Diamond Design Framework',
    category: 'Templates',
    description: 'A classic UX research and design process framework with four phases: Discover, Define, Develop, and Deliver.',
    tags: ['UX', 'Design', 'Research'],
    stars: 142,
    lastUsed: '2 days ago',
    icon: Layers,
  },
  {
    id: '2',
    title: 'Product Launch Strategy',
    category: 'Workflows',
    description: 'Multi-phase workflow for coordinating product launch activities across marketing, engineering, and sales.',
    tags: ['Product', 'Launch', 'GTM'],
    stars: 98,
    lastUsed: '1 week ago',
    icon: TrendingUp,
  },
  {
    id: '3',
    title: 'Technical Architecture Review',
    category: 'Templates',
    description: 'Systematic review process for evaluating and documenting system architecture decisions.',
    tags: ['Engineering', 'Architecture', 'Review'],
    stars: 67,
    lastUsed: '3 days ago',
    icon: FileText,
  },
  {
    id: '4',
    title: 'Customer Research Pipeline',
    category: 'Workflows',
    description: 'End-to-end workflow for conducting user interviews, synthesizing insights, and generating recommendations.',
    tags: ['Research', 'UX', 'Insights'],
    stars: 54,
    lastUsed: '5 days ago',
    icon: Book,
  },
];

const categories = ['All', 'Templates', 'Workflows', 'My Items', 'Starred'];

interface LibraryProps {
  setCurrentPage: (page: string) => void;
}

export default function Library({ setCurrentPage }: LibraryProps) {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [search, setSearch] = React.useState('');

  const filtered = sampleLibraryItems.filter(item => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = search === '' || item.title.toLowerCase().includes(search.toLowerCase()) || item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#faf5ff] dark:bg-[#0c0c0e] text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#1e1e24] px-8 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2945D1] to-[#A259FF] flex items-center justify-center shadow-lg">
            <LibraryIcon size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Library</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Templates, workflows, and saved configurations</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-6 max-w-5xl mx-auto w-full">
        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates and workflows..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#2945D1]/30 focus:border-[#2945D1] dark:focus:border-blue-500 transition"
            />
          </div>
          <div className="flex items-center gap-1 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeCategory === cat
                    ? 'bg-[#2945D1] text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-[#1e1e24] border border-gray-100 dark:border-zinc-800 rounded-2xl p-5 hover:shadow-lg hover:border-[#2945D1]/30 dark:hover:border-blue-600/30 transition-all cursor-pointer group"
                onClick={() => setCurrentPage('templateCanvas')}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 flex items-center justify-center shrink-0 group-hover:from-[#2945D1]/10 group-hover:to-[#A259FF]/10 transition-all">
                    <Icon size={18} className="text-[#2945D1] dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 leading-tight group-hover:text-[#2945D1] dark:group-hover:text-blue-400 transition">{item.title}</h3>
                    <p className="text-[10px] text-[#A259FF] dark:text-purple-400 font-bold mt-0.5">{item.category}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 shrink-0">
                    <Star size={11} fill="currentColor" />
                    <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">{item.stars}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 rounded-full text-[10px] font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 shrink-0">
                    <Clock size={10} />
                    <span className="text-[10px]">{item.lastUsed}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400 dark:text-gray-600">
            <LibraryIcon size={36} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">No items found</p>
            <p className="text-xs mt-1">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
