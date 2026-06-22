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
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl w-full"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{questionText}</h3>
      {multiSelect && (
        <p className="text-xs text-gray-500 mb-4">
          Select all that apply.
        </p>
      )}
      {!multiSelect && <div className="mb-4" />}
      <div className="space-y-3 mb-6">
        {options.map((option) => {
          const isSelected = selected.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => toggle(option.id)}
              disabled={isLoading}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                isSelected
                  ? 'border-blue-600 bg-blue-50 text-blue-900 font-medium'
                  : 'border-gray-200 hover:border-gray-300 bg-gray-50 text-gray-700'
              }`}
            >
              <span className="font-bold mr-2">{option.id}.</span> {option.text}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => selected.length > 0 && onSubmit(selected)}
        disabled={selected.length === 0 || isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Evaluating with AI Coach...' : 'Submit Answer'}
      </button>
    </div>
  );
}
