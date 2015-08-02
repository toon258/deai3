$(function() {
	$(window).load(function() {
		var name = $(".storeName").text();
		var url = "http://maps.google.com/maps?q=" + name;

		$("#mapUrl").attr("href", url);
	});
});


/* category */
function callApi(category) {
}

(function () {
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

	(function(hiki){
		if (hiki == "パン") {
			category= "RSFST18007";
		} else if (hiki == "ケーキ") {
			category= "RSFST18005";
		} else if (hiki == "クレープ") {
			category= "RSFST18015";
		} else if (hiki == "和菓子") {
			category= "RSFST18003";
		}
		$.getJSON(url, params, function(result) {
			showResult(result);
		}
	})();
/*
	function callApi(hiki){
		if (hiki == "パン") {
			category= "RSFST18007";
		} else if (hiki == "ケーキ") {
			category= "RSFST18005";
		} else if (hiki == "クレープ") {
			category= "RSFST18015";
		} else if (hiki == "和菓子") {
			category= "RSFST18003";
		}
		$.getJSON(url, params, function(result) {
			showResult(result);
		});
	}
*/

	var showResult = function(result) {
		if (result.total_hit_count > 0) {
			var rnd = 1 + Math.floor(Math.random() * 9)
			id=result.rest[rnd].id;
			storeName=result.rest[rnd].name;
			pr_long=result.rest[rnd].pr.pr_long;
			pr_short=result.rest[rnd].pr.pr_short;
			$(".moji1").text(storeName);
			$(".moji2").text(pr_short);
		} else {
			alert('検索結果が見つかりませんでした。');
		}
.	}

$(window).load(function() {
$(".storeName").text(storeName);
});

})(jQuery);


