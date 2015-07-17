window.onload = function () {

	// #region Utils functions

	function setClick(id, hFunc) {
		if (!id || !hFunc) {
			return;
		}
		var control = document.getElementById(id);
		if (control) {
			control.onclick = hFunc;
		}
	}

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

	// #endregion Utils functions

	// #region Array Processing Tool (1)

	function subSum(arr) {
		if (!arr || !arr.length) {
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
		if (!arr || !arr.length) {
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
		if (!arr || !arr.length) {
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
		if (!arr || !arr.length) {
			return undefined;
		}

		var sum = 0;

		arr.forEach(function (item) {
			sum += item;
		});

		var midItem = arr[0];
		var midValue = sum / arr.length;
		var delta = Math.abs(midValue - arr[0]);

		arr.forEach(function (item) {
			var tmpDelta = Math.abs(midValue - item);
			if (tmpDelta < delta) {
				delta = tmpDelta;
				midItem = item;
			}
		});

		return midItem;
	}
	function selection(arr) {
		if (!arr || !arr.length) {
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

		var result = currentArray.length > lastArray.length
			? currentArray
			: lastArray;

		return result;
	}

	// ReSharper disable once InconsistentNaming
	// TODO: Do not delete, this is constructor
	function ArrayTool() {
		this.subSum = subSum;
		this.min = min;
		this.mid = mid;
		this.max = max;
		this.selection = selection;
	}

	// #endregion Array Processing Tool (1)

	// #region Date Display Formatter (2)

	// ReSharper disable once InconsistentNaming
	// TODO: Do not delete, this is formatter object
	var DateFormatter = {
		days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		masks: {
			"default": "dd mmm yyyy",
			shortDate: "m/d/yy",
			mediumDate: "mmm d, yyyy",
			longDate: "mmmm d, yyyy",
			fullDate: "dddd, mmmm d, yyyy",
			isoDate: "yyyy-mm-dd"
		},
		parse: function (date, mask) {
			/* if empty parameters, then now */
			if (!date && !mask) {
				return new Date();
			}

			/* if 'date' of Date or milliseconds */
			if (Date.parse(date)) {
				return new Date(Date.parse(date));
			}

			if (!date && Date.parse(mask)) {
				return Date.parse(mask);
			}

			/* if 'date' not is Date and milliseconds and unknow mask, then undefined */
			if (!mask) {
				return undefined;
			}

			var regExDate = /d{1,2}/ig;
			var regExMonth = /m{1,2}/ig;
			var regExYear = /yy(?:yy)?/ig;

			var datePattern = regExDate.exec(mask)[0];
			var monthPattern = regExMonth.exec(mask)[0];
			var yearPattern = regExYear.exec(mask)[0];

			var dateIndex = mask.search(datePattern);
			var monthIndex = mask.search(monthPattern);
			var yearIndex = mask.search(yearPattern);

			var strDate = date.substr(dateIndex, datePattern.length);
			var strMonth = date.substr(monthIndex, monthPattern.length);
			var strYear = date.substr(yearIndex, yearPattern.length);

			var d = parseInt(strDate);
			var m = parseInt(strMonth) - 1;
			var y = parseInt(strYear);

			var result = new Date(y, m, d);
			return result;
		},
		format: function (date, fromMask, toMask) {
			date = this.parse(date, fromMask);
			if (!date) {
				return undefined;
			}

			var padLeft = function (value, maxLength) {
				value = String(value);
				maxLength = maxLength || 2;
				while (value.length < maxLength) {
					value = "0" + value;
				}
				return value;
			};

			var d = date.getDate(),
				w = date.getDay(),
				m = date.getMonth(),
				y = date.getFullYear(),
				h = date.getHours(),
				mn = date.getMinutes(),
				s = date.getSeconds();

			var flags = {
				d: d,
				dd: padLeft(d),
				ddd: this.shortDays[w],
				dddd: this.days[w],
				m: m + 1,
				mm: padLeft(m + 1),
				mmm: this.shortMonths[m],
				mmmm: this.months[m],
				yy: String(y).slice(2),
				yyyy: y,
				h: h % 12 || 12,
				hh: padLeft(h % 12 || 12),
				H: h,
				HH: padLeft(h),
				M: mn,
				MM: padLeft(mn),
				s: s,
				ss: padLeft(s)
			};

			toMask = String(this.masks[toMask] || toMask || this.masks["default"]);

			var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|"[^"]*"|'[^']*'/g;

			return toMask.replace(token, function (pattern) {

				var result = pattern in flags
					? flags[pattern]
					: pattern.slice(1, pattern.length - 1);

				return result;
			});
		},

		fromNow: function (date, mask) {
			date = this.parse(date, mask);
			if (!date) {
				return undefined;
			}

			var years = (Date.now() - date) / 1000 / 60 / 60 / 24 / 365;

			var result = years < 0
				? 0
				: years.toFixed(1);

			return result;
		}
	}

	/*
		Exemple1:
			alert(DateFormatter.format("2013AAA2VVVV12", "yyyyAAAmVVVVdd", "dddd mmmm yyyy HH:MM:ss"));

		Result1:
			"Tuesday February 2013 14:32:12"

		Exemple2:
			alert(DateFormatter.format("21 May 1958 10:12", "HH:MM:ss, dddd mmmm yyyy year"));

		Result2:
			"10:12:00, Wednesday May 1958 year"
	 */

	// #endregion Date Display Formatter (2)

	// #region Text Formatter (3)

	// ReSharper disable once InconsistentNaming
	var TextFormatter = {
		FormatTypes: {
			CHARACTER: "character",
			WORD: "word",
			SENTENCE: "sentence",
			NONE: "none"
		},
		format: function (text, maxLineLength, formatType, maxLinesCount) {
			if (!text) {
				return undefined;
			}

			if (!maxLineLength && !maxLinesCount) {
				return text;
			}

			if (maxLineLength && (!formatType || formatType === this.FormatTypes.NONE)) {
				var length = Math.min(text.length, maxLineLength);
				var result = text.substr(0, length);
				return result;
			}

			maxLinesCount = maxLinesCount
				? maxLinesCount
				: -1;

			var resultText = String("");

			switch (formatType) {

				case this.FormatTypes.CHARACTER: {
					for (var i = 0; i < text.length && maxLinesCount; i += maxLineLength, maxLinesCount--) {
						resultText += text.substr(i, maxLineLength) + "\n";
					}
					break;
				}

				case this.FormatTypes.WORD: {
					for (var last = 0, end = maxLineLength; end < (text.length + maxLineLength) && maxLinesCount; end += maxLineLength, maxLinesCount--) {

						while (text[end] !== " " && text[end] !== "-" && end !== text.length) {
							end--;
						}

						var line = text.slice(last, ++end);

						last += line.length;
						resultText += line + "\n";
					}
					break;
				}

				case this.FormatTypes.SENTENCE: {
					resultText = text
						.replace(/[.]+[ ]*/g, ".\n")
						.replace(/[!]+[ ]*/g, "!\n")
						.replace(/[?]+[ ]*/g, "?\n");
					break;
				}
			}

			return resultText;
		}
	}

	// #endregion Text Formatter (3)

	// #region String calculator (4)

	var stringCalculator = {
		parse: function (strNumber) {
			if (!strNumber) {
				return undefined;
			}
			if ((typeof strNumber) === "number") {
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

			var isVal = true;

			args.forEach(function (item) {
				if (!stringCalculator.parse(item)) {
					isVal = false;
				}
			});

			return isVal;
		},
		add: function (num1, num2) {
			if (!this.isValid([num1, num2])) {
				return undefined;
			}

			var a = this.parse(num1);
			var b = this.parse(num2);

			var result = a + b;
			return result;
		},
		sub: function (num1, num2) {
			if (!this.isValid([num1, num2])) {
				return undefined;
			}

			var a = this.parse(num1);
			var b = this.parse(num2);

			var result = a - b;
			return result;
		},
		mul: function (num1, num2) {
			if (!this.isValid([num1, num2])) {
				return undefined;
			}

			var a = this.parse(num1);
			var b = this.parse(num2);

			var result = a * b;
			return result;
		},
		div: function (num1, num2) {
			if (!this.isValid([num1, num2])) {
				return undefined;
			}

			var a = this.parse(num1);
			var b = this.parse(num2);

			var result = b ?
				a / b
				: Infinity;

			return result;
		}
	};

	// #endregion String calculator (4)

	// #region Array Sorter (5) 

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
			floor = (floor === 2)
				? 1
				: Math.floor(floor * 5 / 11);
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
		if (!arr || arr.length < 2) {
			return arr;
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

		var result = quickSort(low).concat(currentItem, quickSort(high));
		return result;
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

		var sortArray = arr.sort(function (first, second) {
			var result = first - second;
			return result;
		});

		return sortArray;
	}
	function growingSort(arr) {
		if (!arr || arr.length < 2) {
			return arr;
		}

		var sortArray = [];

		arr.forEach(function (item) {
			for (var i = 0; i <= sortArray.length; i++) {
				if (i === sortArray.length) {
					sortArray.push(item);
					break;
				} else if (sortArray[i] > item) {
					sortArray.splice(i, 0, item);
					break;
				}
			}
		});

		return sortArray;
	}

	// ReSharper disable once InconsistentNaming
	// TODO: Do not delete, this is constructor
	function Sorter() {
		this.shellSort = shellSort;
		this.selectionSort = selectionSort;
		this.quickSort = quickSort;
		this.bubbleSort = bubbleSort;
		this.includedSort = includedSort;
		this.growingSort = growingSort;
	}

	// #endregion Array Sorter (5)

	// #region Binary Converter (6)

	function decToBin(value) {
		if (!value) {
			return undefined;
		}

		var binArray = [];

		if (value > 0) {
			while (value) {
				binArray.unshift(value % 2);
				value >>= 1;
			}
			binArray.unshift(0); // for +
		} else {
			while (value !== -1) {
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

	// ReSharper disable once InconsistentNaming
	// TODO: Do not delete, this is constructor
	function Converter() {
		this.decToBin = decToBin;
		this.binToDec = binToDec;
	}

	// #endregion Binary Converter (6)

	// #region Depth-first search (7)

	// Tree
	// ReSharper disable once InconsistentNaming
	// TODO: Do not delete, this is constructor
	var Tree = function (level) {
		if (!level) {
			return null;
		}
		this.level = level;
		this.nodeCount = Math.pow(2, level) - 1;
		this.nodes = new Array(this.nodeCount);
		this.toString = function () {
			var result = "";
			for (var l = 0; l < this.nodeCount; l++) {
				result += "[" + this.nodes[l] + "]\n";
			}
			return result;
		}

		for (var k = 0; k < this.nodeCount; k++) {
			this.nodes[k] = new Array(this.nodeCount);
			for (var j = 0; j < this.nodeCount; j++) {
				this.nodes[k][j] = 0;
			}
		}

		for (var i = 0; i < (this.nodeCount / 2) - 1; i++) {
			var position = (i * 2) + 1;
			this.nodes[i][position] = 1;
			this.nodes[i][position + 1] = 1;
			this.nodes[position][i] = 1;
			this.nodes[position + 1][i] = 1;
		}

		return this;
	};

	// DFS
	function dfs(tree, source) {
		if (!tree) {
			return [];
		}

		var visited = new Array(tree.nodeCount);
		var visitOrder = new Array(tree.nodeCount);
		var counter = 0;

		(function recurs(st) {
			visitOrder[counter++] = st;
			visited[st] = 1;
			var i;
			for (i = 0; i <= tree.nodeCount; i++) {
				if (tree.nodes[st][i] && (!visited[i]))
					recurs(i);
			}
		})(source);

		return visitOrder;
	}

	// Tree view
	var treeViewport = null;
	var treeRenderer = function (canvas) {
		canvas = $(canvas).get(0);
		var ctx = canvas.getContext("2d");
		var particleSystem;

		var that = {
			init: function (system) {
				particleSystem = system;
				particleSystem.screenSize(canvas.width, canvas.height);
				particleSystem.screenPadding(80);
				that.initMouseHandling();
			},

			redraw: function () {
				ctx.fillStyle = "white";
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				particleSystem.eachEdge(function (edge, pt1, pt2) {
					ctx.strokeStyle = "rgba(0,0,0, .333)";
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.fillStyle = "black";
					ctx.moveTo(pt1.x, pt1.y);
					ctx.lineTo(pt2.x, pt2.y);
					ctx.stroke();
				});

				particleSystem.eachNode(function (node, pt) {
					var w = 10;
					ctx.fillStyle = (node.data.alone)
                        ? "orange"
                        : "gray";

					ctx.fillRect(pt.x - w / 2, pt.y - w / 2, w, w);

					ctx.fillStyle = "black";
					ctx.font = 'italic 16px sans-serif';

					var text = node.name + " (visit №" + node.visit + ")";
					ctx.fillText(text, pt.x + 8, pt.y + 8);
				});
			},

			initMouseHandling: function () {

				var dragged = null;

				var handler = {
					clicked: function (e) {
						var pos = $(canvas).offset();
						// ReSharper disable once InconsistentNaming
						var _mouseP = arbor.Point(e.pageX - pos.left, e.pageY - pos.top);
						dragged = particleSystem.nearest(_mouseP);

						if (dragged && dragged.node) {
							dragged.node.fixed = true;
						}

						$(canvas).bind('mousemove', handler.dragged);
						$(window).bind('mouseup', handler.dropped);

						return false;
					},
					dragged: function (e) {
						var pos = $(canvas).offset();
						var s = arbor.Point(e.pageX - pos.left, e.pageY - pos.top);

						if (dragged && dragged.node) {
							var p = particleSystem.fromScreen(s);
							dragged.node.p = p;
						}

						return false;
					},
					dropped: function () {
						if (!dragged || !dragged.node) {
							return undefined;
						}
						if (dragged.node) {
							dragged.node.fixed = false;
						}
						dragged.node.tempMass = 1000;
						dragged = null;
						$(canvas).unbind('mousemove', handler.dragged);
						$(window).unbind('mouseup', handler.dropped);
						// ReSharper disable once AssignToImplicitGlobalInFunctionScope
						_mouseP = null;
						return false;
					}
				}

				$(canvas).mousedown(handler.clicked);
			}
		}

		return that;
	}
	function showTree(viewer, tree, visitedOrder, source) {
		if (!viewer || !tree) {
			return;
		}

		var count = tree.nodeCount;
		var i;

		for (i = 0; i < count; i++) {
			if (source === (i + 1)) {
				viewer.addNode(i + 1, { alone: true });
			} else {
				viewer.addNode(i + 1);
			}
		}

		for (i = 0; i < count; i++) {
			for (var j = i; j < count; j++) {
				if (tree.nodes[i][j]) {
					viewer.addEdge(i + 1, j + 1);
				}
			}
		}
		if (visitedOrder) {
			for (i = 0; i < count; i++) {
				var node = viewer.getNode(visitedOrder[i] + 1);
				if (node) {
					node.visit = i;
				}
			}
		}
	}

	// #endregion Depth-first search (7)

	// #region Dijkstra’s algorithm (8)

	// Viewer
	var graphViewport = null;
	var graphRenderer = function (canvas) {
		canvas = $(canvas).get(0);
		var ctx = canvas.getContext("2d");
		var particleSystem;

		var that = {
			init: function (system) {
				particleSystem = system;
				particleSystem.screenSize(canvas.width, canvas.height);
				particleSystem.screenPadding(80);
				that.initMouseHandling();
			},

			redraw: function () {
				ctx.fillStyle = "white";
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				particleSystem.eachEdge(function (edge, pt1, pt2) {
					ctx.strokeStyle = "rgba(0,0,0, .333)";
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.fillStyle = "black";

					var x = Math.abs((pt1.x - pt2.x) / 2) + Math.min(pt1.x, pt2.x);
					var y = Math.abs((pt1.y - pt2.y) / 2) + Math.min(pt1.y, pt2.y);

					ctx.font = 'italic 16px sans-serif';
					ctx.fillText(edge.weight, x, y);

					ctx.moveTo(pt1.x, pt1.y);
					ctx.lineTo(pt2.x, pt2.y);
					ctx.stroke();
				});

				particleSystem.eachNode(function (node, pt) {
					var w = 10;
					ctx.fillStyle = (node.data.alone)
                        ? "orange"
                        : "gray";

					ctx.fillRect(pt.x - w / 2, pt.y - w / 2, w, w);

					ctx.fillStyle = "black";
					ctx.font = 'italic 16px sans-serif';

					var text = node.name + " (dist: " + node.dist + ")";
					ctx.fillText(text, pt.x + 8, pt.y + 8);
				});
			},

			initMouseHandling: function () {

				var dragged = null;

				var handler = {
					clicked: function (e) {
						var pos = $(canvas).offset();
						// ReSharper disable once InconsistentNaming
						var _mouseP = arbor.Point(e.pageX - pos.left, e.pageY - pos.top);
						dragged = particleSystem.nearest(_mouseP);

						if (dragged && dragged.node) {
							dragged.node.fixed = true;
						}

						$(canvas).bind('mousemove', handler.dragged);
						$(window).bind('mouseup', handler.dropped);

						return false;
					},
					dragged: function (e) {
						var pos = $(canvas).offset();
						var s = arbor.Point(e.pageX - pos.left, e.pageY - pos.top);

						if (dragged && dragged.node) {
							var p = particleSystem.fromScreen(s);
							dragged.node.p = p;
						}

						return false;
					},
					dropped: function () {
						if (!dragged || !dragged.node) {
							return undefined;
						}
						if (dragged.node !== null) {
							dragged.node.fixed = false;
						}
						dragged.node.tempMass = 1000;
						dragged = null;
						$(canvas).unbind('mousemove', handler.dragged);
						$(window).unbind('mouseup', handler.dropped);
						// ReSharper disable once AssignToImplicitGlobalInFunctionScope
						_mouseP = null;
						return false;
					}
				}

				$(canvas).mousedown(handler.clicked);
			}
		}

		return that;
	}
	function showGraph(viewer, graph, startNode) {
		if (!viewer || !graph) {
			return;
		}
		graph.nodes.forEach(function (item) {
			var newNode;
			if (startNode === item.id) {
				newNode = viewer.addNode(item.id, { alone: true });
			} else {
				newNode = viewer.addNode(item.id);
			}
			if (newNode) {
				newNode.dist = item.dist;
			}
		});
		graph.edges.forEach(function (item) {
			var newEdge = viewer.addEdge(item.source, item.target);
			if (newEdge) {
				newEdge.weight = item.weight;
			}
		});
	}


	// Model
	var utilGraph = {
		createNode: function (id) {
			return {
				id: id,
				dist: 0,
				toString: function () {
					return "[id: " + this.id + ", dist: " + this.dist + "]";
				}
			}
		},
		createEdge: function (source, target, weight) {
			return {
				source: source,
				target: target,
				weight: weight,
				toString: function () {
					return "[source: " + this.source + ", target: " + this.target + ", weight: " + this.weight + "]";
				}
			}
		},
		generateGraph: function (nodeCount, percent) {
			if (!nodeCount || nodeCount < 0) {
				return undefined;
			}

			var graph = {
				nodes: [],
				edges: [],
				toString: function () {
					var strNodes = "[Nodes: " + this.nodes.length + "[" + this.nodes + "]]";
					var strEdges = "[Edges: " + this.edges.length + "[" + this.edges + "]]";
					return strNodes + "\n" + strEdges;
				}
			};

			for (var i = 1; i <= nodeCount; i++) {
				var n = this.createNode(i);
				graph.nodes.push(n);
			}

			if (!percent) {
				return graph;
			} else if (percent > 100) {
				percent = 100;
			}

			var edgeCount = ((nodeCount * (nodeCount - 1) / 2) / 100) * percent;
			var iEdge = 1;

			while (iEdge <= edgeCount) {

				var v1 = Math.floor(Math.random() * nodeCount + 1);
				var v2 = Math.floor(Math.random() * nodeCount + 1);

				if (v1 === v2) {
					continue;
				}

				var flag = true;

				for (var j = 0; j < graph.edges.length; j++) {
					var e = graph.edges[j];
					if ((v1 === e.source && v2 === e.target) || (v1 === e.target && v2 === e.source)) {
						flag = false;
						break;
					}
				}

				if (flag) {
					var weight = Math.floor(Math.random() * (nodeCount + 1));
					var newEdge = this.createEdge(v1, v2, weight);
					graph.edges.push(newEdge);
					iEdge++;
				}
			}
			return graph;
		}
	}

	// Algorithm
	function dijkstra(graph, idSource) {
		if (!graph || isNaN(idSource)) {
			return;
		}

		var notVisited = [];
		var source;

		graph.nodes.forEach(function (item) {
			item.dist = Infinity;
			notVisited.push(item);
			if (item.id === idSource) {
				source = item;
				source.dist = 0;
			}
		});

		var current = source;

		while (notVisited.length && current) {

			// search neighbors
			var neighbor = [];
			for (var i = 0; i < graph.edges.length; i++) {
				var e = graph.edges[i];
				// ReSharper disable once QualifiedExpressionMaybeNull
				if (e.source === current.id) {
					neighbor.push({
						node: e.target,
						edge: e
					});
				} else if (e.target === current.id) {
					neighbor.push({
						node: e.source,
						edge: e
					});
				}
			}

			// set neighbor weight
			neighbor.forEach(function (item) {
				var iNode = graph.nodes[item.node - 1];
				var iEdge = item.edge;
				// ReSharper disable once ClosureOnModifiedVariable
				var weight = current.dist + iEdge.weight;
				if (iNode.dist === Infinity || iNode.dist > weight) {
					iNode.dist = weight;
				}
			});

			// visited remove
			for (var j = 0; j < notVisited.length; j++) {
				// ReSharper disable once QualifiedExpressionMaybeNull
				if (current.id === notVisited[j].id) {
					notVisited.splice(j, 1);
				}
			}

			// search next not visited node of neighbors
			current = null;
			for (var l = 0; l < neighbor.length; l++) {
				var nIndex = neighbor[l].node - 1;
				var iNode = graph.nodes[nIndex];
				for (var k = 0; k < notVisited.length; k++) {
					var iNotVisited = notVisited[k];
					if (iNotVisited.id === iNode.id) {
						current = iNode;
						break;
					}
				}
				if (current) {
					break;
				}
			}

			// if not visited node no exists in neighbors
			if (!current && notVisited.length) {
				for (var t = 0; t < notVisited.length; t++) {
					if (notVisited[t].dist !== Infinity) {
						current = notVisited[t];
						break;
					}
				}
			}
		}

	}

	// #endregion Dijkstra’s algorithm (8)

	// #region Caching calculator (9)

	// ReSharper disable once InconsistentNaming
	// TODO: Do not delete, this is constructor
	function CacheCalculator() {
		this.cache = new Object();
		this.clear = function () {
			this.cache = new Object();
		}
		this.add = function (a, b) {
			var key = a + "+" + b;
			if (this.cache[key]) {
				return this.cache[key];
			} else {
				var result = a + b;
				this.cache[key] = result;
				return result;
			}
		}
		this.sub = function (a, b) {
			var key = a + "-" + b;
			if (this.cache[key]) {
				return this.cache[key];
			} else {
				var result = a - b;
				this.cache[key] = result;
				return result;
			}
		}
		this.mul = function (a, b) {
			var key = a + "*" + b;
			if (this.cache[key]) {
				return this.cache[key];
			} else {
				var result = a * b;
				this.cache[key] = result;
				return result;
			}
		}
		this.div = function (a, b) {
			var key = a + "/" + b;
			if (this.cache[key]) {
				return this.cache[key];
			} else {
				var result = !b
                    ? Infinity
                    : a / b;
				this.cache[key] = result;
				return result;
			}
		}
		this.mod = function (a, b) {
			var key = a + "%" + b;
			if (this.cache[key]) {
				return this.cache[key];
			} else {
				var result = a % b;
				this.cache[key] = result;
				return result;
			}
		}
		this.pow = function (a, b) {
			var key = a + "pow" + b;
			if (this.cache[key]) {
				return this.cache[key];
			} else {
				var result = Math.pow(a, b);
				this.cache[key] = result;
				return result;
			}
		}
		this.and = function (a, b) {
			var key = a + "&" + b;
			if (this.cache[key]) {
				return this.cache[key];
			} else {
				var result = a & b;
				this.cache[key] = result;
				return result;
			}
		}
		this.or = function (a, b) {
			var key = a + "|" + b;
			if (this.cache[key]) {
				return this.cache[key];
			} else {
				var result = a | b;
				this.cache[key] = result;
				return result;
			}
		}
		this.shr = function (a, b) {
			var key = a + ">>" + b;
			if (this.cache[key]) {
				return this.cache[key];
			} else {
				var result = a >> b;
				this.cache[key] = result;
				return result;
			}
		}
		this.shl = function (a, b) {
			var key = a + "<<" + b;
			if (this.cache[key]) {
				return this.cache[key];
			} else {
				var result = a << b;
				this.cache[key] = result;
				return result;
			}
		}
	}

	var calculator = new CacheCalculator();

	// #endregion Caching calculator (9)

	// #region Events initialize

	setClick("bArraySubSum", function () {
		var value = getValue("tbArraySubSum");
		var arr = parseArray(value);
		if (!arr) {
			setError("vArraySubSum", "Data entry errors!");
			return;
		}
		var result = (new ArrayTool).subSum(arr);
		setResult("vArraySubSum", "Sub sum: " + result);
	});
	setClick("bArrayMinMidMax", function () {
		var value = getValue("tbArrayMinMidMax");
		var arr = parseArray(value);
		if (!arr) {
			setError("vArrayMinMidMax", "Data entry errors!");
			return;
		}

		var arrayTool = new ArrayTool();

		var minValue = arrayTool.min(arr);
		var midValue = arrayTool.mid(arr);
		var maxValue = arrayTool.max(arr);

		var result = "[min: " + minValue + ", mid: " + midValue + ", max: " + maxValue + "]";

		setResult("vArrayMinMidMax", "Result: " + result);
	});
	setClick("bArraySelection", function () {
		var value = getValue("tbArraySelection");
		var arr = parseArray(value);
		if (!arr) {
			setError("vArraySelection", "Data entry errors!");
			return;
		}
		var result = (new ArrayTool).selection(arr);
		setResult("vArraySelection", "Result: [" + result + "]");
	});
	setClick("bDateFormatter", function () {
		var date = getValue("tbDateFormatterDate");
		var fromMask = getValue("tbDateFormatterFromMask");
		var toMask = getValue("tbDateFormatterToMask");

		if (!fromMask && !toMask && !DateFormatter.parse(date)) {
			setError("vDateFormatter", "Data entry errors!");
			return;
		}

		var formatDate = DateFormatter.format(date, fromMask, toMask) + "<br />" +
            "From now " + DateFormatter.fromNow(date, fromMask) + " years ago.";

		setResult("vDateFormatter", formatDate);
	});
	setClick("bTextFormatter", function () {
		var text = getValue("tbTextFormatterText");
		if (!text) {
			setError("vTextFormatter", "Data entry errors! Enter text!");
			return;
		}

		var maxLineLength = parseInt(getValue("tbTextFormatterLength"));
		var maxLineCount = parseInt(getValue("tbTextFormatterCount"));
		var format = getValue("cbTextFormatterOptions");

		var resultText = TextFormatter.format(text, maxLineLength, format, maxLineCount);

		setResult("vTextFormatter", resultText);
	});
	setClick("bStringCalc", function () {
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
	});
	setClick("bArraySort", function () {
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
	});
	setClick("bBinaryConverter", function () {
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
	});
	setClick("bDFSTree", function () {
		var levels = getValue("tbDFSTreeLevels");
		var source = getValue("tbDFSTreeSource");

		levels = parseInt(levels);
		source = parseInt(source);

		if (!levels || !source) {
			setError("vDFSTree", "Data entry errors!");
			return;
		}

		// generate tree
		var tree = new Tree(levels);

		// calculate distance
		var visited = dfs(tree, source - 1);

		// show tree
		if (!treeViewport) {
			// initialize
			treeViewport = arbor.ParticleSystem(1000, 600, 0.5);
			treeViewport.parameters({ gravity: true });
			treeViewport.renderer = treeRenderer("#viewportDFSTree");
		} else {
			// clear
			treeViewport.prune();
		}

		showTree(treeViewport, tree, visited);

		setResult("vDFSTree", visited);
	});
	setClick("bDijkstra", function () {
		var nodeCount = getValue("tbDijkstraNodes");
		var percent = getValue("tbDijkstraPercent");
		var source = getValue("tbDijkstraSource");

		nodeCount = parseInt(nodeCount);
		percent = parseFloat(percent);
		source = parseInt(source);

		if (!nodeCount || nodeCount < 1 || (!percent && percent !== 0) || !source || source < 1 || nodeCount < source) {
			setError("vDijkstra", "Data entry errors!");
			return;
		}

		// generate graph
		var graph = utilGraph.generateGraph(nodeCount, percent);

		// calculate distance
		dijkstra(graph, source);

		// show graph
		if (!graphViewport) {
			// initialize
			graphViewport = arbor.ParticleSystem(1000, 600, 0.5);
			graphViewport.parameters({ gravity: true });
			graphViewport.renderer = graphRenderer("#viewport");
		} else {
			// clear
			graphViewport.prune();
		}
		showGraph(graphViewport, graph, source);

		// show result message
		setResult("vDijkstra", "Yes");
	});
	setClick("bCache", function () {
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
	});

	// #endregion Events initialize
}