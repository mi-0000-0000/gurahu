let currentDay = 3;
let chart = null;

function addDay() {
  if (currentDay >= 100) {
    alert("100日までしか追加できません。");
    return;
  }
  currentDay++;
  const inputsDiv = document.getElementById('inputs');
  const newInput = document.createElement('div');
  newInput.className = 'input-group';
  newInput.innerHTML = `<span>${currentDay}日目:</span><input type="number" min="0">`;
  inputsDiv.appendChild(newInput);
}

function calculate() {
  const inputs = document.querySelectorAll('#inputs input');
  let totalAmount = 0;
  let labels = [];
  let data = [];

  inputs.forEach((input, index) => {
    const value = parseInt(input.value, 10) || 0;
    totalAmount += value;
    labels.push(`${index + 1}日目`);
    data.push(value);
  });

  document.getElementById('result').innerHTML = `
    <p>全体の金額合計: <strong>¥${totalAmount.toLocaleString()}</strong></p>
  `;

  // グラフ描画
  if (chart) {
    chart.destroy();
  }
  const ctx = document.getElementById('myChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: '日別金額',
        data: data,
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
