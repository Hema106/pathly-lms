import { useState } from "react";
import { ChevronDown, PlayCircle, Lock } from "lucide-react";

export default function CurriculumAccordion({ sections, unlocked = false }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="border border-border rounded-lg overflow-hidden divide-y divide-border">
      {sections.map((section, i) => {
        const isOpen = open === i;
        return (
          <div key={section.title}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3.5 bg-surfaceAlt hover:bg-surfaceAlt/70 text-left"
            >
              <span className="font-display font-semibold text-sm text-ink">
                {i + 1}. {section.title}
              </span>
              <span className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-inkSoft hidden sm:inline">{section.lectures.length} lectures</span>
                <ChevronDown size={16} className={`text-inkSoft transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </span>
            </button>
            {isOpen && (
              <ul className="bg-white">
                {section.lectures.map((lecture) => (
                  <li key={lecture.title} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm border-t border-border first:border-t-0">
                    <span className="flex items-center gap-2.5 text-inkSoft min-w-0">
                      {unlocked || lecture.preview ? <PlayCircle size={15} className="text-primary shrink-0" /> : <Lock size={13} className="shrink-0" />}
                      <span className="truncate">{lecture.title}</span>
                      {lecture.preview && !unlocked && <span className="text-[11px] font-semibold text-primary shrink-0">Preview</span>}
                    </span>
                    <span className="font-mono text-xs text-inkSoft shrink-0">{lecture.duration}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
