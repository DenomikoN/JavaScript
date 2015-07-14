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

		bin.forEach(function(item) {
			dec += item * Math.pow(2, pow);
			pow--;
		});

		return dec;
	}

	function Converter(parameters) {
		this.decToBin = decToBin;
		this.binToDec = binToDec;
	}

	/* #endregion Binary Converter (6) */






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
}

