# PROJECT_CONTEXT.md

## 1. Project Name

**Yaqadati / يقظتي**

## 2. Technical Stack

- React + Vite + Tailwind CSS
- Frontend only
- Arabic RTL interface
- No backend
- No login
- No database

## 3. Core Purpose

Yaqadati / يقظتي is a classroom mindfulness and micro-regulation app for primary school teachers.

The teacher selects a classroom station and activity, launches a projected guided activity for pupils, then records a short observation after the activity.

## 4. Current Functional Architecture

The app currently uses three clear modes:

- Teacher mode
- Student projection mode
- End-of-activity transition mode

## 5. Teacher Mode Includes

- Station selector
- Activity selector
- Activity details
- Pedagogical goal
- Duration
- Rhythm/type
- Practical steps
- Teacher guidance
- Start button
- Teacher observation section

## 6. Student Projection Mode Includes

- Activity title
- Short pupil guidance
- Animation
- Timer
- Optional sound
- Discreet return button

## 7. End Transition Mode Includes

- Calm completion message
- Station-specific final question
- Button to record teacher observation
- Option to replay activity

## 8. Validated Design Decisions

- During student projection, hide all teacher information.
- Teacher observation must appear only in teacher mode.
- Final question must be adapted to the selected station.
- Sound must be optional.
- Light/dark mode must remain.
- Later we may add Arabic/French language switching, but not yet.

## 9. Station-Specific Final Questions

- بداية الحصة: هل أنتم مستعدون للتعلم بهدوء؟
- بعد الاستراحة: هل عدنا إلى الهدوء والتركيز؟
- قبل القراءة: هل أنتم مستعدون للإصغاء والقراءة بانتباه؟
- قبل الرياضيات: هل أنتم مستعدون للتفكير قبل الإجابة؟
- قبل الكتابة: هل أصبحت أفكاركم جاهزة قبل أقلامكم؟
- قبل التقويم: هل أنتم مستعدون للبدء بهدوء وثقة؟
- عند التشتت أو الضجيج: هل أصبح الفصل أكثر هدوءًا الآن؟
- نهاية الحصة: ما الشيء الذي تعلمناه أو أنجزناه اليوم؟

## 10. Current Issue

The architecture works, but the student projection experience is still too static.

For “موجة الهدوء”, there is no clearly visible guided animation and no audible sound during the activity.

## 11. Next Planned Improvement

Redesign “موجة الهدوء” as a guided activity:

- Total duration about 43-45 seconds
- Phase 1: وضعية الاستعداد, about 6 seconds
- Phase 2: 4 breathing cycles
- شهيق: 4 seconds
- زفير: 4 seconds
- Phase 3: العودة إلى التركيز, about 5 seconds
- Show mini countdown
- Show cycle indicator
- Improve animation significantly
- Add audible soft phase cues if sound is enabled
- Keep final question: هل عدنا إلى الهدوء والتركيز؟

## 12. Files Likely Important

- `src/App.jsx`
- `src/index.css`
- `package.json`

## 13. Important Instruction For Future Work

- Do not rebuild the project from scratch.
- Always inspect current code before editing.
- Keep the current architecture and fix incrementally.
- Run `npm run build` after changes if possible.
