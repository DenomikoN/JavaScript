window.onload = function () {

	/* #region Utils functions */

	function setResult(id, value) {
		var viewer = document.getElementById(id);
		if (viewer) {
			if (viewer.style.visibility !== "visible") {
				viewer.style.visibility = "visible";
			}
			viewer.innerText = value;
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

	function parseArrayNumber(stringArray) {
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

	function abs(value) {
		if (isNaN(value)) {
			return undefined;
		}

		return value < 0 ? -value : value;
	}

	/* #endregion Utils functions */



	/* #region Array Processing Tool */

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

		arr.forEach(function(item) {
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
		delta = abs(midValue - arr[0]);

		arr.forEach(function (item) {
			var tmpDelta = abs(midValue - item);
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
		delta = abs(midValue - arr[0]);

		arr.forEach(function (item) {
			var tmpDelta = abs(midValue - item);
			if (tmpDelta < delta) {
				delta = tmpDelta;
				midItem = item;
			}
		});

		var result = {
			min: minItem,
			mid: midItem,
			max: maxItem,
			toString: function() {
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

		arr.forEach(function(item) {
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

	var array = {
		subSum: subSum,
		mmm: mmm,
		selection: selection
	}

	/* #endregion Array Processing Tool */

	document.getElementById("bArraySubSum").onclick = function () {
		var value = getValue("tbArraySubSum");
		var arr = parseArrayNumber(value);
		if (!arr) {
			setError("vArraySubSum", "Data entry errors!");
			return;
		}
		var result = array.subSum(arr);
		setResult("vArraySubSum", "Sub sum: " + result);
	}
	document.getElementById("bArrayMmm").onclick = function () {
		var value = getValue("tbArrayMmm");
		var arr = parseArrayNumber(value);
		if (!arr) {
			setError("vArrayMmm", "Data entry errors!");
			return;
		}
		var result = array.mmm(arr);
		setResult("vArrayMmm", "Result: " + result);
	}
	document.getElementById("bArraySelection").onclick = function () {
		var value = getValue("tbArraySelection");
		var arr = parseArrayNumber(value);
		if (!arr) {
			setError("vArraySelection", "Data entry errors!");
			return;
		}
		var result = array.selection(arr);
		setResult("vArraySelection", "Result: [" + result + "]");
	}
}

