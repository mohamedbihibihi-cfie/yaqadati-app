import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock3,
  Edit3,
  Flag,
  Gauge,
  Moon,
  Pause,
  PenLine,
  Play,
  RotateCcw,
  Sparkles,
  Sun,
  Volume2,
  VolumeX,
  Waves,
} from "lucide-react";
import { localizeStations, translations } from "./i18n";

const stations = [
  {
    id: "start",
    title: "بداية الحصة",
    label: "تهيئة",
    icon: Sparkles,
    summary: "استعداد هادئ للتعلم",
    finalQuestion: "هل أنتم مستعدون للتعلم بهدوء؟",
    activities: [
      {
        title: "ثلاثة أنفاس لبداية هادئة",
        duration: 60,
        goal: "تهيئة التلاميذ للانتباه قبل شرح الدرس.",
        rhythm: "تنفسي",
        pupilGuide: "تنفسوا بهدوء... شهيق قصير وزفير أطول.",
        teacherCue: "ابدأ بصوت منخفض، وانتظر لحظة صمت قبل العد.",
        instructions: [
          "يجلس التلاميذ باستقامة والقدمان ثابتتان.",
          "يأخذ الجميع شهيقا هادئا مع عدتين.",
          "يخرج الجميع الزفير ببطء مع ثلاث عدات.",
          "تكرر العملية ثلاث مرات.",
          "يبدأ الأستاذ الحصة بجملة قصيرة وواضحة.",
        ],
      },
      {
        title: "صوت البداية",
        duration: 75,
        goal: "تحويل بداية الحصة إلى إشارة سمعية تساعد على الصمت والانتباه.",
        rhythm: "هادئ",
        pupilGuide: "نستمع للصوت حتى يختفي، ثم نبدأ بهدوء.",
        teacherCue: "استعمل صوتا لطيفا واحدا، ثم لا تتكلم حتى يختفي الصوت.",
        instructions: [
          "يسمع التلاميذ صوتا قصيرا وهادئا.",
          "يبقى الجميع صامتين حتى ينتهي الصوت.",
          "يرفع التلميذ يده عندما لا يسمع شيئا.",
          "تعاد الإشارة مرة ثانية إذا احتاج الصف.",
          "ينتقل الأستاذ مباشرة إلى هدف الدرس.",
        ],
      },
    ],
  },
  {
    id: "after-break",
    title: "بعد الاستراحة",
    label: "انتقال",
    icon: Waves,
    summary: "من الحركة إلى الانتباه",
    finalQuestion: "هل عدنا إلى الهدوء والتركيز؟",
    activities: [
      {
        title: "موجة الهدوء",
        duration: 43,
        guidedSequence: "calm-wave",
        goal: "مساعدة التلاميذ على الانتقال من حركة الاستراحة إلى هدوء وانتباه.",
        rhythm: "تنفسي",
        visual: "wave",
        pupilGuide: "نتبع موجة التنفس خطوة خطوة.",
        teacherCue: "شغّل النشاط ودع الموجة والعدّ يقودان الصف دون شرح إضافي.",
        instructions: [
          "يجلس التلاميذ بهدوء في وضعية استعداد.",
          "يتبعون الموجة عند كل شهيق وزفير.",
          "تتكرر أربع دورات تنفس فقط.",
          "ينتظرون مرحلة العودة إلى التركيز.",
          "يستعد الصف بعدها لمتابعة التعلم.",
        ],
      },
      {
        title: "من الحركة إلى السكون",
        duration: 75,
        goal: "تفريغ الحركة الزائدة بعد الاستراحة والعودة إلى وضع التعلم.",
        rhythm: "مريح",
        pupilGuide: "نترك أجسامنا تنتقل من الحركة إلى السكون.",
        teacherCue: "نفذ الحركة ببطء أمامهم، واختم بإشارة جلوس واحدة.",
        instructions: [
          "يقف التلاميذ خلف الكراسي دون كلام.",
          "يرفعون الكتفين ببطء ثم ينزلونهما.",
          "يحركون اليدين بلطف ثلاث مرات.",
          "يأخذون نفسا هادئا واحدا.",
          "يجلسون ويضعون اليدين على الطاولة.",
        ],
      },
    ],
  },
  {
    id: "reading",
    title: "قبل القراءة",
    label: "إصغاء",
    icon: BookOpen,
    summary: "نظر وإصغاء وتوقع",
    finalQuestion: "هل أنتم مستعدون للإصغاء والقراءة بانتباه؟",
    activities: [
      {
        title: "عيناي على العنوان",
        duration: 60,
        goal: "توجيه النظر إلى العنوان وبناء توقع بسيط قبل القراءة.",
        rhythm: "بصري",
        pupilGuide: "ننظر إلى العنوان ونفكر بهدوء.",
        teacherCue: "اكتف بإجابات قصيرة حتى يبقى النشاط تمهيدا للقراءة.",
        instructions: [
          "يفتح التلاميذ الكتاب على الصفحة المطلوبة.",
          "ينظر الجميع إلى العنوان فقط.",
          "يفكر كل تلميذ بصمت: عم سيتحدث النص؟",
          "يسمع الصف توقعين أو ثلاثة.",
          "تبدأ القراءة بصوت هادئ.",
        ],
      },
      {
        title: "أسمع قبل أن أجيب",
        duration: 75,
        goal: "تدريب التلاميذ على الإصغاء قبل رفع اليد أو الإجابة.",
        rhythm: "هادئ",
        pupilGuide: "نستمع أولا، ثم نجيب بعد الإشارة.",
        teacherCue: "اترك ثلاث ثوان صمت بعد القراءة قبل السماح بالإجابة.",
        instructions: [
          "يضع التلاميذ الأقلام على الطاولة.",
          "يستمعون إلى جملة قصيرة.",
          "ينتظرون ثلاث ثوان دون رفع اليد.",
          "يرفعون اليد بعد إشارة الأستاذ.",
          "ينتقل الصف إلى قراءة النص.",
        ],
      },
    ],
  },
  {
    id: "math",
    title: "قبل الرياضيات",
    label: "تفكير",
    icon: BarChart3,
    summary: "تباطؤ قبل الحل",
    finalQuestion: "هل أنتم مستعدون للتفكير قبل الإجابة؟",
    activities: [
      {
        title: "أتوقف قبل أن أحسب",
        duration: 60,
        goal: "تقليل التسرع قبل حل المسألة.",
        rhythm: "إيقاعي",
        pupilGuide: "نتوقف لحظة، ثم نفكر قبل الحساب.",
        teacherCue: "لا تطلب الحل مباشرة؛ اجعل التوقف أول خطوة في العمل.",
        instructions: [
          "يعرض الأستاذ المسألة دون حل.",
          "يقرأ التلاميذ السؤال بصمت.",
          "يضع كل تلميذ إصبعه على المطلوب.",
          "يعد الأستاذ ببطء: واحد، اثنان، ثلاثة.",
          "يبدأ التلاميذ الحساب بعد الإشارة.",
        ],
      },
      {
        title: "المعطيات والمطلوب",
        duration: 90,
        goal: "مساعدة التلاميذ على تمييز المعلومات والسؤال قبل اختيار العملية.",
        rhythm: "بصري",
        pupilGuide: "نبحث عما نعرفه، ثم نحدد ما نريد حله.",
        teacherCue: "استعمل سؤالين ثابتين: ماذا نعرف؟ وماذا نريد؟",
        instructions: [
          "تقرأ المسألة مرة واحدة.",
          "يحدد التلاميذ الأعداد أو الكلمات المهمة.",
          "يسمي الصف هذه المعلومات: المعطيات.",
          "يحدد التلاميذ المطلوب في السؤال.",
          "يختارون العملية ثم يبدأون الحل.",
        ],
      },
    ],
  },
  {
    id: "writing",
    title: "قبل الكتابة",
    label: "تنظيم",
    icon: PenLine,
    summary: "جسم مستعد وفكرة واضحة",
    finalQuestion: "هل أصبحت أفكاركم جاهزة قبل أقلامكم؟",
    activities: [
      {
        title: "جسمي يستعد للكتابة",
        duration: 75,
        goal: "تحسين الجلسة وإعداد اليد للكتابة بهدوء.",
        rhythm: "مريح",
        pupilGuide: "نستعد للكتابة بجسم هادئ وقلم خفيف.",
        teacherCue: "صحح الوضعية بلطف، وذكّرهم بأن القلم لا يحتاج إلى ضغط قوي.",
        instructions: [
          "يثبت التلاميذ القدمين على الأرض.",
          "يستقيم الظهر دون توتر.",
          "تفتح الكفان وتغلقان ثلاث مرات.",
          "يمسك التلميذ القلم بخفة.",
          "يبدأ الجميع السطر الأول بهدوء.",
        ],
      },
      {
        title: "فكرتي قبل قلمي",
        duration: 90,
        goal: "تنظيم فكرة واحدة قبل البدء في التعبير الكتابي.",
        rhythm: "هادئ",
        pupilGuide: "نفكر في فكرة واحدة قبل أن نكتب.",
        teacherCue: "أعط مثالا قصيرا، ثم امنحهم صمتا حقيقيا للتفكير.",
        instructions: [
          "يضع التلاميذ الأقلام جانبا.",
          "يختار كل تلميذ فكرة واحدة.",
          "يصوغ الجملة الأولى في ذهنه.",
          "يرفع إصبعه عندما تصبح الفكرة جاهزة.",
          "تبدأ الكتابة دون حديث جانبي.",
        ],
      },
    ],
  },
  {
    id: "assessment",
    title: "قبل التقويم",
    label: "طمأنينة",
    icon: CheckCircle2,
    summary: "تركيز قبل الإنجاز",
    finalQuestion: "هل أنتم مستعدون للبدء بهدوء وثقة؟",
    activities: [
      {
        title: "أبدأ بهدوء",
        duration: 75,
        goal: "خفض التوتر وتنظيم بداية التقويم.",
        rhythm: "تنفسي",
        pupilGuide: "نقرأ أولا، ثم نبدأ بهدوء وثقة.",
        teacherCue: "طمئن الصف بجملة قصيرة، ثم اترك وقت قراءة قبل الكتابة.",
        instructions: [
          "يرتب التلاميذ الأدوات المطلوبة فقط.",
          "يأخذ الجميع نفسا هادئا واحدا.",
          "تقرأ التعليمات دون كتابة.",
          "يحدد كل تلميذ السؤال الأول.",
          "يبدأ التقويم بعد إشارة الأستاذ.",
        ],
      },
      {
        title: "إشارة المرور",
        duration: 90,
        goal: "تذكير التلميذ بالتوقف والفهم قبل الإجابة.",
        rhythm: "بصري",
        visual: "traffic",
        pupilGuide: "ننظر إلى الإشارة: أتوقف، أفهم، ثم أجيب.",
        teacherCue: "اربط كل لون بفعل واحد واضح، ثم ابدأ عند اللون الأخضر.",
        instructions: [
          "الأحمر: أتوقف ولا أكتب.",
          "الأصفر: أقرأ وأفهم المطلوب.",
          "الأخضر: أجيب بهدوء.",
          "يعيد الصف الأفعال بصوت منخفض.",
          "يبدأ التقويم عند الإشارة الخضراء.",
        ],
      },
    ],
  },
  {
    id: "noise",
    title: "عند التشتت أو الضجيج",
    label: "استعادة",
    icon: Gauge,
    summary: "عودة هادئة بلا توتر",
    finalQuestion: "هل أصبح الفصل أكثر هدوءًا الآن؟",
    activities: [
      {
        title: "مؤشر الهدوء",
        duration: 75,
        goal: "استعادة مناخ الصف بإشارة بصرية هادئة دون توبيخ.",
        rhythm: "بصري",
        visual: "meter",
        pupilGuide: "نخفض الصوت بهدوء حتى يستقر الفصل.",
        teacherCue: "أشر إلى المؤشر فقط، وانتظر انخفاض الصوت قبل متابعة الدرس.",
        instructions: [
          "ينظر التلاميذ إلى مؤشر الهدوء.",
          "يخفضون الصوت تدريجيا.",
          "يرتبون الجلسة دون كلام.",
          "ينتظر الصف حتى يستقر المؤشر.",
          "تستأنف المهمة بنبرة هادئة.",
        ],
      },
      {
        title: "دقيقة الصمت النشيط",
        duration: 60,
        goal: "إعادة الانتباه بسرعة دون عقاب أو قطع طويل للدرس.",
        rhythm: "هادئ",
        pupilGuide: "نصمت لحظة، ونتذكر أول خطوة في العمل.",
        teacherCue: "اجعل الصمت موجها نحو العودة للعمل، لا نحو اللوم.",
        instructions: [
          "توضع الأدوات على الطاولة.",
          "ينظر التلاميذ إلى نقطة ثابتة.",
          "يتنفسون بهدوء دون إغلاق العينين.",
          "يتذكر كل تلميذ أول خطوة في المهمة.",
          "يعود الصف للعمل عند الإشارة.",
        ],
      },
    ],
  },
  {
    id: "end",
    title: "نهاية الحصة",
    label: "إغلاق",
    icon: Flag,
    summary: "تأمل وخروج منظم",
    finalQuestion: "ما الشيء الذي تعلمناه أو أنجزناه اليوم؟",
    activities: [
      {
        title: "ماذا تعلمت الآن؟",
        duration: 90,
        goal: "تثبيت فكرة واحدة من الدرس قبل الانتقال إلى نشاط آخر.",
        rhythm: "هادئ",
        pupilGuide: "نفكر في شيء واحد تعلمناه اليوم.",
        teacherCue: "اطلب إجابة من كلمة أو جملة واحدة حتى يبقى الإغلاق خفيفا.",
        instructions: [
          "ينظر التلاميذ إلى السبورة أو الدفتر.",
          "يختار كل تلميذ شيئا واحدا تعلمه.",
          "يفكر الجميع بصمت عشر ثوان.",
          "تسمع ثلاث إجابات قصيرة.",
          "يلخص الأستاذ فكرة الدرس في جملة.",
        ],
      },
      {
        title: "نفس الشكر للجهد",
        duration: 60,
        goal: "إنهاء الحصة بتقدير الجهد وهدوء في جمع الأدوات.",
        rhythm: "تنفسي",
        pupilGuide: "نشكر جهدنا بهدوء، ثم نجمع أدواتنا.",
        teacherCue: "اجعل الشكر للجهد لا للنتيجة، ثم نظم الخروج بهدوء.",
        instructions: [
          "يضع التلاميذ اليدين على الطاولة.",
          "يأخذ الجميع شهيقا هادئا.",
          "يقول الصف: أشكر جهدي اليوم.",
          "يخرج الجميع الزفير ببطء.",
          "تجمع الأدوات دون استعجال.",
        ],
      },
    ],
  },
];

const observationGroups = [
  { label: "مستوى الهدوء", options: ["ضعيف", "متوسط", "جيد"] },
  { label: "مستوى التركيز", options: ["ضعيف", "متوسط", "جيد"] },
  { label: "سرعة الدخول في المهمة", options: ["بطيئة", "متوسطة", "سريعة"] },
];

const calmWaveSequence = {
  prepare: 6,
  cycles: 4,
  inhale: 4,
  exhale: 4,
  focus: 5,
};

let sharedAudioContext = null;

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const rest = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function isCalmWaveActivity(activity) {
  return activity.guidedSequence === "calm-wave" || activity.title === "موجة الهدوء";
}

function getCalmWavePhase(activity, duration, secondsLeft, t) {
  if (!isCalmWaveActivity(activity)) {
    return null;
  }

  const elapsed = Math.min(duration, Math.max(0, duration - secondsLeft));
  const breathingStart = calmWaveSequence.prepare;
  const cycleDuration = calmWaveSequence.inhale + calmWaveSequence.exhale;
  const breathingEnd = breathingStart + calmWaveSequence.cycles * cycleDuration;

  if (elapsed < breathingStart) {
    return {
      key: "prepare",
      phase: "prepare",
      title: t.calmWave.prepare.title,
      guidance: t.calmWave.prepare.guidance,
      countdown: Math.max(1, breathingStart - elapsed),
      cycleLabel: "",
      phaseKicker: t.calmWave.phaseKicker,
      rhythmKicker: t.calmWave.rhythmKicker,
      quietMoment: t.calmWave.quietMoment,
      motion: "settle",
    };
  }

  if (elapsed < breathingEnd) {
    const breathingElapsed = elapsed - breathingStart;
    const cycle = Math.min(
      calmWaveSequence.cycles,
      Math.floor(breathingElapsed / cycleDuration) + 1,
    );
    const withinCycle = breathingElapsed % cycleDuration;
    const isInhale = withinCycle < calmWaveSequence.inhale;
    const phaseDuration = isInhale ? calmWaveSequence.inhale : calmWaveSequence.exhale;
    const phaseElapsed = isInhale
      ? withinCycle
      : withinCycle - calmWaveSequence.inhale;

    return {
      key: `${isInhale ? "inhale" : "exhale"}-${cycle}`,
      phase: isInhale ? "inhale" : "exhale",
      title: isInhale ? t.calmWave.inhale.title : t.calmWave.exhale.title,
      guidance: isInhale ? t.calmWave.inhale.guidance : t.calmWave.exhale.guidance,
      countdown: Math.max(1, phaseDuration - phaseElapsed),
      cycleLabel: t.calmWave.cycleLabel(cycle, calmWaveSequence.cycles),
      phaseKicker: t.calmWave.phaseKicker,
      rhythmKicker: t.calmWave.rhythmKicker,
      quietMoment: t.calmWave.quietMoment,
      motion: isInhale ? "inhale" : "exhale",
    };
  }

  return {
    key: "focus",
    phase: "focus",
    title: t.calmWave.focus.title,
    guidance: t.calmWave.focus.guidance,
    countdown: Math.max(1, duration - elapsed),
    cycleLabel: "",
    phaseKicker: t.calmWave.phaseKicker,
    rhythmKicker: t.calmWave.rhythmKicker,
    quietMoment: t.calmWave.quietMoment,
    motion: "focus",
  };
}

async function getAudioContext(enabled, { allowCreate = false } = {}) {
  if (!enabled || typeof window === "undefined") {
    return null;
  }

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    return null;
  }

  if (!sharedAudioContext || sharedAudioContext.state === "closed") {
    if (!allowCreate) {
      return null;
    }
    sharedAudioContext = new AudioContext();
  }

  if (sharedAudioContext.state === "suspended") {
    await sharedAudioContext.resume();
  }

  return sharedAudioContext;
}

function getStoredChoice(key, fallback) {
  if (typeof window === "undefined") {
    return fallback;
  }
  return window.localStorage.getItem(key) ?? fallback;
}

function getInitialTheme() {
  const savedTheme = getStoredChoice("yaqadati-theme", "dark");
  return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
}

function getInitialSound() {
  return getStoredChoice("yaqadati-sound", "off") === "on";
}

function getInitialLanguage() {
  const savedLanguage = getStoredChoice("yaqadati-language", "ar");
  return savedLanguage === "fr" || savedLanguage === "ar" ? savedLanguage : "ar";
}

async function playSoftChime(type, enabled, options = {}) {
  try {
    const audioContext = await getAudioContext(enabled, options);
    if (!audioContext) {
      return;
    }
    const now = audioContext.currentTime;
    const gain = audioContext.createGain();
    const oscillator = audioContext.createOscillator();
    const secondOscillator = audioContext.createOscillator();
    const frequencyMap = {
      start: [392, 523.25],
      test: [440, 587.33],
      end: [493.88, 659.25],
    };
    const frequencies = frequencyMap[type] ?? frequencyMap.start;
    const peakGain = type === "end" ? 0.12 : 0.105;

    oscillator.type = "sine";
    secondOscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequencies[0], now);
    secondOscillator.frequency.setValueAtTime(frequencies[1], now + 0.06);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(peakGain, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.92);

    oscillator.connect(gain);
    secondOscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    secondOscillator.start(now + 0.08);
    oscillator.stop(now + 0.88);
    secondOscillator.stop(now + 0.92);
  } catch {
    // Sound is optional; unsupported audio should never interrupt the class flow.
  }
}

async function playPhaseCue(phase, enabled, options = {}) {
  try {
    const audioContext = await getAudioContext(enabled, options);
    if (!audioContext) {
      return;
    }
    const now = audioContext.currentTime;
    const gain = audioContext.createGain();
    const oscillator = audioContext.createOscillator();
    const secondOscillator = audioContext.createOscillator();
    const toneMap = {
      prepare: [392, 493.88],
      inhale: [523.25, 659.25],
      exhale: [349.23, 261.63],
      focus: [440, 587.33],
    };
    const durationMap = {
      prepare: 0.68,
      inhale: 0.5,
      exhale: 0.58,
      focus: 0.72,
    };
    const frequencies = toneMap[phase] ?? toneMap.prepare;
    const toneDuration = durationMap[phase] ?? 0.45;

    oscillator.type = "sine";
    secondOscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(frequencies[0], now);
    secondOscillator.frequency.setValueAtTime(frequencies[1], now + 0.03);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + toneDuration);

    oscillator.connect(gain);
    secondOscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    secondOscillator.start(now + 0.03);
    oscillator.stop(now + toneDuration);
    secondOscillator.stop(now + toneDuration);
  } catch {
    // Phase cues are optional and should never interrupt the activity.
  }
}

function App() {
  const observationRef = useRef(null);
  const endChimePlayed = useRef(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const [language, setLanguage] = useState(getInitialLanguage);
  const [soundEnabled, setSoundEnabled] = useState(getInitialSound);
  const [sessionMode, setSessionMode] = useState("teacher");
  const [selectedStationId, setSelectedStationId] = useState(stations[0].id);
  const t = translations[language] ?? translations.ar;
  const localizedStations = useMemo(() => localizeStations(stations, language), [language]);
  const selectedStation = useMemo(
    () => stations.find((station) => station.id === selectedStationId) ?? stations[0],
    [selectedStationId],
  );
  const selectedStationView = useMemo(
    () => localizedStations.find((station) => station.id === selectedStationId) ?? localizedStations[0],
    [localizedStations, selectedStationId],
  );
  const [selectedActivityTitle, setSelectedActivityTitle] = useState(
    stations[0].activities[0].title,
  );
  const selectedActivity =
    selectedStation.activities.find((activityItem) => activityItem.title === selectedActivityTitle) ??
    selectedStation.activities[0];
  const selectedActivityView =
    selectedStationView.activities.find(
      (activityItem) => activityItem.sourceTitle === selectedActivity.title,
    ) ?? selectedStationView.activities[0];
  const [secondsLeft, setSecondsLeft] = useState(selectedActivity.duration);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sessionRunId, setSessionRunId] = useState(0);
  const [observations, setObservations] = useState({});
  const mainClassName = cn("app-shell min-h-screen", t.textAlignClass);

  useEffect(() => {
    window.localStorage.setItem("yaqadati-theme", theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem("yaqadati-language", language);
  }, [language]);

  useEffect(() => {
    window.localStorage.setItem("yaqadati-sound", soundEnabled ? "on" : "off");
  }, [soundEnabled]);

  useEffect(() => {
    setSelectedActivityTitle(selectedStation.activities[0].title);
  }, [selectedStation]);

  useEffect(() => {
    setSecondsLeft(selectedActivity.duration);
    setIsTimerRunning(false);
    setSessionMode("teacher");
    endChimePlayed.current = false;
  }, [selectedActivity]);

  useEffect(() => {
    if (sessionMode !== "running" || !isTimerRunning || secondsLeft <= 0) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [sessionMode, isTimerRunning, secondsLeft]);

  useEffect(() => {
    if (sessionMode === "running" && secondsLeft === 0 && !endChimePlayed.current) {
      endChimePlayed.current = true;
      setIsTimerRunning(false);
      setSessionMode("finished");
      void playSoftChime("end", soundEnabled);
    }
  }, [secondsLeft, sessionMode, soundEnabled]);

  const startActivity = () => {
    endChimePlayed.current = false;
    setSessionRunId((current) => current + 1);
    setSecondsLeft(selectedActivity.duration);
    setSessionMode("running");
    setIsTimerRunning(true);
    if (isCalmWaveActivity(selectedActivity)) {
      void playPhaseCue("prepare", soundEnabled, { allowCreate: true });
    } else {
      void playSoftChime("start", soundEnabled, { allowCreate: true });
    }
  };

  const restartActivity = () => {
    endChimePlayed.current = false;
    setSessionRunId((current) => current + 1);
    setSecondsLeft(selectedActivity.duration);
    setSessionMode("running");
    setIsTimerRunning(true);
    if (isCalmWaveActivity(selectedActivity)) {
      void playPhaseCue("prepare", soundEnabled, { allowCreate: true });
    } else {
      void playSoftChime("start", soundEnabled, { allowCreate: true });
    }
  };

  const testSound = () => {
    if (!soundEnabled) {
      setSoundEnabled(true);
    }
    void playSoftChime("test", true, { allowCreate: true });
  };

  const returnToTeacher = ({ focusObservation = false } = {}) => {
    setSessionMode("teacher");
    setIsTimerRunning(false);
    if (focusObservation) {
      window.setTimeout(() => {
        observationRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        observationRef.current?.querySelector("button, textarea")?.focus();
      }, 80);
    }
  };

  const resetSession = () => {
    endChimePlayed.current = false;
    setSecondsLeft(selectedActivity.duration);
    if (sessionMode === "running" && isCalmWaveActivity(selectedActivity)) {
      setSessionRunId((current) => current + 1);
      setIsTimerRunning(true);
      void playPhaseCue("prepare", soundEnabled, { allowCreate: true });
      return;
    }
    setIsTimerRunning(false);
  };

  if (sessionMode === "running") {
    return (
      <main dir={t.direction} data-theme={theme} className={mainClassName}>
        <ProjectionMode
          key={sessionRunId}
          activity={selectedActivityView}
          station={selectedStationView}
          t={t}
          secondsLeft={secondsLeft}
          duration={selectedActivity.duration}
          isTimerRunning={isTimerRunning}
          soundEnabled={soundEnabled}
          onPause={() => setIsTimerRunning(false)}
          onResume={() => setIsTimerRunning(true)}
          onReset={resetSession}
          onReturn={() => returnToTeacher()}
        />
      </main>
    );
  }

  if (sessionMode === "finished") {
    return (
      <main dir={t.direction} data-theme={theme} className={mainClassName}>
        <EndTransition
          activity={selectedActivityView}
          station={selectedStationView}
          t={t}
          onObserve={() => returnToTeacher({ focusObservation: true })}
          onRestart={restartActivity}
        />
      </main>
    );
  }

  return (
    <main dir={t.direction} data-theme={theme} className={mainClassName}>
      <div className="app-ambient" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1480px] flex-col px-4 py-4 sm:px-6 lg:px-8">
        <Header
          t={t}
          theme={theme}
          onThemeChange={setTheme}
          language={language}
          onLanguageChange={setLanguage}
          soundEnabled={soundEnabled}
          onSoundChange={setSoundEnabled}
          onSoundTest={testSound}
        />

        <section className="grid flex-1 gap-5 lg:grid-cols-[340px_minmax(0,1fr)] 2xl:grid-cols-[360px_minmax(0,1fr)]">
          <StationPanel
            t={t}
            stations={localizedStations}
            selectedStationId={selectedStationId}
            onSelectStation={setSelectedStationId}
          />
          <div className="grid min-w-0 content-start gap-5">
            <ActivityPicker
              t={t}
              station={selectedStationView}
              selectedActivityTitle={selectedActivity.title}
              onSelectActivity={setSelectedActivityTitle}
            />
            <ActivityCard
              t={t}
              activity={selectedActivityView}
              station={selectedStationView}
              onStart={startActivity}
              observationRef={observationRef}
              observations={observations}
              onObservationsChange={setObservations}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function Header({
  t,
  theme,
  onThemeChange,
  language,
  onLanguageChange,
  soundEnabled,
  onSoundChange,
  onSoundTest,
}) {
  return (
    <header className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <p className="eyebrow mb-3 inline-flex items-center gap-2">
          <Brain className="h-4 w-4" aria-hidden="true" />
          {t.headerEyebrow}
        </p>
        <h1 className="text-balance text-4xl font-black leading-tight sm:text-5xl">
          {t.appTitle}
        </h1>
        <p className="text-muted mt-2 max-w-3xl text-lg leading-8">
          {t.headerDescription}
        </p>
      </div>

      <div className="header-actions grid gap-3 rounded-xl p-3">
        <ControlGroup label={t.language.label}>
          <button
            type="button"
            onClick={() => onLanguageChange("ar")}
            aria-pressed={language === "ar"}
            className={cn("focus-ring theme-option", language === "ar" && "is-active")}
          >
            {t.language.ar}
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange("fr")}
            aria-pressed={language === "fr"}
            className={cn("focus-ring theme-option", language === "fr" && "is-active")}
          >
            {t.language.fr}
          </button>
        </ControlGroup>

        <ControlGroup label={t.theme.label}>
          <button
            type="button"
            onClick={() => onThemeChange("dark")}
            aria-pressed={theme === "dark"}
            className={cn("focus-ring theme-option", theme === "dark" && "is-active")}
          >
            <Moon className="h-4 w-4" aria-hidden="true" />
            {t.theme.dark}
          </button>
          <button
            type="button"
            onClick={() => onThemeChange("light")}
            aria-pressed={theme === "light"}
            className={cn("focus-ring theme-option", theme === "light" && "is-active")}
          >
            <Sun className="h-4 w-4" aria-hidden="true" />
            {t.theme.light}
          </button>
        </ControlGroup>

        <ControlGroup label={t.sound.label}>
          <button
            type="button"
            onClick={() => onSoundChange(true)}
            aria-pressed={soundEnabled}
            className={cn("focus-ring theme-option", soundEnabled && "is-active")}
          >
            <Volume2 className="h-4 w-4" aria-hidden="true" />
            {t.sound.on}
          </button>
          <button
            type="button"
            onClick={() => onSoundChange(false)}
            aria-pressed={!soundEnabled}
            className={cn("focus-ring theme-option", !soundEnabled && "is-active")}
          >
            <VolumeX className="h-4 w-4" aria-hidden="true" />
            {t.sound.off}
          </button>
          <button
            type="button"
            onClick={onSoundTest}
            className="focus-ring theme-option sound-test-button"
          >
            <Volume2 className="h-4 w-4" aria-hidden="true" />
            {t.sound.test}
          </button>
        </ControlGroup>
      </div>
    </header>
  );
}

function ControlGroup({ label, children }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[auto_minmax(18rem,1fr)] sm:items-center">
      <span className="text-muted whitespace-nowrap px-1 text-sm font-bold">{label}</span>
      <div className="theme-switch grid grid-cols-2 gap-2">{children}</div>
    </div>
  );
}

function StationPanel({ t, stations, selectedStationId, onSelectStation }) {
  return (
    <aside className="surface self-start rounded-2xl p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-black">{t.stationPanel.title}</h2>
        <span className="count-badge">{t.stationPanel.count}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {stations.map((station) => {
          const Icon = station.icon;
          const isActive = station.id === selectedStationId;
          return (
            <button
              key={station.id}
              type="button"
              onClick={() => onSelectStation(station.id)}
              aria-pressed={isActive}
              className={cn("focus-ring station-button", isActive && "is-active")}
            >
              <span className="station-icon">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-lg font-black leading-7">{station.title}</span>
                <span className="text-muted mt-1 block text-sm leading-6">{station.summary}</span>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function ActivityPicker({ t, station, selectedActivityTitle, onSelectActivity }) {
  return (
    <section className="surface rounded-2xl p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-accent text-sm font-black">{station.title}</p>
          <h2 className="text-2xl font-black">{t.activityPicker.title}</h2>
        </div>
        <span className="soft-badge">{station.label}</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {station.activities.map((activityItem) => {
          const isActive = activityItem.sourceTitle === selectedActivityTitle;
          return (
            <button
              key={activityItem.sourceTitle}
              type="button"
              onClick={() => onSelectActivity(activityItem.sourceTitle)}
              aria-pressed={isActive}
              className={cn("focus-ring activity-choice", isActive && "is-active")}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-black leading-8">{activityItem.title}</h3>
                <span className="time-badge shrink-0">{formatTime(activityItem.duration)}</span>
              </div>
              <p className="text-muted mt-2 text-base leading-7">{activityItem.goal}</p>
              <div className="mt-3">
                <Chip icon={Activity}>
                  {t.activityPicker.type}: {activityItem.rhythm}
                </Chip>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ActivityCard({
  t,
  activity,
  station,
  onStart,
  observationRef,
  observations,
  onObservationsChange,
}) {
  const StationIcon = station.icon;

  return (
    <article className="surface-strong rounded-2xl p-4 sm:p-5 xl:p-6">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,390px)]">
        <div className="min-w-0">
          <p className="eyebrow mb-3 inline-flex items-center gap-2">
            <StationIcon className="h-4 w-4" aria-hidden="true" />
            {station.title}
          </p>
          <h2 className="text-balance text-3xl font-black leading-tight sm:text-4xl">
            {activity.title}
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <InfoBlock label={t.activityCard.goal} value={activity.goal} />
            <InfoBlock label={t.activityCard.teacherCue} value={activity.teacherCue} />
          </div>
        </div>

        <StartActivityPanel t={t} activity={activity} onStart={onStart} />
      </div>

      <div
        className={cn(
          "mt-5 grid gap-5",
          activity.visual && "xl:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]",
        )}
      >
        <InstructionPanel t={t} activity={activity} />
        {activity.visual ? <VisualPanel t={t} visual={activity.visual} /> : null}
      </div>

      <ObservationPanel
        t={t}
        refObject={observationRef}
        observations={observations}
        onChange={onObservationsChange}
      />
    </article>
  );
}

function StartActivityPanel({ t, activity, onStart }) {
  return (
    <section className="timer-card rounded-2xl p-4 sm:p-5">
      <div className="text-center">
        <p className="text-muted text-base font-black">{t.activityCard.duration}</p>
        <p className="timer-digits timer-digits-compact mt-2 font-black leading-none tabular-nums">
          {formatTime(activity.duration)}
        </p>
        <p className="text-readable mx-auto mt-3 max-w-sm text-lg leading-8">
          {activity.pupilGuide}
        </p>
      </div>
      <button type="button" onClick={onStart} className="focus-ring btn-primary mt-5">
        <Play className="h-5 w-5" aria-hidden="true" />
        {t.activityCard.start}
      </button>
    </section>
  );
}

function InfoBlock({ label, value }) {
  return (
    <section className="info-block rounded-xl p-4">
      <p className="text-accent mb-2 text-sm font-black">{label}</p>
      <p className="text-readable text-lg leading-8">{value}</p>
    </section>
  );
}

function InstructionPanel({ t, activity }) {
  return (
    <section className="sub-surface rounded-xl p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-2xl font-black">{t.activityCard.instructions}</h3>
        <div className="flex flex-wrap gap-2">
          <Chip icon={Clock3}>
            {t.activityCard.duration}: {formatTime(activity.duration)}
          </Chip>
          <Chip icon={Activity}>
            {t.activityCard.type}: {activity.rhythm}
          </Chip>
        </div>
      </div>
      <ol className="grid gap-3">
        {activity.instructions.map((instruction, index) => (
          <li key={instruction} className="step-row">
            <span className="step-number">{index + 1}</span>
            <span>{instruction}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ProjectionMode({
  activity,
  station,
  t,
  secondsLeft,
  duration,
  isTimerRunning,
  soundEnabled,
  onPause,
  onResume,
  onReset,
  onReturn,
}) {
  const progress = Math.round(((duration - secondsLeft) / duration) * 100);
  const calmWaveInfo = getCalmWavePhase(activity, duration, secondsLeft, t);
  const lastPhaseCue = useRef(calmWaveInfo?.key ?? null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  useEffect(() => {
    if (!calmWaveInfo || !isTimerRunning) {
      return;
    }

    if (lastPhaseCue.current !== calmWaveInfo.key) {
      lastPhaseCue.current = calmWaveInfo.key;
      void playPhaseCue(calmWaveInfo.phase, soundEnabled);
    }
  }, [calmWaveInfo, isTimerRunning, soundEnabled]);

  return (
    <section className="projection-layout relative min-h-screen overflow-hidden px-5 py-5 sm:px-8">
      <div className="app-ambient" aria-hidden="true" />
      <div className="projection-depth-grid" aria-hidden="true" />
      <div className={cn("projection-breath-field", calmWaveInfo && `field-${calmWaveInfo.phase}`)} aria-hidden="true" />
      <button type="button" onClick={onReturn} className="focus-ring projection-return">
        {t.projection.returnTeacher}
      </button>

      <div className="projection-stage relative mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-6xl flex-col items-center justify-start gap-4 pb-4 pt-16 text-center sm:gap-5 sm:pt-10">
        <p className="eyebrow inline-flex items-center gap-2">{station.title}</p>
        <div>
          <h1 className="projection-title text-balance font-black">{activity.title}</h1>
          <p className="projection-guide mx-auto mt-4 max-w-4xl text-balance font-bold">
            {calmWaveInfo?.guidance ?? activity.pupilGuide}
          </p>
        </div>

        {calmWaveInfo ? <CalmWavePhasePanel phaseInfo={calmWaveInfo} /> : null}

        <div
          className={cn(
            "projection-focus grid w-full max-w-6xl items-center gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]",
            calmWaveInfo && "projection-focus-guided-wave",
          )}
        >
          <ActivityAnimation
            visual={activity.visual}
            isActive={isTimerRunning}
            calmWaveInfo={calmWaveInfo}
            t={t}
          />

          <div className={cn("projection-timer w-full rounded-3xl p-4 sm:p-5", calmWaveInfo && "projection-timer-guided")}>
            <p className="text-muted text-lg font-black">{t.projection.timer}</p>
            <p className="projection-digits font-black leading-none tabular-nums">
              {formatTime(secondsLeft)}
            </p>
            <div className="timer-track mt-5 h-4 overflow-hidden rounded-full">
              <div className="timer-progress h-full rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="projection-controls">
          <button
            type="button"
            onClick={isTimerRunning ? onPause : onResume}
            className="focus-ring btn-secondary"
          >
            {isTimerRunning ? (
              <Pause className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Play className="h-5 w-5" aria-hidden="true" />
            )}
            {isTimerRunning ? t.projection.pause : t.projection.resume}
          </button>
          <button type="button" onClick={onReset} className="focus-ring btn-secondary">
            <RotateCcw className="h-5 w-5" aria-hidden="true" />
            {t.projection.reset}
          </button>
        </div>
      </div>
    </section>
  );
}

function CalmWavePhasePanel({ phaseInfo }) {
  return (
    <section className="calm-wave-phase-panel" aria-live="polite">
      <div className="phase-chip">
        <span className="phase-kicker">{phaseInfo.phaseKicker}</span>
        <span>{phaseInfo.title}</span>
      </div>
      <div className="phase-count">{phaseInfo.countdown}</div>
      <div className="phase-cycle">
        <span className="phase-kicker">{phaseInfo.rhythmKicker}</span>
        <span>{phaseInfo.cycleLabel || phaseInfo.quietMoment}</span>
      </div>
    </section>
  );
}

function EndTransition({ activity, station, t, onObserve, onRestart }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <section className="projection-layout relative min-h-screen overflow-hidden px-5 py-5 sm:px-8">
      <div className="app-ambient" aria-hidden="true" />
      <div className="projection-depth-grid" aria-hidden="true" />
      <div className="completion-field" aria-hidden="true" />
      <div className="completion-scene relative mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-5xl flex-col items-center justify-center gap-5 text-center">
        <div className="completion-mark">
          <CheckCircle2 className="h-14 w-14" aria-hidden="true" />
        </div>
        <p className="eyebrow inline-flex items-center gap-2">{activity.title}</p>
        <h1 className="projection-title font-black">{t.finished.title}</h1>
        <div className="final-question-panel">
          <p className="final-question-label">{t.finished.questionLabel}</p>
          <p className="final-question text-balance font-black">{station.finalQuestion}</p>
        </div>
        <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
          <button type="button" onClick={onObserve} className="focus-ring btn-primary">
            {t.finished.observe}
          </button>
          <button type="button" onClick={onRestart} className="focus-ring btn-secondary">
            <RotateCcw className="h-5 w-5" aria-hidden="true" />
            {t.finished.restart}
          </button>
        </div>
      </div>
    </section>
  );
}

function ActivityAnimation({ visual, isActive, calmWaveInfo, t }) {
  return (
    <div className={cn("projection-animation", !isActive && "is-paused")}>
      {visual === "wave" ? <WaveVisual large phaseInfo={calmWaveInfo} /> : null}
      {visual === "traffic" ? <TrafficVisual t={t} large /> : null}
      {visual === "meter" ? <MeterVisual t={t} large /> : null}
      {!visual ? <GenericCalmVisual /> : null}
    </div>
  );
}

function VisualPanel({ t, visual }) {
  if (visual === "wave") {
    return (
      <aside className="visual-card rounded-xl p-4">
        <WaveVisual />
        <p className="text-accent mt-3 text-center text-base font-black">{t.activityCard.waveCaption}</p>
      </aside>
    );
  }

  if (visual === "traffic") {
    return (
      <aside className="visual-card rounded-xl p-4">
        <TrafficVisual t={t} />
        <p className="text-accent mt-4 text-center text-base font-black">{t.activityCard.trafficCaption}</p>
      </aside>
    );
  }

  if (visual === "meter") {
    return (
      <aside className="visual-card rounded-xl p-4">
        <MeterVisual t={t} />
        <p className="text-accent mt-8 text-center text-base font-black">{t.activityCard.meterCaption}</p>
      </aside>
    );
  }

  return null;
}

function WaveVisual({ large = false, phaseInfo = null }) {
  const motionClass = phaseInfo ? `wave-${phaseInfo.motion}` : "wave-loop";
  const phaseClass = phaseInfo ? `breathing-${phaseInfo.phase}` : "breathing-idle";

  return (
    <div
      className={cn(
        "wave-stage relative overflow-hidden rounded-xl",
        large ? "guided-wave-stage h-64 sm:h-72" : "h-48",
        motionClass,
        phaseClass,
      )}
    >
      <div className="wave-horizon absolute inset-x-8 top-1/2 h-px" />
      <div className="wave-flow wave-flow-one" />
      <div className="wave-flow wave-flow-two" />
      <div className="calm-wave-aura absolute left-1/2 top-1/2 rounded-full" />
      <div className="calm-wave absolute inset-x-8 top-[36%] h-20 rounded-full" />
      <div className="calm-wave-core absolute left-1/2 top-1/2 rounded-full" />
      <div className="breath-orbit-ring absolute left-1/2 top-1/2 rounded-full" />
      <div className="calm-wave-outline absolute inset-x-12 top-[48%] h-10 rounded-full" />
      <div className="wave-ripple wave-ripple-one" />
      <div className="wave-ripple wave-ripple-two" />
      {large ? <div className="wave-breath-line absolute left-1/2 top-1/2" /> : null}
    </div>
  );
}

function TrafficVisual({ t, large = false }) {
  const labels = t.visuals.traffic;
  return (
    <div
      className={cn(
        "traffic-box mx-auto flex justify-center rounded-xl p-4",
        large ? "max-w-xl gap-8" : "max-w-72 gap-4",
      )}
    >
      <TrafficLight colorClass="traffic-red" label={labels[0]} large={large} />
      <TrafficLight colorClass="traffic-amber" label={labels[1]} large={large} />
      <TrafficLight colorClass="traffic-green" label={labels[2]} large={large} />
    </div>
  );
}

function MeterVisual({ t, large = false }) {
  return (
    <div className={cn("mx-auto w-full", large ? "max-w-3xl" : "max-w-sm")}>
      <div className="text-muted mb-3 flex items-center justify-between gap-3 text-sm font-black">
        <span>{t.visuals.meterHigh}</span>
        <span>{t.visuals.meterCalm}</span>
      </div>
      <div className={cn("quiet-track relative overflow-hidden rounded-full", large ? "h-12" : "h-8")}>
        <div className={cn("quiet-meter absolute rounded-full", large ? "top-1.5 h-9 w-9" : "top-1 h-6 w-6")} />
      </div>
    </div>
  );
}

function GenericCalmVisual() {
  return (
    <div className="generic-calm relative h-56 w-56 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
      <div className="breath-orb absolute inset-10 rounded-full" />
      <div className="breath-ring absolute inset-4 rounded-full" />
      <div className="float-dot dot-one" />
      <div className="float-dot dot-two" />
      <div className="float-dot dot-three" />
    </div>
  );
}

function TrafficLight({ colorClass, label, large = false }) {
  return (
    <div className="text-center">
      <div
        className={cn(
          "traffic-glow mx-auto rounded-full",
          colorClass,
          large ? "h-24 w-24" : "h-14 w-14",
        )}
      />
      <p className={cn("mt-2 whitespace-nowrap font-black", large ? "text-xl" : "text-sm")}>
        {label}
      </p>
    </div>
  );
}

function ObservationPanel({ t, refObject, observations, onChange }) {
  const updateValue = (key, value) => {
    onChange({ ...observations, [key]: value });
  };

  return (
    <section ref={refObject} className="observation-panel mt-5 rounded-2xl p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="inline-flex items-center gap-2 text-2xl font-black">
          <Edit3 className="text-accent h-5 w-5" aria-hidden="true" />
          {t.observation.title}
        </h3>
        <span className="text-muted text-sm font-bold">{t.observation.subtitle}</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {t.observation.groups.map((group) => (
          <div key={group.key} className="observation-block rounded-xl p-3">
            <p className="mb-3 text-base font-black">{group.label}</p>
            <div className="grid grid-cols-3 gap-2">
              {group.options.map((option) => {
                const isSelected = observations[group.key] === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => updateValue(group.key, option.key)}
                    className={cn("focus-ring observation-option", isSelected && "is-active")}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block text-base font-black">{t.observation.shortNote}</span>
        <textarea
          value={observations.note ?? ""}
          onChange={(event) => updateValue("note", event.target.value)}
          rows={3}
          placeholder={t.observation.placeholder}
          className="focus-ring note-field w-full resize-none rounded-xl px-4 py-3 text-lg leading-8"
        />
      </label>
    </section>
  );
}

function Chip({ icon: Icon, children }) {
  return (
    <span className="chip inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-black">
      <Icon className="h-4 w-4" aria-hidden="true" />
      {children}
    </span>
  );
}

export default App;
