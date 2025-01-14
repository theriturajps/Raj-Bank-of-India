'use strict'

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
}

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
}

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
}

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
}

const accounts = [account1, account2, account3, account4]

// Elements
const labelWelcome = document.querySelector('#welcome')
const labelDate = document.querySelector('#date')
const labelBalance = document.querySelector('#balance__value')
const labelSumIn = document.querySelector('#summary__value--in')
const labelSumOut = document.querySelector('#summary__value--out')
const labelSumInterest = document.querySelector('#summary__value--interest')
const labelTimer = document.querySelector('#timer')

const containerApp = document.querySelector('#app')
const containerMovements = document.querySelector('#movements')

const btnLogin = document.querySelector('#login__btn')
const btnTransfer = document.querySelector('#form__btn--transfer')
const btnLoan = document.querySelector('#form__btn--loan')
const btnClose = document.querySelector('#form__btn--close')
const btnSort = document.querySelector('#btn--sort')

const inputLoginUsername = document.querySelector('#login__input--user')
const inputLoginPin = document.querySelector('#login__input--pin')
const inputTransferTo = document.querySelector('#form__input--to')
const inputTransferAmount = document.querySelector('#form__input--amount')
const inputLoanAmount = document.querySelector('#form__input--loan-amount')
const inputCloseUsername = document.querySelector('#form__input--user')
const inputClosePin = document.querySelector('#form__input--pin')

//////////////////////////////////////////////////////////////////////////////////////////////////

const displayMovments = (movements) => {
  containerMovements.innerHTML = ''

  movements.forEach((mov, i) => {
    const typeDesigne =
      mov > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `<div class="p-4 flex justify-between items-center border-b border-gray-100">
				<div class="text-sm ${typeDesigne} px-3 py-1 font-medium rounded-full">${
      i + 1
    } ${type}</div>
				<div class="text-lg font-medium">${mov}</div>
			</div>`

    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}



//////////////////////////////////////////////////////////////////////////////////////////////////

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('')
  })
}
createUsernames(accounts)

//////////////////////////////////////////////////////////////////////////////////////////////////

// event handler

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault()

  currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value)

  if (currentAccount?.pin === Number(inputLoginPin.value)) {

    // display UI
    containerApp.className = 'max-w-6xl lg:mx-auto mt-8 space-y-8 sm:mx-2.5'
    
    // welcome message
    labelWelcome.innerText = `Welcome ${currentAccount.owner.split(' ')[0]}`
    
    // display movements
    displayMovments(currentAccount.movements)

    // display balance
    calcDisplayBalance(currentAccount.movements)

    // display summary
    calcDisplaySummary(currentAccount.summary)

  } else {
    console.log('Invalid');
  }
  
  

})