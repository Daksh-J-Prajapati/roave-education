const ROAVE_LOCATION = 'Sharon Forks Library · 2820 Old Atlanta Road, Cumming, GA 30041';

// Keep the new flyer prices and all visible account examples consistent.
const priceUpdates = new Map([
  ['$140', '$135'], ['$160', '$150'], ['$175', '$165'], ['$329', '$150'], ['$389', '$165']
]);
document.querySelectorAll('li, strong, b').forEach(el => {
  let value = el.textContent.trim();
  priceUpdates.forEach((next, previous) => {
    if (value.includes(previous)) el.textContent = value.replace(previous, next);
  });
});

// In-person location replaces online join language everywhere.
const locationBar = document.createElement('div');
locationBar.className = 'location-banner';
locationBar.innerHTML = `<span>⌖</span><strong>All tutoring sessions are held at Sharon Forks Library</strong><a href="https://www.google.com/maps/search/?api=1&query=2820+Old+Atlanta+Road+Cumming+GA+30041" target="_blank" rel="noopener">2820 Old Atlanta Road, Cumming, GA 30041</a>`;
document.querySelector('main').insertBefore(locationBar, document.querySelector('.content'));
document.querySelectorAll('button').forEach(button => {
  if (/^(join|join class|join next session|start)$/i.test(button.textContent.trim())) {
    button.textContent = 'View location';
    button.classList.add('location-trigger');
    button.addEventListener('click', () => window.open('https://www.google.com/maps/search/?api=1&query=2820+Old+Atlanta+Road+Cumming+GA+30041', '_blank'));
  }
});

const students = [
  {name:'Aanya Patel', initials:'AP', grade:'Grade 6', guardian:'Maya Patel', tutor:'Jordan Lee', average:'88%', attendance:'92%', days:'Sep 22, Sep 24, Sep 29, Oct 1, Oct 5', topics:'Equivalent ratios, unit rates, percent increase, argument structure', notes:'Strong verbal reasoning. Continue written explanations and complete ratios practice pages 12–14.', files:['Ratios-practice.pdf','Argument-structure-guide.pdf'], next:'Oct 8 · 5:00 PM — English session', assessment:'Oct 9 — Ratios retake'},
  {name:'Jackson Miller', initials:'JM', grade:'Grade 9', guardian:'Chris Miller', tutor:'Jordan Lee', average:'84%', attendance:'96%', days:'Sep 23, Sep 26, Sep 30, Oct 3, Oct 6', topics:'Linear equations, slope-intercept form, systems of equations', notes:'Accurate graphing. Needs more practice translating word problems into equations.', files:['Linear-equations-set.pdf','Systems-review.pdf'], next:'Oct 9 · 6:00 PM — Algebra I', assessment:'Oct 12 — Algebra quiz'},
  {name:'Ethan Nguyen', initials:'EN', grade:'Grade 10', guardian:'Linh Nguyen', tutor:'Daniel Kim', average:'91%', attendance:'98%', days:'Sep 21, Sep 25, Sep 28, Oct 2, Oct 5', topics:'SAT reading analysis, transitions, advanced algebra, pacing', notes:'Excellent accuracy. Focus next on finishing reading modules within time.', files:['SAT-reading-strategy.pdf','Practice-test-2.pdf'], next:'Oct 8 · 5:30 PM — SAT prep', assessment:'Oct 17 — Full SAT practice test'}
];

function rosterMarkup(label) {
  return `<section class="card roster-card"><div class="card-head"><div><p class="eyebrow">${label}</p><h2>Student records</h2></div><div class="roster-tools"><input class="student-search" placeholder="Search students" aria-label="Search students"><button class="primary-btn add-student">Add student</button></div></div><div class="roster-list">${students.map((s,i)=>`<button class="student-record" data-student="${i}"><span class="avatar ${i===1?'purple':i===2?'blue':'coral'}">${s.initials}</span><span><strong>${s.name}</strong><small>${s.grade} · ${s.tutor}</small></span><span><small>Average</small><b>${s.average}</b></span><span><small>Attendance</small><b>${s.attendance}</b></span><span class="record-open">Open record</span></button>`).join('')}</div></section>`;
}

const tutorView = document.querySelector('#tutorView');
const tutorStats = tutorView?.querySelector('.stats-grid');
if (tutorStats) tutorStats.insertAdjacentHTML('afterend', rosterMarkup('MY STUDENTS · MANAGER-ASSIGNED & SELF-ADDED'));

const managerView = document.querySelector('#managerView');
managerView?.querySelector('.manager-bottom > section:first-child')?.remove();
const managerStats = managerView?.querySelector('.stats-grid');
if (managerStats) {
  managerStats.insertAdjacentHTML('afterend', `<section class="card profit-card"><div class="card-head"><div><p class="eyebrow">FINANCIAL PERFORMANCE</p><h2>Profit over time</h2></div><div class="profit-controls"><label>From <input type="date" value="2026-04-01"></label><label>To <input type="date" value="2026-10-01"></label><button class="secondary-btn profit-search">Update</button></div></div><div class="profit-summary"><div><small>Total profit</small><strong>$31,420</strong><span>+18.7% in 6 months</span></div><div class="chart-legend"><i></i>Growing profit</div></div><div class="line-chart"><div class="y-label">Profit ($)</div><svg viewBox="0 0 760 240" role="img" aria-label="Profit increased from 3200 dollars in April to 6850 dollars in October"><g class="grid-lines"><path d="M55 20H745M55 75H745M55 130H745M55 185H745"/><text x="8" y="25">$8k</text><text x="8" y="80">$6k</text><text x="8" y="135">$4k</text><text x="8" y="190">$2k</text></g><path class="profit-area" d="M55 160 L165 145 L275 151 L385 113 L495 98 L605 70 L715 48 L715 200 L55 200 Z"/><path class="profit-line" d="M55 160 L165 145 L275 151 L385 113 L495 98 L605 70 L715 48"/><g class="profit-points"><circle cx="55" cy="160" r="5"/><circle cx="165" cy="145" r="5"/><circle cx="275" cy="151" r="5"/><circle cx="385" cy="113" r="5"/><circle cx="495" cy="98" r="5"/><circle cx="605" cy="70" r="5"/><circle cx="715" cy="48" r="5"/></g><g class="x-dates"><text x="42" y="225">Apr 1</text><text x="150" y="225">May 1</text><text x="260" y="225">Jun 1</text><text x="370" y="225">Jul 1</text><text x="480" y="225">Aug 1</text><text x="590" y="225">Sep 1</text><text x="696" y="225">Oct 1</text></g></svg><div class="x-label">Date</div></div></section>${rosterMarkup('ALL STUDENTS')}`);
  managerView.querySelector('.manager-layout')?.insertAdjacentHTML('beforeend', `<section class="card tutor-calendar"><div class="card-head"><div><p class="eyebrow">TUTOR CALENDAR</p><h2>Week of October 5</h2></div><select><option>All tutors</option><option>Jordan Lee</option><option>Sofia Martinez</option><option>Daniel Kim</option></select></div><div class="calendar-grid"><span></span><b>Mon 5</b><b>Tue 6</b><b>Wed 7</b><b>Thu 8</b><b>Fri 9</b><strong>4 PM</strong><i class="cal-event math-event">Jordan<br>Aanya · Math</i><i></i><i class="cal-event english-event">Sofia<br>Aanya · ELA</i><i></i><i class="cal-event sat-event">Daniel<br>Ethan · SAT</i><strong>6 PM</strong><i></i><i class="cal-event math-event">Jordan<br>Jackson · Algebra</i><i></i><i class="cal-event english-event">Sofia<br>Mia · English</i><i></i></div></section>`);
}

document.body.insertAdjacentHTML('beforeend', `<dialog id="studentRecordDialog" class="record-dialog"><button class="dialog-close" aria-label="Close">×</button><div class="record-content"></div></dialog><dialog id="addStudentDialog"><button class="dialog-close" aria-label="Close">×</button><p class="eyebrow">NEW STUDENT</p><h2>Add a student</h2><form class="add-student-form"><div class="form-grid"><label>Student name<input required placeholder="Full name"></label><label>Grade<select><option>Elementary school</option><option>Middle school</option><option>High school</option></select></label><label>Parent or guardian<input required placeholder="Guardian name"></label><label>Assigned tutor<select><option>Jordan Lee</option><option>Sofia Martinez</option><option>Daniel Kim</option><option>Unassigned</option></select></label></div><label>Subjects and goals<textarea placeholder="Math, English, SAT, current goals..."></textarea></label><button class="primary-btn" type="submit">Add student</button></form></dialog>`);

const recordDialog = document.querySelector('#studentRecordDialog');
function openStudent(index) {
  const s = students[index];
  recordDialog.querySelector('.record-content').innerHTML = `<div class="record-title"><span class="avatar coral">${s.initials}</span><div><p class="eyebrow">STUDENT RECORD</p><h2>${s.name}</h2><p>${s.grade} · Guardian: ${s.guardian} · Tutor: ${s.tutor}</p></div></div><div class="record-summary"><div><small>Current average</small><strong>${s.average}</strong></div><div><small>Attendance</small><strong>${s.attendance}</strong></div><div><small>Next session</small><strong>${s.next}</strong></div><div><small>Upcoming assessment</small><strong>${s.assessment}</strong></div></div><section><h3>Days attended</h3><p class="attendance-days">${s.days.split(', ').map(d=>`<span>✓ ${d}</span>`).join('')}</p></section><section><h3>Topics covered</h3><p>${s.topics}</p></section><section><h3>Tutor & manager notes</h3><textarea>${s.notes}</textarea><button class="secondary-btn save-record">Save notes</button></section><section><h3>PDFs & assignments</h3><div class="record-files">${s.files.map(f=>`<p><span class="file-icon pdf">PDF</span><b>${f}</b><button class="secondary-btn">Open</button></p>`).join('')}</div><label class="upload-box"><input class="record-upload" type="file" multiple accept=".pdf,.doc,.docx,.png,.jpg"><span>＋</span><strong>Upload PDF or assignment</strong><small>Files are shared with the student, tutor, and manager</small></label></section>`;
  recordDialog.showModal();
  recordDialog.querySelector('.save-record').addEventListener('click',()=>showToast('Student record updated'));
  recordDialog.querySelector('.record-upload').addEventListener('change',e=>showToast(`${e.target.files.length} file uploaded`));
}
document.querySelectorAll('.student-record').forEach(btn=>btn.addEventListener('click',()=>openStudent(Number(btn.dataset.student))));
document.querySelectorAll('.student-search').forEach(input=>input.addEventListener('input',()=>{const q=input.value.toLowerCase();input.closest('.roster-card').querySelectorAll('.student-record').forEach(row=>row.hidden=!row.textContent.toLowerCase().includes(q))}));
document.querySelectorAll('.add-student').forEach(btn=>btn.addEventListener('click',()=>document.querySelector('#addStudentDialog').showModal()));
document.querySelectorAll('#studentRecordDialog .dialog-close,#addStudentDialog .dialog-close').forEach(btn=>btn.addEventListener('click',()=>btn.closest('dialog').close()));
document.querySelector('.add-student-form').addEventListener('submit',e=>{e.preventDefault();e.target.closest('dialog').close();e.target.reset();showToast('Student added and assigned successfully')});
document.querySelector('.profit-search')?.addEventListener('click',()=>showToast('Profit graph updated for the selected dates'));
