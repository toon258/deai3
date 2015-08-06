$(function() {
	/* map */
	$(window).load(function() {
		var name = $(".storeName").text();
		var url = "http://maps.google.com/maps?q=" + name;

		$("#mapUrl").attr("href", url);
	});

	/* params */
	var categoryParams = decodeURI(location.search.substring(7));
	if (categoryParams == "パン") {
		category_l= "RSFST18000";
		category_s= "RSFST18007";
	} else if (categoryParams == "ケーキ") {
		category_l= "RSFST18000";
		category_s= "RSFST18005";
	} else if (categoryParams == "クレープ") {
		category_l= "RSFST18000";
		category_s= "RSFST18015";
	} else if (categoryParams == "和菓子") {
		category_l= "RSFST18000";
		category_s= "RSFST18003";
	}

	console.log(categoryParams + " = " + category_s);

	/* API */
	var id;
	var storeName;
	var pr_short;
	var pr_long;
	var category_l;
	var category_s;
	var url = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/?callback=?';
	var rand = 1;
	var max_cnt = 0;
	var params;
	var params_cnt = {
		keyid : '26b5563784f6a489d35f011d33b313fd',
		format : 'json',
		area : 'AREA110',
		pref : 'PREF13',
		category_l: category_l,
		sort:'2',
		category_s: category_s
	};

	$.getJSON(url, params_cnt, function(result_cnt) {
		/* 検索ヒット件数取得 */
		getCount(result_cnt);
		/* ランダム検索 */
		var params = {
			keyid : '26b5563784f6a489d35f011d33b313fd',
			format : 'json',
			area : 'AREA110',
			pref : 'PREF13',
			category_l: category_l,
			offset: rand,
			hit_per_page: 1,
			sort:'2',
			category_s: category_s
		};
		$.getJSON(url, params, function(result) {
			showResult(result);
		});
	});

	var getCount = function(result_cnt) {
	console.log('params_cnt:'+params_cnt);
	console.log('result_cnt:'+result_cnt);
		if (result_cnt.total_hit_count > 0) {
			max_cnt = result_cnt.total_hit_count;
			rand = 1 + Math.floor(Math.random() * max_cnt);
		} else {
			alert('検索結果が見つかりませんでした。');
		}
	}
	var showResult = function(result) {
	console.log('params:'+params);
	console.log('result:'+result);
		if (result.total_hit_count > 0) {
			id=result.rest.id;
			storeName=result.rest.name;
			pr_long=result.rest.pr.pr_long;
			pr_short=result.rest.pr.pr_short;
		}
		$(".storeName").html(storeName);
		$(".pr_short").html(pr_short);
	}

});
