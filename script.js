/* =========================
FILE: script.js
========================= */

let salaryData = {};

function calculateSalary(){

  const teacherName =
  document.getElementById("teacherName").value;

  const monthValue =
  document.getElementById("monthPicker").value;

  const rate =
  parseFloat(
    document.getElementById("rate").value
  );

  // Validation
  if(
    teacherName === "" ||
    monthValue === "" ||
    isNaN(rate)
  ){

    alert("Please fill all fields");

    return;

  }

  /* =========================
  FIXED DATE SYSTEM
  ========================= */

  const [year, month] =
  monthValue.split("-").map(Number);

  const daysInMonth =
  new Date(year, month, 0).getDate();

  let totalHours = 0;

  const checkedDays =
  document.querySelectorAll(".dayCheck:checked");

  checkedDays.forEach(day => {

    const dayName = day.value;

    const hours =
    parseFloat(
      document.getElementById(dayName + "Hours").value
    );

    if(isNaN(hours)) return;

    let count = 0;

    for(let d = 1; d <= daysInMonth; d++){

      const date =
      new Date(Date.UTC(year, month - 1, d));

      const currentDay =
      date.toLocaleDateString("en-US", {

        weekday:"long",

        timeZone:"UTC"

      });

      if(currentDay === dayName){

        count++;

      }

    }

    totalHours += count * hours;

  });

  const totalSalary =
  totalHours * rate;

  /* =========================
  SAVE DATA
  ========================= */

  salaryData = {

    teacherName,

    totalHours,

    totalSalary,

    rate,

    monthValue

  };

  /* =========================
  SHOW RESULT
  ========================= */

  document.getElementById("result").innerHTML = `

    <h2>${teacherName}</h2>

    <p>
      <strong>Month:</strong>
      ${monthValue}
    </p>

    <p>
      <strong>Total Hours:</strong>
      ${totalHours}
    </p>

    <p>
      <strong>Rate Per Hour:</strong>
      $${rate}
    </p>

    <h1>
      Total Salary:
      $${totalSalary}
    </h1>

  `;

}

/* =========================
PDF DOWNLOAD
========================= */

function downloadPDF(){

  if(!salaryData.teacherName){

    alert("Calculate salary first");

    return;

  }

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();

  doc.setFontSize(22);

  doc.text(
    "Teacher Salary Report",
    20,
    20
  );

  doc.setFontSize(14);

  doc.text(
    `Teacher: ${salaryData.teacherName}`,
    20,
    50
  );

  doc.text(
    `Month: ${salaryData.monthValue}`,
    20,
    65
  );

  doc.text(
    `Total Hours: ${salaryData.totalHours}`,
    20,
    80
  );

  doc.text(
    `Rate Per Hour: $${salaryData.rate}`,
    20,
    95
  );

  doc.text(
    `Total Salary: $${salaryData.totalSalary}`,
    20,
    110
  );

  doc.save("salary-report.pdf");

}

/* =========================
EXCEL DOWNLOAD
========================= */

function downloadExcel(){

  if(!salaryData.teacherName){

    alert("Calculate salary first");

    return;

  }

  const data = [

    ["Teacher", salaryData.teacherName],

    ["Month", salaryData.monthValue],

    ["Total Hours", salaryData.totalHours],

    ["Rate Per Hour", salaryData.rate],

    ["Total Salary", salaryData.totalSalary]

  ];

  const ws =
  XLSX.utils.aoa_to_sheet(data);

  const wb =
  XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(

    wb,

    ws,

    "Salary Report"

  );

  XLSX.writeFile(

    wb,

    "salary-report.xlsx"

  );

}

/* =========================
PRINT REPORT
========================= */

function printReport(){

  if(!salaryData.teacherName){

    alert("Calculate salary first");

    return;

  }

  const resultContent =
  document.getElementById("result").innerHTML;

  const printWindow =
  window.open('', '', 'width=900,height=700');

  printWindow.document.write(`

  `);

  printWindow.document.close();

  printWindow.print();

}

/* =========================
REFRESH FORM
========================= */

function refreshForm(){

  // Teacher Name
  document.getElementById(
    "teacherName"
  ).value = "";

  // Month
  document.getElementById(
    "monthPicker"
  ).value = "";

  // Rate
  document.getElementById(
    "rate"
  ).value = "";

  // Uncheck Checkboxes
  const checkboxes =
  document.querySelectorAll(".dayCheck");

  checkboxes.forEach(box => {

    box.checked = false;

  });

  // Clear Hours
  const hourInputs = [

    "SundayHours",
    "MondayHours",
    "TuesdayHours",
    "WednesdayHours",
    "ThursdayHours",
    "FridayHours",
    "SaturdayHours"

  ];

  hourInputs.forEach(id => {

    document.getElementById(id).value = "";

  });

  // Clear Result
  document.getElementById(
    "result"
  ).innerHTML = "";

  // Clear Data
  salaryData = {};

}