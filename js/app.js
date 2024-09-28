function processDonation(donationInputId, cardAmountId, cardHeaderId) 
{
    const donationAmount = document.getElementById(donationInputId);
    const accountBalance = document.getElementById('accountBalance');
    const cardAmount = document.getElementById(cardAmountId);

    let donationInputValue = parseFloat(donationAmount.value);
    let cardHeader = document.getElementById(cardHeaderId).innerHTML;

    // validate the input to ensure it is a positive number
    if (isNaN(donationInputValue) || donationInputValue <= 0) 
    {
        alert("Please enter a positive number only.");
        donationAmount.value = ""; // reset input field
        return;
    }

    // check if there is enough "account balance" to donate
    let currentAccountBalance = parseFloat(accountBalance.textContent);
    if (donationInputValue > currentAccountBalance) 
    {
        alert("Not enough Account Balance to donate.");
        donationAmount.value = ""; // reset input field
        return;
    }

    // update the value of "account balance" and the respective "card amount" information
    accountBalance.textContent = currentAccountBalance - donationInputValue;
    cardAmount.textContent = parseFloat(cardAmount.textContent) + donationInputValue;

    appendDonationHistory(donationInputValue, cardHeader);

    donationAmount.value = "";
}


function appendDonationHistory(amount, cardHeader) {
    const historySection = document.getElementById('historySection');
    const newEntry = document.createElement('div');
    newEntry.className = "space-y-3 mt-3 rounded-lg border border-gray-300 px-5 py-5";


    // create a new date object and format the date and time
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    newEntry.innerHTML = `<h2 class="font-bold text-xl">${amount} Taka is ${cardHeader}</h2>
                          <p>Date: ${dateString} ${timeString}</p>`;
    
    historySection.appendChild(newEntry);
    historySection.classList.add('hidden');
}

// attach event listeners to buttons
document.getElementById('donationButton1').addEventListener('click', function() 
{
    processDonation('donationAmount1', 'card1Amount', 'card1Header');
});

document.getElementById('donationButton2').addEventListener('click', function() 
{
    processDonation('donationAmount2', 'card2Amount', 'card2Header');
});

document.getElementById('donationButton3').addEventListener('click', function() 
{
    processDonation('donationAmount3', 'card3Amount', 'card3Header');
});



function toggleSection(activeSection) 
{
    const donationSection = document.getElementById('donationSection');
    const historySection = document.getElementById('historySection');
    const donationBtn = document.getElementById('donationBtn');
    const historyBtn = document.getElementById('historyBtn');
  
    // initially hide both sections
    donationSection.classList.add('hidden');
    historySection.classList.add('hidden');

    // reset button styles
    donationBtn.classList.remove('bg-lime-300');
    historyBtn.classList.remove('bg-lime-300');

    // show the appropriate section and style the corresponding button
    if (activeSection === 'donationSection') 
    {
        donationSection.classList.remove('hidden');
        donationBtn.classList.add('bg-lime-300');
    } 
    else if (activeSection === 'historySection') 
    {
        historySection.classList.remove('hidden');
        historyBtn.classList.add('bg-lime-300');
    }
}