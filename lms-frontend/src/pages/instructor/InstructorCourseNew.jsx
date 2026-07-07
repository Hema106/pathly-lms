import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";
import { categories } from "../../data/categories";
import Button from "../../components/ui/Button";

export default function InstructorCourseNew() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    category: categories[0].id,
    level: "Beginner",
    price: "",
    description: "",
  });
  const [learningPoints, setLearningPoints] = useState([""]);
  const [sections, setSections] = useState([{ title: "", lectures: [""] }]);
  const [submitted, setSubmitted] = useState(false);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const updateLearningPoint = (i, value) => {
    setLearningPoints((prev) => prev.map((p, idx) => (idx === i ? value : p)));
  };
  const addLearningPoint = () => setLearningPoints((prev) => [...prev, ""]);
  const removeLearningPoint = (i) => setLearningPoints((prev) => prev.filter((_, idx) => idx !== i));

  const updateSectionTitle = (i, value) => {
    setSections((prev) => prev.map((s, idx) => (idx === i ? { ...s, title: value } : s)));
  };
  const updateLecture = (si, li, value) => {
    setSections((prev) =>
      prev.map((s, idx) => (idx === si ? { ...s, lectures: s.lectures.map((l, lidx) => (lidx === li ? value : l)) } : s))
    );
  };
  const addSection = () => setSections((prev) => [...prev, { title: "", lectures: [""] }]);
  const removeSection = (i) => setSections((prev) => prev.filter((_, idx) => idx !== i));
  const addLecture = (si) => setSections((prev) => prev.map((s, idx) => (idx === si ? { ...s, lectures: [...s.lectures, ""] } : s)));
  const removeLecture = (si, li) =>
    setSections((prev) => prev.map((s, idx) => (idx === si ? { ...s, lectures: s.lectures.filter((_, lidx) => lidx !== li) } : s)));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto py-20 text-center">
        <CheckCircle2 size={44} className="mx-auto text-progress mb-4" />
        <h1 className="font-display font-bold text-2xl text-ink mb-2">Course draft saved</h1>
        <p className="text-inkSoft mb-6">
          "{form.title || "Untitled course"}" has been saved as a draft. In this demo it isn't published to the catalog.
        </p>
        <Button size="lg" onClick={() => navigate("/instructor/courses")}>Back to my courses</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-display font-bold text-2xl text-ink mb-1">Create a new course</h1>
      <p className="text-inkSoft text-sm mb-8">Fill in the basics — you can flesh out the rest later.</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="border border-border rounded-lg p-5 space-y-4">
          <h2 className="font-display font-semibold text-ink">Basics</h2>
          <label className="flex flex-col gap-1.5 text-sm">
            Course title
            <input required value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="e.g. The Complete Guide to..." className="border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            Subtitle
            <input required value={form.subtitle} onChange={(e) => update("subtitle", e.target.value)} placeholder="One sentence describing the outcome" className="border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </label>
          <div className="grid sm:grid-cols-3 gap-4">
            <label className="flex flex-col gap-1.5 text-sm">
              Category
              <select value={form.category} onChange={(e) => update("category", e.target.value)} className="border border-border rounded-md px-3 py-2.5 text-sm bg-white">
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              Level
              <select value={form.level} onChange={(e) => update("level", e.target.value)} className="border border-border rounded-md px-3 py-2.5 text-sm bg-white">
                {["Beginner", "Intermediate", "All Levels"].map((l) => <option key={l}>{l}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              Price (₹)
              <input required type="number" min="0" value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="499" className="border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </label>
          </div>
          <label className="flex flex-col gap-1.5 text-sm">
            Description
            <textarea required rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="What will students achieve by the end?" className="border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </label>
        </div>

        <div className="border border-border rounded-lg p-5 space-y-3">
          <h2 className="font-display font-semibold text-ink">What students will learn</h2>
          {learningPoints.map((p, i) => (
            <div key={i} className="flex gap-2">
              <input value={p} onChange={(e) => updateLearningPoint(i, e.target.value)} placeholder="e.g. Build a REST API from scratch" className="flex-1 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              {learningPoints.length > 1 && (
                <button type="button" onClick={() => removeLearningPoint(i)} className="text-coral p-2"><Trash2 size={15} /></button>
              )}
            </div>
          ))}
          <button type="button" onClick={addLearningPoint} className="flex items-center gap-1.5 text-sm font-semibold text-primary">
            <Plus size={15} /> Add learning point
          </button>
        </div>

        <div className="border border-border rounded-lg p-5 space-y-4">
          <h2 className="font-display font-semibold text-ink">Curriculum</h2>
          {sections.map((section, si) => (
            <div key={si} className="border border-border rounded-md p-4 space-y-3">
              <div className="flex gap-2">
                <input
                  value={section.title}
                  onChange={(e) => updateSectionTitle(si, e.target.value)}
                  placeholder={`Section ${si + 1} title`}
                  className="flex-1 border border-border rounded-md px-3 py-2 text-sm font-display font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                {sections.length > 1 && (
                  <button type="button" onClick={() => removeSection(si)} className="text-coral p-2"><Trash2 size={15} /></button>
                )}
              </div>
              <div className="pl-4 space-y-2 border-l-2 border-border">
                {section.lectures.map((lecture, li) => (
                  <div key={li} className="flex gap-2">
                    <input
                      value={lecture}
                      onChange={(e) => updateLecture(si, li, e.target.value)}
                      placeholder={`Lecture ${li + 1} title`}
                      className="flex-1 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    {section.lectures.length > 1 && (
                      <button type="button" onClick={() => removeLecture(si, li)} className="text-coral p-2"><Trash2 size={14} /></button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => addLecture(si)} className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                  <Plus size={13} /> Add lecture
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={addSection} className="flex items-center gap-1.5 text-sm font-semibold text-primary">
            <Plus size={15} /> Add section
          </button>
        </div>

        <div className="flex gap-3">
          <Button type="submit" size="lg" variant="accent">Save as draft</Button>
          <Button type="button" size="lg" variant="ghost" onClick={() => navigate("/instructor/courses")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
