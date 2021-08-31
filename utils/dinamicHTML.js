export const dinamicHTML = (chkListTitle, finaleGrade, testParams, resArr) => {

  let html = '';
  let header = '';
  let body = '';
  let footer = '';
  const creationHTML = () => {
// console.log('date => ', testParams.testDate);
    header = `<div>
    <h2 style="text-align: center;">${chkListTitle}</h2>
    <hr />
    <h3><strong>Дата:</strong> <span style="color: #455A64;">${testParams.testDate}</span></h3>
    <h3><strong>Группа:</strong>&nbsp; <span style="color: #455A64;">${testParams.testGroup}</span></h3>
    <h3><strong>Учащийся:</strong>&nbsp; <span style="color: #455A64;">${testParams.testStudent}</span></h3>
    <h3><strong>Оценка:</strong> <span style="color: #455A64;">&nbsp;${finaleGrade.toFixed(2)}</span></h3>
    <table  border="1" cellpadding="5" cellspacing="0" >
      <thead>
        <tr>
          <th>№</th>
          <th>Манипуляция</th>
          <th>Максимальный балл</th>
          <th>Фактический балл</th>
        </tr>
      </thead>
	    <tbody>`;

    const sortArr = resArr.sort((a, b) => b.serialNum - a.serialNum);

    for (const element of resArr) {
      body = `<tr>
      <td align="center">${element.serialNum}</td>
      <td align="left">${element.title}</td>
      <td align="center">${element.grade}</td>
      <td align="center">${element.currentGrade}</td>
    </tr>` + body;
    };
  


    footer = `</tbody></table></div>`;
  };
  creationHTML();
  html = `${header} ` + `${body} ` + `${footer}`;
  return html;
};