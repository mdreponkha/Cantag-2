import React from 'react';
import { X, Building, MapPin, Zap, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenQuoteModal: (projectName: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenQuoteModal,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl text-slate-100">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-500/15 text-amber-400 text-xs font-bold uppercase mb-2 border border-amber-500/30">
            {project.category} Engineering Case Study
          </div>
          <h2 className="font-['Outfit'] font-black text-2xl sm:text-3xl text-white">
            {project.title}
          </h2>
        </div>

        {/* Project Meta Card */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs mb-6">
          <div>
            <span className="text-slate-400 block mb-0.5">Client</span>
            <strong className="text-white">{project.client}</strong>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Location</span>
            <strong className="text-white">{project.location}</strong>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Installed Capacity</span>
            <strong className="text-amber-400">{project.capacity.split(' ')[0]} {project.capacity.split(' ')[1]}</strong>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Year</span>
            <strong className="text-white">{project.year}</strong>
          </div>
        </div>

        {/* Case Narrative */}
        <div className="space-y-4 mb-6 text-sm text-slate-300 leading-relaxed">
          <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
            Engineering Scope & Execution Narrative
          </h4>
          <p>{project.description}</p>
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
            <span className="text-slate-400 font-semibold block mb-1">Engine & Alternator Package Deployed:</span>
            <strong className="text-slate-200">{project.engineUsed}</strong>
          </div>
        </div>

        {/* Key Engineering Highlights */}
        <div className="space-y-2 mb-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-2">
            Technical Milestones Delivered
          </h4>
          {project.highlights.map((hl, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>{hl}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={() => {
              onClose();
              onOpenQuoteModal(`Project: ${project.title}`);
            }}
            className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-lg flex items-center justify-center gap-2"
          >
            <span>Inquire About Similar Installation Scope</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
