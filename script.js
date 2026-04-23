let notes = [];
let currentId = null;
let saveTimer = null;

// Cargar notas del localStorage al abrir
function loadNotes() {
  const data = localStorage.getItem('mis_apuntes');
  if (data) {
    notes = JSON.parse(data);
  }
  renderList();
}

// Guardar todas las notas en localStorage
function saveAll(silent) {
  localStorage.setItem('mis_apuntes', JSON.stringify(notes));
  if (!silent) showStatus('Guardado');
}

function showStatus(msg) {
  const s = document.getElementById('statusMsg');
  s.textContent = msg;
  setTimeout(() => { s.textContent = ''; }, 2000);
}

// Renderizar la lista lateral
function renderList() {
  const list = document.getElementById('notesList');
  if (!notes.length) {
    list.innerHTML = '<div class="empty-list">Sin notas aún.<br>Crea tu primera nota.</div>';
    return;
  }
  list.innerHTML = notes.slice().reverse().map(n => `
    <div class="note-item ${n.id === currentId ? 'active' : ''}" onclick="openNote('${n.id}')">
      <div class="note-item-title">${n.title || 'Sin título'}</div>
      <div class="note-item-preview">${n.content ? n.content.substring(0, 50) : 'Vacía'}</div>
      <div class="note-item-date">${n.date}</div>
    </div>
  `).join('');
}

// Abrir una nota en el editor
function openNote(id) {
  currentId = id;
  const note = notes.find(n => n.id === id);
  if (!note) return;

  document.getElementById('emptyEditor').style.display = 'none';
  const ec = document.getElementById('editorContent');
  ec.style.display = 'flex';

  document.getElementById('titleInput').value = note.title || '';
  document.getElementById('contentArea').value = note.content || '';
  renderTags(note.tags || []);
  renderList();
}

// Renderizar etiquetas
function renderTags(tags) {
  const tl = document.getElementById('tagsList');
  tl.innerHTML = tags.map(t =>
    `<span class="tag" title="Clic para eliminar" onclick="removeTag('${t}')">${t}</span>`
  ).join('');
}

// Agregar etiqueta con Enter
function addTag(e) {
  if (e.key !== 'Enter') return;
  const inp = document.getElementById('tagInput');
  const val = inp.value.trim();
  if (!val) return;
  const note = notes.find(n => n.id === currentId);
  if (!note) return;
  if (!note.tags) note.tags = [];
  if (!note.tags.includes(val)) note.tags.push(val);
  inp.value = '';
  renderTags(note.tags);
  autoSave();
}

// Eliminar etiqueta
function removeTag(tag) {
  const note = notes.find(n => n.id === currentId);
  if (!note || !note.tags) return;
  note.tags = note.tags.filter(t => t !== tag);
  renderTags(note.tags);
  autoSave();
}

// Crear nueva nota
function nuevaNota() {
  const id = 'n' + Date.now();
  const now = new Date();
  const date = now.toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' });
  notes.push({ id, title: '', content: '', tags: [], date });
  currentId = id;
  renderList();
  openNote(id);
  document.getElementById('titleInput').focus();
}

// Guardado automático con delay
function autoSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => guardarNota(true), 800);
}

// Guardar nota actual
function guardarNota(silent) {
  const note = notes.find(n => n.id === currentId);
  if (!note) return;
  note.title = document.getElementById('titleInput').value;
  note.content = document.getElementById('contentArea').value;
  saveAll(silent);
  renderList();
}

// Eliminar nota actual
function eliminarNota() {
  if (!currentId) return;
  if (!confirm('¿Seguro que quieres eliminar esta nota?')) return;
  notes = notes.filter(n => n.id !== currentId);
  currentId = null;
  document.getElementById('emptyEditor').style.display = 'flex';
  document.getElementById('editorContent').style.display = 'none';
  saveAll(true);
  renderList();
}

// Iniciar app
loadNotes();