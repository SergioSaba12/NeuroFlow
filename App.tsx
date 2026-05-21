"use client";

import { FormEvent, MouseEvent, useId, useMemo, useState } from "react";
import {
  ArrowRight,
  BellOff,
  BookOpen,
  Check,
  ChevronRight,
  Chrome,
  Code2,
  Compass,
  EyeOff,
  FileText,
  Fingerprint,
  Folder,
  Layers3,
  Lock,
  Monitor,
  Moon,
  MousePointer2,
  Orbit,
  PanelTop,
  Pause,
  Radio,
  Search,
  Shield,
  ShieldAlert,
  Sparkles,
  Stars,
  Square,
  Timer,
  Workflow,
  Zap
} from "lucide-react";
import { motion, Reveal, stagger, fadeUp, useScroll, useTransform } from "@/components/motion";
import { cn } from "@/lib/utils";

type Locale = "en" | "es";

function scrollToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.pushState(null, "", `#${id}`);
}

const copy = {
  en: {
    nav: { overlay: "Overlay", apps: "Apps", privacy: "Privacy", waitlist: "Waitlist", cta: "Join waitlist" },
    hero: {
      brandTagline: "ADAPTIVE TECHNOLOGY. HUMAN FOCUS. ENDLESS FLOW.",
      eyebrow: "A cognitive layer for macOS",
      title: "Your Mac, adapted to your mind.",
      subtitle:
        "ElyraOs lives above your favorite apps, detects digital overload, simplifies information and protects your focus before your workspace becomes noise.",
      primary: "Join the waitlist",
      secondary: "Watch concept demo"
    },
    mockup: {
      safari: "Safari - research",
      notion: "Notion - thesis map",
      notionItems: ["Research question", "Argument", "Evidence", "Next draft"],
      summary: "Summary",
      summaryCopy: "4 key ideas extracted. Reading load reduced by 38%.",
      weather: "Cognitive Weather",
      calm: "Calm focus",
      calmCopy: "Interruptions grouped until the current thought completes.",
      nova: "Nova is nearby",
      novaCopy: "Only when useful",
      focus: "Focus Bubble",
      focusCopy: "Safari, Preview and Notion are connected. Messages wait quietly."
    },
    problem: {
      eyebrow: "The friction",
      title: "Modern software was not designed for human attention.",
      copy:
        "Most tools ask you to organize more, track more and manage more. ElyraOs does the opposite: it reduces the cognitive noise between you and the work that matters.",
      items: ["Too many tabs", "Too many notifications", "Dense documents", "Scattered ideas", "Context switching", "Digital fatigue"],
      itemCopy: "A small demand on attention that compounds across the day."
    },
    solution: {
      eyebrow: "The layer",
      title: "ElyraOs becomes a calm layer above your workflow.",
      copy:
        "It detects context with permission, understands what the moment needs and gently adapts the environment around your attention.",
      cards: [
        ["Focus Bubble", "Creates a protected focus zone by fading distractions and grouping interruptions."],
        ["Living Documents", "Turns dense PDFs and web pages into summaries, key ideas, visual structures and study questions."],
        ["Thought Capture", "Capture ideas instantly without breaking focus or switching into another system."],
        ["Ghost Privacy", "Blurs sensitive information and protects private content when needed."]
      ]
    },
    how: {
      eyebrow: "How it works",
      title: "A digital nervous system for your Mac.",
      steps: [
        ["01", "ElyraOs observes context", "Detects active apps, window titles, task switching and reading sessions with user permission."],
        ["02", "It understands cognitive load", "Estimates overload, distraction, fatigue and focus state from ambient signals."],
        ["03", "It adapts the environment", "Shows contextual overlays, simplifies information and creates calm workspaces."]
      ]
    },
    workSession: {
      eyebrow: "Launched feature",
      title: "Work Session protects the apps your focus actually needs.",
      copy:
        "Create a named session, choose 25, 45, 60, 90 minutes or a custom duration, and allow only the apps that belong to this block of work.",
      setup: "Session setup",
      nameLabel: "Session name",
      nameValue: "Thesis deep work",
      duration: "Duration",
      allowed: "Allowed apps",
      start: "Start session",
      active: "Active work session",
      timer: "42:18",
      focusState: "Protected focus",
      banner: "Chrome blocked. Return to your allowed workspace.",
      end: "End session",
      points: [
        "ElyraOs watches the currently active macOS app during the session.",
        "If you switch to an app outside the allowed list, ElyraOs comes forward automatically.",
        "A clear yellow banner names the blocked app without shaming or breaking the flow."
      ]
    },
    apps: {
      eyebrow: "Native context",
      title: "It works where you already work.",
      copy:
        "ElyraOs is not another tab, dashboard or place to maintain. It floats above selected macOS apps while your real work stays where it belongs.",
      items: [
        ["Safari", "Summarize articles, simplify reading and extract key ideas."],
        ["Notion", "Organize scattered notes and convert thoughts into structure."],
        ["Preview", "Create summaries, mind maps, glossaries and exam questions."],
        ["VSCode", "Restore coding context and protect deep work."],
        ["Chrome", "Quiet tab overload and keep research sessions coherent."],
        ["Finder", "Find related files by meaning, project and intent."],
        ["Pages", "Shape messy drafts into clear writing paths."],
        ["Keynote", "Turn research into presentation structure without losing context."]
      ]
    },
    neuro: {
      eyebrow: "Different rhythms",
      title: "Built for minds that do not fit default software.",
      copy:
        "ElyraOs does not try to fix people. It adapts software around different cognitive rhythms, reducing friction between human cognition and digital environments.",
      benefits: ["Less visual noise", "Fewer interruptions", "Easier reading", "Task continuity", "Idea capture without losing flow", "Adaptive environments", "Predictable routines"]
    },
    features: {
      eyebrow: "Intelligence without noise",
      title: "Features that feel ambient, not demanding.",
      items: [
        ["Cognitive Weather", "A subtle signal shows whether your workspace feels focused, overloaded, fatigued or calm."],
        ["Cognitive Gravity", "Important elements become clearer while distractions recede into the background."],
        ["Predictive Focus", "ElyraOs prepares quiet sessions around the moments you usually enter deep work."],
        ["Semantic Memory", "Recover ideas, notes and documents by meaning instead of remembering filenames."],
        ["Invisible Interface", "During deep work, non-essential UI fades away until you actually need it."],
        ["Nova Orb", "A quiet AI presence that appears only when it can reduce friction."]
      ]
    },
    privacy: {
      eyebrow: "Trust",
      title: "Private by design. Calm by default.",
      copy:
        "You control what ElyraOs can observe. Permissions are explicit, local-first architecture is preferred where possible, cloud AI is optional and the Privacy Center stays transparent.",
      center: "Privacy Center",
      toggles: ["Observe active app", "Read selected documents", "Enable overlays", "Enable local memory", "Enable cloud AI", "Privacy blur"]
    },
    useCases: {
      eyebrow: "Moments",
      title: "From digital overload to one clear next step.",
      before: "Before",
      after: "After",
      items: [
        ["Studying for exams", "20 tabs, three chats and one unreadable PDF.", "One focus bubble, one summary, one next step."],
        ["Reading dense PDFs", "A wall of academic text with no obvious entry point.", "Key claims, glossary, structure and questions."],
        ["Writing in Notion", "Scattered notes, unfinished thoughts and shifting priorities.", "A calm outline that preserves your intent."],
        ["Coding in VSCode", "Lost context after meetings, notifications and task switching.", "The relevant files, decisions and next action return."],
        ["Protecting focus", "Every badge and banner competes for attention.", "Interruptions are grouped and the workspace softens."],
        ["Reducing overload", "The screen feels louder than the work.", "Noise fades, the task becomes visible again."]
      ]
    },
    waitlist: {
      eyebrow: "Early access",
      title: "Your computer should understand your attention.",
      copy: "Join the early waitlist for ElyraOs and help shape the future of human-centered computing.",
      placeholder: "you@domain.com",
      button: "Join the waitlist",
      success: "You are on the early list. ElyraOs will keep this quiet for now.",
      error: "Enter a valid email to join the early list.",
      sendError: "We could not send the signup yet. Try again in a moment.",
      configError: "Email notifications are not configured yet.",
      secondary: "Explore the concept"
    },
    footer: ["ElyraOs - Calm computing for macOS.", "Designed for human attention, built for macOS."]
  },
  es: {
    nav: { overlay: "Overlay", apps: "Apps", privacy: "Privacidad", waitlist: "Lista", cta: "Unirme" },
    hero: {
      brandTagline: "ADAPTIVE TECHNOLOGY. HUMAN FOCUS. ENDLESS FLOW.",
      eyebrow: "Una capa cognitiva para macOS",
      title: "Tu Mac, adaptado a tu mente.",
      subtitle:
        "ElyraOs vive sobre tus apps favoritas, detecta la sobrecarga digital, simplifica la información y protege tu foco antes de que tu espacio de trabajo se convierta en ruido.",
      primary: "Unirme a la lista",
      secondary: "Ver demo conceptual"
    },
    mockup: {
      safari: "Safari - investigación",
      notion: "Notion - mapa de tesis",
      notionItems: ["Pregunta de investigación", "Argumento", "Evidencia", "Siguiente borrador"],
      summary: "Resumen",
      summaryCopy: "4 ideas clave extraídas. Carga de lectura reducida un 38%.",
      weather: "Clima Cognitivo",
      calm: "Foco en calma",
      calmCopy: "Las interrupciones se agrupan hasta que termina el pensamiento actual.",
      nova: "Nova está cerca",
      novaCopy: "Solo cuando aporta",
      focus: "Burbuja de Foco",
      focusCopy: "Safari, Preview y Notion están conectadas. Los mensajes esperan en silencio."
    },
    problem: {
      eyebrow: "La fricción",
      title: "El software moderno no fue diseñado para la atención humana.",
      copy:
        "La mayoría de herramientas te piden organizar más, medir más y gestionar más. ElyraOs hace lo contrario: reduce el ruido cognitivo entre tú y el trabajo que importa.",
      items: ["Demasiadas pestañas", "Demasiadas notificaciones", "Documentos densos", "Ideas dispersas", "Cambio constante de contexto", "Fatiga digital"],
      itemCopy: "Una pequeña demanda de atención que se acumula durante el día."
    },
    solution: {
      eyebrow: "La capa",
      title: "ElyraOs se convierte en una capa tranquila sobre tu flujo de trabajo.",
      copy:
        "Detecta el contexto con tu permiso, entiende lo que necesita cada momento y adapta suavemente el entorno alrededor de tu atención.",
      cards: [
        ["Burbuja de Foco", "Crea una zona protegida de concentración atenuando distracciones y agrupando interrupciones."],
        ["Documentos Vivos", "Convierte PDFs y páginas densas en resúmenes, ideas clave, estructuras visuales y preguntas de estudio."],
        ["Captura de Pensamiento", "Guarda ideas al instante sin romper el foco ni cambiar a otro sistema."],
        ["Privacidad Fantasma", "Difumina información sensible y protege contenido privado cuando lo necesitas."]
      ]
    },
    how: {
      eyebrow: "Cómo funciona",
      title: "Un sistema nervioso digital para tu Mac.",
      steps: [
        ["01", "ElyraOs observa el contexto", "Detecta apps activas, títulos de ventanas, cambios de tarea y sesiones de lectura con tu permiso."],
        ["02", "Entiende la carga cognitiva", "Estima sobrecarga, distracción, fatiga y estado de foco a partir de señales ambientales."],
        ["03", "Adapta el entorno", "Muestra overlays contextuales, simplifica información y crea espacios de trabajo más calmados."]
      ]
    },
    workSession: {
      eyebrow: "Feature lanzada",
      title: "Sesión de trabajo protege las apps que tu foco sí necesita.",
      copy:
        "Crea una sesión con nombre, elige 25, 45, 60, 90 minutos o una duración custom, y permite solo las apps que pertenecen a ese bloque de trabajo.",
      setup: "Crear sesión",
      nameLabel: "Nombre de sesión",
      nameValue: "Trabajo profundo tesis",
      duration: "Duración",
      allowed: "Apps permitidas",
      start: "Iniciar sesión",
      active: "Sesión de trabajo activa",
      timer: "42:18",
      focusState: "Foco protegido",
      banner: "Chrome bloqueado. Vuelve a tu espacio permitido.",
      end: "Terminar sesión",
      points: [
        "ElyraOs observa la app activa de macOS durante la sesión.",
        "Si cambias a una app fuera de la lista permitida, ElyraOs salta al frente automáticamente.",
        "Un banner amarillo nombra la app bloqueada sin culpabilizar ni romper el flujo."
      ]
    },
    apps: {
      eyebrow: "Contexto nativo",
      title: "Funciona donde ya trabajas.",
      copy:
        "ElyraOs no es otra pestaña, otro dashboard ni otro lugar que mantener. Flota sobre apps seleccionadas de macOS mientras tu trabajo real sigue donde pertenece.",
      items: [
        ["Safari", "Resume artículos, simplifica la lectura y extrae ideas clave."],
        ["Notion", "Ordena notas dispersas y convierte pensamientos en estructura."],
        ["Preview", "Crea resúmenes, mapas mentales, glosarios y preguntas de examen."],
        ["VSCode", "Recupera el contexto de código y protege el trabajo profundo."],
        ["Chrome", "Calma la sobrecarga de pestañas y mantiene coherentes las sesiones de investigación."],
        ["Finder", "Encuentra archivos relacionados por significado, proyecto e intención."],
        ["Pages", "Da forma a borradores desordenados sin perder la intención."],
        ["Keynote", "Convierte investigación en estructura de presentación sin perder contexto."]
      ]
    },
    neuro: {
      eyebrow: "Ritmos distintos",
      title: "Diseñado para mentes que no encajan en el software por defecto.",
      copy:
        "ElyraOs no intenta arreglar a las personas. Adapta el software alrededor de distintos ritmos cognitivos, reduciendo la fricción entre la mente humana y los entornos digitales.",
      benefits: ["Menos ruido visual", "Menos interrupciones", "Lectura más fácil", "Continuidad de tarea", "Captura de ideas sin perder el flujo", "Entornos adaptativos", "Rutinas digitales predecibles"]
    },
    features: {
      eyebrow: "Inteligencia sin ruido",
      title: "Funciones que se sienten ambientales, no exigentes.",
      items: [
        ["Clima Cognitivo", "Una señal sutil indica si tu espacio se siente enfocado, saturado, fatigado o en calma."],
        ["Gravedad Cognitiva", "Los elementos importantes ganan claridad mientras las distracciones pasan al fondo."],
        ["Foco Predictivo", "ElyraOs prepara sesiones tranquilas en los momentos en los que sueles entrar en trabajo profundo."],
        ["Memoria Semántica", "Recupera ideas, notas y documentos por significado, no por nombre de archivo."],
        ["Interfaz Invisible", "Durante el trabajo profundo, lo no esencial se desvanece hasta que realmente lo necesitas."],
        ["Orbe Nova", "Una presencia de IA silenciosa que aparece solo cuando puede reducir fricción."]
      ]
    },
    privacy: {
      eyebrow: "Confianza",
      title: "Privado por diseño. Calmado por defecto.",
      copy:
        "Tú controlas lo que ElyraOs puede observar. Los permisos son explícitos, la arquitectura prioriza lo local cuando es posible, la IA en la nube es opcional y el Centro de Privacidad es transparente.",
      center: "Centro de Privacidad",
      toggles: ["Observar app activa", "Leer documentos seleccionados", "Activar overlays", "Activar memoria local", "Activar IA en la nube", "Difuminado privado"]
    },
    useCases: {
      eyebrow: "Momentos",
      title: "De la sobrecarga digital a un siguiente paso claro.",
      before: "Antes",
      after: "Después",
      items: [
        ["Estudiar para exámenes", "20 pestañas, tres chats y un PDF imposible.", "Una burbuja de foco, un resumen y un siguiente paso."],
        ["Leer PDFs densos", "Un muro de texto académico sin punto de entrada claro.", "Ideas clave, glosario, estructura y preguntas."],
        ["Escribir en Notion", "Notas dispersas, pensamientos a medias y prioridades cambiantes.", "Un esquema tranquilo que conserva tu intención."],
        ["Programar en VSCode", "Contexto perdido tras reuniones, notificaciones y cambios de tarea.", "Vuelven los archivos, decisiones y próximos pasos relevantes."],
        ["Proteger el foco", "Cada badge y aviso compite por tu atención.", "Las interrupciones se agrupan y el espacio se suaviza."],
        ["Reducir sobrecarga", "La pantalla se siente más ruidosa que el trabajo.", "El ruido baja y la tarea vuelve a ser visible."]
      ]
    },
    waitlist: {
      eyebrow: "Acceso anticipado",
      title: "Tu ordenador debería entender tu atención.",
      copy: "Únete a la lista temprana de ElyraOs y ayuda a dar forma al futuro de la computación centrada en las personas.",
      placeholder: "tu@email.com",
      button: "Unirme a la lista",
      success: "Ya estás en la lista temprana. ElyraOs lo mantendrá en calma por ahora.",
      error: "Introduce un email válido para unirte a la lista.",
      sendError: "No hemos podido enviar el registro todavía. Inténtalo de nuevo en un momento.",
      configError: "Las notificaciones por email todavía no están configuradas.",
      secondary: "Explorar el concepto"
    },
    footer: ["ElyraOs - Computación calmada para macOS.", "Diseñado para la atención humana, construido para macOS."]
  }
} as const;

const appIcons = [Compass, PanelTop, FileText, Code2, Chrome, Folder, BookOpen, Monitor];
const featureIcons = [Radio, Orbit, Zap, Search, EyeOff, Sparkles];
const solutionIcons = [Layers3, BookOpen, MousePointer2, Shield];
type Copy = (typeof copy)[Locale];

function SectionHeader({
  eyebrow,
  title,
  copy,
  center = false
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={cn("mx-auto max-w-3xl", center && "text-center")}>
      {eyebrow ? (
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-cyan-200/80">{eyebrow}</p>
      ) : null}
      <h2 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">{title}</h2>
      {copy ? <p className="mt-6 text-lg leading-8 text-slate-300 md:text-xl">{copy}</p> : null}
    </Reveal>
  );
}

function LogoMark({ className = "size-12" }: { className?: string }) {
  const id = useId();
  const coreId = `${id}-core`;
  const edgeId = `${id}-edge`;
  const glowId = `${id}-glow`;

  return (
    <span className={cn("logo-orb relative inline-flex items-center justify-center", className)} aria-hidden="true">
      <svg viewBox="0 0 220 220" className="h-full w-full overflow-visible" role="img">
        <defs>
          <linearGradient id={coreId} x1="38" y1="42" x2="184" y2="182" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#93e8ff" />
            <stop offset="0.42" stopColor="#5caeff" />
            <stop offset="1" stopColor="#b66dff" />
          </linearGradient>
          <linearGradient id={edgeId} x1="44" y1="46" x2="184" y2="178" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#f6fbff" />
            <stop offset="0.38" stopColor="#72d8ff" />
            <stop offset="0.72" stopColor="#9d8cff" />
            <stop offset="1" stopColor="#fff0ff" />
          </linearGradient>
          <filter id={glowId} x="-65%" y="-65%" width="230%" height="230%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.32 0 0 0 0 0.78 0 0 0 0 1 0 0 0 0.9 0"
              result="blueGlow"
            />
            <feMerge>
              <feMergeNode in="blueGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M111 34C68 34 35 68 35 111C35 154 68 186 111 186C154 186 186 154 186 111C186 68 154 34 111 34Z"
          fill="none"
          stroke={`url(#${coreId})`}
          strokeWidth="30"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.74"
          filter={`url(#${glowId})`}
        />
        <path
          d="M111 34C68 34 35 68 35 111C35 154 68 186 111 186C154 186 186 154 186 111C186 68 154 34 111 34Z"
          fill="none"
          stroke={`url(#${edgeId})`}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.95"
        />
        <path
          d="M65 142C74 119 101 113 126 104C154 94 167 74 154 55C176 72 181 105 162 128C140 155 99 156 65 142Z"
          fill="none"
          stroke={`url(#${coreId})`}
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.72"
          filter={`url(#${glowId})`}
        />
        <path
          d="M65 142C74 119 101 113 126 104C154 94 167 74 154 55"
          fill="none"
          stroke={`url(#${edgeId})`}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.98"
        />
      </svg>
    </span>
  );
}

function BrandWordmark({ tagline, compact = false }: { tagline?: string; compact?: boolean }) {
  return (
    <div className={cn("flex flex-col items-center", compact ? "gap-1" : "gap-4")}>
      <div className="brand-word text-white">
        <span>ELYRA</span>
        <span className="brand-os">OS</span>
      </div>
      {tagline ? <div className="brand-tagline">{tagline}</div> : null}
    </div>
  );
}

function Nav({
  locale,
  setLocale,
  t
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Copy;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-4"
    >
      <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 md:px-5">
        <a href="#" className="flex items-center gap-3">
          <LogoMark className="size-10" />
          <span className="hidden text-xs font-medium uppercase tracking-[0.34em] text-white/90 sm:inline">ElyraOs</span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
          <a className="transition hover:text-white" href="#solution" onClick={(event) => scrollToSection(event, "solution")}>{t.nav.overlay}</a>
          <a className="transition hover:text-white" href="#apps" onClick={(event) => scrollToSection(event, "apps")}>{t.nav.apps}</a>
          <a className="transition hover:text-white" href="#privacy" onClick={(event) => scrollToSection(event, "privacy")}>{t.nav.privacy}</a>
          <a className="transition hover:text-white" href="#waitlist" onClick={(event) => scrollToSection(event, "waitlist")}>{t.nav.waitlist}</a>
        </div>
        <div className="flex rounded-full border border-white/12 bg-white/7 p-1 text-xs font-semibold text-slate-300 backdrop-blur-xl">
          {(["es", "en"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLocale(item)}
              className={cn(
                "rounded-full px-3 py-1.5 transition",
                locale === item ? "bg-white text-slate-950" : "hover:text-white"
              )}
              aria-pressed={locale === item}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
        <a
          href="#waitlist"
          onClick={(event) => scrollToSection(event, "waitlist")}
          className="button-glow rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
        >
          {t.nav.cta}
        </a>
      </nav>
    </motion.header>
  );
}

function MacWindow({
  title,
  children,
  className
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("glass-soft overflow-hidden rounded-2xl", className)}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#ffbd2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-slate-400">{title}</span>
      </div>
      {children}
    </div>
  );
}

function HeroMockup({ t }: { t: Copy }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mt-16 w-full max-w-7xl"
    >
      <div className="absolute -inset-10 rounded-[3rem] bg-cyan-400/10 blur-3xl breathe" />
      <div className="glass relative overflow-hidden rounded-[2rem] p-3 md:rounded-[2.5rem] md:p-5">
        <div className="grid min-h-[560px] gap-3 rounded-[1.5rem] bg-[#050712]/80 p-3 md:grid-cols-12 md:p-5">
          <MacWindow title={t.mockup.safari} className="md:col-span-5">
            <div className="space-y-4 p-5">
              <div className="h-8 rounded-full bg-white/8" />
              <div className="h-20 rounded-2xl bg-gradient-to-r from-cyan-200/16 to-violet-300/12" />
              <div className="space-y-2 blur-[1.2px]">
                <div className="h-3 rounded bg-white/15" />
                <div className="h-3 w-5/6 rounded bg-white/10" />
                <div className="h-3 w-4/6 rounded bg-white/10" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-28 rounded-2xl bg-white/7 blur-[1px]" />
                <div className="h-28 rounded-2xl bg-white/7 blur-[1px]" />
              </div>
            </div>
          </MacWindow>

          <MacWindow title={t.mockup.notion} className="md:col-span-4">
            <div className="space-y-4 p-5">
              <div className="h-5 w-2/3 rounded bg-white/18" />
              {t.mockup.notionItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/6 p-3">
                  <span className="size-2 rounded-full bg-cyan-200" />
                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </MacWindow>

          <MacWindow title="VSCode - app/core" className="hidden md:col-span-3 md:block">
            <div className="space-y-3 p-5 font-mono text-xs text-slate-400">
              <p><span className="text-violet-200">const</span> focus = observeContext()</p>
              <p><span className="text-cyan-200">if</span> (overload.rising) {"{"}</p>
              <p className="pl-4 text-slate-200">softenWorkspace()</p>
              <p>{"}"}</p>
              <div className="mt-8 h-24 rounded-xl bg-white/6" />
            </div>
          </MacWindow>

          <MacWindow title="Preview - Cognitive Science.pdf" className="md:col-span-7">
            <div className="grid gap-4 p-5 md:grid-cols-[1fr_220px]">
              <div className="space-y-3">
                <div className="h-5 w-3/4 rounded bg-white/16" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className={cn("h-3 rounded bg-white/10", i % 3 === 0 && "w-5/6", i % 3 === 1 && "w-full", i % 3 === 2 && "w-4/6")} />
                ))}
              </div>
              <div className="rounded-2xl border border-cyan-200/20 bg-cyan-200/10 p-4">
                <div className="mb-3 flex items-center gap-2 text-cyan-100">
                  <Sparkles className="size-4" />
                  <span className="text-sm font-medium">{t.mockup.summary}</span>
                </div>
                <p className="text-sm leading-6 text-slate-200">
                  {t.mockup.summaryCopy}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="h-2 rounded bg-cyan-100/35" />
                  <div className="h-2 w-4/5 rounded bg-cyan-100/25" />
                </div>
              </div>
            </div>
          </MacWindow>

          <div className="glass-soft relative overflow-hidden rounded-2xl p-5 md:col-span-5">
            <p className="text-sm text-slate-400">{t.mockup.weather}</p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-3xl font-semibold text-white">{t.mockup.calm}</p>
                <p className="mt-2 text-sm text-slate-300">{t.mockup.calmCopy}</p>
              </div>
              <div className="ambient-ring flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-200/30 to-violet-300/25">
                <Moon className="size-8 text-white" />
              </div>
            </div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-200 to-violet-300"
                initial={{ width: "30%" }}
                animate={{ width: ["42%", "74%", "58%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>

        <motion.div
          className="glass absolute left-5 top-24 w-[265px] rounded-3xl p-4 md:left-16 md:top-28"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-3">
            <div className="ambient-ring flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-200/35 to-violet-300/35">
              <Stars className="size-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{t.mockup.nova}</p>
              <p className="text-xs text-slate-300">{t.mockup.novaCopy}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass absolute bottom-12 right-5 w-[310px] rounded-3xl p-5 md:right-20"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">{t.mockup.focus}</p>
            <Pause className="size-4 text-cyan-100" />
          </div>
          <p className="text-sm leading-6 text-slate-300">
            {t.mockup.focusCopy}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Hero({ t }: { t: Copy }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 120]);

  return (
    <section className="relative overflow-hidden px-4 pb-28 pt-36 md:pt-44">
      <motion.div style={{ y }} className="grid-bg absolute inset-0 opacity-70" />
      <div className="absolute left-1/2 top-16 h-80 w-[70vw] -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="mx-auto mb-10 flex flex-col items-center">
            <LogoMark className="mb-5 size-40 md:size-56" />
            <BrandWordmark tagline={t.hero.brandTagline} />
          </motion.div>
          <motion.div variants={fadeUp} className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/7 px-4 py-2 text-sm text-cyan-100 backdrop-blur-xl">
            <Sparkles className="size-4" />
            {t.hero.eyebrow}
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-balance text-5xl font-semibold tracking-tight text-white md:text-7xl lg:text-8xl">
            {t.hero.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-300 md:text-2xl md:leading-9">
            {t.hero.subtitle}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#waitlist" onClick={(event) => scrollToSection(event, "waitlist")} className="button-glow group inline-flex items-center justify-center rounded-full bg-white px-7 py-4 font-semibold text-slate-950 transition hover:scale-[1.02]">
              {t.hero.primary}
              <ArrowRight className="ml-2 size-5 transition group-hover:translate-x-1" />
            </a>
            <a href="#demo" onClick={(event) => scrollToSection(event, "demo")} className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-7 py-4 font-semibold text-white backdrop-blur-xl transition hover:bg-white/12">
              {t.hero.secondary}
              <ChevronRight className="ml-2 size-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
      <HeroMockup t={t} />
    </section>
  );
}

function Problem({ t }: { t: Copy }) {
  return (
    <section className="px-4 py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <SectionHeader
          eyebrow={t.problem.eyebrow}
          title={t.problem.title}
          copy={t.problem.copy}
        />
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2rem] p-6 md:p-8">
            <div className="absolute right-0 top-0 size-72 rounded-full bg-violet-400/12 blur-3xl" />
            <div className="grid gap-4 sm:grid-cols-2">
              {t.problem.items.map((item, index) => (
                <motion.div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.055] p-5"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <BellOff className="mb-5 size-5 text-cyan-100" />
                  <p className="text-lg font-medium text-white">{item}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{t.problem.itemCopy}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Solution({ t }: { t: Copy }) {
  return (
    <section id="solution" className="px-4 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          center
          eyebrow={t.solution.eyebrow}
          title={t.solution.title}
          copy={t.solution.copy}
        />
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {t.solution.cards.map(([title, cardCopy], index) => {
            const Icon = solutionIcons[index];
            return (
            <Reveal key={title} delay={index * 0.06}>
              <div className="glass h-full rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-100/25">
                <div className="mb-8 flex size-13 items-center justify-center rounded-2xl bg-cyan-100/12 text-cyan-100">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{cardCopy}</p>
              </div>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks({ t }: { t: Copy }) {
  return (
    <section id="demo" className="px-4 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader center eyebrow={t.how.eyebrow} title={t.how.title} />
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {t.how.steps.map(([num, title, stepCopy], index) => (
            <Reveal key={title} delay={index * 0.08}>
              <div className="glass-soft relative h-full overflow-hidden rounded-[1.75rem] p-7">
                <div className="absolute -right-10 -top-10 size-36 rounded-full bg-cyan-300/10 blur-2xl" />
                <p className="text-sm font-semibold text-cyan-100">{num}</p>
                <h3 className="mt-8 text-2xl font-semibold text-white">{title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{stepCopy}</p>
                <div className="mt-9 flex items-center gap-3">
                  <span className="h-px flex-1 bg-gradient-to-r from-cyan-200/60 to-transparent" />
                  <Workflow className="size-5 text-violet-200" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkSessionFeature({ t }: { t: Copy }) {
  const durations = ["25", "45", "60", "90", "Custom"];
  const allowedApps = ["Safari", "Notion", "Preview", "VSCode"];

  return (
    <section className="px-4 py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
        <SectionHeader
          eyebrow={t.workSession.eyebrow}
          title={t.workSession.title}
          copy={t.workSession.copy}
        />
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2rem] p-4 md:p-6">
            <div className="absolute -right-24 -top-24 size-72 rounded-full bg-violet-400/18 blur-3xl" />
            <div className="absolute -bottom-24 left-8 size-72 rounded-full bg-cyan-300/14 blur-3xl" />
            <div className="relative grid gap-4 lg:grid-cols-[96px_1fr]">
              <aside className="glass-soft flex items-center justify-center rounded-[1.5rem] p-4 lg:flex-col lg:justify-start lg:gap-5">
                {[Compass, FileText, Code2, Timer].map((Icon, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/7 text-slate-300",
                      index === 3 && "border-cyan-100/40 bg-cyan-100/15 text-cyan-100 ambient-ring"
                    )}
                  >
                    <Icon className="size-5" />
                  </div>
                ))}
              </aside>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="glass-soft rounded-[1.5rem] p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Timer className="size-5 text-cyan-100" />
                      <p className="font-semibold text-white">{t.workSession.setup}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/7 px-3 py-1 text-xs text-slate-300">Focus</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-500">{t.workSession.nameLabel}</p>
                      <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white">
                        {t.workSession.nameValue}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-500">{t.workSession.duration}</p>
                      <div className="grid grid-cols-5 gap-2">
                        {durations.map((duration, index) => (
                          <div
                            key={duration}
                            className={cn(
                              "rounded-xl border border-white/10 bg-white/6 py-2 text-center text-xs text-slate-300",
                              index === 1 && "border-cyan-100/40 bg-cyan-100/15 text-white"
                            )}
                          >
                            {duration}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-500">{t.workSession.allowed}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {allowedApps.map((app) => (
                          <div key={app} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/6 px-3 py-2 text-sm text-slate-200">
                            <Check className="size-4 text-cyan-100" />
                            {app}
                          </div>
                        ))}
                      </div>
                    </div>
                    <button className="button-glow flex min-h-12 w-full items-center justify-center rounded-full bg-white font-semibold text-slate-950">
                      {t.workSession.start}
                    </button>
                  </div>
                </div>

                <div className="glass-soft relative overflow-hidden rounded-[1.5rem] p-5">
                  <div className="absolute left-1/2 top-14 size-44 -translate-x-1/2 rounded-full bg-cyan-300/12 blur-3xl breathe" />
                  <div className="relative">
                    <div className="mb-6 flex items-center justify-between">
                      <p className="font-semibold text-white">{t.workSession.active}</p>
                      <span className="flex items-center gap-2 rounded-full border border-cyan-100/25 bg-cyan-100/10 px-3 py-1 text-xs text-cyan-100">
                        <span className="size-2 rounded-full bg-cyan-100" />
                        {t.workSession.focusState}
                      </span>
                    </div>
                    <div className="py-8 text-center">
                      <motion.div
                        className="bg-gradient-to-r from-cyan-200 to-violet-300 bg-clip-text text-7xl font-semibold tracking-tight text-transparent md:text-8xl"
                        animate={{ opacity: [0.78, 1, 0.78] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {t.workSession.timer}
                      </motion.div>
                    </div>
                    <div className="mb-5 flex items-center gap-3 rounded-2xl border border-yellow-200/35 bg-yellow-200/14 px-4 py-3 text-sm text-yellow-50">
                      <ShieldAlert className="size-5 shrink-0 text-yellow-200" />
                      {t.workSession.banner}
                    </div>
                    <button className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-red-300/30 bg-red-500/18 font-semibold text-red-100">
                      <Square className="size-4 fill-current" />
                      {t.workSession.end}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-4 grid gap-3 md:grid-cols-3">
              {t.workSession.points.map((point) => (
                <div key={point} className="rounded-2xl border border-white/10 bg-white/6 p-4 text-sm leading-6 text-slate-300">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AppOverlay({ t }: { t: Copy }) {
  return (
    <section id="apps" className="px-4 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            eyebrow={t.apps.eyebrow}
            title={t.apps.title}
            copy={t.apps.copy}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {t.apps.items.map(([name, appCopy], index) => {
              const Icon = appIcons[index];
              return (
              <Reveal key={name} delay={index * 0.035}>
                <div className="glass-soft rounded-3xl p-5 transition hover:bg-white/9">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-white/10">
                      <Icon className="size-5 text-cyan-100" />
                    </span>
                    <h3 className="font-semibold text-white">{name}</h3>
                  </div>
                  <p className="text-sm leading-6 text-slate-300">{appCopy}</p>
                </div>
              </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function NeurodivergentValue({ t }: { t: Copy }) {
  return (
    <section className="px-4 py-28">
      <div className="glass mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] p-7 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <SectionHeader
            eyebrow={t.neuro.eyebrow}
            title={t.neuro.title}
            copy={t.neuro.copy}
          />
          <Reveal>
            <div className="grid gap-3">
              {t.neuro.benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/7 p-4">
                  <Check className="size-5 text-cyan-100" />
                  <span className="text-slate-200">{benefit}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeatureShowcase({ t }: { t: Copy }) {
  return (
    <section className="px-4 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader center eyebrow={t.features.eyebrow} title={t.features.title} />
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map(([title, featureCopy], index) => {
            const Icon = featureIcons[index];
            return (
            <Reveal key={title} delay={index * 0.05}>
              <div className="group glass h-full rounded-[1.75rem] p-6">
                <div className="mb-10 flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-100">
                    <Icon className="size-6" />
                  </div>
                  <span className="h-px w-20 bg-gradient-to-r from-transparent via-white/25 to-transparent transition group-hover:w-28" />
                </div>
                <h3 className="text-2xl font-semibold text-white">{title}</h3>
                <p className="mt-4 leading-7 text-slate-300">{featureCopy}</p>
              </div>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Privacy({ t }: { t: Copy }) {
  const enabled = [true, true, true, true, false, true];

  return (
    <section id="privacy" className="px-4 py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <SectionHeader
          eyebrow={t.privacy.eyebrow}
          title={t.privacy.title}
          copy={t.privacy.copy}
        />
        <Reveal>
          <div className="glass rounded-[2rem] p-6 md:p-8">
            <div className="mb-7 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Fingerprint className="size-6 text-cyan-100" />
                <p className="text-xl font-semibold text-white">{t.privacy.center}</p>
              </div>
              <Lock className="size-5 text-slate-300" />
            </div>
            <div className="space-y-3">
              {t.privacy.toggles.map((label, index) => (
                <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 p-4">
                  <span className="text-sm text-slate-200">{label}</span>
                  <span className={cn("flex h-7 w-12 items-center rounded-full p-1 transition", enabled[index] ? "bg-cyan-200/80" : "bg-white/12")}>
                    <span className={cn("size-5 rounded-full bg-white transition", enabled[index] && "translate-x-5")} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function UseCases({ t }: { t: Copy }) {
  return (
    <section className="px-4 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader center eyebrow={t.useCases.eyebrow} title={t.useCases.title} />
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.useCases.items.map(([title, before, after], index) => (
            <Reveal key={title} delay={index * 0.04}>
              <div className="glass-soft h-full rounded-[1.75rem] p-6">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <div className="mt-7 space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{t.useCases.before}</p>
                    <p className="mt-2 leading-6 text-slate-300">{before}</p>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">{t.useCases.after}</p>
                    <p className="mt-2 leading-6 text-white">{after}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WaitlistForm({ t }: { t: Copy }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "sendError" | "configError">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setStatus("success");
        return;
      }

      setStatus(response.status === 503 ? "configError" : "sendError");
    } catch {
      setStatus("sendError");
    }
  }

  return (
    <div className="mx-auto mt-10 max-w-xl">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="text"
          inputMode="email"
          required
          placeholder={t.waitlist.placeholder}
          className="min-h-14 flex-1 rounded-full border border-white/14 bg-white/9 px-6 text-white outline-none backdrop-blur-xl transition placeholder:text-slate-500 focus:border-cyan-100/60"
        />
        <button
          disabled={status === "submitting"}
          className="button-glow min-h-14 rounded-full bg-white px-7 font-semibold text-slate-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "..." : t.waitlist.button}
        </button>
      </form>
      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="mx-auto mt-5 rounded-2xl border border-cyan-100/25 bg-cyan-100/12 px-5 py-4 text-sm text-cyan-50 backdrop-blur-2xl"
        >
          {t.waitlist.success}
        </motion.div>
      ) : null}
      {status === "error" ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-4 text-sm text-cyan-100"
        >
          {t.waitlist.error}
        </motion.div>
      ) : null}
      {status === "sendError" || status === "configError" ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-4 text-sm text-cyan-100"
        >
          {status === "configError" ? t.waitlist.configError : t.waitlist.sendError}
        </motion.div>
      ) : null}
    </div>
  );
}

function FinalCTA({ t }: { t: Copy }) {
  return (
    <section id="waitlist" className="relative scroll-mt-44 overflow-hidden px-4 pb-32 pt-44">
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-cyan-300/10 to-transparent" />
      <Reveal>
        <div className="glass relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] p-8 text-center md:p-16">
          <div className="absolute left-1/2 top-0 size-80 -translate-x-1/2 rounded-full bg-violet-300/15 blur-3xl breathe" />
          <div className="relative">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.22em] text-cyan-100">{t.waitlist.eyebrow}</p>
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-7xl">
              {t.waitlist.title}
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              {t.waitlist.copy}
            </p>
            <div className="relative">
              <WaitlistForm t={t} />
            </div>
            <a href="#solution" onClick={(event) => scrollToSection(event, "solution")} className="mt-16 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white">
              {t.waitlist.secondary} <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FloatingAmbient() {
  const points = useMemo(
    () => [
      "left-[6%] top-[18%] size-44 bg-cyan-300/12",
      "right-[5%] top-[34%] size-56 bg-violet-300/12",
      "left-[12%] bottom-[18%] size-52 bg-cyan-200/8"
    ],
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {points.map((classes, index) => (
        <motion.div
          key={classes}
          className={cn("absolute rounded-full blur-3xl", classes)}
          animate={{ y: [0, -30, 0], x: [0, index % 2 ? 18 : -18, 0] }}
          transition={{ duration: 9 + index, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [locale, setLocale] = useState<Locale>("es");
  const t = copy[locale];

  return (
    <main className="relative min-h-screen overflow-hidden">
      <FloatingAmbient />
      <div className="noise" />
      <Nav locale={locale} setLocale={setLocale} t={t} />
      <Hero t={t} />
      <Problem t={t} />
      <Solution t={t} />
      <HowItWorks t={t} />
      <WorkSessionFeature t={t} />
      <AppOverlay t={t} />
      <NeurodivergentValue t={t} />
      <FeatureShowcase t={t} />
      <Privacy t={t} />
      <UseCases t={t} />
      <FinalCTA t={t} />
      <footer className="border-t border-white/10 px-4 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-500 md:flex-row">
          <p>{t.footer[0]}</p>
          <p>{t.footer[1]}</p>
        </div>
      </footer>
    </main>
  );
}
