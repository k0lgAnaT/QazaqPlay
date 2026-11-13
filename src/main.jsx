import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const initialQuestions = [
  {
    question: "Абайдың поэмасын таңдаңыз",
    answers: ["\"Жазғытұрым\"", "\"Ескендір\"", "\"Көзімнің қарасы\""],
    correct: 1,
  },
  {
    question: "Абайдың философиялық лирикасына жататын шығармасын таңдаңыз.",
    answers: ["\"Жігіттер, ойын арзан, күлкі қымбат\"", "\"Қалың елім\"", "\"Ғашықтықтың тілі - тілсіз тіл\""],
    correct: 0,
  },
  {
    question: "Абай қара сөздерін қай жылдар арасында жазған",
    answers: ["1890-1895", "1877-1892", "1890-1898"],
    correct: 2,
  },
  {
    question: "Абайдың аяқталмай қалған поэмасы",
    answers: ["\"Масғұт\"", "\"Әзім әңгімесі\"", "\"Ескендір\""],
    correct: 1,
  },
  {
    question: "Абайдың махаббат лирикасына жататын шығармасы",
    answers: ["\"Есіңде бар ма жас күнің\"", "\"Бір сұлу қыз тұрыпты хан қолында\"", "\"Әсемпаз болма әрнеге\""],
    correct: 0,
  },
  {
    question: "Абайдың Лермонтовтан аударған шығармасы",
    answers: ["\"Масғұт\"", "\"Евгений Онегин\"", "\"Теректің сыйы\""],
    correct: 2,
  },
  {
    question: "Абайдың музыкалық мұрасы",
    answers: ["\"Өзгеге, көңілім, тоярсың\"", "\"Қараңғы түнде тау қалқып\"", "\"Қараша, желтоқсанмен сол бір екі ай\""],
    correct: 1,
  },
  {
    question: "Абайдың шәкірттер кімдер?",
    answers: ["Шәкәрім, Мағауия, Ақылбай, Көкбай", "М.Әуезов, Р.Сыздықова, Ә.Бөкейхан", "Қ.Жұмалиев, А.Байтұрсынұлы, Шәкәрім"],
    correct: 0,
  },
  {
    question: "Абай алғашқы өлеңдерін қай шәкіртінің атынан жариялап жүрді?",
    answers: ["Мағауия", "Шәкәрім", "Көкбай"],
    correct: 2,
  },
  {
    question: "Абай өз атынан алғаш жариялаған өлеңі",
    answers: ["\"Жаз\"", "\"Желсіз түнде жарық ай\"", "\"Қыс\""],
    correct: 0,
  },
  {
    question: "Саяси-әлеуметтік лирикасына жататын шығармасы",
    answers: ["\"Жарқ етпес қара көңілім не қылса да\"", "\"Қалың елім, қазағым, қайран жұртым\"", "\"Ем таба алмай\""],
    correct: 1,
  },
  {
    question: "Абайдың әжесі кім?",
    answers: ["Ұлжан", "Ділдә", "Зере"],
    correct: 2,
  },
  {
    question: "Абайдың туған жері",
    answers: ["Шыңғыстау Баурайы", "Қарақаралы", "Дон бойы"],
    correct: 0,
  },
  {
    question: "Абайдың азан шақырып қойған аты кім?",
    answers: ["Абай", "Ибраһим", "Шәкәрім"],
    correct: 1,
  },
];

// Мұғалім редакторда өзгерте алатын бастапқы үлгі.
const initialStories = [
  {
    id: "sample-kypshak-seitkul",
    title: "Сейтқұлдың маңызды таңдауы",
    text: `Сен Қыпшақ Сейтқұлдың ауылындағы тұрғындардың бірісің.
Ауылыңның тұрмысы қиын, халықтың тұрақты кәсібі жоқ.
Сейтқұл елді біріктіріп, жаңа жерге қоныстанып, егіншілікпен айналысуды ұсынады.

Бірақ бұл оңай шешім емес. Біреулер жаңа кәсіпті қолдаса, енді біреулер бұрынғы көшпелі өмірді жалғастырғысы келеді.

Сен не істер едің?`,
    choices: [
      {
        text: "Сейтқұлды қолдап, егіншілікпен айналысуға келісесің.",
        consequence:
          "Сен Сейтқұлдың ұсынысын қолдадың. Ауыл тұрғындары бірігіп, жер өңдеп, егін еге бастады. Уақыт өте келе халықтың тұрмысы жақсарып, елде береке мен тұрақтылық орнады. Бұл шешім еңбек пен бірліктің маңызын көрсетті.",
      },
      {
        text: "Бұрынғы көшпелі өмірді жалғастыруды таңдайсың.",
        consequence:
          "Сен жаңа кәсіпке көшуге асықпадың. Ауыл бұрынғы тіршілігін жалғастырды, бірақ тұрақты тұрмыс қалыптастыру мүмкіндігі азайды. Жаңа мүмкіндіктерді байқап көруден қорқу дамуға кедергі болуы мүмкін екенін түсіндің.",
      },
      {
        text: "Ауылдан кетіп, өз бетіңше күн көруді шешесің.",
        consequence:
          "Сен ауылдан кетіп, өз жолыңды таңдадың. Бірақ жалғыз әрекет ету оңай болмады. Ауылда қалған адамдар бірлесіп еңбек етіп, тұрмыстарын жақсарта бастады. Бұл оқиға бірлік пен ортақ еңбектің күшін көрсетті.",
      },
    ],
  },
  {
  id: "sample-atymtai-zhomart",
  title: "Атымтай Жомарттың таңдауы",
  text: `Сен Атымтай Жомарттың орнындағы адамсың.
Бір күні үйіңе жағдайы қиын, мұқтаж адам көмек сұрап келді.
Оның азық-түлік алуға да, күнделікті қажеттіліктерін өтеуге де мүмкіндігі жоқ.

Сен не істейсің?`,
  choices: [
    {
      text: "Мұқтаж адамға азық-түлік пен ақша беріп көмектесесің.",
      consequence:
        "Сен мұқтаж адамға қол ұшын создың. Оның жағдайы біршама жақсарды. Адамдар сенің мейірімділігің мен жомарттығыңды көріп, өзгелерге де көмектесуге үлгі алды. Сен қайырымдылықтың адам өміріне қуаныш сыйлайтынын түсіндің.",
    },
    {
      text: "Оған дайын көмек бермей, еңбек етуге үйретіп, жұмыс ұсынасың.",
      consequence:
        "Сен оған еңбек етуге мүмкіндік бердің. Ол өз еңбегімен табыс табуды үйреніп, біртіндеп жағдайын жақсартты. Ол еңбектің қадірін түсініп, болашақта өз күнін өзі көре алатын болды.",
    },
    {
      text: "Оның өтінішін қабылдамай, көмектесуден бас тартасың.",
      consequence:
        "Сен көмек беруден бас тарттың. Мұқтаж адам көңілі түсіп, басқа жақтан көмек іздеуге мәжбүр болды. Бұл жағдай саған айналаңдағы адамдарға бейжай қарамау және қолыңнан келгенше жақсылық жасау керектігін ойландырды.",
    },
  ],
},
];

function App() {
  const [page, setPage] = useState("home");

  const APP_VERSION = "2.0";

  const savedVersion = localStorage.getItem("qazaqAppVersion");

  if (savedVersion !== APP_VERSION) {
    localStorage.removeItem("qazaqQuestions");
    localStorage.removeItem("qazaqStories");

    localStorage.setItem("qazaqAppVersion", APP_VERSION);
  }

  const [questions, setQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem("qazaqQuestions");
      return saved ? JSON.parse(saved) : initialQuestions;
    } catch {
      return initialQuestions;
    }
  });

  // Teacher question form
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswers, setNewAnswers] = useState(["", "", ""]);
  const [newCorrect, setNewCorrect] = useState(0);

  // Teacher story editor
  const [stories, setStories] = useState(() => {
    try {
      const saved = localStorage.getItem("qazaqStories");
      return saved ? JSON.parse(saved) : initialStories;
    } catch {
      return initialStories;
    }
  });
  const [storyTitle, setStoryTitle] = useState("");
  const [storyText, setStoryText] = useState("");
  const [storyChoices, setStoryChoices] = useState([
    { text: "", consequence: "" },
    { text: "", consequence: "" },
  ]);
  const [editingStoryId, setEditingStoryId] = useState(null);

  // Student story view
  const [activeStoryId, setActiveStoryId] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);

  // Race
  const [i, setI] = useState(0);
  const [activeRacer, setActiveRacer] = useState(0);
  const [scores, setScores] = useState([0, 0]);
  const [positions, setPositions] = useState([0, 0]);
  const [answered, setAnswered] = useState([false, false]);
  const [raceDone, setRaceDone] = useState(false);

  useEffect(() => {
    localStorage.setItem("qazaqQuestions", JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem("qazaqStories", JSON.stringify(stories));
  }, [stories]);

  const activeStory = stories.find((item) => item.id === activeStoryId);

  function startGame() {
    setI(0);
    setScores([0, 0]);
    setPositions([0, 0]);
    setAnswered([false, false]);
    setActiveRacer(0);
    setRaceDone(false);
    setPage("game");
  }

  function addQuestion(e) {
    e.preventDefault();

    if (!newQuestion.trim() || newAnswers.some((a) => !a.trim())) {
      alert("Барлық өрістерді толтырыңыз!");
      return;
    }

    setQuestions([
      ...questions,
      {
        question: newQuestion.trim(),
        answers: newAnswers.map((answer) => answer.trim()),
        correct: newCorrect,
      },
    ]);

    setNewQuestion("");
    setNewAnswers(["", "", ""]);
    setNewCorrect(0);
    alert("Сұрақ сәтті қосылды!");
  }

  function deleteQuestion(index) {
    if (window.confirm("Бұл сұрақты өшіргіңіз келе ме?")) {
      setQuestions(questions.filter((_, n) => n !== index));
    }
  }

  function answerQuestion(answerIndex) {
    if (answered[activeRacer] || !questions[i]) return;

    const correct = answerIndex === questions[i].correct;

    if (correct) {
      setScores((old) =>
        old.map((score, index) =>
          index === activeRacer ? score + 1 : score
        )
      );

      setPositions((old) =>
        old.map((position, index) =>
          index === activeRacer ? Math.min(position + 1, 10) : position
        )
      );
    }

    setAnswered((old) =>
      old.map((value, index) => (index === activeRacer ? true : value))
    );
  }

  function nextQuestion() {
    if (!answered[0] || !answered[1]) return;

    if (i === questions.length - 1) {
      setRaceDone(true);
    } else {
      setI(i + 1);
      setAnswered([false, false]);
      setActiveRacer(0);
    }
  }

  function resetStoryForm() {
    setStoryTitle("");
    setStoryText("");
    setStoryChoices([
      { text: "", consequence: "" },
      { text: "", consequence: "" },
    ]);
    setEditingStoryId(null);
  }

  function updateStoryChoice(index, field, value) {
    setStoryChoices((old) =>
      old.map((choice, n) =>
        n === index ? { ...choice, [field]: value } : choice
      )
    );
  }

  function addStoryChoice() {
    setStoryChoices((old) => [...old, { text: "", consequence: "" }]);
  }

  function removeStoryChoice(index) {
    if (storyChoices.length <= 2) {
      alert("Кемінде 2 шешім нұсқасы болуы керек.");
      return;
    }
    setStoryChoices((old) => old.filter((_, n) => n !== index));
  }

  function saveStory(e) {
    e.preventDefault();

    if (
      !storyTitle.trim() ||
      !storyText.trim() ||
      storyChoices.some(
        (choice) => !choice.text.trim() || !choice.consequence.trim()
      )
    ) {
      alert("Тарихтың атауын, мәтінін және барлық шешімдердің салдарын толтырыңыз.");
      return;
    }

    const storyToSave = {
      id: editingStoryId ?? `story-${Date.now()}`,
      title: storyTitle.trim(),
      text: storyText.trim(),
      choices: storyChoices.map((choice) => ({
        text: choice.text.trim(),
        consequence: choice.consequence.trim(),
      })),
    };

    setStories((old) =>
      editingStoryId
        ? old.map((item) => (item.id === editingStoryId ? storyToSave : item))
        : [...old, storyToSave]
    );

    resetStoryForm();
    alert(editingStoryId ? "Тарих жаңартылды!" : "Жаңа тарих қосылды!");
  }

  function editStory(item) {
    setStoryTitle(item.title);
    setStoryText(item.text);
    setStoryChoices(item.choices.map((choice) => ({ ...choice })));
    setEditingStoryId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteStory(id) {
    if (window.confirm("Бұл тарихты өшіргіңіз келе ме?")) {
      setStories((old) => old.filter((item) => item.id !== id));
      if (activeStoryId === id) {
        setActiveStoryId(null);
        setSelectedChoice(null);
      }
    }
  }

  function startStory(id) {
    setActiveStoryId(id);
    setSelectedChoice(null);
    setPage("quest");
  }

  function openStoryList() {
    setActiveStoryId(null);
    setSelectedChoice(null);
    setPage("quest");
  }

  const winner =
    scores[0] > scores[1]
      ? "Бірінші атшы"
      : scores[1] > scores[0]
      ? "Екінші атшы"
      : "Тең нәтиже!";

  return (
    <div className="app">
      <header>
        <div className="logo">
          🐎 Qazaq<span>Play</span>
        </div>

        <nav>
          <button onClick={() => setPage("home")}>Басты бет</button>
          <button onClick={() => setPage("teacher")}>Мұғалім</button>
        </nav>
      </header>

      {/* HOME */}
      {page === "home" && (
        <main className="hero">
          <div className="tag">ҚАЗАҚ ТІЛІ ЖӘНЕ ӘДЕБИЕТІ</div>

          <h1>
            Ойна. Үйрен.
            <br />
            <em>Жеңіске жет!</em>
          </h1>

          <p>Қазақ тілі мен әдебиетін қызықты ойындар арқылы меңгер.</p>

          <button className="primary" onClick={startGame}>
            Ойынды бастау →
          </button>

          <div className="horses">
            <div className="rider">🏇🏻</div>
            <div className="rider girl">🏇🏻</div>
            <div className="land">🌾　🌼　🌾　🌿　🌾</div>
          </div>

          <section className="cards">
            <article onClick={startGame}>
              <b>🏇 Ат Жарыс</b>
              <small>Екі шабандоздың білім жарысы</small>
            </article>

            <article onClick={openStoryList}>
              <b>📚 Әдеби саяхат</b>
              <small>Мұғалім жасаған интерактивті әдеби саяхат</small>
            </article>
          </section>

          {/* <button className="teacher-link" onClick={() => setPage("teacher")}>
            ⚙ Мұғалімге арналған бөлім
          </button> */}
        </main>
      )}

      {/* TEACHER PANEL */}
      {page === "teacher" && (
        <main className="game">
          <button className="back" onClick={() => setPage("home")}>
            ← Басты бет
          </button>

          <h1>👩‍🏫 Мұғалім кабинеті</h1>

          <p className="subtitle">
            Викторина сұрақтарын және интерактивті оқиғаларды басқарыңыз.
          </p>

          <div className="teacher-section">
            <h2>📝 Викторина сұрақтары</h2>
            <form className="teacher-form" onSubmit={addQuestion}>
              <label>Сұрақ мәтіні</label>
              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Мысалы: Абай қай жылы дүниеге келді?"
                required
              />

              <label>Жауап нұсқалары</label>
              {newAnswers.map((answer, index) => (
                <input
                  key={index}
                  value={answer}
                  placeholder={`Жауап ${index + 1}`}
                  onChange={(e) =>
                    setNewAnswers((old) =>
                      old.map((a, n) => (n === index ? e.target.value : a))
                    )
                  }
                  required
                />
              ))}

              <label>Дұрыс жауапты таңдаңыз</label>
              <select
                value={newCorrect}
                onChange={(e) => setNewCorrect(Number(e.target.value))}
              >
                {newAnswers.map((_, index) => (
                  <option key={index} value={index}>
                    {index + 1}-жауап
                  </option>
                ))}
              </select>

              <button className="primary" type="submit">
                + Сұрақ қосу
              </button>
            </form>

            <h3>📋 Қосылған сұрақтар ({questions.length})</h3>
            <div className="question-list">
              {questions.map((q, index) => (
                <div className="question-item" key={index}>
                  <div>
                    <b>
                      {index + 1}. {q.question}
                    </b>
                    <small>Дұрыс жауап: {q.answers[q.correct]}</small>
                  </div>
                  <button
                    className="delete"
                    onClick={() => deleteQuestion(index)}
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="teacher-section">
            <div className="section-heading">
              <div>
                <h2>📚 Абай әлемі — тарих редакторы</h2>
                <p className="subtitle">
                  Оқиғаны өзіңіз жазыңыз. Әр шешімге оның салдарын қосыңыз.
                </p>
              </div>
            </div>

            <form className="teacher-form" onSubmit={saveStory}>
              <label>Тарихтың атауы</label>
              <input
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
                placeholder="Мысалы: Ауылдағы маңызды шешім"
                required
              />

              <label>Оқиғаның мәтіні</label>
              <textarea
                className="story-main-input"
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                placeholder="Оқиғаны сипаттаңыз. Оқушы қандай жағдайға тап болды?"
                required
              />

              <div className="choice-form-heading">
                <h3>Шешімдер және олардың салдары</h3>
                <span>{storyChoices.length} нұсқа</span>
              </div>

              {storyChoices.map((choice, index) => (
                <div className="story-editor-choice" key={index}>
                  <div className="choice-heading">
                    <b>{index + 1}-шешім</b>
                    <button
                      className="delete"
                      type="button"
                      onClick={() => removeStoryChoice(index)}
                      aria-label="Шешімді өшіру"
                    >
                      🗑
                    </button>
                  </div>

                  <label>Оқушы таңдайтын жауап</label>
                  <textarea
                    value={choice.text}
                    onChange={(e) =>
                      updateStoryChoice(index, "text", e.target.value)
                    }
                    placeholder="Мысалы: Екі адамның да пікірін тыңдаймын."
                    required
                  />

                  <label>Осы шешімнің салдары / қорытындысы</label>
                  <textarea
                    value={choice.consequence}
                    onChange={(e) =>
                      updateStoryChoice(index, "consequence", e.target.value)
                    }
                    placeholder="Оқушы осыны таңдаса, не болады? Қандай сабақ алады?"
                    required
                  />
                </div>
              ))}

              <button
                className="add-choice"
                type="button"
                onClick={addStoryChoice}
              >
                + Тағы бір шешім қосу
              </button>

              <div className="form-actions">
                <button className="primary" type="submit">
                  {editingStoryId ? "Өзгерістерді сақтау" : "Тарихты жариялау"}
                </button>
                {editingStoryId && (
                  <button
                    className="secondary"
                    type="button"
                    onClick={resetStoryForm}
                  >
                    Болдырмау
                  </button>
                )}
              </div>
            </form>

            <h3>📖 Жарияланған тарихтар ({stories.length})</h3>
            {stories.length === 0 ? (
              <p className="empty-state">
                Әзірге тарих жоқ. Жоғарыдағы форма арқылы алғашқы тарихты қосыңыз.
              </p>
            ) : (
              <div className="question-list">
                {stories.map((item) => (
                  <div className="question-item story-list-item" key={item.id}>
                    <div>
                      <b>{item.title}</b>
                      <small>{item.choices.length} шешім нұсқасы</small>
                    </div>
                    <div className="story-actions">
                      <button
                        className="edit"
                        onClick={() => editStory(item)}
                      >
                        ✏️ Өңдеу
                      </button>
                      <button
                        className="delete"
                        onClick={() => deleteStory(item.id)}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button className="primary" onClick={openStoryList}>
              Оқушы ретінде көру →
            </button>
          </div>

          <button className="primary" onClick={startGame}>
            Викторинаны бастау →
          </button>
        </main>
      )}

      {/* STORY EDITOR VIEW */}
      {page === "storyEditor" && (
        <main className="game">
          <button className="back" onClick={() => setPage("teacher")}>
            ← Мұғалім кабинеті
          </button>
          <h1>📚 Тарих редакторы</h1>
          <p>Тарихтарды мұғалім кабинетіндегі редактор арқылы басқарыңыз.</p>
          <button className="primary" onClick={() => setPage("teacher")}>
            Редакторды ашу
          </button>
        </main>
      )}

      {/* TWO PLAYER RACE */}
      {page === "game" && (
        <main className="game">
          <button className="back" onClick={() => setPage("home")}>
            ← Басты бет
          </button>

          <h1>🏇 Ат жарысы</h1>

          {questions.length === 0 ? (
            <div className="result">
              <h2>Сұрақтар жоқ!</h2>
              <p>Алдымен мұғалім сұрақтар қосуы керек.</p>
              <button className="primary" onClick={() => setPage("teacher")}>
                Сұрақ қосу
              </button>
            </div>
          ) : raceDone ? (
            <div className="result">
              <h2>🏁 Жарыс аяқталды!</h2>
              <h2>🏆 {winner}</h2>
              <p>Бірінші шабандоз: {scores[0]} дұрыс жауап</p>
              <p>Екінші шабандоз: {scores[1]} дұрыс жауап</p>
              <button className="primary" onClick={startGame}>
                Қайта ойнау
              </button>
            </div>
          ) : (
            <>
              <div className="scoreboard">
                <div className="score-card">
                  🏇 Бірінші шабандоз
                  <h2>{scores[0]}</h2>
                </div>
                <div className="score-card">
                  🏇 Екінші шабандоз
                  <h2>{scores[1]}</h2>
                </div>
              </div>

              <div className="track">
                <div className="tracklabel">Мәреге дейін 🏁</div>
                <div
                  className="horse boy"
                  style={{ left: `${positions[0] * 8}%` }}
                >
                  🏇🏻
                </div>
                <div
                  className="horse girlhorse"
                  style={{ left: `${positions[1] * 8}%` }}
                >
                  🏇🏻
                </div>
                <div className="finish">🏁</div>
              </div>

              <div className="question">
                <small>
                  СҰРАҚ {i + 1} / {questions.length}
                </small>
                <h2>{questions[i].question}</h2>

                <div className="racer-select">
                  <button
                    className={activeRacer === 0 ? "selected" : ""}
                    disabled={answered[0]}
                    onClick={() => setActiveRacer(0)}
                  >
                    🏇 Бірінші шабандоз {answered[0] ? "✓" : ""}
                  </button>
                  <button
                    className={activeRacer === 1 ? "selected" : ""}
                    disabled={answered[1]}
                    onClick={() => setActiveRacer(1)}
                  >
                    🏇 Екінші шабандоз {answered[1] ? "✓" : ""}
                  </button>
                </div>

                <p className="turn-label">
                  Қазір жауап береді:{" "}
                  {activeRacer === 0 ? "Бірінші шабандоз" : "Екінші шабандоз"}
                </p>

                <div className="answers">
                  {questions[i].answers.map((a, n) => (
                    <button
                      key={n}
                      disabled={answered[activeRacer]}
                      onClick={() => answerQuestion(n)}
                    >
                      {String.fromCharCode(65 + n)}. {a}
                    </button>
                  ))}
                </div>

                {answered[activeRacer] && (
                  <p className="success">Жауабыңыз қабылданды!</p>
                )}

                <p>
                  Бірінші шабандоз: {answered[0] ? "Дайын ✓" : "Күтуде"}
                  {" | "}
                  Екінші шабандоз: {answered[1] ? "Дайын ✓" : "Күтуде"}
                </p>

                <button
                  className="primary"
                  disabled={!answered[0] || !answered[1]}
                  onClick={nextQuestion}
                >
                  Келесі сұрақ →
                </button>
              </div>
            </>
          )}
        </main>
      )}

      {/* ABAI WORLD — stories created by the teacher */}
      {page === "quest" && (
        <main className="game">
          <button className="back" onClick={() => setPage("home")}>
            ← Басты бет
          </button>

          <h1>📚 Абай әлеміне саяхат</h1>

          <div className="story-banner">
            🌄
            <h2>Мұғалім дайындаған оқиғалар</h2>
            <p>Шешім қабылда және оның салдарын көр</p>
          </div>

          {!activeStory ? (
            <div className="story-card">
              <h2>Саяхатты таңда</h2>
              {stories.length === 0 ? (
                <>
                  <p className="story-text">
                    Әзірге мұғалім ешқандай тарих қоспады. Мұғалім кабинетіне
                    өтіп, жаңа оқиға құрастыруға болады.
                  </p>
                  <button
                    className="primary"
                    onClick={() => setPage("teacher")}
                  >
                    Мұғалім бөліміне өту
                  </button>
                </>
              ) : (
                <div className="story-choices">
                  {stories.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => startStory(item.id)}
                    >
                      📖 {item.title}
                      <small className="story-choice-meta">
                        {item.choices.length} шешім нұсқасы
                      </small>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="story-card">
              <div className="story-progress">ИНТЕРАКТИВТІ ОҚИҒА</div>
              <h2>{activeStory.title}</h2>
              <p className="story-text">{activeStory.text}</p>

              {selectedChoice === null ? (
                <>
                  <h3>Сен қандай шешім қабылдайсың?</h3>
                  <div className="story-choices">
                    {activeStory.choices.map((choice, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedChoice(index)}
                      >
                        {choice.text}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="consequence">
                  <div className="story-progress">СЕНІҢ ТАҢДАУЫҢНЫҢ САЛДАРЫ</div>
                  <h3>Бұл шешімнің нәтижесі</h3>
                  <p>{activeStory.choices[selectedChoice].consequence}</p>
                  <div className="form-actions">
                    <button
                      className="secondary"
                      onClick={() => setSelectedChoice(null)}
                    >
                      Басқа шешімді көру
                    </button>
                    <button
                      className="primary"
                      onClick={() => {
                        setSelectedChoice(null);
                        setActiveStoryId(null);
                      }}
                    >
                      Аяқтау
                    </button>
                  </div>
                </div>
              )}

              <button
                className="teacher-link"
                onClick={() => {
                  setActiveStoryId(null);
                  setSelectedChoice(null);
                }}
              >
                ← Басқа оқиғаны таңдау
              </button>
            </div>
          )}
        </main>
      )}

      <footer>
        QazaqPlay · Қазақ тілі мен әдебиетін ойын арқылы үйрену
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
