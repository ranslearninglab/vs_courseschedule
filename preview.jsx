import { useMemo, useState } from 'react';
import {
  BookOpen,
  Database,
  MessagesSquare,
  ListChecks,
  FileText,
  GraduationCap,
  Wrench,
  ShieldCheck,
  Compass,
  Gauge,
  Map,
  LayoutGrid,
  CalendarCheck,
  ListTree,
} from 'lucide-react';

/* ---------------- syllabus data (from data/syllabus.ts) ---------------- */

const modules = [
  {
    id: 1,
    title: 'Introducing Learning Analytics',
    weeks: 'Weeks 1 & 2',
    icon: BookOpen,
    items: [
      { label: 'Selected readings', type: 'reading' },
      { label: 'Discussion: Investigating big data', type: 'discussion' },
      { label: 'Task 1: Explore Canvas data', type: 'task' },
    ],
  },
  {
    id: 2,
    title: 'Exploring Institutional & Educational Data',
    weeks: 'Weeks 3 & 4',
    icon: Database,
    items: [
      { label: 'Selected readings', type: 'reading' },
      { label: 'Task 2A: Analytics in your own teaching or learning context', type: 'task' },
      { label: 'Task 2B: Get your hands dirty — explore some real data', type: 'task' },
    ],
  },
  {
    id: 3,
    title: 'Learning Analytics Methods & Tools',
    weeks: 'Weeks 5 & 6',
    icon: Wrench,
    items: [
      { label: 'Selected readings', type: 'reading' },
      { label: 'Task 3: Investigate analytic methods', type: 'task' },
      { label: 'Discussion: Which LA tools are missing?', type: 'discussion' },
    ],
  },
  {
    id: 4,
    title: 'Ethical Issues in Learning Analytics',
    weeks: 'Week 7',
    icon: ShieldCheck,
    items: [
      { label: 'Selected readings', type: 'reading' },
      { label: 'Work on your choice of Task 4A, 4B, or 4C', type: 'task' },
    ],
  },
  {
    id: 5,
    title: 'Where to Begin? Planning for Learning Analytics',
    weeks: 'Week 8',
    icon: Compass,
    items: [
      { label: 'Selected readings', type: 'reading' },
      { label: 'Discussion: Visions of learning analytics around the world', type: 'discussion' },
      { label: 'Task 4A: Pedagogy-driven analytics questions for your local context', type: 'task' },
      { label: 'Task 4B: An institutional policy on ethical use of student data', type: 'task' },
      { label: 'Task 4C: You advise on institutional LA implementation', type: 'task' },
    ],
  },
  {
    id: 6,
    title: 'Evaluating Learning Analytics Tools',
    weeks: 'Week 9',
    icon: Gauge,
    items: [
      { label: 'Selected readings', type: 'reading' },
      { label: 'Discussion: Smoke and mirrors? LA tool vendor videos & promo materials', type: 'discussion' },
      { label: 'Assignment 1: Evaluating a learning analytics tool', type: 'assignment' },
    ],
  },
  {
    id: 7,
    title: 'Choose Your Own Learning Analytics Adventure',
    weeks: 'Weeks 10 – 13',
    icon: Map,
    items: [
      { label: 'Choose your learning analytics adventure!', type: 'task' },
      { label: 'Assignment 2a: Submit your adventure proposal (not graded)', type: 'assignment' },
      { label: 'Assignment 2b: A report on your LA adventure', type: 'assignment' },
      { label: 'Task 5: Share a video tour summary of your LA adventure', type: 'task' },
    ],
  },
];

/* ---------------- App (mirrors App.tsx) ---------------- */

const scheduleTypes = ['task', 'assignment'];

const typeMeta = {
  reading: {
    label: 'Reading',
    icon: BookOpen,
    ring: 'ring-blue-200',
    chip: 'bg-blue-50 text-blue-700',
    solid: 'bg-blue-600 border-blue-600 text-white',
  },
  discussion: {
    label: 'Discussion',
    icon: MessagesSquare,
    ring: 'ring-purple-200',
    chip: 'bg-purple-50 text-purple-700',
    solid: 'bg-purple-600 border-purple-600 text-white',
  },
  task: {
    label: 'Task',
    icon: ListChecks,
    ring: 'ring-amber-200',
    chip: 'bg-amber-50 text-amber-700',
    solid: 'bg-amber-500 border-amber-500 text-white',
  },
  assignment: {
    label: 'Assignment',
    icon: FileText,
    ring: 'ring-orange-200',
    chip: 'bg-orange-50 text-orange-700',
    solid: 'bg-orange-600 border-orange-600 text-white',
  },
};

const filterOrder = ['reading', 'discussion', 'task', 'assignment'];

function TasksSchedule() {
  const rows = modules.flatMap((m) =>
    m.items
      .filter((i) => scheduleTypes.includes(i.type))
      .map((i) => ({ module: m, item: i })),
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid grid-cols-[auto_1fr_auto] gap-x-3 gap-y-2 p-4 sm:grid-cols-[auto_1fr_auto_auto] sm:gap-x-4 sm:p-5">
        {rows.map((row, i) => {
          const meta = typeMeta[row.item.type];
          const Icon = meta.icon;
          return (
            <div key={i} className="contents">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-700 ring-1 ring-blue-100">
                {row.module.id}
              </span>
              <p className="self-center text-sm font-medium leading-snug text-slate-800">{row.item.label}</p>
              <span className={`inline-flex h-7 items-center gap-1.5 self-center rounded-full px-2.5 text-[11px] font-semibold uppercase tracking-wide ${meta.chip}`}>
                <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                {meta.label}
              </span>
              <span className="hidden self-center text-xs font-medium text-slate-500 sm:block">
                {row.module.weeks}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ModuleCard({ module, filter }) {
  const Icon = module.icon;
  const visibleItems = filter ? module.items.filter((i) => filter.has(i.type)) : module.items;
  const hasVisible = visibleItems.length > 0;

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:shadow-md ${
        hasVisible ? 'border-blue-300 shadow-md' : 'border-slate-200 opacity-50'
      }`}
    >
      <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-blue-500 to-sky-400" />
      <div className="flex w-full items-start gap-4 p-5 pl-7">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-white">
              Module {module.id}
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{module.weeks}</span>
          </div>
          <h3 className="mt-1.5 text-lg font-bold leading-snug text-slate-900">{module.title}</h3>
        </div>
      </div>

      {hasVisible ? (
        <ul className="space-y-2.5 px-7 pb-5">
          {visibleItems.map((item, i) => {
            const meta = typeMeta[item.type];
            const ItemIcon = meta.icon;
            return (
              <li key={i} className={`flex items-start gap-3 rounded-xl bg-slate-50/70 p-3 ring-1 ${meta.ring}`}>
                <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${meta.chip}`}>
                  <ItemIcon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-snug text-slate-800">{item.label}</p>
                  <span className={`mt-0.5 inline-block text-[11px] font-semibold uppercase tracking-wide ${meta.chip} rounded`}>
                    {meta.label}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="px-7 pb-5 text-sm italic text-slate-400">No items match the selected filters.</p>
      )}
    </article>
  );
}

export default function App() {
  const [selected, setSelected] = useState(new Set());
  const [viewMode, setViewMode] = useState('modules');

  const toggleFilter = (key) => {
    setSelected((cur) => {
      const next = new Set(cur);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const activeFilter = selected.size === 0 ? null : selected;

  const visibleModules = useMemo(() => (activeFilter ? modules : modules), [activeFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50/40 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-8 shadow-sm sm:p-10">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-sky-100/50 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                <GraduationCap className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Visual Syllabus</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Learning Analytics
            </h1>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-600">
              A 13-week journey through the methods, ethics, and practice of learning analytics.
              Each module combines readings, discussion, hands-on tasks, and choices designed to
              suit how you learn best.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500">
                {modules.length} modules · 13 weeks · 4 graded & choice-based tasks
              </span>
            </div>
          </div>
        </header>

        {/* Filter bar */}
        <section
          aria-label="Filter modules by item type"
          className="sticky top-3 z-10 mt-8 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <LayoutGrid className="h-3.5 w-3.5" strokeWidth={1.75} />
              Filter view
            </span>
            <button
              onClick={() => setSelected(new Set())}
              aria-pressed={selected.size === 0}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                selected.size === 0
                  ? 'border-slate-800 bg-slate-800 text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" strokeWidth={1.75} />
              View All
            </button>
            {filterOrder.map((key) => {
              const meta = typeMeta[key];
              const Icon = meta.icon;
              const active = selected.has(key);
              return (
                <button
                  key={key}
                  onClick={() => toggleFilter(key)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                    active ? `${meta.solid} shadow-sm` : `${meta.chip} ring-1 ${meta.ring} hover:opacity-80`
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  {meta.label}
                </button>
              );
            })}
          </div>
          <p className="mt-2.5 text-xs leading-relaxed text-slate-500">
            Select one or more learning activity categories to filter the view.
          </p>

          {/* View mode toggle */}
          <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">View schedule by</span>
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
              <button
                onClick={() => setViewMode('modules')}
                aria-pressed={viewMode === 'modules'}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  viewMode === 'modules' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <ListTree className="h-3.5 w-3.5" strokeWidth={1.75} />
                Modules
              </button>
              <button
                onClick={() => setViewMode('tasks')}
                aria-pressed={viewMode === 'tasks'}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  viewMode === 'tasks' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <CalendarCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
                Tasks & Assignments
              </button>
            </div>
          </div>
        </section>

        {/* Timeline or Tasks schedule */}
        {viewMode === 'tasks' ? (
          <div className="mt-6">
            <TasksSchedule />
          </div>
        ) : (
          <div className="relative mt-6">
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-blue-300 via-blue-200 to-transparent sm:left-[26px]" />
            <div className="space-y-4">
              {visibleModules.map((m) => (
                <div key={m.id} className="relative pl-12 sm:pl-16">
                  <div className="absolute left-0 top-5 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-sm font-bold text-white shadow-md ring-4 ring-blue-100 sm:h-13 sm:w-13">
                    {m.id}
                  </div>
                  <ModuleCard module={m} filter={activeFilter} />
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="mt-8 text-center text-xs text-slate-400">
          Designed with Universal Design for Learning principles · Blue highlight colour
        </footer>
      </div>
    </div>
  );
}
