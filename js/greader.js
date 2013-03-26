$(function()
		{
			// for local file://
			// from http://stackoverflow.com/questions/2618959/not-well-formed-warning-when-loading-client-side-json-in-firefox-via-jquery-aj
			$.ajaxSetup({
				beforeSend: function(xhr){
					if (xhr.overrideMimeType)
					{
						xhr.overrideMimeType("application/json");
					}
				}
			});

			//getSubscriptions();

			//getArticles('liked.json');
			//getArticles('notes.json');
			//getArticles('shared.json');
			//getArticles('starred.json');
		});

/*
function getSubscriptions() {
	$.get('subscriptions.xml', getSubscriptionsCallback, 'xml');
}

function getSubscriptionsCallback(data) {
	var $xml = $(data);
	$xml.find('outline[htmlUrl]').each(function() {
		var $this = $(this);
		var html = '<a href="' + $this.attr('htmlUrl') + '">' + $this.attr('htmlUrl') + '</a> ' +
			'(<a href="' + $this.attr('xmlUrl') + '">feed</a>) <em>' + $this.attr('text') + '</em>';
		var $parents = $this.parents('outline');		
		if ($parents.length)
		{
			html = html + ' &mdash;' + $($parents[0]).attr('text');
		}
		
		$('#blogs').append('<li>' + html + '</li>');
	});
}
*/

function getArticles(fileName) {
	$('#articles').html('');
	$.getJSON(fileName, function(data) {
		data.items.length>20 ? itemMax = 20 : itemMax = data.items.length;
		for(var i = 0; i < itemMax; i++) {
			var item = data.items[i];
			if (item.canonical) {
				subitem = item.canonical;
			}
			else {
				subitem = item.alternate;
			}			
			$('#entries').append('<div class="entry"><div class="collapsed"><div class="entry-date">'
									+ item.published.toString() + '</div><div class="entry-main"><a class="entry-original" target="_blank" href="'
									+ subitem[0].href + '"></a><span class="entry-source-title">'
									+ item.title +'</span><div class="entr-secondary"><h2 class="entry-title">'+''+'</h2></div>'
								);

		}
	});
}