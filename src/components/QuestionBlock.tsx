"use client";
import { useState } from "react";

interface Option {
  id: string;
  text: string;
}

interface QuestionBlockProps {
  questionText: string;
  options: Option[];
  multiSelect?: boolean;
  onSubmit: (selectedIds: string[]) => Promise<void>;
  isLoading: boolean;
  /** Once graded, the correct option ids. Locks the question and shows right/wrong. */
  revealedCorrectIds?: string[] | null;
}

// Remount this component (key={question.id}) for each new question so the
// selection resets.
export default function QuestionBlock({
  questionText,
  options,
  multiSelect = false,
  onSubmit,
  isLoading,
  revealedCorrectIds = null,
}: QuestionBlockProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const locked = isLoading || revealedCorrectIds !== null;

  const toggle = (id: string) => {
    if (locked) return;
    if (multiSelect) {
      setSelected((cur) =>
        cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
      );
    } else {
      setSelected([id]);
    }
  };

  const optionStyle = (id: string) => {
    const isSelected = selected.includes(id);
    if (revealedCorrectIds) {
      const isCorrect = revealedCorrectIds.includes(id);
      if (isCorrect)
        return "border-emerald-500 bg-emerald-50 text-slate-900 ring-2 ring-emerald-500/20";
      if (isSelected)
        return "border-rose-400 bg-rose-50 text-slate-900 ring-2 ring-rose-400/20";
      return "border-stone-200 text-slate-500 opacity-70";
    }
    return isSelected
      ? "border-indigo-500 bg-indigo-50 text-slate-900 ring-2 ring-indigo-500/20"
      : "border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-slate-700";
  };

  const badgeStyle = (id: string) => {
    if (revealedCorrectIds) {
      if (revealedCorrectIds.includes(id)) return "bg-emerald-600 text-white";
      if (selected.includes(id)) return "bg-rose-500 text-white";
      return "bg-stone-100 text-slate-500";
    }
    return selected.includes(id)
      ? "bg-indigo-600 text-white"
      : "bg-stone-100 text-slate-700";
  };

  const badgeLabel = (id: string) => {
    if (!revealedCorrectIds) return id;
    if (revealedCorrectIds.includes(id)) return "✓";
    if (selected.includes(id)) return "✕";
    return id;
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-5 sm:p-6 w-full">
      <h3 className="text-lg font-semibold text-slate-900 leading-snug mb-1 tracking-tight">
        {questionText}
      </h3>
      <p className="text-xs text-slate-500 mb-5">
        {multiSelect ? "Select all that apply." : "Choose one answer."}
      </p>
      <div
        className="space-y-2.5 mb-6"
        role={multiSelect ? "group" : "radiogroup"}
        aria-label="Answer options"
      >
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => toggle(option.id)}
            disabled={locked}
            role={multiSelect ? "checkbox" : "radio"}
            aria-checked={selected.includes(option.id)}
            className={`w-full text-left p-4 rounded-xl border transition-all flex gap-3 items-start disabled:cursor-default ${optionStyle(option.id)}`}
          >
            <span
              className={`flex-shrink-0 w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center transition-colors ${badgeStyle(option.id)}`}
            >
              {badgeLabel(option.id)}
            </span>
            <span className="leading-relaxed">{option.text}</span>
          </button>
        ))}
      </div>
      {!revealedCorrectIds && (
        <button
          type="button"
          onClick={() => selected.length > 0 && onSubmit(selected)}
          disabled={selected.length === 0 || isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl shadow-sm shadow-indigo-600/20 disabled:bg-stone-200 disabled:text-slate-500 disabled:shadow-none disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Checking your answer…" : "Submit answer"}
        </button>
      )}
    </div>
  );
}
