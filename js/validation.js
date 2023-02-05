const form = document.querySelector('#member');
const btnSubmit = form.querySelector('input[type=submit]');

btnSubmit.addEventListener('click', (e) => {
	if (!isTxt('userid', 5)) e.preventDefault();
	if (!isTxt('name', 2)) e.preventDefault();
  //todo: year 출력 안됌!!!!!ㅜㅜ
	if (!isTxt('year', 4)) e.preventDefault();
	if (!isTxt('date', 1)) e.preventDefault();
	if (!isTxt('comments', 20)) e.preventDefault();


	if (!isEmail('email')) e.preventDefault();
	if (!isCheck('gender')) e.preventDefault();
	if (!isCheck('hobby')) e.preventDefault();

	if (!isSelect('edu')) e.preventDefault();
	if (!isPwd('pwd1', 'pwd2', 5)) e.preventDefault();
});


//1. type이 text인 form요소의 인증함수 (유효성검사)

function isTxt(el, len) {
	if (len === undefined) len = 5;
	let input = form.querySelector(`[name=${el}]`);
	let txt = input.value;

	if (txt.length >= len) {
		const errMsgs = input.closest('.joinInput').querySelectorAll('p');
		if (errMsgs.length > 0) input.closest('.joinInputd').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = input.closest('.joinInput').querySelectorAll('p');
		if (errMsgs.length > 0) input.closest('.joinInput').querySelector('p').remove();

		let errMessage = document.createElement('p');
		errMessage.append(`입력항목을 ${len}글자 이상 입력하셔야 합니다.`);
		input.closest('.joinInput').append(errMessage);
		return false;
	}
}

//2. email인증함수
function isEmail(el) {
	let input = form.querySelector(`[name=${el}]`);
	let txt = input.value;

	if (/@/.test(txt)) {
		const errMsgs = input.closest('.joinInput').querySelectorAll('p');
		if (errMsgs.length > 0) input.closest('.joinInput').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = input.closest('.joinInput').querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		let errMessage = document.createElement('p');
		errMessage.append('@를 포함한 전체 이메일 주소를 입력하세요.');
		input.closest('td').append(errMessage);
		return false;
	}
}
//3. check인증함수
function isCheck(el) {
	let inputs = form.querySelectorAll(`[name=${el}]`);
	let isCheck = false;

	for (let el of inputs) {
		if (el.checked) isCheck = true;
	}

	if (isCheck) {
		const errMsgs = inputs[0].closest('.joinInput').querySelectorAll('p');
		if (errMsgs.length > 0) inputs[0].closest('.joinInput').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = inputs[0].closest('.joinInput').querySelectorAll('p');
		if (errMsgs.length > 0) inputs.closest('.joinInput').querySelector('p').remove();

		let errMessage = document.createElement('p');
		errMessage.append('필수 입력 항목을 체크해 주세요');
		inputs[0].closest('.joinInput').append(errMessage);
		return false;
	}
}

//4. selcet인증함수
function isSelect(el) {
	let sel = form.querySelector(`[name=${el}]`);
	let sel_index = sel.options.selectedIndex;
	let value = sel[sel_index].value;

	if (value !== '') {
		const errMsgs = sel.closest('.joinInput').querySelectorAll('p');
		if (errMsgs.length > 0) sel.closest('.joinInput').querySelector('p').remove();
		return true;
	} else {
		const errMsgs = sel.closest('.joinInput').querySelectorAll('p');
		if (errMsgs.length > 0) sel.closest('.joinInput').querySelector('p').remove();

		let errMessage = document.createElement('p');
		errMessage.append('항목을 선택해 주세요');
		sel.closest('td').append(errMessage);
		return false;
	}
}

//5 password 인증함수
function isPwd(el1, el2, len) {
	let pwd1 = form.querySelector(`[name=${el1}]`);
	let pwd2 = form.querySelector(`[name=${el2}]`);
	let pwd1_value = pwd1.value;
	let pwd2_value = pwd2.value;

	const num = /[0-9]/;
	const eng = /[a-zA-Z]/;
	const spc = /[~!@#$%^&*()_+?<>]/;

	if (
		pwd1_value === pwd2_value &&
		pwd1_value.length >= len &&
		num.test(pwd1_value) &&
		eng.test(pwd1_value) &&
		spc.test(pwd1_value)
	) {
		const errMsgs = pwd1.closest('.joinInput').querySelectorAll('p');
		if (errMsgs.length > 0) pwd1.closest('.joinInput').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = pwd1.closest('.joinInput').querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		let errMessage = document.createElement('p');
		errMessage.append(`비밀번호는 ${len}글자 이상, 영문, 숫자, 특수문자를 포함하여 동일하게 입력하세요`);
		pwd1.closest('.joinInput').append(errMessage);
		return false;
	}
}
