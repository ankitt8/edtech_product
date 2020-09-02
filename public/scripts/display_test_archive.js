async function getTestsList() {
    const res = await fetch('../data/tests.json');
    const data = await res.json();
    return data;
}

async function display_test_archive() {
    let displayTestsContainer = document.querySelector('.display-test-container');

    const testList = await getTestsList();

    let fragment = document.createDocumentFragment();
    for (const test of testList['tests']) {

        // card div
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        // title div
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title')
        const titleSpan = document.createElement('span');
        titleDiv.appendChild(titleSpan);
        const titleP = document.createElement('p');
        titleP.classList.add('titleP')
        titleP.innerHTML = test['name'];
        titleDiv.appendChild(titleP);

        cardDiv.appendChild(titleDiv);

        // total qns div
        const totalQnsDiv = document.createElement('div');
        const totalQnsSpan = document.createElement('span');
        totalQnsSpan.innerHTML = "Total Questions&nbsp:";
        totalQnsDiv.appendChild(totalQnsSpan);
        const totalQnsP = document.createElement('p');
        totalQnsP.innerHTML = test['totalQns'];
        totalQnsP.classList.add('highlight')
        totalQnsDiv.appendChild(totalQnsP);

        cardDiv.appendChild(totalQnsDiv);
        
        // Timer div 
        const timerDiv = document.createElement('div');
        const timerSpan = document.createElement('span');
        timerSpan.innerHTML = "Total Time(mins)&nbsp:";
        timerDiv.appendChild(timerSpan);
        const timerP = document.createElement('p');
        timerP.innerHTML = test['timerInMinutes'];
        timerP.classList.add('highlight');
        timerDiv.appendChild(timerP);

        cardDiv.appendChild(timerDiv);

        // Start test Div
        const startTestDiv = document.createElement('div');
        const startTestLink = document.createElement('a');
        startTestLink.setAttribute('href', `/start-test?testId=${test['testId']}`);
        const startTestBtn = document.createElement('button');
        startTestBtn.classList.add('btn');
        startTestBtn.innerHTML = "Start Test";
        startTestLink.appendChild(startTestBtn);
        startTestDiv.appendChild(startTestLink)

        cardDiv.appendChild(startTestDiv);

        fragment.appendChild(cardDiv)

    }
    displayTestsContainer.appendChild(fragment);
}
display_test_archive()