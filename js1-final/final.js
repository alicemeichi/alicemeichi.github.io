window.onload = function () {

	var templateHtml = $('#sstemplate').html();
	var compiled = Handlebars.compile(templateHtml);


	$("#sheetsButton").one( "click", function(event) {
		
	// var sheetID = "1-4WWH_BwSew1jZsje4k25-B9Kc9pFpEeE577KAaxpRA";
	var sheetID = $("#sheetsEnter").val();
	var sheetsURL = "https://spreadsheets.google.com/feeds/list/" + sheetID + "/od6/public/values?alt=json";

			$('#email-options').append('<select id="template-menu"><option value="" disabled selected>Template Version</option></select>');

			$.getJSON( sheetsURL, function (data) {
				var versionArray = [];
				for (var i = 0; i < data.feed.entry.length; i++) {
					versionArray.push(data.feed.entry[i].gsx$version.$t);
				}
				$.each(versionArray, function(val, text) {
					$('#template-menu').append(
					    $('<option class="template-option"></option>').val(val).html(text)
					);
				})

				$('#template-menu').on( 'change', function() {
					var eTemplate = $('#template-menu option:selected').val();

					var eVersion = data.feed.entry[eTemplate].gsx$version.$t;
					var eHeader = data.feed.entry[eTemplate].gsx$header.$t;
					var eBody = data.feed.entry[eTemplate].gsx$body.$t;
					var eCta = data.feed.entry[eTemplate].gsx$cta.$t;
					var eBgimage = data.feed.entry[eTemplate].gsx$backgroundimage.$t;

				  var eContent = {
				    header: eHeader,
				    body: eBody,
				    cta: eCta,
				    bgimage: eBgimage
				  };
				  
				  var emailCode = compiled(eContent);
				  $('#email-template').empty().append(emailCode);

				  $('textarea').text(emailCode);

				  // console.log(emailCode);

				});

			});

	});

}