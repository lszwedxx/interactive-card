let name = document.querySelector('.form__input-name');
let number = document.querySelector('.form__input-number');
let month = document.querySelector('.form__input-month');
let year = document.querySelector('.form__input-year');
let cvc = document.querySelector('.form__input-cvc');
let sub = document.querySelector('.submit');
let cont = document.querySelector('.completed');
class Form {
  constructor(name, number, month, year, cvc) {
    this.inputs = [
      (this.name = name),
      (this.number = number),
      (this.month = month),
      (this.year = year),
      (this.cvc = cvc),
    ];
  }
  createCardNumber = () => {
    let num = '';
    let numberArr = number.value.replace(/\s+/g, '').split('');
    numberArr.forEach((number, index) => {
      if (index === 3 || index === 7 || index === 11) {
        num += number + ' ';
      } else {
        num += number;
      }
    });
    console.log(num);
    document.querySelector('.card-front__number').textContent = num;
  };
  inputHandle = (e) => {
    const input = e.target;
    switch (input.dataset.inputType) {
      case 'name':
        document.querySelector('.card-front__name').textContent = input.value;
        break;
      case 'number':
        this.createCardNumber();
        break;
      case 'month':
        document.querySelector('.card-front__month').textContent = input.value;
        break;
      case 'year':
        document.querySelector('.card-front__year').textContent = input.value;
        break;
      case 'cvc':
        document.querySelector('.card-back__cvc').textContent = input.value;
        break;
    }
  };
  adListener = () => {
    for (let key in this.inputs) {
      this.inputs[key].addEventListener('keyup', this.inputHandle);
    }
  };
}
class Button {
  #namePattern;
  #numberPattern;
  #monthPattern;
  #yearPattern;
  #cvcPattern;
  constructor(sub, cont) {
    this.sub = sub;
    this.cont = cont;
    this.#namePattern = new RegExp('^[A-Za-z]+.{1,10} [A-Za-z]+.{1,15}');
    this.#numberPattern = new RegExp(
      '(D|^)4[0-9]{3}( | |)[0-9]{4}( | |)[0-9]{4}( | |)[0-9]{4}(D|$)'
    );
    this.#monthPattern = new RegExp('(^0[1-9]$)|(^1[0-2]$)');
    this.#yearPattern = new RegExp('^[0-9][0-9]$');
    this.#cvcPattern = new RegExp('^[0-9][0-9][0-9]$');
    this.patterns = [
      { name: 'name', pattern: this.#namePattern },
      { name: 'number', pattern: this.#numberPattern },
      { name: 'month', pattern: this.#monthPattern },
      { name: 'year', pattern: this.#yearPattern },
      { name: 'cvc', pattern: this.#cvcPattern },
    ];
  }
  addListener = (e) => {
    this.sub.addEventListener('click', this.submit);
    this.cont.addEventListener('click', this.continue);
  };
  continue = (e) => {
    window.location.reload();
  };
  submit = (e) => {
    e.preventDefault();
    const { inputs } = form;
    let appropriate = 0;
    //LOOP
    inputs.forEach((input) => {
      let checkPat = this.patterns.find(
        (el) => el.name == input.dataset.inputType
      );
      if (!checkPat.pattern.test(input.value)) {
        input.classList.add('notMatch');
        if (input.value == '') {
          if (checkPat.name == 'month' || checkPat.name == 'year') {
            document.querySelector(`.form__input-date--error`).textContent =
              "Can't be blank";
            document
              .querySelector(`.form__input-date--error`)
              .classList.add('visible');
          } else {
            document.querySelector(
              `.form__input-${checkPat.name}--error`
            ).textContent = "Can't be blank";
            document
              .querySelector(`.form__input-${checkPat.name}--error`)
              .classList.add('visible');
          }
        } else {
          if (checkPat.name == 'month' || checkPat.name == 'year') {
            document.querySelector(`.form__input-date--error`).textContent =
              'Wrong format month or year';
            document
              .querySelector(`.form__input-date--error`)
              .classList.add('visible');
          } else {
            if (checkPat.name == 'cvc') {
              document.querySelector(
                `.form__input-${checkPat.name}--error`
              ).textContent = 'Wrong Format. Add 3 numbers';
              document
                .querySelector(`.form__input-${checkPat.name}--error`)
                .classList.add('visible');
            } else {
              document.querySelector(
                `.form__input-${checkPat.name}--error`
              ).textContent =
                'Wrong Format text only. You should add your name and surname';
              document
                .querySelector(`.form__input-${checkPat.name}--error`)
                .classList.add('visible');
            }
          }
        }
      } else {
        appropriate++;
        if (checkPat.name == 'month' || checkPat.name == 'year') {
          document
            .querySelector(`.form__input-date--error`)
            .classList.remove('visible');
          input.classList.remove('notMatch');
        } else {
          document
            .querySelector(`.form__input-${checkPat.name}--error`)
            .classList.remove('visible');
          input.classList.remove('notMatch');
        }
      }
    });
    if (appropriate == 5) {
      document.querySelector('.form').style.display = 'none';
      document.querySelector('.completed').style.display = 'block';
    }
  };
}

const form = new Form(name, number, month, year, cvc);
const btnSubmit = new Button(sub, cont);

form.adListener();
btnSubmit.addListener();
