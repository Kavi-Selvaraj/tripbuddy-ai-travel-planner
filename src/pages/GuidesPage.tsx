import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, X, Clock, User, Check, ArrowRight, Share2 } from 'lucide-react';
import { TRAVEL_GUIDES } from '../data/guides';
import { TravelGuide } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const GuidesPage: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<TravelGuide | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Budget Travel', 'Weekend Escapes', 'Packing & Prep', 'Eco Travel'];

  const filteredGuides = activeCategory === 'All' 
    ? TRAVEL_GUIDES 
    : TRAVEL_GUIDES.filter(g => g.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Breadcrumb */}
        <div>
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
            <Link to="/" className="hover:text-[#1E4D3A]">Home</Link>
            <span>/</span>
            <span className="text-[#1E2923] font-medium">Travel Field Guides</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#1E2923] tracking-tight">
            Travel Inspiration & Practical Guides
          </h1>
          <p className="text-sm text-[#64748B] mt-1 max-w-2xl leading-relaxed">
            Essential field intelligence written by seasoned Indian travelers. Practical budgeting tactics, universal packing checklists, and responsible tourism ethics.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1E4D3A] text-white shadow-xs'
                  : 'bg-white text-[#1E2923] border border-[#EAE5DC] hover:border-[#1E4D3A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGuides.map(guide => (
            <div
              key={guide.id}
              className="group bg-white border border-[#EAE5DC] rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="aspect-16/9 overflow-hidden bg-[#EAE5DC]">
                <ImageWithFallback
                  src={guide.coverImage}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1.5">
                    <span>{guide.category}</span>
                    <span>·</span>
                    <span>{guide.readTime}</span>
                    <span>·</span>
                    <span>{guide.publishDate}</span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-[#1E2923] group-hover:text-[#1E4D3A] transition-colors leading-snug">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                    {guide.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0ECE4] flex items-center justify-between">
                  <span className="text-xs text-[#64748B]">{guide.author}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedGuide(guide)}
                    className="px-4 py-2 text-xs font-semibold text-[#1E2923] bg-[#FAF8F5] hover:bg-[#1E4D3A] hover:text-white border border-[#EAE5DC] rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full Screen / Modal Article Reader */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#EAE5DC] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#F0ECE4] flex items-center justify-between z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E4D3A]">
                {selectedGuide.category} · {selectedGuide.readTime}
              </span>
              <button
                onClick={() => setSelectedGuide(null)}
                className="p-1.5 text-[#64748B] hover:text-[#1E2923] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-10 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1E2923] leading-tight">
                  {selectedGuide.title}
                </h2>
                <p className="text-sm text-[#64748B] mt-2 leading-relaxed font-medium">
                  {selectedGuide.subtitle}
                </p>
                <div className="flex items-center gap-3 text-xs text-[#64748B] pt-3 border-t border-[#F0ECE4] mt-4">
                  <span>Written by <strong>{selectedGuide.author}</strong></span>
                  <span>·</span>
                  <span>{selectedGuide.publishDate}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] text-xs text-[#1E2923] italic leading-relaxed">
                "{selectedGuide.summary}"
              </div>

              {/* Sections */}
              <div className="space-y-6 pt-2">
                {selectedGuide.sections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-lg font-bold font-display text-[#1E2923]">
                      {section.heading}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1E2923]/80 leading-relaxed">
                      {section.content}
                    </p>
                    {section.bulletPoints && (
                      <ul className="space-y-1.5 pl-2 pt-1 text-xs text-[#1E2923]">
                        {section.bulletPoints.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1E4D3A] mt-1.5 shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-[#F0ECE4] flex items-center justify-between">
                <span className="text-xs text-[#64748B]">Was this guide useful for your trip planning?</span>
                <button
                  type="button"
                  onClick={() => setSelectedGuide(null)}
                  className="px-4 py-2 bg-[#1E4D3A] text-white text-xs font-semibold rounded-xl"
                >
                  Close Article
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
