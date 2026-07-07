export const categories = [
  { id: "development", name: "Development", spine: "#4338CA", icon: "Code2" },
  { id: "design", name: "Design", spine: "#FF6B4A", icon: "PenTool" },
  { id: "business", name: "Business", spine: "#0EA37A", icon: "Briefcase" },
  { id: "marketing", name: "Marketing", spine: "#FFC145", icon: "Megaphone" },
  { id: "photography", name: "Photography", spine: "#2E86AB", icon: "Camera" },
  { id: "music", name: "Music", spine: "#A23B72", icon: "Music2" },
];

export const getCategory = (id) => categories.find((c) => c.id === id);
