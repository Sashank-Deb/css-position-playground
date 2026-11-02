const B = document.getElementById('B');
const ghost = document.getElementById('ghost');
const code = document.getElementById('code');
const note = document.getElementById('note');
const scroller = document.getElementById('sc');
const topInput = document.getElementById('top');
const leftInput = document.getElementById('left');

let mode = 'static';

const notes = {
  static:
    'Default. top/left are ignored. B sits in normal flow between A and C. Nothing overlaps.',
  relative:
    "B moves visually from its normal spot, but its original slot (dashed) is still reserved. C does not move up, so B now overlaps C.",
  absolute:
    "B is removed from flow. C jumps up into B's old slot. B is placed relative to the nearest positioned ancestor (.parent), so overlap happens freely.",
  fixed:
    'B is removed from flow and pinned to the viewport. Scroll the frame: B never moves. C again jumps up.',
  sticky:
    "B stays in flow (C doesn't move) until you scroll it to top: Npx, then it sticks — until its parent scrolls away. left is ignored for vertical sticking.",
};

const flowLabel = {
  static: 'in flow',
  relative: 'in flow (space kept)',
  absolute: 'OUT of flow',
  fixed: 'OUT of flow',
  sticky: 'in flow',
};

const offsetFrom = {
  static: '—',
  relative: 'its own normal spot',
  absolute: 'nearest positioned ancestor',
  fixed: 'viewport',
  sticky: 'scroll container + parent bounds',
};

function render() {
  const top = topInput.value;
  const left = leftInput.value;
  document.getElementById('topv').textContent = `${top}px`;
  document.getElementById('leftv').textContent = `${left}px`;

  // Measure B's normal-flow slot first
  B.style.position = 'static';
  B.style.top = '';
  B.style.left = '';
  ghost.style.display = 'none';
  const slotTop = B.offsetTop;
  const slotLeft = B.offsetLeft;

  if (mode !== 'static') {
    B.style.position = mode;
    B.style.top = `${top}px`;
    if (mode !== 'sticky') B.style.left = `${left}px`;
  }

  // Only relative keeps a reserved gap; show it as a dashed ghost
  if (mode === 'relative') {
    ghost.style.display = 'flex';
    ghost.style.top = `${slotTop}px`;
    ghost.style.left = `${slotLeft}px`;
  }

  B.textContent = `B — position: ${mode}`;

  let css = `.box-b {\n  position: ${mode};\n`;
  if (mode === 'static') {
    css += '  /* top/left ignored */\n';
  } else {
    css += `  top: ${top}px;\n`;
    if (mode !== 'sticky') css += `  left: ${left}px;\n`;
    css += '  z-index: 5;\n';
  }
  css += '}';
  code.textContent = `${css}\n\n/* flow: ${flowLabel[mode]}\n   offset from: ${offsetFrom[mode]} */`;
  note.textContent = notes[mode];
}

document.querySelectorAll('.mode').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode').forEach((b) => b.classList.remove('on'));
    btn.classList.add('on');
    mode = btn.dataset.m;
    scroller.scrollTop = 0;
    render();
  });
});

topInput.addEventListener('input', render);
leftInput.addEventListener('input', render);

render();
