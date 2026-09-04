import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, X } from 'lucide-react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/themeData';

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-16 sm:py-20 bg-white text-slate-800 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
            LATEST INSIGHTS & ARTICLES
          </span>
          <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-[#08192E] tracking-tight">
            Technical Articles & Power Guides
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            In-depth guides on generator sizing, motor starting inrush compensation, paralleling architectures, and preventative maintenance protocols.
          </p>
        </div>

        {/* Blog Posts 3-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-slate-50 border border-slate-200 hover:border-blue-500 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-blue-600 font-semibold mb-3">
                  <span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded font-bold">
                    {post.category}
                  </span>
                  <span className="text-slate-500">{post.readTime}</span>
                </div>

                <h3 className="font-['Outfit'] font-bold text-lg text-slate-900 group-hover:text-blue-600 transition mb-3">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {post.summary}
                </p>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{post.date}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="w-full py-2.5 rounded-md bg-white hover:bg-blue-600 hover:text-white text-blue-600 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border border-blue-200 hover:border-blue-600"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Full Post Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-bold uppercase mb-3 border border-blue-200">
                {selectedPost.category}
              </div>

              <h2 className="font-['Outfit'] font-black text-2xl text-slate-900 mb-3">
                {selectedPost.title}
              </h2>

              <div className="flex items-center gap-4 text-xs text-slate-500 mb-6 pb-4 border-b border-slate-200">
                <span>By {selectedPost.author}</span>
                <span>•</span>
                <span>{selectedPost.date}</span>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                {selectedPost.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Tags:</span>
                {selectedPost.tags.map((tag, i) => (
                  <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

