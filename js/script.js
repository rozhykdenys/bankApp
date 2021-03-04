'use strict';

const account1 = {
  owner: 'Den Rozhyk',
  movements: [500, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Sam Wilson',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Tom Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Codding
function displayMovement(movement){
  containerMovements.innerHTML = '';

  movement.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>`;

      containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

displayMovement(account1.movements);

function calcDisplayBal(mov){
  const bal = mov.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${bal} EUR`
}
calcDisplayBal(account1.movements)

function calcDisplaySumm(mov){
  const incomes = mov.filter(mov => mov > 0)
                     .reduce((acc, movm) => acc + movm, 0);
  
  labelSumIn.textContent = `${incomes}€`;

  const out = mov.filter((mov) => mov < 0)
                 .reduce((acc, movm) => acc + movm, 0);

                 labelSumOut.textContent = `${Math.abs(out)}€`;
  
  const inter = mov.filter(mov => mov > 0)
                   .map(deposit => deposit * 1.2/100)
                   .filter((int, i, arr)=> {
                     console.log(arr);
                     return int >= 1;
                   })
                   .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${inter}€`;
}

calcDisplaySumm(account1.movements)

const createUsernames = function(accs) {
  accs.forEach((acc) => {
    acc.username = 
      acc.owner.toLocaleLowerCase()
      .split(' ')
      .map((name) =>  name[0]).join('');
    })
}
createUsernames(accounts);


// function calcAverageHumanAge(ages) {

//   const humanAge = ages.map((value) => (value <= 2) ? value * 2 : 16 + value * 4);
//   const age = humanAge.filter((value) => value > 18);
//   const adult = age.reduce((acc, age) => acc + age, 0)

//   console.log(adult)
// }

// const dog = [5, 2, 4, 1, 15, 8, 3];
// calcAverageHumanAge(dog);

