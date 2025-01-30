import { generateRandomId } from "./utils";

export const initialTodos: InterfaceTodoListProps[] = [
  {
    id: generateRandomId(),
    content: "📅 Prepare for the _**Lisk**_ Kaduna Meetup",
    isCompleted: false,
    createdAt: new Date(),
  },
  {
    id: generateRandomId(),
    content:
      "📑 Complete project report – Review milestones, add statistics, and proofread.",
    isCompleted: false,
    createdAt: new Date(),
  },
  {
    id: generateRandomId(),
    content:
      "🗂️ Organize workspace – Declutter desk, arrange cables, and clean monitor screen.",
    isCompleted: true,
    createdAt: new Date(),
  },
  {
    id: generateRandomId(),
    content:
      "📧 Reply to emails – Prioritize urgent messages and clear inbox clutter.",
    isCompleted: false,
    createdAt: new Date(),
  },
  {
    id: generateRandomId(),
    content:
      "🏖️ Plan weekend trip – Research destinations, book accommodation, and create an itinerary.",
    isCompleted: true,
    createdAt: new Date(),
  },
];
