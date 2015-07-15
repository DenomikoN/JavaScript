window.onload = function () {

	/* #region Utils functions */

	function setResult(id, value) {
		var viewer = document.getElementById(id);
		if (viewer) {
			if (viewer.style.visibility !== "visible") {
				viewer.style.visibility = "visible";
			}
			viewer.innerHTML = value;
		}
	}

	function setError(id, message) {
		var viewer = document.getElementById(id);
		if (viewer) {
			if (viewer.style.visibility !== "visible") {
				viewer.style.visibility = "visible";
			}
			viewer.innerHTML = "<span class='error'>" + message + "</span>";
		}
	}

	function getValue(id) {
		var control = document.getElementById(id);
		if (control) {
			return control.value;
		}
		return undefined;
	}

	function isChecked(id) {
		var control = document.getElementById(id);
		if (control) {
			return control.checked;
		}
		return undefined;
	}

	function parseArray(stringArray) {
		if (!stringArray) {
			return undefined;
		}

		var regExNumber = /(-)?[0-9]+(\.[0-9])?/g; /* Integer and float numbers */
		var regExResult = stringArray.match(regExNumber);

		if (!regExResult) {
			return undefined;
		}

		var arr = [];
		regExResult.forEach(function (item) {
			arr.push(parseFloat(item));
		});
		return arr;
	}

	/* #endregion Utils functions */



	/* #region Array Processing Tool (1) */

	function subSum(arr) {
		if (!arr || arr.length === 0) {
			return undefined;
		}

		var maxSum = arr[0];
		var currentSum = arr[0];

		for (var i = 1; i < arr.length; i++) {
			currentSum += arr[i];
			if (currentSum < arr[i]) {
				currentSum = arr[i];
			}
			if (maxSum < currentSum) {
				maxSum = currentSum;
			}
		}

		return maxSum;
	}
	function min(arr) {
		if (!arr || arr.length === 0) {
			return undefined;
		}

		var minItem = arr[0];

		arr.forEach(function (item) {
			if (item < minItem) {
				minItem = item;
			}
		});

		return minItem;
	}
	function max(arr) {
		if (!arr || arr.length === 0) {
			return undefined;
		}

		var maxItem = arr[0];

		arr.forEach(function (item) {
			if (item > maxItem) {
				maxItem = item;
			}
		});

		return maxItem;
	}
	function mid(arr) {
		if (!arr || arr.length === 0) {
			return undefined;
		}

		var sum = 0;
		var delta = 0;
		var midValue = 0;
		var midItem = arr[0];

		arr.forEach(function (item) {
			sum += item;
		});

		midValue = sum / arr.length;
		delta = Math.abs(midValue - arr[0]);

		arr.forEach(function (item) {
			var tmpDelta = Math.abs(midValue - item);
			if (tmpDelta < delta) {
				delta = tmpDelta;
				midItem = item;
			}
		});

		return midItem;
	}
	function mmm(arr) {
		if (!arr || arr.length === 0) {
			return undefined;
		}

		var minItem = arr[0];
		var midItem = arr[0];
		var maxItem = arr[0];

		var sum = 0;
		var delta = 0;
		var midValue = 0;

		/* Search min, max and sum */

		arr.forEach(function (item) {
			if (item < minItem) {
				minItem = item;
			}
			else if (item > maxItem) {
				maxItem = item;
			}
			sum += item;
		});

		/* Search mid */

		midValue = sum / arr.length;
		delta = Math.abs(midValue - arr[0]);

		arr.forEach(function (item) {
			var tmpDelta = Math.abs(midValue - item);
			if (tmpDelta < delta) {
				delta = tmpDelta;
				midItem = item;
			}
		});

		var result = {
			min: minItem,
			mid: midItem,
			max: maxItem,
			toString: function () {
				return "[min: " + this.min + ", mid: " + this.mid + ", max: " + this.max + "]";
			}
		}

		return result;
	}
	function selection(arr) {
		if (!arr || arr.length === 0) {
			return undefined;
		}

		var currentArray = [arr[0]];
		var lastArray = [];

		arr.forEach(function (item) {
			var lastItem = currentArray[currentArray.length - 1];
			if (lastItem <= item) {
				currentArray.push(item);
			} else {
				if (lastArray.length < currentArray.length) {
					lastArray = currentArray;
				}
				currentArray = [item];
			}
		});

		return currentArray.length > lastArray.length ? currentArray : lastArray;
	}

	function ArrayTool() {
		this.subSum = subSum;
		this.mmm = mmm;
		this.selection = selection;
	}

	/* #endregion Array Processing Tool (1) */




	/* #region String calculator (4) */

	var stringCalculator = {
		parse: function (strNumber) {
			if (!strNumber) {
				return undefined;
			}
			if ((typeof strNumber) == "number") {
				return strNumber;
			}

			var number = strNumber.trim();
			var regExInt = /^(-)?[0-9]+$/g;
			var regExFloat = /^(-)?[0-9]+\.[0-9]+$/g;

			if (regExInt.test(number)) {
				return parseInt(number);
			} else if (regExFloat.test(number)) {
				return parseFloat(number);
			} else {
				return undefined;
			}
		},
		isValid: function (args) {
			if (!args) {
				return false;
			}
			args.forEach(function (item) {
				if (!stringCalculator.parse(item)) {
					return false;
				}
			});
			return true;
		},
		add: function (num1, num2) {
			if (!this.isValid([num1, num2])) {
				return undefined;
			}

			var a = this.parse(num1);
			var b = this.parse(num2);

			return a + b;
		},
		sub: function (num1, num2) {
			if (!this.isValid([num1, num2])) {
				return undefined;
			}

			var a = this.parse(num1);
			var b = this.parse(num2);

			return a - b;
		},
		mul: function (num1, num2) {
			if (!this.isValid([num1, num2])) {
				return undefined;
			}

			var a = this.parse(num1);
			var b = this.parse(num2);

			return a * b;
		},
		div: function (num1, num2) {
			if (!this.isValid([num1, num2])) {
				return undefined;
			}

			var a = this.parse(num1);
			var b = this.parse(num2);

			return b ? a / b : Infinity;
		}
	};

	/* #endregion String calculator (4) */


	/* #region Array Sorter (5) */

	function shellSort(arr) {
		if (!arr || arr.length < 2) {
			return arr;
		}

		var floor = Math.floor(arr.length / 2);

		while (floor > 0) {
			for (var i = 0; i < arr.length; i++) {
				var currentIndex = i;
				var currentItem = arr[i];
				while (currentIndex >= floor && arr[currentIndex - floor] > currentItem) {
					arr[currentIndex] = arr[currentIndex - floor];
					currentIndex -= floor;
				}
				arr[currentIndex] = currentItem;
			}
			floor = (floor == 2) ? 1 : Math.floor(floor * 5 / 11);
		}
		return arr;
	}
	function selectionSort(arr) {
		if (!arr || arr.length < 2) {
			return arr;
		}

		for (var i = 0; i < arr.length - 1; i++) {
			var index = i;
			for (var j = i + 1; j < arr.length; j++) {
				if (arr[j] < arr[index]) {
					index = j;
				}
			}
			var tmp = arr[index];
			arr[index] = arr[i];
			arr[i] = tmp;
		}

		return arr;
	}
	function quickSort(arr) {
		if (!arr || arr.length == 0) {
			return [];
		}

		var low = [];
		var high = [];
		var currentItem = arr[0];

		for (var i = 1; i < arr.length; i++) {
			if (arr[i] < currentItem) {
				low[low.length] = arr[i];
			} else {
				high[high.length] = arr[i];
			}
		}

		return quickSort(low).concat(currentItem, quickSort(high));
	}
	function bubbleSort(arr) {
		if (!arr || arr.length < 2) {
			return arr;
		}

		for (var i = 0; i < arr.length; i++) {
			for (var j = 0; j < arr.length - 1; j++) {
				if (arr[j] > arr[j + 1]) {
					var tmp = arr[j];
					arr[j] = arr[j + 1];
					arr[j + 1] = tmp;
				}
			}
		}

		return arr;
	}
	function includedSort(arr) {
		if (!arr || arr.length < 2) {
			return arr;
		}
		return arr.sort(function (first, second) {
			return first - second;
		});
	}
	function growingSort(arr) {
		if (!arr || arr.length < 2) {
			return arr;
		}

		var sortArray = [];

		arr.forEach(function (item) {
			for (var i = 0; i <= sortArray.length; i++) {
				if (i == sortArray.length) {
					sortArray.push(item);
					break;
				}
				else if (sortArray[i] > item) {
					sortArray.splice(i, 0, item);
					break;
				}
			}
		});

		return sortArray;
	}

	function Sorter() {
		this.shellSort = shellSort;
		this.selectionSort = selectionSort;
		this.quickSort = quickSort;
		this.bubbleSort = bubbleSort;
		this.includedSort = includedSort;
		this.growingSort = growingSort;
	}

	/* #endregion Array Sorter (5) */


	/* #region Binary Converter (6) */

	function decToBin(value) {
		if (!value) {
			return [0];
		}

		var binArray = [];

		if (value > 0) {
			while (value) {
				binArray.unshift(value % 2);
				value >>= 1;
			}
			binArray.unshift(0); // for +
		} else {
			while (value != -1) {
				binArray.unshift(Math.abs(value % 2));
				value >>= 1;
			}
			binArray.unshift(1); // for -
		}

		return binArray;
	}
	function binToDec(bin) {
		if (!bin) {
			return 0;
		}

		var dec = 0;
		var pow = bin.length - 1;

		bin.forEach(function (item) {
			dec += item * Math.pow(2, pow);
			pow--;
		});

		return dec;
	}

	function Converter() {
		this.decToBin = decToBin;
		this.binToDec = binToDec;
	}

	/* #endregion Binary Converter (6) */



	/* #region Caching calculator (9) */

	function CacheCalculator() {
		this.CACHE = new Object();
		this.clear = function () {
			this.CACHE = new Object();
		}
		this.add = function (a, b) {
			var key = a + "+" + b;
			if (this.CACHE[key]) {
				return this.CACHE[key] + " (cache)";
			} else {
				var result = a + b;
				this.CACHE[key] = result;
				return result;
			}
		}
		this.sub = function (a, b) {
			var key = a + "-" + b;
			if (this.CACHE[key]) {
				return this.CACHE[key];
			} else {
				var result = a - b;
				this.CACHE[key] = result;
				return result;
			}
		}
		this.mul = function (a, b) {
			var key = a + "*" + b;
			if (this.CACHE[key]) {
				return this.CACHE[key];
			} else {
				var result = a * b;
				this.CACHE[key] = result;
				return result;
			}
		}
		this.div = function (a, b) {
			var key = a + "/" + b;
			if (this.CACHE[key]) {
				return this.CACHE[key];
			} else {
				var result = b == 0 ? Infinity : a / b;
				this.CACHE[key] = result;
				return result;
			}
		}
		this.mod = function (a, b) {
			var key = a + "%" + b;
			if (this.CACHE[key]) {
				return this.CACHE[key];
			} else {
				var result = a % b;
				this.CACHE[key] = result;
				return result;
			}
		}
		this.pow = function (a, b) {
			var key = a + "pow" + b;
			if (this.CACHE[key]) {
				return this.CACHE[key];
			} else {
				var result = Math.pow(a, b);
				this.CACHE[key] = result;
				return result;
			}
		}
		this.and = function (a, b) {
			var key = a + "&" + b;
			if (this.CACHE[key]) {
				return this.CACHE[key];
			} else {
				var result = a & b;
				this.CACHE[key] = result;
				return result;
			}
		}
		this.or = function (a, b) {
			var key = a + "|" + b;
			if (this.CACHE[key]) {
				return this.CACHE[key];
			} else {
				var result = a | b;
				this.CACHE[key] = result;
				return result;
			}
		}
		this.shr = function (a, b) {
			var key = a + ">>" + b;
			if (this.CACHE[key]) {
				return this.CACHE[key];
			} else {
				var result = a >> b;
				this.CACHE[key] = result;
				return result;
			}
		}
		this.shl = function (a, b) {
			var key = a + "<<" + b;
			if (this.CACHE[key]) {
				return this.CACHE[key];
			} else {
				var result = a << b;
				this.CACHE[key] = result;
				return result;
			}
		}
	}

	var calculator = new CacheCalculator();

	/* #endregion Caching calculator (9) */



	document.getElementById("bArraySubSum").onclick = function () {
		var value = getValue("tbArraySubSum");
		var arr = parseArray(value);
		if (!arr) {
			setError("vArraySubSum", "Data entry errors!");
			return;
		}
		var result = (new ArrayTool).subSum(arr);
		setResult("vArraySubSum", "Sub sum: " + result);
	}
	document.getElementById("bArrayMmm").onclick = function () {
		var value = getValue("tbArrayMmm");
		var arr = parseArray(value);
		if (!arr) {
			setError("vArrayMmm", "Data entry errors!");
			return;
		}
		var result = (new ArrayTool).mmm(arr);
		setResult("vArrayMmm", "Result: " + result);
	}
	document.getElementById("bArraySelection").onclick = function () {
		var value = getValue("tbArraySelection");
		var arr = parseArray(value);
		if (!arr) {
			setError("vArraySelection", "Data entry errors!");
			return;
		}
		var result = (new ArrayTool).selection(arr);
		setResult("vArraySelection", "Result: [" + result + "]");
	}

	document.getElementById("bStringCalc").onclick = function () {
		var num1 = getValue("tbStringCalc1");
		var num2 = getValue("tbStringCalc2");
		var operator = getValue("cbStringCalcOperators");
		var result;

		switch (operator) {
			case "+": {
				result = stringCalculator.add(num1, num2);
				break;
			}
			case "-": {
				result = stringCalculator.sub(num1, num2);
				break;
			}
			case "*": {
				result = stringCalculator.mul(num1, num2);
				break;
			}
			case "/": {
				result = stringCalculator.div(num1, num2);
				break;
			}
			default: {
				setError("vStringCalc", "Unknow operator \"" + operator + "\"!");
				return;
			}
		}

		setResult("vStringCalc", num1 + " " + operator + " " + num2 + " = " + result);
	}
	document.getElementById("bArraySort").onclick = function () {
		var value = getValue("tbArraySort");
		var arr = parseArray(value);
		if (!arr) {
			setError("vArraySort", "Data entry errors!");
			return;
		}

		var sorter = new Sorter();

		var result =
			"Shell sort: [" + sorter.shellSort(arr) + "]<br />" +
			"Selection sort: [" + sorter.selectionSort(arr) + "]<br />" +
			"Quicksort: [" + sorter.quickSort(arr) + "]<br />" +
			"Bubble sort: [" + sorter.bubbleSort(arr) + "]<br />" +
			"Included sort: [" + sorter.includedSort(arr) + "]<br />" +
			"Growing sort: [" + sorter.growingSort(arr) + "]<br />";

		setResult("vArraySort", result);
	}
	document.getElementById("bBinaryConverter").onclick = function () {
		var value = getValue("tbBinaryConverter");
		var converter = new Converter();

		if (isChecked("isToDec")) {
			if (isNaN(value)) {
				setError("vBinaryConverter", "Data entry errors!");
				return;
			}
			var floor = Math.round(parseFloat(value));
			setResult("vBinaryConverter", "Result: " + converter.decToBin(floor));

		} else {
			var regExBin = /[^01]+/g;
			if (regExBin.test(value)) {
				setError("vBinaryConverter", "Data entry errors!");
				return;
			}
			var bin = value.split("");
			setResult("vBinaryConverter", "Result: " + converter.binToDec(bin));
		}
	}

	document.getElementById("bCache").onclick = function () {
		var left = getValue("tbCacheLeft");
		var right = getValue("tbCacheRight");

		if (isNaN(left) || isNaN(right)) {
			setError("vCache", "Data entry errors!");
			return;
		}

		var a = parseFloat(left);
		var b = parseFloat(right);
		var operator = getValue("cbCacheOperators");
		var result;

		switch (operator) {
			case "+": {
				result = calculator.add(a, b);
				break;
			}
			case "-": {
				result = calculator.sub(a, b);
				break;
			}
			case "*": {
				result = calculator.mul(a, b);
				break;
			}
			case "/": {
				result = calculator.div(a, b);
				break;
			}
			case "%": {
				result = calculator.mod(a, b);
				break;
			}
			case "pow": {
				result = calculator.pow(a, b);
				break;
			}
			case "and": {
				result = calculator.and(a, b);
				break;
			}
			case "or": {
				result = calculator.or(a, b);
				break;
			}
			case "shr": {
				result = calculator.shr(a, b);
				break;
			}
			case "shl": {
				result = calculator.shl(a, b);
				break;
			}
			default: {
				setError("vCache", "Unknow operator \"" + operator + "\"!");
				return;
			}
		}

		setResult("vCache", left + " " + operator + " " + right + " = " + result);
	}
}

