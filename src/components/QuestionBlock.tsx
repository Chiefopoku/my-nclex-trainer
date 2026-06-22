'use client';
import { useState } from 'react';

interface Option {
  id: string;
  text: string;
}

interface QuestionBlockProps {
  questionId: string;
  questionText: string;
  options: Option[];
  multiSelect?: boolean;
  onSubmit: (selectedIds: string[]) => Promise<void>;
  isLoading: boolean;
}

export default function QuestionBlock({
  questionId,
  questionText,
  options,
  multiSelect = false,
  onSubmit,
  isLoading,
}: QuestionBlockProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (multiSelect) {
      setSelected((cur) =>
        cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
      );
    } else {
      setSelected([id]);
    }
  };

  return (
    <div
      key={questionId}
      className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6 max-w-2xl w-full"
    >
      <h3 className="text-lg font-semibold text-slate-900 leading-snug mb-1 tracking-tight">
        {questionText}
      </h3>
      {multiSelect ? (
        <p className="text-xs text-slate-500 mb-5">Select all that apply.</p>
      ) : (
        <div className="mb-5" />
      )}
      <div className="space-y-2.5 mb-6">
        {options.map((option) => {
          const isSelected = selected.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => toggle(option.id)}
              disabled={isLoading}
              className={`w-full text-left p-4 rounded-xl border transition-all flex gap-3 items-start ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50 text-slate-900 ring-2 ring-indigo-500/20'
                  : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-slate-700'
              }`}
            >
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'bg-stone-100 text-slate-700'
                }`}
              >
                {option.id}
              </span>
              <span className="leading-relaxed">{option.text}</span>
            </button>
          );
        })}
      </div>
      <button
        onClick={() => selected.length > 0 && onSubmit(selected)}
        disabled={selected.length === 0 || isLoading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl shadow-sm shadow-indigo-600/20 disabled:bg-stone-200 disabled:text-slate-500 disabled:shadow-none disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Evaluating with AI Coach…' : 'Submit Answer'}
      </button>
    </div>
  );
}
