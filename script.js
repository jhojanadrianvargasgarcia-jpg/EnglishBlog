
let currentLang = 'es';

function toggleLang() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  const label = currentLang === 'es' ? '🌐 EN' : '🌐 ES';
  document.getElementById('langBtn').textContent = label;
  const homeBtn = document.getElementById('langBtnHome');
  if (homeBtn) homeBtn.textContent = label;
  applyLang();
}


function applyLang() {
  // Elements with data-es / data-en attributes
  document.querySelectorAll('[data-es]').forEach(el => {
    const text = el.getAttribute('data-' + currentLang);
    if (text) el.innerHTML = text;
  });
  // Refresh topics grid if rendered
  const grid = document.getElementById('topics-grid');
  if (grid && grid.dataset.rendered) {
    grid.dataset.rendered = '';
    grid.innerHTML = '';
    renderTopicsGrid();
  }
  // Refresh history quiz if rendered
  const hq = document.getElementById('history-quiz-container');
  if (hq && hq.dataset.rendered) {
    hq.dataset.rendered = '';
    hq.innerHTML = '';
    renderHistoryQuiz();
  }
  // Refresh topic detail if open
  const detailContent = document.getElementById('topic-detail-content');
  if (detailContent && detailContent.dataset.openTopic) {
    openTopic(parseInt(detailContent.dataset.openTopic), true);
  }
  // Update q-counter in main quiz
  const counter = document.getElementById('q-counter');
  if (counter && counter.dataset.cur) {
    counter.textContent = ui[currentLang].qCounter(counter.dataset.cur, counter.dataset.tot);
  }
}


const ui = {
  es: {
    topic: 'TEMA',
    examples: '💡 Ejemplos',
    miniQuiz: '🎯 Mini Quiz',
    question: 'Pregunta',
    of: 'de',
    tryAgain: '🔄 Intentar de nuevo',
    next: 'Siguiente →',
    correct: 'correctas',
    historyQuestion: 'PREGUNTA',
    levelNames: { basic: 'Básico', inter: 'Intermedio', adv: 'Avanzado' },
    resultsTitle: { 90: '¡Excelente!', 70: '¡Buen trabajo!', 50: '¡Buen intento!', 0: '¡Sigue practicando!' },
    resultsMsg: {
      90: '¡Dominaste los temas! Tu gramática y vocabulario son excelentes. ¡Sigue así!',
      70: '¡Buen trabajo! Tienes una base sólida. Repasa los temas donde cometiste errores.',
      50: 'Vas por el camino correcto. Dedica más tiempo a los temas de gramática y repasa los ejemplos.',
      0: '¡No te rindas! Repasa los 12 temas, practica los ejemplos e inténtalo de nuevo. ¡Tú puedes!',
    },
    qCounter: (cur, tot) => `Pregunta ${cur} / ${tot}`,
  },
  en: {
    topic: 'TOPIC',
    examples: '💡 Examples',
    miniQuiz: '🎯 Mini Quiz',
    question: 'Question',
    of: 'of',
    tryAgain: '🔄 Try again',
    next: 'Next →',
    correct: 'correct',
    historyQuestion: 'QUESTION',
    levelNames: { basic: 'Basic', inter: 'Intermediate', adv: 'Advanced' },
    resultsTitle: { 90: 'Excellent!', 70: 'Great job!', 50: 'Good try!', 0: 'Keep practicing!' },
    resultsMsg: {
      90: 'You have mastered the topics! Your grammar and vocabulary are excellent. Keep it up!',
      70: 'Good work! You have a solid foundation. Review the topics where you made mistakes.',
      50: 'You are on the right track. Spend more time on grammar topics and review the examples.',
      0: "Don't give up! Review all 12 topics, practice the examples and try again. You can do it!",
    },
    qCounter: (cur, tot) => `Question ${cur} / ${tot}`,
  }
};


function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active-nav'));
  const map = { history: 0, topics: 1, 'quiz-home': 2, references: 3 };
  const navBtns = document.querySelectorAll('.nav-btn');
  if (map[pageId] !== undefined) navBtns[map[pageId]]?.classList.add('active-nav');

  if (pageId === 'topics') renderTopicsGrid();
  if (pageId === 'history') renderHistoryQuiz();
}

function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}


const topics = [
  {
    id: 1, icon: '📄', name: 'Articles (a, an, the)', name_es: 'Artículos (a, an, the)', level: 'basic',
    content: `
      <p><strong>Articles</strong> are words that go before a noun and help us show if we are talking about something general or specific. In English, there are <strong>3 articles: a, an, the.</strong></p>
      <h3>What are they used for?</h3>
      <ul>
        <li>Introduce nouns</li>
        <li>Show if something is general (a/an) or specific (the)</li>
        <li>Give more clarity to what we say</li>
      </ul>
      <h3>Structure</h3>
      <p><strong>Article + noun</strong> → a car · an apple · the house</p>
      <h3>1. "A" — Indefinite</h3>
      <p>Used before words that start with a <strong>consonant sound</strong>.</p>
      <ul><li>a dog</li><li>a teacher</li><li>a book</li></ul>
      <h3>2. "An" — Indefinite</h3>
      <p>Used before words that start with a <strong>vowel sound</strong>.</p>
      <ul><li>an apple</li><li>an elephant</li><li>an hour</li></ul>
      <h3>3. "The" — Definite</h3>
      <p>Used when we talk about something <strong>specific or known</strong>.</p>
      <ul><li>the dog</li><li>the teacher</li><li>the sun</li></ul>`,
    content_es: `
      <p>Los <strong>artículos</strong> son palabras que van antes de un sustantivo e indican si hablamos de algo general o específico. En inglés hay <strong>3 artículos: a, an, the.</strong></p>
      <h3>¿Para qué se usan?</h3>
      <ul>
        <li>Introducir sustantivos</li>
        <li>Mostrar si algo es general (a/an) o específico (the)</li>
        <li>Dar más claridad a lo que decimos</li>
      </ul>
      <h3>Estructura</h3>
      <p><strong>Artículo + sustantivo</strong> → a car · an apple · the house</p>
      <h3>1. "A" — Indefinido</h3>
      <p>Se usa antes de palabras que empiezan con un <strong>sonido consonante</strong>.</p>
      <ul><li>a dog (un perro)</li><li>a teacher (un maestro)</li><li>a book (un libro)</li></ul>
      <h3>2. "An" — Indefinido</h3>
      <p>Se usa antes de palabras que empiezan con un <strong>sonido vocal</strong>.</p>
      <ul><li>an apple (una manzana)</li><li>an elephant (un elefante)</li><li>an hour (una hora)</li></ul>
      <h3>3. "The" — Definido</h3>
      <p>Se usa cuando hablamos de algo <strong>específico o conocido</strong>.</p>
      <ul><li>the dog (el perro)</li><li>the teacher (el maestro)</li><li>the sun (el sol)</li></ul>`,
    examples: [
      { en: 'I have a car.', es: 'Tengo un carro.' },
      { en: 'She eats an apple.', es: 'Ella come una manzana.' },
      { en: 'The car is red.', es: 'El carro es rojo.' },
    ],
    quiz: [
      { q: 'How many articles are there in English?', q_es: '¿Cuántos artículos hay en inglés?', opts: ['a) 2','b) 3','c) 4','d) 5'], ans: 1 },
      { q: 'Which article is used before a vowel sound?', q_es: '¿Qué artículo se usa antes de un sonido vocal?', opts: ['a) a','b) the','c) an','d) none'], opts_es: ['a) a','b) the','c) an','d) ninguno'], ans: 2 },
      { q: 'Which article is used for something specific?', q_es: '¿Qué artículo se usa para algo específico?', opts: ['a) a','b) an','c) the','d) none'], opts_es: ['a) a','b) an','c) the','d) ninguno'], ans: 2 },
    ]
  },
  {
    id: 2, icon: '👤', name: 'Subject Pronouns', name_es: 'Pronombres Sujeto', level: 'basic',
    content: `
      <p><strong>Subject pronouns</strong> are words that replace the subject of a sentence (the person or thing doing the action).</p>
      <h3>What are they used for?</h3>
      <ul>
        <li>Avoid repeating names or nouns</li>
        <li>Make sentences shorter and clearer</li>
        <li>Identify who is doing the action</li>
      </ul>
      <h3>Structure</h3>
      <p><strong>Subject pronoun + verb + complement</strong></p>
      <ul><li>She is my friend</li><li>They play soccer</li></ul>
      <h3>Subject Pronouns Table</h3>
      <table class="td-table">
        <tr><th>Pronoun</th><th>Meaning</th></tr>
        <tr><td>I</td><td>Yo</td></tr>
        <tr><td>You</td><td>Tú / Usted</td></tr>
        <tr><td>He</td><td>Él</td></tr>
        <tr><td>She</td><td>Ella</td></tr>
        <tr><td>It</td><td>Eso (animal o cosa)</td></tr>
        <tr><td>We</td><td>Nosotros</td></tr>
        <tr><td>They</td><td>Ellos</td></tr>
      </table>`,
    content_es: `
      <p>Los <strong>pronombres sujeto</strong> son palabras que reemplazan al sujeto de una oración (la persona o cosa que realiza la acción).</p>
      <h3>¿Para qué se usan?</h3>
      <ul>
        <li>Evitar repetir nombres o sustantivos</li>
        <li>Hacer las oraciones más cortas y claras</li>
        <li>Identificar quién realiza la acción</li>
      </ul>
      <h3>Estructura</h3>
      <p><strong>Pronombre sujeto + verbo + complemento</strong></p>
      <ul><li>She is my friend (Ella es mi amiga)</li><li>They play soccer (Ellos juegan fútbol)</li></ul>
      <h3>Tabla de Pronombres Sujeto</h3>
      <table class="td-table">
        <tr><th>Pronombre</th><th>Significado</th></tr>
        <tr><td>I</td><td>Yo</td></tr>
        <tr><td>You</td><td>Tú / Usted</td></tr>
        <tr><td>He</td><td>Él</td></tr>
        <tr><td>She</td><td>Ella</td></tr>
        <tr><td>It</td><td>Eso (animal o cosa)</td></tr>
        <tr><td>We</td><td>Nosotros</td></tr>
        <tr><td>They</td><td>Ellos</td></tr>
      </table>`,
    examples: [
      { en: 'I am a student.', es: 'Yo soy un estudiante.' },
      { en: 'She is happy.', es: 'Ella está feliz.' },
      { en: 'They are teachers.', es: 'Ellos son profesores.' },
    ],
    quiz: [
      { q: 'Which pronoun is used for "yo"?', q_es: '¿Qué pronombre se usa para "yo"?', opts: ['a) You','b) I','c) He','d) We'], ans: 1 },
      { q: 'Which pronoun is used for a female person?', q_es: '¿Qué pronombre se usa para una persona femenina?', opts: ['a) He','b) It','c) She','d) They'], ans: 2 },
      { q: 'Which pronoun is used for animals or things?', q_es: '¿Qué pronombre se usa para animales o cosas?', opts: ['a) He','b) It','c) We','d) I'], ans: 1 },
    ]
  },
  {
    id: 3, icon: '🔵', name: 'Verb To Be', name_es: 'Verbo To Be', level: 'basic',
    content: `
      <p>The <strong>verb "to be"</strong> is one of the most important verbs in English. It is used to talk about identity, characteristics, age, location, and feelings.</p>
      <h3>Structure</h3>
      <p><strong>Affirmative:</strong> Subject + verb to be + complement → She is happy</p>
      <p><strong>Negative:</strong> Subject + verb to be + not + complement → She is not happy</p>
      <p><strong>Interrogative:</strong> Verb to be + subject + complement? → Is she happy?</p>
      <h3>Forms of the verb "to be"</h3>
      <table class="td-table">
        <tr><th>Subject</th><th>Verb</th><th>Negative</th></tr>
        <tr><td>I</td><td>am</td><td>am not</td></tr>
        <tr><td>You</td><td>are</td><td>are not</td></tr>
        <tr><td>He / She / It</td><td>is</td><td>is not</td></tr>
        <tr><td>We / They</td><td>are</td><td>are not</td></tr>
      </table>`,
    content_es: `
      <p>El <strong>verbo "to be"</strong> es uno de los verbos más importantes del inglés. Se usa para hablar de identidad, características, edad, ubicación y sentimientos.</p>
      <h3>Estructura</h3>
      <p><strong>Afirmativo:</strong> Sujeto + verbo to be + complemento → She is happy (Ella está feliz)</p>
      <p><strong>Negativo:</strong> Sujeto + verbo to be + not + complemento → She is not happy</p>
      <p><strong>Interrogativo:</strong> Verbo to be + sujeto + complemento? → Is she happy?</p>
      <h3>Formas del verbo "to be"</h3>
      <table class="td-table">
        <tr><th>Sujeto</th><th>Verbo</th><th>Negativo</th></tr>
        <tr><td>I</td><td>am</td><td>am not</td></tr>
        <tr><td>You</td><td>are</td><td>are not</td></tr>
        <tr><td>He / She / It</td><td>is</td><td>is not</td></tr>
        <tr><td>We / They</td><td>are</td><td>are not</td></tr>
      </table>`,
    examples: [
      { en: 'I am a student.', es: 'Yo soy un estudiante.' },
      { en: 'He is not a teacher.', es: 'Él no es un profesor.' },
      { en: 'Are they in class?', es: '¿Están ellos en clase?' },
    ],
    quiz: [
      { q: 'Choose the correct sentence:', q_es: 'Elige la oración correcta:', opts: ['a) She are happy','b) She is happy','c) She am happy','d) She be happy'], ans: 1 },
      { q: 'Complete: They ___ students.', q_es: 'Completa: They ___ students.', opts: ['a) is','b) am','c) are','d) be'], ans: 2 },
      { q: 'Choose the correct negative sentence:', q_es: 'Elige la oración negativa correcta:', opts: ['a) He not is a teacher','b) He is not a teacher','c) He are not a teacher','d) He am not a teacher'], ans: 1 },
    ]
  },
  {
    id: 4, icon: '✂️', name: 'Contractions', name_es: 'Contracciones', level: 'basic',
    content: `
      <p><strong>Contractions</strong> are short forms of words made by combining two words and using an apostrophe (').</p>
      <h3>What are they used for?</h3>
      <ul>
        <li>Speak and write more naturally</li>
        <li>Make sentences shorter</li>
        <li>Sound more like a native speaker</li>
      </ul>
      <h3>Affirmative contractions (verb "to be")</h3>
      <table class="td-table">
        <tr><th>Full form</th><th>Contraction</th></tr>
        <tr><td>I am</td><td>I'm</td></tr>
        <tr><td>You are</td><td>You're</td></tr>
        <tr><td>He is</td><td>He's</td></tr>
        <tr><td>She is</td><td>She's</td></tr>
        <tr><td>It is</td><td>It's</td></tr>
        <tr><td>We are</td><td>We're</td></tr>
        <tr><td>They are</td><td>They're</td></tr>
      </table>
      <h3>Negative contractions</h3>
      <ul><li>is not → isn't</li><li>are not → aren't</li></ul>
      <h3>Important</h3>
      <p>Contractions are common in <strong>informal English</strong>. In formal writing, use full forms (I am, she is, etc.).</p>`,
    content_es: `
      <p>Las <strong>contracciones</strong> son formas cortas de palabras que se crean uniendo dos palabras con un apóstrofo (').</p>
      <h3>¿Para qué se usan?</h3>
      <ul>
        <li>Hablar y escribir de manera más natural</li>
        <li>Hacer las oraciones más cortas</li>
        <li>Sonar más como un hablante nativo</li>
      </ul>
      <h3>Contracciones afirmativas (verbo "to be")</h3>
      <table class="td-table">
        <tr><th>Forma completa</th><th>Contracción</th></tr>
        <tr><td>I am</td><td>I'm</td></tr>
        <tr><td>You are</td><td>You're</td></tr>
        <tr><td>He is</td><td>He's</td></tr>
        <tr><td>She is</td><td>She's</td></tr>
        <tr><td>It is</td><td>It's</td></tr>
        <tr><td>We are</td><td>We're</td></tr>
        <tr><td>They are</td><td>They're</td></tr>
      </table>
      <h3>Contracciones negativas</h3>
      <ul><li>is not → isn't</li><li>are not → aren't</li></ul>
      <h3>Importante</h3>
      <p>Las contracciones son comunes en el inglés <strong>informal</strong>. En escritura formal, usa las formas completas (I am, she is, etc.).</p>`,
    examples: [
      { en: "I'm a student.", es: 'Yo soy un estudiante.' },
      { en: "She's my friend.", es: 'Ella es mi amiga.' },
      { en: "He isn't a teacher.", es: 'Él no es un profesor.' },
    ],
    quiz: [
      { q: 'What is the contraction of "I am"?', q_es: '¿Cuál es la contracción de "I am"?', opts: ['a) Im','b) I\'m','c) Iam','d) I is'], ans: 1 },
      { q: 'What is the contraction of "she is"?', q_es: '¿Cuál es la contracción de "she is"?', opts: ['a) Shes','b) She\'s','c) She is\'','d) She am'], ans: 1 },
      { q: 'Choose the correct sentence:', q_es: 'Elige la oración correcta:', opts: ["a) He's my brother","b) He is' my brother","c) Hes my brother","d) He am my brother"], ans: 0 },
    ]
  },
  {
    id: 5, icon: '🎨', name: 'Adjectives', name_es: 'Adjetivos', level: 'basic',
    content: `
      <p><strong>Adjectives</strong> are words used to describe or give more information about a noun (person, place, or thing).</p>
      <h3>What are they used for?</h3>
      <ul>
        <li>Describe people → She is tall</li>
        <li>Describe things → It is a big house</li>
        <li>Express opinions → This is a beautiful place</li>
        <li>Give details like color, size, or age</li>
      </ul>
      <h3>Structure</h3>
      <p><strong>With verb "to be":</strong> Subject + verb to be + adjective → She is happy</p>
      <p><strong>Before a noun:</strong> Adjective + noun → a big house · a red car</p>
      <h3>Types of adjectives</h3>
      <ul>
        <li><strong>Descriptive:</strong> happy, tall, beautiful</li>
        <li><strong>Size:</strong> big, small</li>
        <li><strong>Color:</strong> red, blue</li>
        <li><strong>Age:</strong> young, old</li>
      </ul>
      <h3>Important</h3>
      <p>Adjectives do <strong>not change</strong> — no plural form. They usually go <strong>before the noun</strong> or after the verb "to be".</p>`,
    content_es: `
      <p>Los <strong>adjetivos</strong> son palabras que describen o dan más información sobre un sustantivo (persona, lugar o cosa).</p>
      <h3>¿Para qué se usan?</h3>
      <ul>
        <li>Describir personas → She is tall (Ella es alta)</li>
        <li>Describir cosas → It is a big house (Es una casa grande)</li>
        <li>Expresar opiniones → This is a beautiful place (Este es un lugar hermoso)</li>
        <li>Dar detalles de color, tamaño o edad</li>
      </ul>
      <h3>Estructura</h3>
      <p><strong>Con el verbo "to be":</strong> Sujeto + verbo to be + adjetivo → She is happy</p>
      <p><strong>Antes del sustantivo:</strong> Adjetivo + sustantivo → a big house · a red car</p>
      <h3>Tipos de adjetivos</h3>
      <ul>
        <li><strong>Descriptivos:</strong> happy (feliz), tall (alto), beautiful (hermoso)</li>
        <li><strong>Tamaño:</strong> big (grande), small (pequeño)</li>
        <li><strong>Color:</strong> red (rojo), blue (azul)</li>
        <li><strong>Edad:</strong> young (joven), old (viejo)</li>
      </ul>
      <h3>Importante</h3>
      <p>Los adjetivos <strong>no cambian</strong> — no tienen forma plural. Generalmente van <strong>antes del sustantivo</strong> o después del verbo "to be".</p>`,
    examples: [
      { en: 'She is happy.', es: 'Ella está feliz.' },
      { en: 'It is a big dog.', es: 'Es un perro grande.' },
      { en: 'I have a red car.', es: 'Tengo un carro rojo.' },
    ],
    quiz: [
      { q: 'What is an adjective?', q_es: '¿Qué es un adjetivo?', opts: ['a) A word that shows action','b) A word that describes a noun','c) A word that replaces a noun','d) A word that shows time'], opts_es: ['a) Una palabra que muestra acción','b) Una palabra que describe un sustantivo','c) Una palabra que reemplaza un sustantivo','d) Una palabra que muestra tiempo'], ans: 1 },
      { q: 'Choose the correct sentence:', q_es: 'Elige la oración correcta:', opts: ['a) She is tall','b) She tall is','c) She is talls','d) She are tall'], ans: 0 },
      { q: 'Choose the correct option:', q_es: 'Elige la opción correcta:', opts: ['a) a car red','b) a red car','c) a car is red','d) red a car'], ans: 1 },
    ]
  },
  {
    id: 6, icon: '🔢', name: 'Countable & Uncountable Nouns', name_es: 'Sustantivos Contables e Incontables', level: 'basic',
    content: `
      <p><strong>Countable nouns</strong> are things we can count. <strong>Uncountable nouns</strong> are things we cannot count individually.</p>
      <h3>Countable nouns</h3>
      <ul><li>one apple, two apples</li><li>one book, three books</li></ul>
      <p>Structure: <strong>a / an + noun</strong> (singular) · <strong>noun + "s"</strong> (plural)</p>
      <h3>Uncountable nouns</h3>
      <ul><li>water · milk · sugar · information</li></ul>
      <p>No plural form. Use words like: <strong>some / much</strong></p>
      <h3>Key differences</h3>
      <table class="td-table">
        <tr><th>Countable</th><th>Uncountable</th></tr>
        <tr><td>Can be counted</td><td>Cannot be counted</td></tr>
        <tr><td>Have plural</td><td>No plural</td></tr>
        <tr><td>Use a / an</td><td>Do not use a / an</td></tr>
      </table>
      <h3>Important</h3>
      <ul><li>Use <strong>many</strong> with countable nouns → many books</li><li>Use <strong>much</strong> with uncountable nouns → much water</li></ul>`,
    content_es: `
      <p>Los <strong>sustantivos contables</strong> son cosas que podemos contar. Los <strong>incontables</strong> son cosas que no podemos contar individualmente.</p>
      <h3>Sustantivos contables</h3>
      <ul><li>one apple (una manzana), two apples (dos manzanas)</li><li>one book (un libro), three books (tres libros)</li></ul>
      <p>Estructura: <strong>a / an + sustantivo</strong> (singular) · <strong>sustantivo + "s"</strong> (plural)</p>
      <h3>Sustantivos incontables</h3>
      <ul><li>water (agua) · milk (leche) · sugar (azúcar) · information (información)</li></ul>
      <p>No tienen plural. Usa palabras como: <strong>some / much</strong></p>
      <h3>Diferencias clave</h3>
      <table class="td-table">
        <tr><th>Contable</th><th>Incontable</th></tr>
        <tr><td>Se puede contar</td><td>No se puede contar</td></tr>
        <tr><td>Tiene plural</td><td>No tiene plural</td></tr>
        <tr><td>Usa a / an</td><td>No usa a / an</td></tr>
      </table>
      <h3>Importante</h3>
      <ul><li>Usa <strong>many</strong> con contables → many books (muchos libros)</li><li>Usa <strong>much</strong> con incontables → much water (mucha agua)</li></ul>`,
    examples: [
      { en: 'I have a book.', es: 'Tengo un libro.' },
      { en: 'I drink water.', es: 'Yo bebo agua.' },
      { en: 'He has many friends.', es: 'Él tiene muchos amigos.' },
    ],
    quiz: [
      { q: 'Which is a countable noun?', q_es: '¿Cuál es un sustantivo contable?', opts: ['a) water','b) milk','c) apple','d) sugar'], ans: 2 },
      { q: 'Which is an uncountable noun?', q_es: '¿Cuál es un sustantivo incontable?', opts: ['a) book','b) car','c) rice','d) dog'], ans: 2 },
      { q: 'Choose the correct sentence:', q_es: 'Elige la oración correcta:', opts: ['a) a water','b) many milk','c) much water','d) a sugar'], ans: 2 },
    ]
  },
  {
    id: 7, icon: '🔡', name: 'Quantifiers', name_es: 'Cuantificadores', level: 'inter',
    content: `
      <p><strong>Quantifiers</strong> are words used to express the quantity or amount of something without giving an exact number. They are used with countable and uncountable nouns.</p>
      <h3>Structure</h3>
      <p><strong>Quantifier + noun</strong> → many books · much water · some apples</p>
      <h3>Common quantifiers</h3>
      <ul>
        <li><strong>Many</strong> — countable nouns: many books · many students</li>
        <li><strong>Much</strong> — uncountable nouns: much water · much sugar</li>
        <li><strong>Some</strong> — affirmative sentences (both): some apples · some milk</li>
        <li><strong>Any</strong> — questions and negatives: Do you have any money? / I do not have any friends</li>
        <li><strong>A lot of</strong> — both: a lot of books · a lot of water</li>
      </ul>
      <h3>Important</h3>
      <ul>
        <li>many → countable</li>
        <li>much → uncountable</li>
        <li>some → affirmative</li>
        <li>any → negative and questions</li>
      </ul>`,
    content_es: `
      <p>Los <strong>cuantificadores</strong> son palabras que expresan la cantidad de algo sin dar un número exacto. Se usan con sustantivos contables e incontables.</p>
      <h3>Estructura</h3>
      <p><strong>Cuantificador + sustantivo</strong> → many books · much water · some apples</p>
      <h3>Cuantificadores comunes</h3>
      <ul>
        <li><strong>Many</strong> (muchos/as) — sustantivos contables: many books · many students</li>
        <li><strong>Much</strong> (mucho/a) — sustantivos incontables: much water · much sugar</li>
        <li><strong>Some</strong> (algunos/as) — oraciones afirmativas (ambos): some apples · some milk</li>
        <li><strong>Any</strong> (algún/ningún) — preguntas y negativas: Do you have any money? / I do not have any friends</li>
        <li><strong>A lot of</strong> (mucho/a) — ambos: a lot of books · a lot of water</li>
      </ul>
      <h3>Importante</h3>
      <ul>
        <li>many → contables</li>
        <li>much → incontables</li>
        <li>some → afirmativo</li>
        <li>any → negativo y preguntas</li>
      </ul>`,
    examples: [
      { en: 'I have many friends.', es: 'Tengo muchos amigos.' },
      { en: 'Do you have any questions?', es: '¿Tienes alguna pregunta?' },
      { en: 'They have a lot of homework.', es: 'Ellos tienen mucha tarea.' },
    ],
    quiz: [
      { q: 'Which quantifier is used with countable nouns?', q_es: '¿Qué cuantificador se usa con sustantivos contables?', opts: ['a) much','b) many','c) some','d) any'], ans: 1 },
      { q: 'Which quantifier is used in questions?', q_es: '¿Qué cuantificador se usa en preguntas?', opts: ['a) some','b) many','c) any','d) much'], ans: 2 },
      { q: 'Choose the correct sentence:', q_es: 'Elige la oración correcta:', opts: ['a) much apples','b) many water','c) many books','d) a water'], ans: 2 },
    ]
  },
  {
    id: 8, icon: '🔢', name: 'Cardinal & Ordinal Numbers', name_es: 'Números Cardinales y Ordinales', level: 'basic',
    content: `
      <p><strong>Cardinal numbers</strong> show quantity (how many). <strong>Ordinal numbers</strong> show the position or order of something in a sequence.</p>
      <h3>Cardinal numbers — how many</h3>
      <ul><li>one · two · three · ten · twenty</li><li>I have <strong>two</strong> books · She is <strong>fifteen</strong> years old</li></ul>
      <h3>Ordinal numbers — position or order</h3>
      <table class="td-table">
        <tr><th>Ordinal</th><th>Abbreviation</th></tr>
        <tr><td>first</td><td>1st</td></tr>
        <tr><td>second</td><td>2nd</td></tr>
        <tr><td>third</td><td>3rd</td></tr>
        <tr><td>fourth</td><td>4th</td></tr>
        <tr><td>tenth</td><td>10th</td></tr>
      </table>
      <h3>Important</h3>
      <ul>
        <li>Ordinal numbers usually end in: <strong>-st, -nd, -rd, -th</strong></li>
        <li>Use <strong>"the"</strong> before ordinal numbers → the first · the second</li>
      </ul>`,
    content_es: `
      <p>Los <strong>números cardinales</strong> muestran cantidad (cuántos). Los <strong>ordinales</strong> muestran la posición u orden de algo en una secuencia.</p>
      <h3>Números cardinales — cuántos</h3>
      <ul><li>one (uno) · two (dos) · three (tres) · ten (diez) · twenty (veinte)</li><li>I have <strong>two</strong> books (Tengo dos libros) · She is <strong>fifteen</strong> years old (Ella tiene 15 años)</li></ul>
      <h3>Números ordinales — posición u orden</h3>
      <table class="td-table">
        <tr><th>Ordinal</th><th>Abreviatura</th></tr>
        <tr><td>first (primero)</td><td>1st</td></tr>
        <tr><td>second (segundo)</td><td>2nd</td></tr>
        <tr><td>third (tercero)</td><td>3rd</td></tr>
        <tr><td>fourth (cuarto)</td><td>4th</td></tr>
        <tr><td>tenth (décimo)</td><td>10th</td></tr>
      </table>
      <h3>Importante</h3>
      <ul>
        <li>Los números ordinales generalmente terminan en: <strong>-st, -nd, -rd, -th</strong></li>
        <li>Usa <strong>"the"</strong> antes de los ordinales → the first · the second</li>
      </ul>`,
    examples: [
      { en: 'I have three apples.', es: 'Tengo tres manzanas.' },
      { en: 'She is the first student.', es: 'Ella es la primera estudiante.' },
      { en: 'We live on the second floor.', es: 'Vivimos en el segundo piso.' },
    ],
    quiz: [
      { q: 'Which is a cardinal number?', q_es: '¿Cuál es un número cardinal?', opts: ['a) first','b) second','c) three','d) third'], ans: 2 },
      { q: 'Which is an ordinal number?', q_es: '¿Cuál es un número ordinal?', opts: ['a) five','b) ten','c) second','d) four'], ans: 2 },
      { q: 'Choose the correct sentence:', q_es: 'Elige la oración correcta:', opts: ['a) I have first books','b) I have three books','c) I have third books','d) I have the three books'], ans: 1 },
    ]
  },
  {
    id: 9, icon: '⏰', name: 'Telling Time', name_es: 'Decir la Hora', level: 'inter',
    content: `
      <p><strong>Telling time</strong> is the way we say and understand the time in English. It helps us talk about hours, minutes, and daily activities.</p>
      <h3>Asking and saying the time</h3>
      <ul><li><strong>What time is it?</strong></li><li><strong>It is + time</strong> → It is 3:00</li></ul>
      <h3>Basic expressions</h3>
      <ul>
        <li><strong>O'clock</strong> — en punto: It is three o'clock · It is seven o'clock</li>
        <li><strong>Past</strong> — después de la hora (1–30 min): 3:15 → It is fifteen past three</li>
        <li><strong>To</strong> — antes de la siguiente hora (31–59 min): 3:45 → It is fifteen to four</li>
        <li><strong>A quarter</strong> — 15 min: 3:15 → a quarter past three</li>
        <li><strong>Half past</strong> — 30 min: 3:30 → half past three</li>
      </ul>
      <h3>Important</h3>
      <ul>
        <li>Always use <strong>"It is"</strong> to say the time</li>
        <li>Use <strong>past</strong> for minutes after the hour</li>
        <li>Use <strong>to</strong> for minutes before the next hour</li>
      </ul>`,
    content_es: `
      <p><strong>Decir la hora</strong> es la forma en que expresamos y entendemos el tiempo en inglés. Nos ayuda a hablar de horas, minutos y actividades diarias.</p>
      <h3>Preguntar y decir la hora</h3>
      <ul><li><strong>What time is it?</strong> (¿Qué hora es?)</li><li><strong>It is + hora</strong> → It is 3:00 (Son las 3:00)</li></ul>
      <h3>Expresiones básicas</h3>
      <ul>
        <li><strong>O'clock</strong> — en punto: It is three o'clock (Son las tres en punto)</li>
        <li><strong>Past</strong> — y (1–30 min): 3:15 → It is fifteen past three (Son las tres y cuarto)</li>
        <li><strong>To</strong> — para (31–59 min): 3:45 → It is fifteen to four (Son las cuatro menos cuarto)</li>
        <li><strong>A quarter</strong> — cuarto (15 min): 3:15 → a quarter past three</li>
        <li><strong>Half past</strong> — y media (30 min): 3:30 → half past three</li>
      </ul>
      <h3>Importante</h3>
      <ul>
        <li>Siempre usa <strong>"It is"</strong> para decir la hora</li>
        <li>Usa <strong>past</strong> para minutos después de la hora</li>
        <li>Usa <strong>to</strong> para minutos antes de la siguiente hora</li>
      </ul>`,
    examples: [
      { en: 'It is three o\'clock.', es: 'Son las tres en punto.' },
      { en: 'It is a quarter past two.', es: 'Son las dos y cuarto.' },
      { en: 'It is half past seven.', es: 'Son las siete y media.' },
    ],
    quiz: [
      { q: 'How do you say 3:00?', q_es: '¿Cómo se dice 3:00?', opts: ["a) It is three","b) It is three o'clock","c) It is three time","d) It is o'clock three"], ans: 1 },
      { q: 'How do you say 4:15?', q_es: '¿Cómo se dice 4:15?', opts: ['a) It is fifteen to four','b) It is a quarter past four','c) It is four fifteen past','d) It is quarter four'], ans: 1 },
      { q: 'How do you say 6:30?', q_es: '¿Cómo se dice 6:30?', opts: ['a) It is thirty past six','b) It is half past six','c) It is six half','d) It is half to six'], ans: 1 },
    ]
  },
  {
    id: 10, icon: '📊', name: 'Comparatives & Superlatives', name_es: 'Comparativos y Superlativos', level: 'inter',
    content: `
      <p><strong>Comparatives</strong> show the difference between two things. <strong>Superlatives</strong> show the highest or lowest level in a group.</p>
      <h3>Structure</h3>
      <p><strong>Comparative:</strong> Subject + verb + adjective + -er + than → She is taller than me</p>
      <p><strong>Superlative:</strong> Subject + verb + the + adjective + -est → She is the tallest</p>
      <h3>Rules</h3>
      <ul>
        <li><strong>Short adjectives (1 syllable):</strong> tall → taller → the tallest · big → bigger → the biggest</li>
        <li><strong>Long adjectives (2+ syllables):</strong> use more / the most → beautiful → more beautiful → the most beautiful</li>
      </ul>
      <h3>Important</h3>
      <ul>
        <li>Use <strong>than</strong> in comparatives → She is taller than him</li>
        <li>Use <strong>the</strong> in superlatives → She is the tallest</li>
      </ul>`,
    content_es: `
      <p>Los <strong>comparativos</strong> muestran diferencias entre dos cosas. Los <strong>superlativos</strong> muestran el nivel más alto o más bajo en un grupo.</p>
      <h3>Estructura</h3>
      <p><strong>Comparativo:</strong> Sujeto + verbo + adjetivo + -er + than → She is taller than me (Ella es más alta que yo)</p>
      <p><strong>Superlativo:</strong> Sujeto + verbo + the + adjetivo + -est → She is the tallest (Ella es la más alta)</p>
      <h3>Reglas</h3>
      <ul>
        <li><strong>Adjetivos cortos (1 sílaba):</strong> tall → taller → the tallest · big → bigger → the biggest</li>
        <li><strong>Adjetivos largos (2+ sílabas):</strong> usa more / the most → beautiful → more beautiful → the most beautiful</li>
      </ul>
      <h3>Importante</h3>
      <ul>
        <li>Usa <strong>than</strong> en comparativos → She is taller than him</li>
        <li>Usa <strong>the</strong> en superlativos → She is the tallest</li>
      </ul>`,
    examples: [
      { en: 'He is taller than his brother.', es: 'Él es más alto que su hermano.' },
      { en: 'She is the tallest in the class.', es: 'Ella es la más alta de la clase.' },
      { en: 'Math is more difficult than English.', es: 'Matemáticas es más difícil que inglés.' },
    ],
    quiz: [
      { q: 'Which is a comparative form?', q_es: '¿Cuál es una forma comparativa?', opts: ['a) tallest','b) more tall','c) taller','d) the tall'], ans: 2 },
      { q: 'Which is a superlative form?', q_es: '¿Cuál es una forma superlativa?', opts: ['a) bigger','b) big','c) the biggest','d) more big'], ans: 2 },
      { q: 'Choose the correct sentence:', q_es: 'Elige la oración correcta:', opts: ['a) She is more tall than me','b) She is taller than me','c) She is tallest than me','d) She is the taller than me'], ans: 1 },
    ]
  },
  {
    id: 11, icon: '⏪', name: 'Simple Past', name_es: 'Pasado Simple', level: 'inter',
    content: `
      <p>The <strong>simple past</strong> is a verb tense used to talk about actions that happened and finished in the past.</p>
      <h3>Structure</h3>
      <p><strong>Affirmative:</strong> Subject + verb (past) + complement → I played soccer</p>
      <p><strong>Negative:</strong> Subject + did not + base verb → I did not play soccer</p>
      <p><strong>Interrogative:</strong> Did + subject + base verb? → Did you play soccer?</p>
      <h3>Regular verbs</h3>
      <p>Regular verbs end in <strong>-ed</strong> in the past.</p>
      <ul><li>play → played</li><li>watch → watched</li><li>clean → cleaned</li></ul>
      <h3>Irregular verbs</h3>
      <p>Irregular verbs <strong>change form</strong>.</p>
      <ul><li>go → went</li><li>eat → ate</li><li>see → saw</li></ul>
      <h3>Important</h3>
      <ul>
        <li>Use <strong>did</strong> for negatives and questions</li>
        <li>Use the <strong>base verb</strong> after "did" → Did you go? ✔ (not "Did you went?")</li>
      </ul>`,
    content_es: `
      <p>El <strong>pasado simple</strong> es un tiempo verbal que se usa para hablar de acciones que ocurrieron y terminaron en el pasado.</p>
      <h3>Estructura</h3>
      <p><strong>Afirmativo:</strong> Sujeto + verbo (pasado) + complemento → I played soccer (Jugué fútbol)</p>
      <p><strong>Negativo:</strong> Sujeto + did not + verbo base → I did not play soccer (No jugué fútbol)</p>
      <p><strong>Interrogativo:</strong> Did + sujeto + verbo base? → Did you play soccer? (¿Jugaste fútbol?)</p>
      <h3>Verbos regulares</h3>
      <p>Los verbos regulares terminan en <strong>-ed</strong> en pasado.</p>
      <ul><li>play → played (jugué)</li><li>watch → watched (vi)</li><li>clean → cleaned (limpié)</li></ul>
      <h3>Verbos irregulares</h3>
      <p>Los verbos irregulares <strong>cambian de forma</strong>.</p>
      <ul><li>go → went (fui)</li><li>eat → ate (comí)</li><li>see → saw (vi)</li></ul>
      <h3>Importante</h3>
      <ul>
        <li>Usa <strong>did</strong> para negativos y preguntas</li>
        <li>Usa el <strong>verbo base</strong> después de "did" → Did you go? ✔ (no "Did you went?")</li>
      </ul>`,
    examples: [
      { en: 'I watched a movie yesterday.', es: 'Vi una película ayer.' },
      { en: 'They went to the park.', es: 'Ellos fueron al parque.' },
      { en: 'Did you see that?', es: '¿Viste eso?' },
    ],
    quiz: [
      { q: 'Which sentence is in simple past?', q_es: '¿Cuál oración está en pasado simple?', opts: ['a) I play soccer','b) I played soccer','c) I am playing soccer','d) I will play soccer'], ans: 1 },
      { q: 'Choose the correct negative sentence:', q_es: 'Elige la oración negativa correcta:', opts: ['a) I did not played','b) I did not play','c) I not play','d) I do not played'], ans: 1 },
      { q: 'Choose the correct question:', q_es: 'Elige la pregunta correcta:', opts: ['a) Did you went?','b) Did you go?','c) Do you went?','d) You did go?'], ans: 1 },
    ]
  },
  {
    id: 12, icon: '🍳', name: 'Cooking Verbs', name_es: 'Verbos de Cocina', level: 'inter',
    content: `
      <p><strong>Cooking verbs</strong> are words used to describe actions in the kitchen. They explain what we do when we prepare and cook food.</p>
      <h3>Structure</h3>
      <p><strong>Subject + verb + complement</strong> → I cut the vegetables · She cooks rice</p>
      <h3>Preparation verbs</h3>
      <ul>
        <li>cut (cortar) · chop (picar) · slice (rebanar) · dice (cortar en cubos)</li>
        <li>peel (pelar) · grate (rallar) · mash (triturar) · mix (mezclar)</li>
        <li>stir (revolver) · whisk (batir) · beat (batir) · knead (amasar)</li>
      </ul>
      <h3>Cooking methods</h3>
      <ul>
        <li>boil (hervir) · fry (freír) · bake (hornear) · roast (asar)</li>
        <li>grill (asar a la parrilla) · steam (cocinar al vapor) · sauté (saltear)</li>
        <li>simmer (cocinar a fuego lento)</li>
      </ul>
      <h3>Process verbs</h3>
      <ul>
        <li>add (agregar) · pour (verter) · heat (calentar) · melt (derretir)</li>
        <li>cool (enfriar) · serve (servir) · season (sazonar) · drain (escurrir)</li>
      </ul>`,
    content_es: `
      <p>Los <strong>verbos de cocina</strong> son palabras que describen acciones en la cocina. Explican lo que hacemos cuando preparamos y cocinamos comida.</p>
      <h3>Estructura</h3>
      <p><strong>Sujeto + verbo + complemento</strong> → I cut the vegetables (Corto las verduras) · She cooks rice (Ella cocina arroz)</p>
      <h3>Verbos de preparación</h3>
      <ul>
        <li>cut (cortar) · chop (picar) · slice (rebanar) · dice (cortar en cubos)</li>
        <li>peel (pelar) · grate (rallar) · mash (triturar) · mix (mezclar)</li>
        <li>stir (revolver) · whisk (batir) · beat (batir) · knead (amasar)</li>
      </ul>
      <h3>Métodos de cocción</h3>
      <ul>
        <li>boil (hervir) · fry (freír) · bake (hornear) · roast (asar)</li>
        <li>grill (asar a la parrilla) · steam (cocinar al vapor) · sauté (saltear)</li>
        <li>simmer (cocinar a fuego lento)</li>
      </ul>
      <h3>Verbos de proceso</h3>
      <ul>
        <li>add (agregar) · pour (verter) · heat (calentar) · melt (derretir)</li>
        <li>cool (enfriar) · serve (servir) · season (sazonar) · drain (escurrir)</li>
      </ul>`,
    examples: [
      { en: 'I chop the onions.', es: 'Yo pico las cebollas.' },
      { en: 'She boils water.', es: 'Ella hierve agua.' },
      { en: 'We bake a cake.', es: 'Nosotros horneamos un pastel.' },
    ],
    quiz: [
      { q: 'Which is a cooking verb?', q_es: '¿Cuál es un verbo de cocina?', opts: ['a) run','b) sleep','c) chop','d) jump'], ans: 2 },
      { q: 'What does "boil" mean?', q_es: '¿Qué significa "boil"?', opts: ['a) freír','b) hervir','c) cortar','d) mezclar'], ans: 1 },
      { q: 'Choose the correct sentence:', q_es: 'Elige la oración correcta:', opts: ['a) I mix the ingredients','b) I ingredients mix','c) I mixing ingredients','d) I mix ingredients the'], ans: 0 },
    ]
  },
  {
    id: 13, icon: '👉', name: 'Demonstratives', name_es: 'Demostrativos', level: 'basic',
    content: `
      <p><strong>Demonstratives</strong> are words used to point to or identify specific nouns — people, places, or things — based on how near or far they are from the speaker.</p>
      <h3>What are they used for?</h3>
      <ul>
        <li>Point to something near or far</li>
        <li>Identify singular or plural nouns</li>
        <li>Avoid repeating a noun</li>
      </ul>
      <h3>The four demonstratives</h3>
      <table class="td-table">
        <tr><th></th><th>Singular</th><th>Plural</th></tr>
        <tr><td><strong>Near</strong></td><td>This</td><td>These</td></tr>
        <tr><td><strong>Far</strong></td><td>That</td><td>Those</td></tr>
      </table>
      <h3>Structure</h3>
      <p><strong>Demonstrative + noun:</strong> This book · These books · That car · Those cars</p>
      <p><strong>Demonstrative alone (as pronoun):</strong> This is my friend · Those are my shoes</p>
      <h3>Each demonstrative explained</h3>
      <ul>
        <li><strong>This</strong> — singular, near: <em>This is my pen.</em></li>
        <li><strong>These</strong> — plural, near: <em>These are my books.</em></li>
        <li><strong>That</strong> — singular, far: <em>That is a big tree.</em></li>
        <li><strong>Those</strong> — plural, far: <em>Those are beautiful flowers.</em></li>
      </ul>
      <h3>Important</h3>
      <ul>
        <li>Use <strong>this / these</strong> for things close to you</li>
        <li>Use <strong>that / those</strong> for things far from you</li>
        <li>This / That → singular · These / Those → plural</li>
      </ul>`,
    content_es: `
      <p>Los <strong>demostrativos</strong> son palabras que se usan para señalar o identificar sustantivos específicos — personas, lugares o cosas — según qué tan cerca o lejos están del hablante.</p>
      <h3>¿Para qué se usan?</h3>
      <ul>
        <li>Señalar algo cercano o lejano</li>
        <li>Identificar sustantivos en singular o plural</li>
        <li>Evitar repetir un sustantivo</li>
      </ul>
      <h3>Los cuatro demostrativos</h3>
      <table class="td-table">
        <tr><th></th><th>Singular</th><th>Plural</th></tr>
        <tr><td><strong>Cerca</strong></td><td>This (este/esta/esto)</td><td>These (estos/estas)</td></tr>
        <tr><td><strong>Lejos</strong></td><td>That (ese/esa/aquel)</td><td>Those (esos/esas/aquellos)</td></tr>
      </table>
      <h3>Estructura</h3>
      <p><strong>Demostrativo + sustantivo:</strong> This book (este libro) · These books (estos libros) · That car (ese carro) · Those cars (esos carros)</p>
      <p><strong>Demostrativo solo (como pronombre):</strong> This is my friend (Este es mi amigo) · Those are my shoes (Esos son mis zapatos)</p>
      <h3>Cada demostrativo explicado</h3>
      <ul>
        <li><strong>This</strong> — singular, cerca: <em>This is my pen.</em> (Este es mi bolígrafo)</li>
        <li><strong>These</strong> — plural, cerca: <em>These are my books.</em> (Estos son mis libros)</li>
        <li><strong>That</strong> — singular, lejos: <em>That is a big tree.</em> (Ese es un árbol grande)</li>
        <li><strong>Those</strong> — plural, lejos: <em>Those are beautiful flowers.</em> (Esas son flores hermosas)</li>
      </ul>
      <h3>Importante</h3>
      <ul>
        <li>Usa <strong>this / these</strong> para cosas cercanas a ti</li>
        <li>Usa <strong>that / those</strong> para cosas lejanas a ti</li>
        <li>This / That → singular · These / Those → plural</li>
      </ul>`,
    examples: [
      { en: 'This is my book.', es: 'Este es mi libro.' },
      { en: 'These are my friends.', es: 'Estos son mis amigos.' },
      { en: 'That car is very fast.', es: 'Ese carro es muy rápido.' },
      { en: 'Those flowers are beautiful.', es: 'Esas flores son hermosas.' },
    ],
    quiz: [
      { q: 'Which demonstrative is used for something near and singular?', q_es: '¿Qué demostrativo se usa para algo cercano y singular?', opts: ['a) That','b) Those','c) These','d) This'], ans: 3 },
      { q: 'Which demonstrative is used for something far and plural?', q_es: '¿Qué demostrativo se usa para algo lejano y plural?', opts: ['a) This','b) These','c) Those','d) That'], ans: 2 },
      { q: 'Choose the correct sentence:', q_es: 'Elige la oración correcta:', opts: ['a) These is my pen','b) This are my pens','c) These are my pens','d) Those is my pen'], ans: 2 },
    ]
  }
];


function renderTopicsGrid() {
  const grid = document.getElementById('topics-grid');
  if (!grid || grid.dataset.rendered) return;
  grid.dataset.rendered = 'true';

  const L = ui[currentLang];
  topics.forEach(t => {
    const card = document.createElement('div');
    card.className = 'topic-card';
    const topicName = currentLang === 'es' && t.name_es ? t.name_es : t.name;
    card.innerHTML = `
      <div class="t-num">${L.topic} ${String(t.id).padStart(2,'0')}</div>
      <div class="t-icon">${t.icon}</div>
      <div class="t-name">${topicName}</div>
      <span class="t-level level-${t.level}">${L.levelNames[t.level]}</span>
    `;
    card.addEventListener('click', () => openTopic(t.id));
    grid.appendChild(card);
  });
}


let topicQuizState = {};

function openTopic(topicId, noReset) {
  const t = topics.find(x => x.id === topicId);
  if (!t) return;

  if (!noReset) topicQuizState[topicId] = { current: 0, score: 0 };

  const L = ui[currentLang];
  const topicName = currentLang === 'es' && t.name_es ? t.name_es : t.name;
  const topicContent = currentLang === 'es' && t.content_es ? t.content_es : t.content;

  const examplesHTML = t.examples.map(ex => `
    <div class="example-block">
      <div class="example-en">${ex.en}</div>
      <div class="example-es">🇪🇸 ${ex.es}</div>
    </div>
  `).join('');

  const detailContent = document.getElementById('topic-detail-content');
  detailContent.dataset.openTopic = topicId;

  detailContent.innerHTML = `
    <div class="td-hero">
      <div class="td-icon-big">${t.icon}</div>
      <div class="td-hero-text">
        <h1>${topicName}</h1>
        <span class="t-level level-${t.level}">${L.levelNames[t.level]}</span>
      </div>
    </div>
    <div class="td-layout">
      <div class="td-main-content">${topicContent}</div>
      <div class="td-sidebar">
        <div class="td-sidebar-card">
          <h4>${L.examples}</h4>
          ${examplesHTML}
        </div>
        <div class="td-sidebar-card">
          <h4>${L.miniQuiz}</h4>
          <div id="topic-quiz-body-${topicId}"></div>
        </div>
      </div>
    </div>
  `;

  renderTopicQuizQuestion(topicId);
  if (!noReset) showPage('topic-detail');
}

function renderTopicQuizQuestion(topicId) {
  const t = topics.find(x => x.id === topicId);
  const state = topicQuizState[topicId];
  const body = document.getElementById(`topic-quiz-body-${topicId}`);
  if (!body) return;
  const L = ui[currentLang];

  if (state.current >= t.quiz.length) {
    const pct = Math.round((state.score / t.quiz.length) * 100);
    body.innerHTML = `
      <div style="text-align:center;padding:1rem 0">
        <div style="font-size:2.5rem;margin-bottom:.5rem">${pct >= 70 ? '🏆' : '📚'}</div>
        <div style="font-family:'Playfair Display',serif;font-size:1.4rem;color:var(--white)">${state.score}/${t.quiz.length}</div>
        <div style="font-size:.8rem;color:var(--muted);margin:.3rem 0 1rem">${pct}% ${L.correct}</div>
        <button class="sq-next" onclick="resetTopicQuiz(${topicId})">${L.tryAgain}</button>
      </div>`;
    return;
  }

  const q = t.quiz[state.current];
  const qText = currentLang === 'es' && q.q_es ? q.q_es : q.q;
  const opts = currentLang === 'es' && q.opts_es ? q.opts_es : q.opts;
  body.innerHTML = `
    <div class="sq-score">${L.question} ${state.current + 1} ${L.of} ${t.quiz.length} · ✅ ${state.score}</div>
    <div class="sq-question">${qText}</div>
    <div class="sq-options" id="sq-opts-${topicId}">
      ${opts.map((o, i) => `<button class="sq-opt" data-i="${i}" onclick="answerTopicQuiz(${topicId}, ${i})">${o}</button>`).join('')}
    </div>
    <button class="sq-next" id="sq-next-${topicId}" onclick="nextTopicQuestion(${topicId})" style="display:none">${L.next}</button>
  `;
}

function answerTopicQuiz(topicId, chosen) {
  const t = topics.find(x => x.id === topicId);
  const state = topicQuizState[topicId];
  const q = t.quiz[state.current];

  document.querySelectorAll(`#sq-opts-${topicId} .sq-opt`).forEach(btn => {
    btn.classList.add('sq-disabled');
    const i = parseInt(btn.dataset.i);
    if (i === q.ans) btn.classList.add('sq-correct');
    else if (i === chosen && chosen !== q.ans) btn.classList.add('sq-wrong');
  });

  if (chosen === q.ans) state.score++;
  document.getElementById(`sq-next-${topicId}`).style.display = 'block';
}

function nextTopicQuestion(topicId) {
  topicQuizState[topicId].current++;
  renderTopicQuizQuestion(topicId);
}

function resetTopicQuiz(topicId) {
  topicQuizState[topicId] = { current: 0, score: 0 };
  renderTopicQuizQuestion(topicId);
}


const historyQuestions = [
  {
    q: 'In what year did the Normans conquer England, changing English forever?',
    q_es: '¿En qué año los normandos conquistaron Inglaterra, cambiando el inglés para siempre?',
    opts: ['1066','1215','1400','1485'], ans: 0,
    fb: 'The Battle of Hastings in 1066 introduced thousands of French words into English.',
    fb_es: 'La Batalla de Hastings en 1066 introdujo miles de palabras francesas al inglés.'
  },
  {
    q: 'What is the most famous literary work of Old English?',
    q_es: '¿Cuál es la obra literaria más famosa del inglés antiguo?',
    opts: ['Canterbury Tales','Hamlet','Beowulf','Paradise Lost'], ans: 2,
    fb: 'Beowulf is the most important Old English epic poem, written around 700–1000 AD.',
    fb_es: 'Beowulf es el poema épico más importante del inglés antiguo, escrito alrededor del año 700–1000 d.C.'
  },
  {
    q: 'Who wrote "The Canterbury Tales" in Middle English?',
    q_es: '¿Quién escribió "The Canterbury Tales" en inglés medio?',
    opts: ['Shakespeare','Milton','Chaucer','Donne'], ans: 2,
    fb: 'Geoffrey Chaucer (c.1343–1400) wrote The Canterbury Tales, a masterpiece of Middle English.',
    fb_es: 'Geoffrey Chaucer (c.1343–1400) escribió The Canterbury Tales, una obra maestra del inglés medio.'
  },
  {
    q: 'What technological event helped standardize English spelling?',
    q_es: '¿Qué evento tecnológico ayudó a estandarizar la ortografía inglesa?',
    opts: ['The telegraph','The printing press','The radio','The internet'],
    opts_es: ['El telégrafo','La imprenta','La radio','El internet'], ans: 1,
    fb: 'The printing press, introduced in England by William Caxton in 1476, standardized spelling.',
    fb_es: 'La imprenta, introducida en Inglaterra por William Caxton en 1476, estandarizó la ortografía.'
  },
  {
    q: 'How many people speak English at some level today?',
    q_es: '¿Cuántas personas hablan inglés en algún nivel hoy en día?',
    opts: ['500 million','800 million','1.5 billion','3 billion'],
    opts_es: ['500 millones','800 millones','1,500 millones','3,000 millones'], ans: 2,
    fb: 'It is estimated that more than 1.5 billion people speak English worldwide today.',
    fb_es: 'Se estima que más de 1,500 millones de personas hablan inglés en el mundo hoy en día.'
  },
];

function renderHistoryQuiz() {
  const container = document.getElementById('history-quiz-container');
  if (!container || container.dataset.rendered) return;
  container.dataset.rendered = 'true';

  const L = ui[currentLang];
  historyQuestions.forEach((q, qi) => {
    const qText = currentLang === 'es' ? q.q_es : q.q;
    const opts = (currentLang === 'es' && q.opts_es) ? q.opts_es : q.opts;
    const card = document.createElement('div');
    card.className = 'hq-card';
    card.innerHTML = `
      <div class="hq-num">${L.historyQuestion} ${qi + 1}</div>
      <div class="hq-question">${qText}</div>
      <div class="hq-options" id="hq-opts-${qi}">
        ${opts.map((o, i) => `<button class="hq-opt" data-qi="${qi}" data-i="${i}" onclick="answerHistory(${qi}, ${i})">${o}</button>`).join('')}
      </div>
      <div class="hq-feedback" id="hq-fb-${qi}"></div>
    `;
    container.appendChild(card);
  });
}

function answerHistory(qi, chosen) {
  const q = historyQuestions[qi];
  document.querySelectorAll(`#hq-opts-${qi} .hq-opt`).forEach(btn => {
    btn.classList.add('disabled');
    const i = parseInt(btn.dataset.i);
    if (i === q.ans) btn.classList.add('correct');
    else if (i === chosen && chosen !== q.ans) btn.classList.add('wrong');
  });
  const fb = document.getElementById(`hq-fb-${qi}`);
  const fbText = currentLang === 'es' ? q.fb_es : q.fb;
  fb.textContent = (chosen === q.ans ? '✅ ' : '❌ ') + fbText;
  fb.className = 'hq-feedback ' + (chosen === q.ans ? 'correct-fb' : '');
}


const quizAllQuestions = [
  { q: 'Which article goes before "umbrella"?', q_es: '¿Qué artículo va antes de "umbrella"?', opts: ['A) a','B) an','C) the','D) no article'], opts_es: ['A) a','B) an','C) the','D) ninguno'], ans: 1 },
  { q: 'Which pronoun replaces "Maria"?', q_es: '¿Qué pronombre reemplaza a "María"?', opts: ['A) He','B) It','C) She','D) They'], ans: 2 },
  { q: 'Choose the correct sentence with verb "to be":', q_es: 'Elige la oración correcta con el verbo "to be":', opts: ['A) She are happy','B) She am happy','C) She is happy','D) She be happy'], ans: 2 },
  { q: 'What is the contraction of "they are"?', q_es: '¿Cuál es la contracción de "they are"?', opts: ["A) They're","B) Theyre","C) They's","D) They are'"], ans: 0 },
  { q: 'Which is a countable noun?', q_es: '¿Cuál es un sustantivo contable?', opts: ['A) water','B) milk','C) sugar','D) apple'], ans: 3 },
  { q: 'Which quantifier is used with uncountable nouns?', q_es: '¿Qué cuantificador se usa con sustantivos incontables?', opts: ['A) many','B) much','C) a lot of','D) any'], ans: 1 },
  { q: 'What is the ordinal number for "3"?', q_es: '¿Cuál es el número ordinal de "3"?', opts: ['A) threeth','B) thirth','C) third','D) three'], ans: 2 },
  { q: 'How do you say 3:30?', q_es: '¿Cómo se dice 3:30?', opts: ['A) half three','B) half past three','C) three half','D) thirty past three'], ans: 1 },
  { q: 'What is the comparative of "big"?', q_es: '¿Cuál es el comparativo de "big"?', opts: ['A) more big','B) biggest','C) bigger','D) the big'], ans: 2 },
  { q: 'What is the past tense of "go"?', q_es: '¿Cuál es el pasado de "go"?', opts: ['A) goed','B) gone','C) goes','D) went'], ans: 3 },
  { q: 'Which is a cooking verb?', q_es: '¿Cuál es un verbo de cocina?', opts: ['A) run','B) sleep','C) boil','D) jump'], ans: 2 },
  { q: 'Choose the correct negative (verb to be):', q_es: 'Elige la negación correcta (verbo to be):', opts: ['A) He not is','B) He is not','C) He are not','D) He am not'], ans: 1 },
  { q: 'Which sentence uses an adjective correctly?', q_es: '¿Qué oración usa correctamente un adjetivo?', opts: ['A) a car red','B) a red car','C) red a car','D) car a red'], ans: 1 },
  { q: '"Did you ___ soccer?" — correct form:', q_es: '"Did you ___ soccer?" — forma correcta:', opts: ['A) played','B) plays','C) play','D) playing'], ans: 2 },
  { q: 'Which pronoun is used for things?', q_es: '¿Qué pronombre se usa para cosas?', opts: ['A) He','B) She','C) It','D) We'], ans: 2 },
  { q: '"She ___ my friend." — Correct verb to be:', q_es: '"She ___ my friend." — Verbo to be correcto:', opts: ['A) am','B) are','C) is','D) be'], ans: 2 },
  { q: 'Choose the correct superlative:', q_es: 'Elige el superlativo correcto:', opts: ['A) more tall','B) taller','C) the tallest','D) tallest than'], ans: 2 },
  { q: '"I ___ not have any money." — Simple past negative:', q_es: '"I ___ not have any money." — Pasado simple negativo:', opts: ['A) do','B) does','C) did','D) am'], ans: 2 },
  { q: 'Which is correct: "I have ___ friends."', q_es: '¿Cuál es correcto: "I have ___ friends."?', opts: ['A) much','B) many','C) any','D) some'], ans: 1 },
  { q: 'What does "chop" mean in cooking?', q_es: '¿Qué significa "chop" en cocina?', opts: ['A) hervir','B) hornear','C) picar','D) freír'], ans: 2 },
];

let quizState = { questions: [], current: 0, score: 0, timer: null, seconds: 0, answered: false };

function startQuiz() {
  quizState.questions = [...quizAllQuestions].sort(() => Math.random() - .5);
  quizState.current = 0; quizState.score = 0; quizState.seconds = 0; quizState.answered = false;
  clearInterval(quizState.timer);
  quizState.timer = setInterval(() => {
    quizState.seconds++;
    document.getElementById('quizTimer').textContent = '⏱ ' + formatTime(quizState.seconds);
  }, 1000);
  showPage('quiz-play');
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const q = quizState.questions[quizState.current];
  const total = quizState.questions.length;
  const L = ui[currentLang];
  const counter = document.getElementById('q-counter');
  counter.textContent = L.qCounter(quizState.current + 1, total);
  counter.dataset.cur = quizState.current + 1;
  counter.dataset.tot = total;
  document.getElementById('progressBar').style.width = (quizState.current / total * 100) + '%';
  const qText = currentLang === 'es' && q.q_es ? q.q_es : q.q;
  const opts = currentLang === 'es' && q.opts_es ? q.opts_es : q.opts;
  document.getElementById('quizQuestion').textContent = qText;
  document.getElementById('nextBtn').style.display = 'none';
  quizState.answered = false;
  const letters = ['A','B','C','D'];
  document.getElementById('quizOptions').innerHTML = opts.map((o, i) => `
    <button class="quiz-opt" data-i="${i}" data-letter="${letters[i]}" onclick="answerQuiz(${i})">${o}</button>
  `).join('');
}

function answerQuiz(chosen) {
  if (quizState.answered) return;
  quizState.answered = true;
  const q = quizState.questions[quizState.current];
  document.querySelectorAll('.quiz-opt').forEach(btn => {
    btn.classList.add('q-disabled');
    const i = parseInt(btn.dataset.i);
    if (i === q.ans) btn.classList.add('q-correct');
    else if (i === chosen && chosen !== q.ans) btn.classList.add('q-wrong');
  });
  if (chosen === q.ans) quizState.score++;
  document.getElementById('nextBtn').style.display = 'block';
}

function nextQuestion() {
  quizState.current++;
  if (quizState.current >= quizState.questions.length) { endQuiz(); return; }
  const card = document.getElementById('quizCard');
  card.style.animation = 'none';
  requestAnimationFrame(() => { card.style.animation = 'fadeUp .3s ease'; renderQuizQuestion(); });
}

function endQuiz() {
  clearInterval(quizState.timer);
  const total = quizState.questions.length;
  const score = quizState.score;
  const pct = Math.round((score / total) * 100);
  const L = ui[currentLang];
  const tier = pct >= 90 ? 90 : pct >= 70 ? 70 : pct >= 50 ? 50 : 0;
  document.getElementById('resultsEmoji').textContent = pct >= 90 ? '🏆' : pct >= 70 ? '🌟' : pct >= 50 ? '📚' : '💪';
  document.getElementById('resultsTitle').textContent = L.resultsTitle[tier];
  document.getElementById('resultsScore').textContent = `${score} / ${total}`;
  document.getElementById('r-correct').textContent = score;
  document.getElementById('r-wrong').textContent = total - score;
  document.getElementById('r-time').textContent = formatTime(quizState.seconds);
  document.getElementById('r-pct').textContent = pct + '%';
  document.getElementById('resultsMsg').textContent = L.resultsMsg[tier];
  setTimeout(() => { document.getElementById('resultsBar').style.width = pct + '%'; }, 300);
  showPage('quiz-results');
}

function restartQuiz() { showPage('quiz-home'); }

function formatTime(s) {
  return String(Math.floor(s/60)).padStart(2,'0') + ':' + String(s%60).padStart(2,'0');
}


document.addEventListener('DOMContentLoaded', () => { showPage('home'); applyLang(); });