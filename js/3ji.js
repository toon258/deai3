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
		category= "RSFST18007";
	} else if (categoryParams == "ケーキ") {
		category= "RSFST18005";
	} else if (categoryParams == "クレープ") {
		category= "RSFST18015";
	} else if (categoryParams == "和菓子") {
		category= "RSFST18003";
	}

	console.log(categoryParams + " = " + category);

	/* API */
	var id;
	var storeName;
	var pr_short;
	var pr_long;
	var category;
	var url = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/?callback=?';
	var rand = 1 + Math.floor(Math.random() * 999);
	var params = {
		keyid : '26b5563784f6a489d35f011d33b313fd',
		format : 'json',
		area : 'AREA110',
		pref : 'PREF13',
	    category_l: 'RSFST18000',
        offset: rand,
        sort:'2',
        category_s: category
	};

	$.getJSON(url, params, function(result) {
		showResult(result);
	});

	var showResult = function(result) {
		if (result.total_hit_count > 0) {
			var rnd = 1 + Math.floor(Math.random() * 9)
			id=result.rest[rnd].id;
			storeName=result.rest[rnd].name;
			pr_long=result.rest[rnd].pr.pr_long;
			pr_short=result.rest[rnd].pr.pr_short;

			$(".storeName").html(storeName);
			$(".pr_short").html(pr_short);
		
		} else {
			alert('検索結果が見つかりませんでした。');
		}
	}
});


